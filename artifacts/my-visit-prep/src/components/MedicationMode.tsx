import { useEffect, useRef, useState, type ComponentType } from "react";
import { useCustomTopicQuestions } from "@workspace/api-client-react";
import { medicationSectionTitles } from "@workspace/vaani-core/content/features";
import { useLanguage } from "@/i18n";
import type { CategoryTranslation, UIStrings } from "@/i18n/types";
import { useWebDictation } from "@/hooks/useWebDictation";
import { DoctorNotes } from "@/components/DoctorNotes";
import { MedicationList } from "@/components/MedicationList";
import { MedicalSources } from "@/components/MedicalSources";
import { ReportAIContent } from "@/components/ReportAIContent";
import { GENERAL_SOURCES, type MedicalSource } from "@/content/sources";
import { trackEvent } from "@/lib/analytics";
import { AlertCircle, Info, Pill, Printer, Quote, RotateCcw } from "lucide-react";

export interface CategoryCardProps {
  cat: CategoryTranslation;
  keyPrefix: string;
  checkedMap: Record<string, boolean>;
  onToggle: (key: string) => void;
  answersMap: Record<string, string>;
  onAnswerChange: (key: string, val: string) => void;
  lang: string;
  startIdx?: number;
}

const MEDLINEPLUS_HOME = "https://medlineplus.gov/";

function isInteractionSource(source: MedicalSource): boolean {
  try {
    const url = new URL(source.url);
    return url.protocol === "https:" &&
      ["dailymed.nlm.nih.gov", "fda.gov", "www.fda.gov"].includes(url.hostname);
  } catch {
    return false;
  }
}

interface MedResult {
  drug: string;
  categories: CategoryTranslation[];
  article: MedicalSource | null;
  foodAlcohol: string[];
  otherDrugs: string[];
  sources: MedicalSource[];
}

