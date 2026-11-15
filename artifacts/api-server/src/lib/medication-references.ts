import { load } from "cheerio";

type Source = { name: string; url: string };
export type MedicationReferences = {
  foodAlcohol: string[];
  otherDrugs: string[];
  sources: Source[];
};
type Fetcher = typeof fetch;
const HOME: Source = { name: "MedlinePlus", url: "https://medlineplus.gov/" };
const emptyReferences = (): MedicationReferences => ({ foodAlcohol: [], otherDrugs: [], sources: [] });
const clean = (text: string) => text.replace(/\s+/g, " ").trim();
const normalize = (text: string) => clean(text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " "));
export const NUMERIC_DOSE = /\b\d+(?:\.\d+)?\s*(?:mg|mcg|micrograms?|milligrams?|grams?|ml|milliliters?|units?)\b/i;

async function readSource(url: string, fetcher: Fetcher): Promise<string> {
  const response = await fetcher(url, { signal: AbortSignal.timeout(8000), redirect: "error" });
  if (!response.ok) throw new Error(`Authoritative source returned ${response.status}`);
  // Bound remote documents before XML parsing, including chunked responses.
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Empty source");
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 5_000_000) throw new Error("Source document is too large");
      chunks.push(value);
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }
  return Buffer.concat(chunks).toString("utf8");
}

/** Only accept a real drug-page URL returned by NLM's medication web service. */
export async function findMedicationArticle(drug: string, fetcher: Fetcher = fetch): Promise<Source> {
  try {
    const params = new URLSearchParams({
      "mainSearchCriteria.v.cs": "2.16.840.1.113883.6.88",
      "mainSearchCriteria.v.dn": drug.trim(),
      "informationRecipient.languageCode.c": "en",
      knowledgeResponseType: "application/json",
    });
    const data = JSON.parse(await readSource(`https://connect.medlineplus.gov/service?${params}`, fetcher));
    for (const entry of data?.feed?.entry ?? []) {
      for (const link of entry.link ?? []) {
        if (typeof link.href !== "string") continue;
        const url = new URL(link.href);
        if (url.protocol !== "https:" || url.hostname !== "medlineplus.gov" ||
            !/^\/druginfo\/meds\/[a-z]\d+\.html$/.test(url.pathname)) continue;
        return { name: clean(entry.title?._value || drug), url: url.toString() };
      }
    }
  } catch {
    // No match, timeout, or an unavailable service must not create a guessed URL.
  }
  return { ...HOME };
}

/**
 * Extract short, verbatim excerpts from the SPL DRUG INTERACTIONS section only.
 * No model participates in this path. Skip interventions/dosing statements,
 * preserve table headings with their clinical-impact text, and never interpret
 * an empty list as "no interactions".
 */
export function extractInteractionExcerpts(xml: string): Omit<MedicationReferences, "sources"> {
  const $ = load(xml, { xml: true });
  const foodAlcohol: string[] = [];
  const otherDrugs: string[] = [];
  const seen = new Set<string>();
  const add = (body: string, heading = "") => {
    body = clean(body);
    heading = clean(heading);
    const text = heading ? `${heading}: ${body}` : body;
    if (body.length < 45 || text.length > 1800 || seen.has(text) ||
        NUMERIC_DOSE.test(text) || /\b(?:dose|doses|dosing|dosage|titrate|titration)\b/i.test(text) ||
        /^(?:table \d|see table|see section)/i.test(body)) return;
    const list = /\b(?:alcohol|ethanol|grapefruit|food|foods|beverage|juice|dietary)\b/i.test(text) ? foodAlcohol : otherDrugs;
    if (list.length < 6) {
      seen.add(text);
      list.push(text);
    }
  };
  $('section > code[code="34073-7"]').each((_, code) => {
    const section = $(code).parent("section");
    section.find("table").each((_, table) => {
      let heading = "";
      $(table).find("tr").each((_, row) => {
        const cells = $(row).children("td");
        if (cells.length === 1) heading = clean(cells.first().text());
        else if (cells.length >= 2 && /^clinical impact\s*:/i.test(clean(cells.first().text()))) {
          add(cells.last().text(), heading);
        }
      });
    });
    section.find("paragraph, item").each((_, node) => {
      // Table rows were handled with their headings; avoid duplicate/nested text.
      if ($(node).parents("table, paragraph, item").length) return;
      add($(node).text());
    });
  });
  return { foodAlcohol, otherDrugs };
}

type MedicationLabel = { title: string; setid: string };

async function findMedicationLabels(drug: string, fetcher: Fetcher): Promise<MedicationLabel[]> {
    const params = new URLSearchParams({ drug_name: drug.trim(), pagesize: "30" });
    const data = JSON.parse(await readSource(`https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?${params}`, fetcher));
    const name = normalize(drug);
    // Do not use a combination-product label for a single-drug request merely
    // because DailyMed's broad name search returned it first.
    return (Array.isArray(data.data) ? data.data : []).filter((item: { title?: string; setid?: string }) => {
      if (typeof item.title !== "string" || typeof item.setid !== "string" ||
          !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(item.setid)) return false;
      const title = normalize(item.title.split("[")[0]);
      return (title === name || title.startsWith(`${name} `)) &&
        (!/\band\b/.test(title) || /\band\b/.test(name));
    });
}

/** Fail closed before any AI generation. Approximate/spelling matches are not validation. */
export async function validateMedicationName(drug: string, fetcher: Fetcher = fetch): Promise<boolean> {
  if (!drug.trim()) return false;
  try {
    const params = new URLSearchParams({ name: clean(drug), search: "0" });
    const data = JSON.parse(await readSource(`https://rxnav.nlm.nih.gov/REST/rxcui.json?${params}`, fetcher));
    if (Array.isArray(data?.idGroup?.rxnormId) &&
        data.idGroup.rxnormId.some((id: unknown) => typeof id === "string" && /^\d+$/.test(id))) return true;
  } catch {
    // RxNorm unavailable: use the existing authoritative medication services.
  }
  const [article, labels] = await Promise.all([
    findMedicationArticle(drug, fetcher),
    findMedicationLabels(drug, fetcher).catch(() => []),
  ]);
  // Connect may return a nearby name. Do not silently accept a misspelling as
  // that different drug; a generic-homepage fallback is never a match either.
  return (article.url !== HOME.url && normalize(article.name) === normalize(drug)) ||
    labels.length > 0;
}

export async function findMedicationInteractions(drug: string, fetcher: Fetcher = fetch): Promise<MedicationReferences> {
  try {
    const candidates = await findMedicationLabels(drug, fetcher);
    // Try at most two label versions. Never substitute information for an
    // unrelated medicine or fall back to an LLM when extraction finds nothing.
    for (const candidate of candidates.slice(0, 2)) {
      const xml = await readSource(`https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/${candidate.setid}.xml`, fetcher);
      const excerpts = extractInteractionExcerpts(xml);
      if (excerpts.foodAlcohol.length || excerpts.otherDrugs.length) {
        return {
          ...excerpts,
          sources: [{
            name: `DailyMed — ${clean(candidate.title)} (Drug interactions)`,
            url: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${candidate.setid}`,
          }],
        };
      }
    }
  } catch {
    // Verified information unavailable. The UI must show the explicit fallback.
  }
  return emptyReferences();
}

export async function lookupMedicationReferences(drug: string, fetcher: Fetcher = fetch) {
  const [article, medication] = await Promise.all([
    findMedicationArticle(drug, fetcher),
    findMedicationInteractions(drug, fetcher),
  ]);
  return { article, medication };
}
