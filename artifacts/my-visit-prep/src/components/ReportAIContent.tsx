import { useState } from "react";
import { Flag, Loader2 } from "lucide-react";
import type { FeatureStrings } from "@workspace/vaani-core/content/features";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { reportAiContent } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";

export type AiReportFeature = "suggestions" | "report" | "topic" | "medication";
type Reason = "offensive" | "harmful" | "inaccurate" | "other";

const MAX_CONTENT = 8000;

/** A random identifier per report; the website does not store a device identifier. */
function reportId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `web-${crypto.randomUUID()}`;
  return `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Lets people flag an AI-generated response to Vaani for review. */
export function ReportAIContent({
  feature,
  content,
  lang,
  t,
}: {
  feature: AiReportFeature;
  content: string;
  lang: string;
  t: FeatureStrings;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<Reason | null>(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!content.trim()) return null;

  const reasons: [Reason, string][] = [
    ["offensive", t.reportReasonOffensive],
    ["harmful", t.reportReasonHarmful],
    ["inaccurate", t.reportReasonInaccurate],
    ["other", t.reportReasonOther],
  ];

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setReason(null);
      setComment("");
      setStatus("idle");
    }
  }

  async function send() {
    if (!reason || status === "sending") return;
    setStatus("sending");
    try {
      await reportAiContent({
        deviceId: reportId(),
        feature,
        reason,
        content: content.slice(0, MAX_CONTENT),
        ...(comment.trim() ? { comment: comment.trim().slice(0, 1000) } : {}),
        lang,
      });
      trackEvent("ai_content_reported", { feature, reason, language: lang });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-testid={`report-ai-${feature}`}
        className="no-print inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 rounded"
      >
        <Flag className="w-3.5 h-3.5" aria-hidden="true" />
        {t.reportAi}
      </button>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.reportAiTitle}</DialogTitle>
            {status !== "sent" && <DialogDescription>{t.reportAiIntro}</DialogDescription>}
          </DialogHeader>

          {status === "sent" ? (
            <>
              <p className="text-sm text-foreground" role="status">{t.reportThanks}</p>
              <DialogFooter>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="min-h-[44px] min-w-[120px] rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
                >
                  OK
                </button>
              </DialogFooter>
            </>
          ) : (
            <>
              <fieldset className="space-y-2">
                <legend className="sr-only">{t.reportAiTitle}</legend>
                {reasons.map(([value, label]) => (
                  <label
                    key={value}
                    className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                      reason === value ? "border-primary bg-primary/10" : "border-border bg-card"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`report-reason-${feature}`}
                      value={value}
                      checked={reason === value}
                      onChange={() => setReason(value)}
                      data-testid={`report-reason-${value}`}
                      className="accent-primary"
                    />
                    {label}
                  </label>
                ))}
              </fieldset>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.reportCommentPlaceholder}
                aria-label={t.reportCommentPlaceholder}
                maxLength={1000}
                rows={3}
                data-testid="report-comment"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {status === "error" && (
                <p className="text-sm text-destructive" role="alert">{t.reportError}</p>
              )}
              <DialogFooter className="gap-2">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="min-h-[44px] px-3 text-sm font-semibold text-primary"
                >
                  {t.reportCancel}
                </button>
                <button
                  type="button"
                  onClick={() => void send()}
                  disabled={!reason || status === "sending"}
                  data-testid="report-submit"
                  className="inline-flex min-h-[44px] min-w-[120px] items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                >
                  {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : t.reportSubmit}
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
