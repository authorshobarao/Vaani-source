import { useState, useCallback, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useLanguage, LANGUAGES } from "@/i18n";
import type { ConditionTranslation, CategoryTranslation, UIStrings, LangCode } from "@/i18n/types";
import { usePersistedState, type CustomQuestion } from "@/hooks/usePersistedState";
import { useWebDictation } from "@/hooks/useWebDictation";
import { useAnswerRecorder } from "@/hooks/useAnswerRecorder";
import { MicButton } from "@/components/MicButton";
import { MedicalSources } from "@/components/MedicalSources";
import { SpecialistCard } from "@/components/SpecialistCard";
import { getConditionSpecialists } from "@/content/specialists";
import { conditionSectionTitles } from "@workspace/vaani-core/content/features";
import { useConditionSpecialists } from "@/hooks/useConditionSpecialists";
import { DoctorNotes } from "@/components/DoctorNotes";
import { MedicationMode } from "@/components/MedicationMode";
import { ReportAIContent } from "@/components/ReportAIContent";
import { getAboutArticle } from "@/content/sources";
import { trackEvent } from "@/lib/analytics";
import vaaniHeroImage from "@assets/Vaani-image_for_askvaanipage_1788670962951.png";
import {
  ChevronDown,
  AlertCircle,
  Heart,
  Printer,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  Globe,
  PhoneCall,
  Mic,
  MicOff,
  Download,
  Smartphone,
  Upload,
  FileText,
} from "lucide-react";

/* ─── CKD stage options (numeric labels are universally understood) ── */
import { CKD_STAGES } from "@workspace/vaani-core";

/* ─── Key helpers ─────────────────────────────────────────── */
import { qKey, composeVisit, collectVisitSections, topicCategories, suggestionDescription, escapeHtml as esc, MAX_UPLOAD_BYTES } from "@workspace/vaani-core";
import { suggestQuestions, analyzeReport, customTopicQuestions } from "@/lib/api";

/* ─── Shared select ───────────────────────────────────────── */
function StyledSelect({
  id,
  testId,
  value,
  onChange,
  ariaLabel,
  children,
}: {
  id: string;
  testId: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        data-testid={testId}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        className="
          w-full appearance-none
          bg-card border-2 border-border rounded-xl
          px-4 py-4 pr-12
          text-base font-medium text-foreground
          shadow-xs cursor-pointer
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          transition-colors
        "
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  );
}

/* ─── Category card ───────────────────────────────────────── */
function CategoryCard({
  cat,
  keyPrefix,
  checkedMap,
  onToggle,
  answersMap,
  onAnswerChange,
  lang,
  startIdx = 0,
}: {
  cat: CategoryTranslation;
  keyPrefix: string;
  checkedMap: Record<string, boolean>;
  onToggle: (key: string) => void;
  answersMap: Record<string, string>;
  onAnswerChange: (key: string, val: string) => void;
  lang: string;
  startIdx?: number;
}) {
  return (
    <div
      className="print-category rounded-xl border border-border bg-card shadow-xs overflow-hidden"
      data-testid={`category-${cat.id}`}
    >
      <div className="no-print px-5 py-3.5 bg-accent/60 border-b border-border">
        <h3 className="text-sm font-semibold text-accent-foreground uppercase tracking-wide">
          {cat.title}
        </h3>
      </div>
      <div className="print-category-title hidden" aria-hidden="true">{cat.title}</div>
      <ul className="divide-y divide-border/60">
        {cat.questions.map((q, i) => {
          const idx = i + startIdx;
          const key = qKey(keyPrefix, cat.id, idx);
          return (
            <QuestionRow
              key={idx}
              text={q}
              checked={!!checkedMap[key]}
              onToggle={() => onToggle(key)}
              catId={cat.id}
              idx={idx}
              answer={answersMap[key]}
              onAnswerChange={(val) => onAnswerChange(key, val)}
              lang={lang}
            />
          );
        })}
      </ul>
    </div>
  );
}