function dedupeByUrl(list: MedicalSource[]): MedicalSource[] {
  const seen = new Set<string>();
  return list.filter((s) => {
    if (!s?.url || seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });
}

function ExcerptList({ title, items, testId }: { title: string; items: string[]; testId: string }) {
  const { t } = useLanguage();
  return (
    <div data-testid={testId}>
      <h4 className="text-sm font-semibold text-foreground mb-2">{title}</h4>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">{t.ui.noExcerpt}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((x, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-lg border-l-2 border-primary/40 bg-muted/50 px-3 py-2"
              data-testid={`${testId}-item-${i}`}
            >
              <Quote className="w-3.5 h-3.5 mt-1 flex-shrink-0 text-primary/60" aria-hidden="true" />
              <blockquote className="text-sm leading-relaxed text-foreground">{x}</blockquote>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MedicationMode({
  lang,
  t,
  CategoryCard,
}: {
  lang: string;
  t: UIStrings;
  CategoryCard: ComponentType<CategoryCardProps>;
}) {
  const MED_SECTIONS = Object.entries(medicationSectionTitles(t));
  const NO_VERIFIED = t.noVerifiedInteractions;
  const NOT_COMPLETE = t.interactionsNote;
  const [drugName, setDrugName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storedResult, setResult] = useState<(MedResult & { language: string }) | null>(null);
  const result = storedResult?.language === lang ? storedResult : null;
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [answersMap, setAnswersMap] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [otherMedications, setOtherMedications] = useState<string[]>([]);
  const requestId = useRef(0);
  const mutation = useCustomTopicQuestions();
  const mutateRef = useRef(mutation.mutateAsync);
  mutateRef.current = mutation.mutateAsync;
  const dictation = useWebDictation(lang, setNotes);
  const stopDictation = dictation.stop;

  useEffect(() => {
    return () => {
      requestId.current += 1;
      stopDictation();
    };
  }, [stopDictation]);

  function clearAll() {
    requestId.current += 1;
    stopDictation();
    setLoading(false);
    setError(null);
    setResult(null);
    setCheckedMap({});
    setAnswersMap({});
    setNotes("");
    setOtherMedications([]);
  }

  function handleDrugChange(value: string) {
    clearAll();
    setDrugName(value);
  }

  async function handleSubmit(languageChange = false) {
    const drug = drugName.trim();
    if (!drug) return;
    if (languageChange) {
      requestId.current += 1;
      setResult(null);
      setError(null);
      setCheckedMap({});
      setAnswersMap({});
    } else clearAll();
    const id = requestId.current;
    setLoading(true);
    trackEvent("medication_lookup_started", { language: lang });
    try {
      const data = await mutateRef.current({ data: { topic: drug, lang, mode: "medication" } });
      if (id !== requestId.current) return;
      const categories = MED_SECTIONS.map(([sid, title]) => ({
        id: sid,
        title,
        questions: sid === "interactions" ? [] : data.sections?.[sid] ?? [],
      })).filter((c) => c.id === "interactions" || c.questions.length > 0);
      if (!categories.some(c => c.questions.length > 0)) throw new Error("Empty response");
      const verifiedSources = (data.medication?.sources ?? []).filter(isInteractionSource);
      setResult({
        drug,
        language: lang,
        categories,
        article: data.article ?? null,
        foodAlcohol: verifiedSources.length ? data.medication?.foodAlcohol ?? [] : [],
        otherDrugs: verifiedSources.length ? data.medication?.otherDrugs ?? [] : [],
        sources: verifiedSources,
      });
      trackEvent("medication_lookup_completed", { language: lang });
    } catch (err) {
      if (id === requestId.current) {
        const apiError = err as { status?: number; data?: { error?: string } } | null;
        setError(apiError?.status === 400 ? t.medicationNotFound
          : apiError?.status === 429 ? t.rateLimitError
          : err instanceof TypeError ? t.networkError : t.aiPanelError);
        trackEvent("medication_lookup_failed", { language: lang });
      }
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }
  const previousLanguage = useRef(lang);
  useEffect(() => {
    if (previousLanguage.current === lang) return;
    previousLanguage.current = lang;
    requestId.current += 1;
    setError(null);
    if (drugName.trim()) void handleSubmit(true);
    // Language is the only regeneration trigger; typing still requires Submit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const toggle = (key: string) => setCheckedMap((m) => ({ ...m, [key]: !m[key] }));
  const setAnswer = (key: string, val: string) => setAnswersMap((m) => ({ ...m, [key]: val }));

  const article: MedicalSource = result?.article
    ? { name: t.aboutTopic.replace("{topic}", result.drug), url: result.article.url }
    : { name: `MedlinePlus (NIH) — ${result?.drug ?? ""}`, url: MEDLINEPLUS_HOME };
  const dailyMed = result?.sources.find(isInteractionSource);
  const hasRefs = !!result && (result.foodAlcohol.length > 0 || result.otherDrugs.length > 0);
  const sources = result ? dedupeByUrl([article, ...result.sources, ...GENERAL_SOURCES]) : GENERAL_SOURCES;

  return (
    <section aria-label={t.medicationQuestions} data-testid="medication-mode">
      <div
        className="no-print mb-6 flex items-start gap-2.5 rounded-xl border border-secondary/30 bg-accent/60 px-4 py-3"
        role="note"
        data-testid="medication-disclaimer"
      >
        <Info className="flex-shrink-0 w-4 h-4 text-accent-foreground mt-0.5" aria-hidden="true" />
        <p className="text-sm text-accent-foreground leading-relaxed">
          {t.medicationDisclaimer} {t.disclaimer} {t.dosingDisclaimer}
        </p>
      </div>

      <form
        className="no-print rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit();
        }}
      >
        <label htmlFor="medication-input" className="block text-base font-semibold text-foreground mb-3">
          {t.medicationPrompt}
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1 min-w-0">
            <Pill className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <input
              id="medication-input"
              type="text"
              value={drugName}
              onChange={(e) => handleDrugChange(e.target.value)}
              placeholder={t.medicationPlaceholder}
              maxLength={200}
              autoComplete="off"
              data-testid="input-medication"
              className="w-full rounded-xl border-2 border-border bg-background pl-10 pr-3 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!drugName.trim() || loading}
            data-testid="button-submit-medication"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-secondary hover:text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors touch-manipulation"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            )}
            {loading ? t.aiPanelLoading : t.aiPanelButton}
          </button>
        </div>
        {error && (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-destructive/5 border border-destructive/20 px-3 py-2" role="alert" data-testid="error-medication">
            <p className="text-sm text-destructive">{error}</p>
            <button
              type="button"
              onClick={() => void handleSubmit()}
              className="inline-flex items-center gap-1 text-sm font-semibold text-destructive hover:underline"
              data-testid="button-retry-medication"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> {t.retry}
            </button>
          </div>
        )}
      </form>

      {loading && (
        <div className="mt-6 space-y-4" role="status" aria-label={t.aiPanelLoading} data-testid="status-medication-loading">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden animate-pulse">
              <div className="h-11 bg-accent/60" />
              <div className="space-y-3 p-4">
                <div className="h-3 w-4/5 rounded bg-muted" />
                <div className="h-3 w-3/5 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!result && !loading && !error && (
        <div className="no-print mt-6 rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center" data-testid="empty-medication">
          <Pill className="w-7 h-7 text-primary/60 mx-auto mb-2" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            {t.medicationEmpty}
          </p>
        </div>
      )}

      {result && (
        <div className="mt-7" data-testid="medication-results">
          <div className="print-header hidden" aria-hidden="true">
            <p>Vaani</p>
            <p>Vaani: {result.drug}</p>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-lg font-bold text-foreground" data-testid="text-medication-name">{result.drug}</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="mb-4 text-center text-sm text-stone-500">
            {t.readMedication}{" "}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline underline-offset-2 hover:text-teal-800"
              data-testid="link-about-medication"
            >
              {article.name}
            </a>
          </p>
          <div className="no-print flex justify-end mb-5">
            <button
              type="button"
              onClick={() => {
                trackEvent("prep_printed", { topic_type: "medication", language: lang });
                window.print();
              }}
              data-testid="button-print-medication"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-card text-sm font-medium text-foreground shadow-xs hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              {t.printButton}
            </button>
          </div>

          <div className="space-y-4 sm:space-y-5" data-testid="medication-categories">
            {result.categories.map((cat) => cat.id === "interactions" ? (
              <MedicationList key={cat.id} items={otherMedications} onChange={setOtherMedications} />
            ) : (
              <CategoryCard
                key={cat.id}
                cat={cat}
                keyPrefix="medication"
                checkedMap={checkedMap}
                onToggle={toggle}
                answersMap={answersMap}
                onAnswerChange={setAnswer}
                lang={lang}
              />
            ))}
          </div>

          <div className="mt-4">
            <ReportAIContent feature="medication" lang={lang} t={t}
              content={[result.drug, ...result.categories.filter(cat => cat.id !== "interactions").flatMap(cat => [`${cat.title}:`, ...cat.questions])].join("\n")} />
          </div>

          <section className="print-category mt-6 rounded-xl border border-border bg-card overflow-hidden" data-testid="key-interactions">
            <div className="px-5 py-3.5 bg-primary/10 border-b border-primary/20 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">{t.keyInteractions}</h3>
              {hasRefs && (
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Quoted from drug label
                </span>
              )}
            </div>
            <div className="px-5 py-4 space-y-5">
              {hasRefs ? (
                <>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {lang === "en" ? t.verbatimNote : t.translatedExcerptNote}
                    {dailyMed && (
                      <>
                        {" "}Source:{" "}
                        <a href={dailyMed.url} target="_blank" rel="noopener noreferrer" className="text-teal-700 underline underline-offset-2" data-testid="link-interactions-source">
                          {dailyMed.name}
                        </a>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.productFormNote}
                  </p>
                  <ExcerptList title={t.foodAlcohol} items={result.foodAlcohol} testId="list-food-alcohol" />
                  <ExcerptList title={t.otherDrugs} items={result.otherDrugs} testId="list-other-drugs" />
                </>
              ) : (
                <div className="flex items-start gap-2.5" data-testid="text-interactions-unverified">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-foreground" aria-hidden="true" />
                  <p className="text-sm text-foreground leading-relaxed">{NO_VERIFIED}</p>
                </div>
              )}
              <p className="border-t border-border pt-3 text-xs text-muted-foreground leading-relaxed" data-testid="text-interactions-note">
                {NOT_COMPLETE}
              </p>
            </div>
          </section>

          <DoctorNotes
            id="medication-notes"
            label={t.notesLabel}
            placeholder={t.notesPlaceholder}
            value={notes}
            onChange={setNotes}
            listening={dictation.listening}
            supported={dictation.supported}
            onMicClick={() => dictation.toggle(notes)}
            onStopDictation={stopDictation}
            micTestId="button-mic-medication-notes"
            textareaTestId="textarea-medication-notes"
            sectionTestId="medication-notes-section"
          />
        </div>
      )}

      {!loading && !error && <MedicalSources conditionId="" sourcesOverride={sources} />}
    </section>
  );
}
