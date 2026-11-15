import { useState } from "react";
import { useLanguage } from "@/i18n";
import { BookOpen, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import {
  GENERAL_SOURCES,
  getMedicalSources,
  type MedicalSource,
} from "@/content/sources";
import { trackEvent } from "@/lib/analytics";


interface MedicalSourcesProps {
  conditionId: string;
  customTopicLabel?: string;
  customTopicArticle?: MedicalSource;
  /** Web-only: replaces the computed list (e.g. Medication mode). */
  sourcesOverride?: MedicalSource[];
}

function SourceLink({
  source,
  sourceType,
  topicType,
}: {
  source: MedicalSource;
  sourceType: "condition_specific" | "general";
  topicType: "preset" | "custom";
}) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("medical_source_opened", {
          source_type: sourceType,
          topic_type: topicType,
        })
      }
      className="flex items-start gap-2 py-0.5 text-sm leading-5 text-primary underline underline-offset-2 hover:text-primary/80"
    >
      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{source.name}</span>
    </a>
  );
}

export function MedicalSources({
  conditionId,
  customTopicLabel,
  customTopicArticle,
  sourcesOverride,
}: MedicalSourcesProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(true);
  const sources = sourcesOverride ?? getMedicalSources(conditionId, customTopicLabel, customTopicArticle).map(source =>
    customTopicLabel && source.name === `MedlinePlus — ${customTopicLabel}`
      ? { ...source, name: t.ui.sourceCondition.replace("{topic}", customTopicLabel) } : source);

  return (
    <section className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-2 px-3.5 py-3 text-left"
      >
        <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="flex-1 text-sm font-semibold text-foreground">{t.ui.sourcesTitle}</span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        )}
      </button>
      {expanded && (
        <div className="space-y-2.5 px-3.5 pb-3.5">
          <p className="text-sm leading-5 text-muted-foreground">{t.ui.sourcesIntro}</p>
          {sources.map((source, index) => (
            <SourceLink
              key={source.url}
              source={source}
              sourceType={index < sources.length - GENERAL_SOURCES.length ? "condition_specific" : "general"}
              topicType={customTopicLabel || sourcesOverride ? "custom" : "preset"}
            />
          ))}
        </div>
      )}
    </section>
  );
}