/* ─── Single question row ─────────────────────────────────── */
function QuestionRow({
  text,
  checked,
  onToggle,
  catId,
  idx,
  onDelete,
  answer,
  onAnswerChange,
  lang,
}: {
  text: string;
  checked: boolean;
  onToggle: () => void;
  catId: string;
  idx: number | string;
  onDelete?: () => void;
  answer?: string;
  onAnswerChange?: (val: string) => void;
  lang?: string;
}) {
  const answerRef = useRef(answer ?? "");
  const { t } = useLanguage();
  answerRef.current = answer ?? "";
  const recorder = useAnswerRecorder({
    enabled: checked,
    lang: lang || "en",
    onTranscript: (transcript) => {
      const latestAnswer = answerRef.current.trimEnd();
      onAnswerChange?.(latestAnswer ? `${latestAnswer} ${transcript}` : transcript);
    },
  });
  const recording = recorder.status === "recording";
  const micBusy = recorder.status !== "idle";
  const elapsed = `${Math.floor(recorder.elapsedSeconds / 60)}:${String(recorder.elapsedSeconds % 60).padStart(2, "0")}`;

  return (
    <li
      className={`print-question transition-colors ${checked ? "covered bg-muted/30" : ""}`}
      data-testid={`question-${catId}-${idx}`}
    >
      <div className="flex items-start gap-3 px-4 py-4">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          onClick={() => {
            if (checked) recorder.cancel();
            onToggle();
          }}
          className={`
            no-print flex-shrink-0
            w-7 h-7 min-w-[1.75rem] rounded-lg border-2
            flex items-center justify-center
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary/30
            touch-manipulation
            ${checked
              ? "bg-primary border-primary text-white"
              : "bg-card border-border hover:border-primary/60 active:border-primary"
            }
          `}
          data-testid={`checkbox-question-${catId}-${idx}`}
          aria-label={checked ? `Unmark: ${text}` : `Mark as covered: ${text}`}
        >
          {checked && (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 12 10" aria-hidden="true">
              <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <div className={`print-check-box hidden ${checked ? "checked" : ""}`} aria-hidden="true">
          {checked && "✓"}
        </div>
        <span className={`flex-1 text-base leading-relaxed ${checked ? "text-muted-foreground" : "text-foreground"}`}>
          {text}
        </span>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="
              no-print flex-shrink-0
              w-7 h-7 rounded-lg
              flex items-center justify-center
              text-muted-foreground hover:text-destructive hover:bg-destructive/10
              transition-colors focus:outline-none focus:ring-2 focus:ring-destructive/30
              touch-manipulation
            "
            aria-label={`Remove question: ${text}`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {checked && (
        <div className="px-4 pb-4 -mt-1">
          <div className="no-print flex gap-2 items-start">
            <textarea
              value={answer ?? ""}
              onChange={(e) => onAnswerChange?.(e.target.value)}
              placeholder={t.ui.doctorAnswer}
              rows={2}
              className="
                flex-1 min-w-0 text-sm
                bg-background border border-border rounded-lg
                px-3 py-2 text-foreground placeholder:text-muted-foreground
                resize-none
                focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
                transition-colors
              "
              aria-label="Doctor's answer"
            />
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={micBusy ? recorder.stop : recorder.start}
                disabled={recorder.status === "transcribing"}
                title={
                  recording
                    ? "Stop recording"
                    : recorder.status === "requesting"
                    ? "Cancel microphone request"
                    : recorder.status === "transcribing"
                    ? "Transcribing the recording"
                    : "Tap to record the doctor's answer"
                }
                className={`
                  flex-shrink-0 w-9 h-9 rounded-lg border
                  flex items-center justify-center
                  transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30
                  touch-manipulation
                  ${recording
                    ? "bg-red-50 border-red-300 text-red-500 animate-pulse"
                    : micBusy
                    ? "bg-primary/10 border-primary/30 text-primary disabled:cursor-wait"
                    : "bg-muted border-border text-muted-foreground hover:text-primary hover:border-primary/50"
                  }
                `}
                aria-label={
                  recording
                    ? "Stop voice recording"
                    : recorder.status === "requesting"
                    ? "Cancel microphone request"
                    : recorder.status === "transcribing"
                    ? "Transcribing voice recording"
                    : "Start voice recording"
                }
                data-testid={`button-answer-mic-${catId}-${idx}`}
              >
                {recording
                  ? <MicOff className="w-4 h-4" aria-hidden="true" />
                  : <Mic className="w-4 h-4" aria-hidden="true" />
                }
              </button>
              {micBusy && (
                <span
                  className="text-[10px] text-muted-foreground text-center leading-tight w-16"
                  data-testid={`status-answer-mic-${catId}-${idx}`}
                  aria-live="polite"
                >
                  {recording
                    ? elapsed
                    : recorder.status === "requesting"
                    ? "Requesting…"
                    : "Transcribing…"}
                </span>
              )}
            </div>
          </div>
          {recorder.error && (
            <p
              className="no-print mt-2 text-xs text-amber-700"
              role="alert"
              data-testid={`error-answer-mic-${catId}-${idx}`}
            >
              {recorder.error}
            </p>
          )}
          {answer && (
            <div className="hidden print-answer text-sm text-foreground mt-1 leading-relaxed" aria-hidden="true">
              <span className="font-medium">Answer: </span>{answer}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

/* ─── Custom questions card ───────────────────────────────── */
function CustomQuestionsCard({
  conditionId,
  questions,
  checkedMap,
  onToggle,
  onAdd,
  onRemove,
  answersMap,
  onAnswerChange,
  t,
  lang,
}: {
  conditionId: string;
  questions: CustomQuestion[];
  checkedMap: Record<string, boolean>;
  onToggle: (key: string) => void;
  onAdd: (text: string) => void;
  onRemove: (id: string) => void;
  answersMap: Record<string, string>;
  onAnswerChange: (key: string, val: string) => void;
  t: UIStrings;
  lang: string;
}) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dictation = useWebDictation(lang, setDraft);

  function handleAdd() {
    if (!draft.trim()) return;
    onAdd(draft);
    trackEvent("custom_question_added", { language: lang });
    setDraft("");
    inputRef.current?.focus();
  }

  return (
    <div
      className="print-category rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 overflow-hidden"
      data-testid="custom-questions-card"
    >
      <div className="px-5 py-3.5 bg-primary/10 border-b border-primary/20">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
          {t.yourQuestionsTitle}
        </h3>
      </div>
      {questions.length > 0 && (
        <ul className="divide-y divide-primary/10">
          {questions.map((q, idx) => {
            const key = qKey(conditionId, "custom", q.id);
            return (
              <QuestionRow
                key={q.id}
                text={q.text}
                checked={!!checkedMap[key]}
                onToggle={() => onToggle(key)}
                catId="custom"
                idx={idx}
                onDelete={() => onRemove(q.id)}
                answer={answersMap[key]}
                onAnswerChange={(val) => onAnswerChange(key, val)}
                lang={lang}
              />
            );
          })}
        </ul>
      )}
      <div className="no-print px-4 py-4 flex gap-2" data-testid="add-question-row">
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => {
            if (dictation.listening) dictation.stop();
            setDraft(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder={t.yourQuestionsPlaceholder}
          maxLength={200}
          data-testid="input-custom-question"
          className="
            flex-1 min-w-0
            bg-card border-2 border-border rounded-xl
            px-4 py-3
            text-base text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
            transition-colors
          "
          aria-label={t.yourQuestionsPlaceholder}
        />
        <MicButton
          listening={dictation.listening}
          supported={dictation.supported}
          onClick={() => dictation.toggle(draft)}
          testId="button-mic-custom-question"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!draft.trim()}
          data-testid="button-add-question"
          className="
            flex-shrink-0
            inline-flex items-center gap-1.5
            px-4 py-3 rounded-xl
            bg-primary text-primary-foreground
            text-sm font-semibold
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:opacity-90 active:opacity-80
            focus:outline-none focus:ring-2 focus:ring-primary/30
            transition-opacity touch-manipulation
            whitespace-nowrap
          "
          aria-label={t.yourQuestionsAdd}
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          {t.yourQuestionsAdd}
        </button>
      </div>
    </div>
  );
}

/* ─── AI suggestion panel ─────────────────────────────────── */
function AISuggestPanel({
  conditionLabel,
  lang,
  onAdd,
  t,
  extraContext,
}: {
  conditionLabel: string;
  lang: string;
  onAdd: (text: string) => void;
  t: UIStrings;
  extraContext?: string;
}) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const dictation = useWebDictation(lang, setDescription);
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<Set<number>>(new Set());

  async function handleSuggest() {
    if (!description.trim() || loading) return;
    trackEvent("ai_suggestions_started", { language: lang });
    setLoading(true);
    setError(null);
    setQuestions([]);
    setAdded(new Set());
    try {
      const suggestedQuestions = await suggestQuestions({
          condition: conditionLabel,
          description: suggestionDescription(description, extraContext),
          lang,
      });
      setQuestions(suggestedQuestions);
      trackEvent("ai_suggestions_completed", {
        count: suggestedQuestions.length,
        language: lang,
      });
    } catch {
      trackEvent("ai_suggestions_failed", { language: lang });
      setError(t.aiPanelError);
    } finally {
      setLoading(false);
    }
  }

  function handleAddQuestion(q: string, idx: number) {
    onAdd(q);
    trackEvent("ai_suggestion_added", { language: lang });
    setAdded((prev) => new Set([...prev, idx]));
  }

  return (
    <div
      className="mt-5 rounded-xl border border-primary/25 bg-primary/5 overflow-hidden"
      data-testid="ai-suggest-panel"
    >
      <div className="px-5 py-3.5 bg-primary/10 border-b border-primary/20 flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-primary">{t.aiPanelHeading}</h3>
      </div>

      <div className="px-4 py-5 space-y-4">
        <div>
          <label htmlFor="ai-description" className="block text-sm font-medium text-foreground mb-2">
            {t.aiPanelLabel}
          </label>
          <textarea
            id="ai-description"
            value={description}
            onChange={(e) => {
              if (dictation.listening) dictation.stop();
              setDescription(e.target.value);
            }}
            placeholder={t.aiPanelPlaceholder.replace("{condition}", conditionLabel)}
            rows={3}
            maxLength={500}
            className="
              w-full rounded-xl border-2 border-border bg-card
              px-4 py-3 text-base text-foreground
              placeholder:text-muted-foreground
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
              resize-y transition-colors
            "
          />
        </div>

        <div className="flex items-center gap-2">
        <MicButton
          listening={dictation.listening}
          supported={dictation.supported}
          onClick={() => dictation.toggle(description)}
          testId="button-mic-ai-description"
        />
        <button
          type="button"
          onClick={handleSuggest}
          disabled={!description.trim() || loading}
          className="
            inline-flex items-center gap-2
            px-5 py-3 rounded-xl
            bg-primary text-primary-foreground
            text-sm font-semibold
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:opacity-90 active:opacity-80
            focus:outline-none focus:ring-2 focus:ring-primary/30
            transition-opacity touch-manipulation
          "
        >
          {loading ? (
            <>
              <span
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
              {t.aiPanelLoading}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              {t.aiPanelButton}
            </>
          )}
        </button>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        {questions.length > 0 && (
          <ul className="space-y-2" aria-label="AI-suggested questions">
            {questions.map((q, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-xl bg-card border border-border px-4 py-3"
              >
                <span className="flex-1 text-sm text-foreground leading-relaxed">{q}</span>
                <button
                  type="button"
                  onClick={() => handleAddQuestion(q, idx)}
                  disabled={added.has(idx)}
                  className="
                    flex-shrink-0 inline-flex items-center gap-1
                    px-3 py-1.5 rounded-lg text-xs font-semibold
                    bg-primary/10 text-primary border border-primary/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:bg-primary/20 active:bg-primary/25
                    focus:outline-none focus:ring-2 focus:ring-primary/30
                    transition-colors touch-manipulation whitespace-nowrap
                  "
                >
                  {added.has(idx) ? "✓ Added" : "+ Add"}
                </button>
              </li>
            ))}
          </ul>
        )}

        {questions.length > 0 && (
          <ReportAIContent feature="suggestions" content={questions.join("\n")} lang={lang} t={t} />
        )}

        <p className="text-xs text-muted-foreground">{t.aiPanelDisclaimer}</p>
      </div>
    </div>
  );
}

/* ─── Report upload panel (follow-up visits) ──────────────── */
const ACCEPTED_UPLOAD_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];

function ReportUploadPanel({
  conditionLabel,
  lang,
  onAdd,
  t,
}: {
  conditionLabel: string;
  lang: string;
  onAdd: (text: string) => void;
  t: UIStrings;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<Set<number>>(new Set());

  function readAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const comma = result.indexOf(",");
        resolve(comma >= 0 ? result.slice(comma + 1) : result);
      };
      reader.onerror = () => reject(new Error("read error"));
      reader.readAsDataURL(file);
    });
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setQuestions([]);
    setAdded(new Set());

    if (!ACCEPTED_UPLOAD_TYPES.includes(file.type)) {
      trackEvent("report_upload_rejected", { reason: "unsupported_type", language: lang });
      setFileName(null);
      setError(t.uploadError);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      trackEvent("report_upload_rejected", { reason: "too_large", language: lang });
      setFileName(null);
      setError(t.uploadTooLarge);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setFileName(file.name);
    setLoading(true);
    trackEvent("report_analysis_started", {
      file_type: file.type === "application/pdf" ? "pdf" : "image",
      language: lang,
    });
    try {
      const data = await readAsBase64(file);
      const reportQuestions = await analyzeReport({
          condition: conditionLabel,
          lang,
          file: { mediaType: file.type, data },
      });
      setQuestions(reportQuestions);
      trackEvent("report_analysis_completed", {
        count: reportQuestions.length,
        file_type: file.type === "application/pdf" ? "pdf" : "image",
        language: lang,
      });
    } catch {
      trackEvent("report_analysis_failed", { language: lang });
      setError(t.uploadError);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleAddQuestion(q: string, idx: number) {
    onAdd(q);
    trackEvent("report_question_added", { language: lang });
    setAdded((prev) => new Set([...prev, idx]));
  }

  return (
    <div
      className="mt-5 rounded-xl border border-primary/25 bg-primary/5 overflow-hidden"
      data-testid="report-upload-panel"
    >
      <div className="px-5 py-3.5 bg-primary/10 border-b border-primary/20 flex items-center gap-2.5">
        <FileText className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-primary">{t.uploadTitle}</h3>
      </div>

      <div className="px-4 py-5 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{t.uploadHint}</p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFile}
          className="hidden"
          data-testid="input-report-file"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="
            inline-flex items-center gap-2
            px-5 py-3 rounded-xl
            bg-primary text-primary-foreground
            text-sm font-semibold
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:opacity-90 active:opacity-80
            focus:outline-none focus:ring-2 focus:ring-primary/30
            transition-opacity touch-manipulation
          "
        >
          {loading ? (
            <>
              <span
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
              {t.uploadAnalyzing}
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" aria-hidden="true" />
              {questions.length > 0 || fileName ? t.uploadChooseAnother : t.uploadButton}
            </>
          )}
        </button>

        {fileName && !error && (
          <p className="text-xs text-muted-foreground truncate" data-testid="report-file-name">
            {fileName}
          </p>
        )}

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        {questions.length > 0 && (
          <ul className="space-y-2" aria-label="Questions from your report">
            {questions.map((q, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-xl bg-card border border-border px-4 py-3"
              >
                <span className="flex-1 text-sm text-foreground leading-relaxed">{q}</span>
                <button
                  type="button"
                  onClick={() => handleAddQuestion(q, idx)}
                  disabled={added.has(idx)}
                  className="
                    flex-shrink-0 inline-flex items-center gap-1
                    px-3 py-1.5 rounded-lg text-xs font-semibold
                    bg-primary/10 text-primary border border-primary/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:bg-primary/20 active:bg-primary/25
                    focus:outline-none focus:ring-2 focus:ring-primary/30
                    transition-colors touch-manipulation whitespace-nowrap
                  "
                >
                  {added.has(idx) ? "✓ Added" : "+ Add"}
                </button>
              </li>
            ))}
          </ul>
        )}

        {questions.length > 0 && (
          <ReportAIContent feature="report" content={questions.join("\n")} lang={lang} t={t} />
        )}

        <p className="text-xs text-muted-foreground">{t.aiPanelDisclaimer}</p>
      </div>
    </div>
  );
}

/* ─── Mental-health safety notice ────────────────────────── */
function MentalHealthNotice({ t }: { t: UIStrings }) {
  return (
    <div
      className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-4"
      role="note"
      aria-label="Crisis support information"
    >
      <div className="flex items-start gap-3">
        <PhoneCall className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-destructive mb-1">{t.safetyNoticeTitle}</p>
          <p className="text-sm text-foreground leading-relaxed mb-1.5">{t.safetyNoticeLine988}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{t.safetyNoticeInternational}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Section divider ─────────────────────────────────────── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="no-print flex items-center gap-3 my-6">
      <div className="h-px flex-1 bg-border" />
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1">
        {label}
      </h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

/* ─── Reset button ────────────────────────────────────────── */
function ResetButton({ onReset, t }: { onReset: () => void; t: UIStrings }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2 flex-wrap" role="alert" aria-live="polite">
        <span className="text-xs text-muted-foreground hidden sm:inline">
          {t.resetConfirmText}
        </span>
        <button
          type="button"
          onClick={() => { onReset(); setConfirming(false); }}
          className="
            px-3 py-2 rounded-xl text-sm font-semibold
            bg-destructive text-destructive-foreground
            hover:opacity-90 active:opacity-80
            focus:outline-none focus:ring-2 focus:ring-destructive/30
            touch-manipulation
          "
          data-testid="button-reset-confirm"
        >
          {t.resetConfirmYes}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="
            px-3 py-2 rounded-xl text-sm font-medium
            border border-border bg-card text-foreground
            hover:bg-muted/60 active:bg-muted
            focus:outline-none focus:ring-2 focus:ring-primary/20
            touch-manipulation
          "
          data-testid="button-reset-cancel"
        >
          {t.resetConfirmCancel}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="
        no-print inline-flex items-center gap-1.5
        px-3 py-2 rounded-xl
        border border-border bg-card text-sm text-muted-foreground
        hover:text-foreground hover:bg-muted/60 active:bg-muted
        focus:outline-none focus:ring-2 focus:ring-primary/20
        transition-colors touch-manipulation whitespace-nowrap
      "
      data-testid="button-reset"
    >
      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="hidden sm:inline">{t.resetButton}</span>
    </button>
  );
}

/* ─── Main page ───────────────────────────────────────────── */
export default function Home({ initialConditionId = "" }: { initialConditionId?: string }) {
  const { lang, setLang, t } = useLanguage();

  const {
    state,
    storageError,
    selection,
    selectionActions,
    toggleChecked: persistToggleChecked,
    setNote,
    setAnswer,
    addCustomQuestion,
    removeCustomQuestion,
    addCustomTopic,
    setCustomTopicData,
    resetAll,
  } = usePersistedState(initialConditionId);
  const { selectedId, selectedSubtypeId, ckdStage, transplantChecked, visitType } = selection;
  const { selectCondition, setSelectedSubtypeId, setCkdStage, setTransplantChecked, setVisitType } = selectionActions;

  const { checkedMap, notesMap, customQuestionsMap, answersMap, customTopics } =
    state;

  const firstSelectionTracked = useRef(false);
  const downloadInProgress = useRef(false);
  const [downloadError, setDownloadError] = useState(false);

  function toggleChecked(key: string) {
    const selecting = !checkedMap[key];
    persistToggleChecked(key);
    trackEvent(selecting ? "question_selected" : "question_deselected", {
      language: lang,
    });
    if (selecting && !firstSelectionTracked.current) {
      firstSelectionTracked.current = true;
      trackEvent("first_question_selected", { language: lang });
    }
  }

  const [addingTopic, setAddingTopic] = useState(false);
  const [newTopicLabel, setNewTopicLabel] = useState("");
  const [topicInputOpen, setTopicInputOpen] = useState(false);
  const [topicQuery, setTopicQuery] = useState("");
  const [topicLoading, setTopicLoading] = useState(false);
  const [topicError, setTopicError] = useState(false);
  const topicRequestId = useRef(0);

  const invalidateTopicRequest = useCallback(() => {
    topicRequestId.current += 1;
    setTopicLoading(false);
    setTopicError(false);
  }, []);

  const [mode, setMode] = useState<"condition" | "medication">("condition");
  const specialistGuidance = useConditionSpecialists(lang);
  type TopicResult = Awaited<ReturnType<typeof fetchTopicQuestions>>;
  const [localizedResults, setLocalizedResults] = useState<Record<string, TopicResult>>({});
  const savedTopic = customTopics.find(topic => topic.id === selectedId);
  const localizedKey = `${lang}:${savedTopic?.label.trim().toLowerCase() ?? ""}`;
  const localizedResult = localizedResults[localizedKey];
  const localizedTopics = customTopics.map(topic => topic.id === selectedId ? {
    ...topic,
    categories: localizedResult?.categories ?? [],
    article: localizedResult?.article,
  } : topic);

  const visit = composeVisit(t, selectedId, selectedSubtypeId, localizedTopics, transplantChecked, visitType);
  const { customTopic, selected, hasSubtypes, selectedSubtype, isCKD, isMentalHealth, hasGeneralQuestions, isPlaceholder } = visit;
  const notesDictation = useWebDictation(lang, (text) => setNote(selectedId, text));
  const stopNotesDictation = notesDictation.stop;
  useEffect(() => {
    stopNotesDictation();
  }, [selectedId, stopNotesDictation]);

  function changeMode(next: "condition" | "medication") {
    if (next === mode) return;
    invalidateTopicRequest();
    stopNotesDictation();
    setMode(next);
  }

  useEffect(() => {
    const conditionName = t.conditions.find((c) => c.id === selectedId)?.label;
    document.title = conditionName
      ? `${conditionName} — Questions for Your Doctor | Vaani`
      : "Vaani — Prepare for your doctor visit";
  }, [selectedId, t.conditions]);

  const customQuestions = customQuestionsMap[selectedId] ?? [];

  const handleConditionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = e.target.value;
      invalidateTopicRequest();
      selectCondition(id);
      if (id) {
        trackEvent("topic_selected", {
          topic_type: id.startsWith("custom-") ? "custom" : "preset",
          language: lang,
        });
      }
    },
    [invalidateTopicRequest, lang, selectCondition]
  );

  async function fetchTopicQuestions(topic: string) {
    const data = await customTopicQuestions({ topic, lang, includeSpecialists: true });
    const categories = topicCategories(data.sections, conditionSectionTitles(t.ui));
    return { categories, article: data.article ?? undefined, specialists: data.specialists };
  }
  useEffect(() => {
    invalidateTopicRequest();
  }, [lang, invalidateTopicRequest]);

  async function handleGenerateCustomTopic(rawTopic: string) {
    const topic = rawTopic.trim();
    if (!topic) return;
    const requestId = ++topicRequestId.current;
    setTopicLoading(true);
    setTopicError(false);
    selectCondition("");
    try {
      const { categories, article, specialists } = await fetchTopicQuestions(topic);
      if (requestId !== topicRequestId.current) return;
      const key = `${lang}:${topic.trim().toLowerCase()}`;
      setLocalizedResults(previous => ({ ...previous, [key]: { categories, article, specialists } }));
      const existing = customTopics.find(saved => saved.label.trim().toLowerCase() === topic.toLowerCase());
      const id = existing?.id ?? addCustomTopic(topic, categories, article);
      if (id) {
        specialistGuidance.remember(id, specialists);
        trackEvent("custom_topic_created", { language: lang });
        setTopicQuery("");
        setTopicInputOpen(false);
        setNewTopicLabel("");
        setAddingTopic(false);
        invalidateTopicRequest();
        selectCondition(id);
      }
    } catch {
      if (requestId === topicRequestId.current) setTopicError(true);
    } finally {
      if (requestId === topicRequestId.current) setTopicLoading(false);
    }
  }

  // Backfill custom topics saved before question generation existed
  const backfillAttempted = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (mode !== "condition" || !customTopic || localizedResult) return;
    if (backfillAttempted.current.has(localizedKey)) return;
    backfillAttempted.current.add(localizedKey);
    let active = true;
    const requestId = topicRequestId.current;
    setTopicLoading(true);
    setTopicError(false);
    void (async () => {
      try {
        const { categories, article, specialists } = await fetchTopicQuestions(customTopic.label);
        if (!active || requestId !== topicRequestId.current) return;
        setLocalizedResults(previous => ({ ...previous, [localizedKey]: { categories, article, specialists } }));
        specialistGuidance.remember(customTopic.id, specialists);
      } catch {
        if (active && requestId === topicRequestId.current) setTopicError(true);
      } finally {
        if (active && requestId === topicRequestId.current) setTopicLoading(false);
      }
    })();
    return () => {
      active = false;
      backfillAttempted.current.delete(localizedKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customTopic?.id, lang, localizedKey, mode]);

  const conditionLabel = selected?.label ?? "";
  const subtypeLabel = selectedSubtype ? ` — ${selectedSubtype.label}` : "";
  const printTitle = `Vaani: ${conditionLabel}${subtypeLabel}`;

  async function handleDownload() {
    if (!selected || downloadInProgress.current) return;
    downloadInProgress.current = true;
    setDownloadError(false);
    trackEvent("prep_download_started", { format: "pdf", language: lang });
    try {
    const today = new Date().toLocaleDateString();
    const parts: string[] = [];
    parts.push(
      `<div style="border-bottom:2px solid #3a826a;padding-bottom:10px;margin-bottom:16px;">` +
        `<div style="font-size:20px;font-weight:700;color:#1c1917;">Vaani — ${esc(conditionLabel)}${esc(subtypeLabel)}</div>` +
        `<div style="font-size:11px;color:#78716c;margin-top:2px;">${esc(today)}</div>` +
        `</div>`
    );

    const questionHtml = (checked: boolean, q: string, a?: string) => {
      let html =
        `<div style="display:flex;gap:8px;margin:0 0 6px 0;page-break-inside:avoid;">` +
        `<span style="display:inline-block;width:12px;height:12px;min-width:12px;border:1.5px solid #57534e;border-radius:2px;margin-top:2px;background:${checked ? "#3a826a" : "transparent"};"></span>` +
        `<span style="font-size:12px;color:#1c1917;line-height:1.45;">${esc(q)}</span>` +
        `</div>`;
      if (a && a.trim()) {
        html +=
          `<div style="margin:-2px 0 8px 20px;padding:5px 8px;background:#f5f5f4;border-left:2px solid #3a826a;font-size:11px;color:#44403c;line-height:1.4;page-break-inside:avoid;">${esc(a.trim())}</div>`;
      }
      return html;
    };

    collectVisitSections(visit, state, t, true).forEach(section => {
      parts.push(
        `<div style="font-size:13px;font-weight:700;color:#3a826a;text-transform:uppercase;letter-spacing:0.03em;margin:14px 0 8px 0;page-break-after:avoid;">${esc(section.title)}</div>`
      );
      section.items.forEach(item => {
        parts.push(questionHtml(item.checked, item.text, item.answer));
      });
    });

    const note = notesMap[selectedId];
    if (note && note.trim()) {
      parts.push(
        `<div style="font-size:13px;font-weight:700;color:#3a826a;text-transform:uppercase;letter-spacing:0.03em;margin:14px 0 8px 0;page-break-after:avoid;">${esc(t.ui.notesLabel)}</div>`
      );
      parts.push(
        `<div style="font-size:12px;color:#1c1917;line-height:1.5;white-space:pre-wrap;">${esc(note.trim())}</div>`
      );
    }

    parts.push(
      `<div style="margin-top:18px;padding-top:8px;border-top:1px solid #d6d3d1;font-size:10px;color:#78716c;line-height:1.4;">${esc(t.ui.disclaimer)}</div>`
    );

    const container = document.createElement("div");
    container.innerHTML =
      `<div style="font-family:inherit;color:#1c1917;">${parts.join("")}</div>`;

    const safeName = (conditionLabel || "visit")
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
    const safeDate = today.replace(/[^\p{L}\p{N}]+/gu, "-");

    const html2pdf = (await import("html2pdf.js")).default;
    await html2pdf()
      .set({
        margin: [14, 14, 16, 14],
        filename: `vaani-${safeName}-${safeDate}.pdf`,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4" },
      })
      .from(container)
      .save();
    trackEvent("prep_downloaded", {
      format: "pdf",
      topic_type: selectedId.startsWith("custom-") ? "custom" : "preset",
      language: lang,
    });
    } catch {
      trackEvent("prep_download_failed", { format: "pdf", language: lang });
      setDownloadError(true);
    } finally {
      downloadInProgress.current = false;
    }
  }

  function handlePrint() {
    trackEvent("prep_printed", {
      topic_type: selectedId.startsWith("custom-") ? "custom" : "preset",
      language: lang,
    });
    window.print();
  }

  return (
    <>
      {storageError && <p role="alert" className="mx-auto max-w-5xl rounded-xl border border-destructive p-4 text-destructive">{storageError}</p>}
      <Helmet>
        <title>{`${t.ui.appTitle} — ${t.ui.appSubtitle}`}</title>
        <meta name="description" content={t.ui.heroDescription} />
        <meta property="og:title" content={`${t.ui.appTitle} — ${t.ui.appSubtitle}`} />
        <meta property="og:description" content={t.ui.heroDescription} />
        <meta name="twitter:title" content={`${t.ui.appTitle} — ${t.ui.appSubtitle}`} />
        <meta name="twitter:description" content={t.ui.heroDescription} />
        <html lang={lang} dir={lang === "ur" ? "rtl" : "ltr"} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Vaani",
          "description": "Vaani helps you prepare the questions to ask your doctor — so you leave your appointment with answers, not regrets.",
          "url": "https://vaani.shobarao.com/",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web, iOS, Android",
          "inLanguage": LANGUAGES.map((l) => l.code),
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": {
            "@type": "Person",
            "name": "Shoba Rao",
            "url": "https://shobarao.com/"
          },
          "image": "https://vaani.shobarao.com/opengraph.jpg"
        })}</script>
      </Helmet>

      {/* ── Print header ── */}
      {mode === "condition" && <div className="print-header hidden" aria-hidden="true">
        <p>Vaani</p>
        <p>{printTitle}</p>
      </div>}

      {/* ── Main ── */}
      <div className="flex-1 w-full mx-auto pb-8 sm:pb-10">

        {/* Hero */}
        <section
          className="no-print relative isolate w-full overflow-hidden border-b border-border/40 mb-8 pb-10 pt-8 sm:pt-12"
          style={{
            background:
              "linear-gradient(135deg, #FDF3E7 0%, #FCEBDD 40%, #FDE4D3 70%, #FBDCC7 100%)",
          }}
          aria-labelledby="hero-heading"
        >
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              <div className="flex flex-col justify-center">
                <h1
                  id="hero-heading"
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-3 tracking-tight"
                  data-testid="text-hero-heading"
                >
                  Vaani
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-primary mb-3">
                  Find your voice at the doctor's office.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  Because the best questions come before the appointment, not after.
                </p>

                <div 
                  className="bg-card rounded-2xl shadow-sm border border-border/60 p-5 sm:p-6 transition-all"
                  data-testid="hero-condition-picker-container"
                >
                  <h2 className="text-lg font-bold text-foreground leading-snug mb-4">
                    {t.ui.selectorHeading}
                  </h2>
                  <div
                    role="group"
                    aria-label={t.ui.selectorGroupLabel}
                    className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-muted/70 p-1"
                    data-testid="mode-toggle"
                  >
                    {(["condition", "medication"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        aria-pressed={mode === m}
                        onClick={() => changeMode(m)}
                        data-testid={`tab-mode-${m}`}
                        className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 touch-manipulation ${
                          mode === m
                            ? "bg-card text-primary shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {m === "condition" ? t.ui.conditionTab : t.ui.medicationTab}
                      </button>
                    ))}
                  </div>
                  {mode === "medication" ? (
                    <p className="block text-base font-semibold text-foreground" data-testid="text-medication-hint">
                      {t.ui.medicationPrompt}
                    </p>
                  ) : (<>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <label
                      id="select-label"
                      htmlFor="condition-select"
                      className="block text-base font-semibold text-foreground"
                    >
                      {t.ui.conditionSelectLabel}
                    </label>
                    <ResetButton
                      onReset={() => {
                        invalidateTopicRequest();
                        resetAll();
                        selectCondition("");
                      }}
                      t={t.ui}
                    />
                  </div>
                  <StyledSelect
                    id="condition-select"
                    testId="select-condition"
                    value={selectedId}
                    onChange={handleConditionChange}
                    ariaLabel={t.ui.conditionSelectLabel}
                  >
                    <option value="" disabled>{t.ui.chooseCondition}</option>
                    {[
                      ...t.conditions.map((c) => ({ id: c.id, label: c.label })),
                      ...customTopics.map((ct) => ({ id: ct.id, label: ct.label })),
                    ]
                      .sort((a, b) => a.label.localeCompare(b.label, lang))
                      .map((o) => (
                        <option key={o.id} value={o.id}>{o.label}</option>
                      ))}
                  </StyledSelect>

                  {!topicInputOpen ? (
                    <button
                      type="button"
                      onClick={() => setTopicInputOpen(true)}
                      className="
                        mt-4 inline-block px-4 py-2 rounded-xl text-sm font-semibold
                        border border-primary/30 bg-primary/5 text-primary
                        hover:border-secondary hover:bg-secondary hover:text-secondary-foreground
                        focus:outline-none focus:ring-2 focus:ring-secondary/30
                        transition-all duration-200
                      "
                      data-testid="button-topic-not-listed"
                    >
                      {t.ui.missingCondition}
                    </button>
                  ) : (
                    <form
                      className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300"
                      onSubmit={(e) => {
                        e.preventDefault();
                        void handleGenerateCustomTopic(topicQuery);
                      }}
                    >
                      <label
                        htmlFor="custom-topic-input"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t.ui.conditionSelectLabel}
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="custom-topic-input"
                          type="text"
                          value={topicQuery}
                          onChange={(e) => setTopicQuery(e.target.value)}
                          maxLength={200}
                          autoFocus
                          className="
                            min-w-0 flex-1 px-3 py-2 rounded-xl border border-border bg-background
                            text-sm text-foreground placeholder:text-muted-foreground
                            focus:outline-none focus:ring-2 focus:ring-primary/30
                          "
                          data-testid="input-custom-topic"
                        />
                        <button
                          type="submit"
                          disabled={!topicQuery.trim()}
                          className="
                            flex-shrink-0 max-w-[60%] whitespace-normal px-4 py-2 rounded-xl text-sm font-semibold
                            bg-primary text-primary-foreground
                            hover:bg-secondary hover:text-secondary-foreground
                            disabled:opacity-50 disabled:cursor-not-allowed
                            focus:outline-none focus:ring-2 focus:ring-primary/30
                            transition-colors touch-manipulation
                          "
                          data-testid="button-submit-custom-topic"
                        >
                          {topicLoading ? t.ui.aiPanelLoading : t.ui.aiPanelButton}
                        </button>
                      </div>
                      {topicError && (
                        <p className="mt-2 text-sm text-destructive" role="alert">
                          {t.ui.aiPanelError}
                        </p>
                      )}
                    </form>
                  )}
                  </>)}
                </div>
              </div>

              <div className="relative hidden lg:block w-full">
                <div
                  className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[#F2884B] opacity-[0.12] blur-[80px]"
                  aria-hidden="true"
                />
                <img 
                  src={vaaniHeroImage} 
                  alt="" 
                  aria-hidden="true"
                  className="w-full h-auto object-cover rounded-[16px] shadow-sm border border-border/50" 
                />
              </div>

              <div className="relative block lg:hidden w-full mt-4">
                <div
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[#F2884B] opacity-[0.12] blur-[80px]"
                  aria-hidden="true"
                />
                <img 
                  src={vaaniHeroImage} 
                  alt="" 
                  aria-hidden="true"
                  className="w-full h-auto object-cover rounded-[16px] shadow-sm border border-border/50" 
                />
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 sm:px-5">
          {/* Back link — condition pages only */}
          {initialConditionId && (
            <div className="no-print mb-5">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-all-conditions"
              >
                ← All conditions
              </Link>
            </div>
          )}

          {/* Tip box */}
          <div
            className="no-print mb-7 flex gap-3 rounded-xl bg-accent border border-accent-foreground/10 px-4 py-4"
            role="note"
            data-testid="tip-box"
          >
            <svg className="flex-shrink-0 w-5 h-5 text-accent-foreground mt-0.5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a7 7 0 017 7c0 2.5-1.3 4.7-3.3 6L15 17H9l-.3-2.1C6.6 13.7 5 11.5 5 9a7 7 0 017-7zm-1 15h2v2h-2v-2z" fill="currentColor" fillOpacity="0.7"/>
            </svg>
            <p className="text-sm leading-relaxed text-accent-foreground">
              {t.ui.tip}
            </p>
          </div>

          {mode === "medication" && (
            <MedicationMode lang={lang} t={t.ui} CategoryCard={CategoryCard} />
          )}

          {mode === "condition" && (<>
          {/* Visit type selector */}
          <section className="no-print mb-7 sm:mb-8" data-testid="visit-type-selector">
            <span className="block text-base font-semibold text-foreground mb-3">
              {t.ui.visitTypeLabel}
            </span>
            <div className="grid grid-cols-2 gap-3">
              {(["first", "followup"] as const).map((vt) => {
                const active = visitType === vt;
                return (
                  <button
                    key={vt}
                    type="button"
                    onClick={() => {
                      setVisitType(vt);
                      trackEvent("visit_type_selected", {
                        visit_type: vt,
                        language: lang,
                      });
                    }}
                    aria-pressed={active}
                    data-testid={`button-visit-${vt}`}
                    className={`
                      rounded-xl border-2 px-4 py-3 text-sm font-semibold text-center
                      focus:outline-none focus:ring-2 focus:ring-primary/30
                      transition-colors touch-manipulation
                      ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-secondary hover:text-secondary"
                      }
                    `}
                  >
                    {vt === "first" ? t.ui.visitTypeFirst : t.ui.visitTypeFollowup}
                  </button>
                );
              })}
            </div>
          </section>

        {/* Questions panel */}
        {selected && (
          <section
            aria-label={`Questions for ${selected.label}`}
            data-testid={`questions-panel-${selected.id}`}
          >
            <SectionDivider label={selected.label} />

            {customTopic && topicLoading && (
              <p className="mb-4 text-center text-sm text-muted-foreground" role="status">
                {t.ui.aiPanelLoading}
              </p>
            )}

            {(() => {
              const aboutArticle =
                getAboutArticle(selected.id, customTopic);
              return aboutArticle ? (
                <p className="mb-4 text-center text-sm text-stone-500">
                  {customTopic ? t.ui.readCondition : t.ui.aboutArticleLabel}{" "}
                  <a
                    href={aboutArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 underline underline-offset-2 hover:text-teal-800"
                    data-testid={`link-about-${selected.id}`}
                  >
                    {customTopic && lang !== "en" ? t.ui.aboutTopic.replace("{topic}", customTopic.label) : aboutArticle.name}
                  </a>
                </p>
              ) : null;
            })()}

            {/* Mental health safety notice */}
            {isMentalHealth && <MentalHealthNotice t={t.ui} />}

            {/* Saved-locally notice */}
            <div
              className="no-print mb-4 flex items-start gap-2.5 rounded-xl bg-muted/60 border border-border px-4 py-3"
              role="note"
              data-testid="saved-locally-notice"
            >
              <Smartphone className="flex-shrink-0 w-4 h-4 text-muted-foreground mt-0.5" aria-hidden="true" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.ui.savedLocallyNotice}
              </p>
            </div>

            {/* Print + action row */}
            {downloadError && (
              <p role="alert" className="no-print mb-3 text-sm text-destructive">
                The PDF could not be downloaded. Please try again or use Print.
              </p>
            )}
            <div className="no-print flex items-center justify-end gap-2 mb-5">
              <button
                type="button"
                onClick={handleDownload}
                data-testid="button-download"
                className="
                  inline-flex items-center gap-2
                  px-4 py-3 rounded-xl
                  bg-primary text-primary-foreground
                  text-sm font-medium
                  shadow-xs hover:opacity-90 active:opacity-80
                  focus:outline-none focus:ring-2 focus:ring-primary/30
                  transition-opacity touch-manipulation
                "
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                {t.ui.downloadButton}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                data-testid="button-print"
                className="
                  inline-flex items-center gap-2
                  px-4 py-3 rounded-xl
                  border border-border bg-card
                  text-sm font-medium text-foreground
                  shadow-xs hover:bg-muted/60 active:bg-muted
                  focus:outline-none focus:ring-2 focus:ring-primary/20
                  transition-colors touch-manipulation
                "
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                {t.ui.printButton}
              </button>
            </div>

            {/* CKD controls */}
            {isCKD && (
              <div className="no-print mb-7 space-y-4">
                <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-5">
                  <label
                    htmlFor="ckd-stage-select"
                    className="block text-base font-semibold text-foreground mb-3"
                  >
                    {t.ui.ckdStageLabel}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      {t.ui.ckdStageOptional}
                    </span>
                  </label>
                  <StyledSelect
                    id="ckd-stage-select"
                    testId="select-ckd-stage"
                    value={ckdStage}
                    onChange={(e) => setCkdStage(e.target.value)}
                    ariaLabel={t.ui.ckdStageLabel}
                  >
                    <option value="">{t.ui.ckdStagePlaceholder}</option>
                    {CKD_STAGES.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </StyledSelect>
                  {ckdStage && t.ui.ckdStageNotes[ckdStage] && (
                    <p className="mt-3 text-sm text-accent-foreground leading-relaxed bg-accent/80 rounded-lg px-4 py-3">
                      {t.ui.ckdStageNotes[ckdStage]}
                    </p>
                  )}
                </div>

                <label
                  htmlFor="transplant-checkbox"
                  className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-5 cursor-pointer group"
                  data-testid="label-transplant-checkbox"
                >
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      id="transplant-checkbox"
                      type="checkbox"
                      data-testid="checkbox-transplant"
                      checked={transplantChecked}
                      onChange={(e) => setTransplantChecked(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors ${
                        transplantChecked
                          ? "bg-primary border-primary"
                          : "bg-card border-border group-hover:border-primary/50"
                      }`}
                      aria-hidden="true"
                    >
                      {transplantChecked && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 12 10" aria-hidden="true">
                          <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="block text-base font-semibold text-foreground leading-snug">
                      {t.ui.transplantLabel}
                    </span>
                    <span className="block text-sm text-muted-foreground mt-1">
                      {t.ui.transplantSubLabel}
                    </span>
                  </div>
                </label>
              </div>
            )}

            {/* Placeholder */}
            {isPlaceholder && (
              <div className="rounded-xl border-2 border-dashed border-border bg-muted/40 px-6 py-10 text-center">
                <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" aria-hidden="true" />
                <p className="text-base font-medium text-foreground mb-1">{t.ui.questionsSoonTitle}</p>
                <p className="text-sm text-muted-foreground">{t.ui.questionsSoonDesc}</p>
              </div>
            )}

            {/* Follow-up visit: generic questions + report upload */}
            {visit.followup.visible && (
              <div className="mb-4 sm:mb-5 space-y-4 sm:space-y-5" data-testid="followup-section">
                <div
                  className="rounded-xl border border-border bg-card shadow-xs px-5 py-4"
                  data-testid="changed-since-visit"
                >
                  <label
                    htmlFor="changed-since-input"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    {visit.followup.label}
                  </label>
                  <textarea
                    id="changed-since-input"
                    value={answersMap[visit.followup.key] ?? ""}
                    onChange={(e) =>
                      setAnswer(visit.followup.key, e.target.value)
                    }
                    placeholder={visit.followup.placeholder}
                    rows={3}
                    maxLength={1000}
                    className="
                      w-full px-3 py-2 rounded-lg border border-border bg-background
                      text-sm text-foreground placeholder:text-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y
                    "
                    data-testid="input-changed-since"
                  />
                </div>
                <ReportUploadPanel
                  key={selectedId}
                  conditionLabel={conditionLabel}
                  lang={lang}
                  onAdd={(text) => addCustomQuestion(selectedId, text)}
                  t={t.ui}
                />
                <CategoryCard
                  cat={visit.followup.category}
                  startIdx={visit.followup.startIdx}
                  keyPrefix={visit.prefixes.followup}
                  checkedMap={checkedMap}
                  onToggle={toggleChecked}
                  answersMap={answersMap}
                  onAnswerChange={setAnswer}
                  lang={lang}
                />
              </div>
            )}

            {/* Suggested questions */}
            {hasGeneralQuestions && (
              <div className="space-y-4 sm:space-y-5" data-testid="question-categories">
                {visit.general.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    cat={cat}
                    keyPrefix={selectedId}
                    checkedMap={checkedMap}
                    onToggle={toggleChecked}
                    answersMap={answersMap}
                    onAnswerChange={setAnswer}
                    lang={lang}
                  />
                ))}
              </div>
            )}

            {/* CKD transplant extra */}
            {visit.extras.length > 0 && (
              <div className="mt-4 sm:mt-5 space-y-4 sm:space-y-5" data-testid="transplant-questions">
                {visit.extras.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      cat={cat}
                      keyPrefix={visit.prefixes.extras}
                      checkedMap={checkedMap}
                      onToggle={toggleChecked}
                      answersMap={answersMap}
                      onAnswerChange={setAnswer}
                      lang={lang}
                    />
                  ))}
              </div>
            )}

            {/* Cancer subtype */}
            {hasSubtypes && (
              <div className="mt-7 sm:mt-8">
                <div className="no-print rounded-xl border border-primary/20 bg-primary/5 px-4 py-5">
                  <label
                    htmlFor="subtype-select"
                    className="block text-base font-semibold text-foreground mb-3"
                  >
                    {selected.subtypeLabel ?? t.ui.cancerSubtypeLabel}
                    <span className="block sm:inline sm:ml-2 text-sm font-normal text-muted-foreground mt-0.5 sm:mt-0">
                      {t.ui.cancerSubtypeOptional}
                    </span>
                  </label>
                  <StyledSelect
                    id="subtype-select"
                    testId="select-cancer-subtype"
                    value={selectedSubtypeId}
                    onChange={(e) => setSelectedSubtypeId(e.target.value)}
                    ariaLabel={selected.subtypeLabel ?? t.ui.cancerSubtypeLabel}
                  >
                    <option value="">{t.ui.cancerSubtypePlaceholder}</option>
                    {selected.subtypes!.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </StyledSelect>
                </div>

                {selectedSubtype && (
                  <div
                    className="mt-4 sm:mt-5 space-y-4 sm:space-y-5"
                    data-testid={`subtype-questions-${selectedSubtype.id}`}
                  >
                    {visit.subtype.map((cat) => (
                      <CategoryCard
                        key={cat.id}
                        cat={cat}
                        keyPrefix={visit.prefixes.subtype}
                        checkedMap={checkedMap}
                        onToggle={toggleChecked}
                        answersMap={answersMap}
                        onAnswerChange={setAnswer}
                        lang={lang}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {customTopic && (customTopic.categories?.length ?? 0) > 0 && (
              <div className="mt-4">
                <ReportAIContent feature="topic" lang={lang} t={t.ui}
                  content={[customTopic.label, ...(customTopic.categories ?? []).flatMap(cat => [`${cat.title}:`, ...cat.questions])].join("\n")} />
              </div>
            )}

            {/* Custom questions */}
            <div className="mt-4 sm:mt-5">
              <CustomQuestionsCard
                conditionId={selectedId}
                questions={customQuestions}
                checkedMap={checkedMap}
                onToggle={toggleChecked}
                onAdd={(text) => addCustomQuestion(selectedId, text)}
                onRemove={(id) => removeCustomQuestion(selectedId, id)}
                answersMap={answersMap}
                onAnswerChange={setAnswer}
                t={t.ui}
                lang={lang}
              />
            </div>

            {/* AI suggest panel */}
            <AISuggestPanel
              key={selectedId}
              conditionLabel={conditionLabel}
              lang={lang}
              onAdd={(text) => addCustomQuestion(selectedId, text)}
              t={t.ui}
              extraContext={
                visit.followup.visible
                  ? answersMap[visit.followup.key]
                  : undefined
              }
            />

            {/* Notes */}
            <DoctorNotes
              id="doctor-notes"
              label={t.ui.notesLabel}
              placeholder={t.ui.notesPlaceholder}
              value={notesMap[selectedId] ?? ""}
              onChange={(text) => setNote(selectedId, text)}
              listening={notesDictation.listening}
              supported={notesDictation.supported}
              onMicClick={() => notesDictation.toggle(notesMap[selectedId] ?? "")}
              onStopDictation={notesDictation.stop}
            />

            {(!customTopic || !topicLoading) && (
              <SpecialistCard specialists={customTopic
                ? specialistGuidance.forCondition(selected.id)
                : getConditionSpecialists(selected.id)} />
            )}
            <MedicalSources
              conditionId={selected.id}
              customTopicLabel={customTopic?.label}
              customTopicArticle={customTopic?.article}
            />
          </section>
        )}
        {!selected && <MedicalSources conditionId="" />}
        </>)}
        </div>
      </div>

      {/* Print disclaimer */}
      <div className="print-disclaimer hidden" aria-hidden="true">
        {t.ui.disclaimer}
      </div>
    </>
  );
}
