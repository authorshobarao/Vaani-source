import { describe, expect, it, vi } from "vitest";
import { extractInteractionExcerpts, findMedicationArticle, findMedicationInteractions, lookupMedicationReferences, validateMedicationName } from "./medication-references";

const label = `<document><section><code code="34073-7"/><text>
<table><tbody>
<tr><td colspan="2">Alcohol</td></tr>
<tr><td>Clinical Impact:</td><td>Alcohol can increase the risk described in the medication's prescribing information.</td></tr>
<tr><td>Intervention:</td><td>Take 500 mg twice daily.</td></tr>
<tr><td colspan="2">Other medicines</td></tr>
<tr><td>Clinical Impact:</td><td>Concomitant medicines may affect the elimination of this medication from the body.</td></tr>
</tbody></table>
<paragraph>A dosage adjustment to 25 mg is recommended for this combination.</paragraph>
</text></section><section><code code="34068-7"/><text><paragraph>This unrelated section must not appear in interaction excerpts.</paragraph></text></section></document>`;
const setid = "f86bda10-8b25-4125-8bb1-1b5917969ff0";

describe("authoritative medication sources", () => {
  it.each([["metformin", "6809"], ["Ozempic", "1991307"]])("validates exact brand/generic RxNorm name %s without a fuzzy search", async (name, id) => {
    const upstream = vi.fn().mockResolvedValue(new Response(JSON.stringify({ idGroup: { rxnormId: [id] } })));
    expect(await validateMedicationName(name, upstream)).toBe(true);
    expect(upstream).toHaveBeenCalledTimes(1);
    const url = new URL(upstream.mock.calls[0][0]);
    expect(url.hostname).toBe("rxnav.nlm.nih.gov");
    expect(url.searchParams.get("name")).toBe(name);
    expect(url.searchParams.get("search")).toBe("0");
  });
  it.each(["metformn", "asdfgh"])("does not accept a near MedlinePlus result or unrelated DailyMed label for %s", async name => {
    const upstream = vi.fn(async (url: string | URL | Request) => {
      const href = String(url);
      if (href.includes("rxnav.nlm.nih.gov")) return new Response(JSON.stringify({ idGroup: {} }));
      if (href.includes("connect.medlineplus.gov")) return new Response(JSON.stringify({ feed: { entry: [{
        title: { _value: "Metformin" }, link: [{ href: "https://medlineplus.gov/druginfo/meds/a696005.html" }],
      }] } }));
      return new Response(JSON.stringify({ data: [{ title: "UNRELATED TABLET", setid }] }));
    });
    expect(await validateMedicationName(name, upstream)).toBe(false);
    expect(upstream).toHaveBeenCalledTimes(3);
  });
  it("uses exact MedlinePlus drug identity if RxNorm is unavailable", async () => {
    const upstream = vi.fn(async (url: string | URL | Request) => {
      if (String(url).includes("rxnav.nlm.nih.gov")) throw new Error("unavailable");
      if (String(url).includes("connect.medlineplus.gov")) return new Response(JSON.stringify({ feed: { entry: [{
        title: { _value: "Metformin" }, link: [{ href: "https://medlineplus.gov/druginfo/meds/a696005.html" }],
      }] } }));
      return new Response(JSON.stringify({ data: [] }));
    });
    expect(await validateMedicationName("metformin", upstream)).toBe(true);
  });
  it("uses a matched DailyMed product even when no interaction excerpts are available", async () => {
    const upstream = vi.fn(async (url: string | URL | Request) => {
      if (String(url).includes("rxnav.nlm.nih.gov")) return new Response(JSON.stringify({ idGroup: {} }));
      if (String(url).includes("connect.medlineplus.gov")) return new Response(JSON.stringify({ feed: { entry: [] } }));
      return new Response(JSON.stringify({ data: [{ title: "OZEMPIC INJECTION [Manufacturer]", setid }] }));
    });
    expect(await validateMedicationName("Ozempic", upstream)).toBe(true);
    expect(upstream.mock.calls.some(([url]) => String(url).endsWith(".xml"))).toBe(false);
  });
  it("fails closed when all authoritative validators are unavailable", async () => {
    expect(await validateMedicationName("metformin", vi.fn().mockRejectedValue(new Error("offline")))).toBe(false);
  });
  it("returns exact source excerpts only, with no interventions or dosing recommendations", () => {
    const refs = extractInteractionExcerpts(label);
    expect(refs.foodAlcohol).toEqual(["Alcohol: Alcohol can increase the risk described in the medication's prescribing information."]);
    expect(refs.otherDrugs).toEqual(["Other medicines: Concomitant medicines may affect the elimination of this medication from the body."]);
    expect(JSON.stringify(refs)).not.toMatch(/500|25 mg|dosage|unrelated/);
  });
  it("finds a real MedlinePlus drug URL from the medication service, ignoring health-topic links", async () => {
    const upstream = vi.fn().mockResolvedValue(new Response(JSON.stringify({ feed: { entry: [
      { title: { _value: "Diabetes" }, link: [{ href: "https://medlineplus.gov/diabetes.html" }] },
      { title: { _value: "Metformin" }, link: [{ href: "https://medlineplus.gov/druginfo/meds/a696005.html?utm_source=mplusconnect" }] },
    ] } })));
    const article = await findMedicationArticle("metformin", upstream);
    expect(article.url).toContain("/druginfo/meds/a696005.html");
    expect(upstream.mock.calls[0][0]).toContain("mainSearchCriteria.v.dn=metformin");
    expect(upstream.mock.calls[0][0]).toContain("mainSearchCriteria.v.cs=2.16.840.1.113883.6.88");
  });
  it("does not guess drug URLs on no match, untrusted host, or upstream failure", async () => {
    for (const result of [
      { feed: { entry: [] } },
      { feed: { entry: [{ link: [{ href: "https://evil.test/druginfo/meds/a123456.html" }] }] } },
    ]) {
      expect((await findMedicationArticle("unknown", vi.fn().mockResolvedValue(new Response(JSON.stringify(result))))).url)
        .toBe("https://medlineplus.gov/");
    }
    expect((await findMedicationArticle("unknown", vi.fn().mockRejectedValue(new Error("network")))).url)
      .toBe("https://medlineplus.gov/");
  });
  it("does not substitute a combination product or unrelated drug for the requested medication", async () => {
    const upstream = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: [
        { title: "METFORMIN AND ANOTHER DRUG TABLET", setid: "11111111-1111-1111-1111-111111111111" },
        { title: "UNRELATED TABLET", setid: "22222222-2222-2222-2222-222222222222" },
        { title: "METFORMIN HYDROCHLORIDE TABLET [Manufacturer]", setid },
      ] })))
      .mockResolvedValueOnce(new Response(label));
    const result = await findMedicationInteractions("  metformin  ", upstream);
    expect(result.foodAlcohol.length).toBe(1);
    expect(result.otherDrugs.length).toBe(1);
    expect(result.sources[0].url).toContain(setid);
    expect(upstream.mock.calls[1][0]).toContain(`/spls/${setid}.xml`);
    expect(upstream).toHaveBeenCalledTimes(2);
  });
  it("returns empty verified lists when the source is unavailable; no AI fallback", async () => {
    const result = await lookupMedicationReferences("unknown", vi.fn().mockRejectedValue(new Error("network")));
    expect(result.article.url).toBe("https://medlineplus.gov/");
    expect(result.medication).toEqual({ foodAlcohol: [], otherDrugs: [], sources: [] });
  });
});
