import type { CategoryTranslation, ConditionTranslation, LanguageData } from "./content/types";
import type { CustomTopic, CustomTopicCategory, PersistedState, VisitType } from "./prep";
import { qKey } from "./prep";

export function composeVisit(t: LanguageData, conditionId: string, subtypeId: string, customTopics: CustomTopic[], transplant: boolean, visitType: VisitType) {
  const customTopic = customTopics.find(topic => topic.id === conditionId);
  const selected: ConditionTranslation | undefined = t.conditions.find(c => c.id === conditionId) ??
    (customTopic ? { id: customTopic.id, label: customTopic.label, categories: customTopic.categories ?? [] } : undefined);
  const selectedSubtype = selected?.subtypes?.find(s => s.id === subtypeId);
  const hasSubtypes = !!selected?.subtypes?.length;
  const isCKD = conditionId === "ckd";
  const general = selected?.categories ?? [];
  const extras = isCKD && transplant ? selected?.extraCategories?.flatMap(e => e.categories) ?? [] : [];
  const subtype = selectedSubtype?.categories ?? [];
  const prefixes = { general: conditionId, extras: `${conditionId}-transplant`, subtype: `${conditionId}-${subtypeId}`, followup: `${conditionId}-followup` };
  const categories = [
    ...general.map(cat => ({ cat, prefix: prefixes.general })),
    ...extras.map(cat => ({ cat, prefix: prefixes.extras })),
    ...subtype.map(cat => ({ cat, prefix: prefixes.subtype })),
  ];
  return {
    selected, customTopic, selectedSubtype, hasSubtypes, isCKD,
    isMentalHealth: conditionId === "mental-health",
    hasGeneralQuestions: general.length > 0,
    isPlaceholder: !!selected && general.length === 0 && !hasSubtypes,
    general, extras, subtype, prefixes, categories,
    followup: {
      visible: visitType === "followup",
      key: `${conditionId}-followup-changed`,
      label: t.ui.changedLabel,
      placeholder: t.ui.changedPlaceholder,
      category: { ...t.ui.followupCategory, questions: t.ui.followupCategory.questions.slice(1) },
      startIdx: 1,
    },
  };
}
export type VisitModel = ReturnType<typeof composeVisit>;
export interface ExportItem { text: string; checked: boolean; answer: string }
export interface ExportSection { title: string; items: ExportItem[] }

/** Both existing exports omit the generic follow-up checklist. Preserve that
 * behavior; their changed-since checkbox differs and is an explicit adapter. */
export function collectVisitSections(visit: VisitModel, state: PersistedState, t: LanguageData, changedSinceChecked: boolean): ExportSection[] {
  if (!visit.selected) return [];
  const conditionId = visit.selected.id;
  const item = (text: string, key: string): ExportItem => ({
    text, checked: !!state.checkedMap[key], answer: (state.answersMap[key] ?? "").trim(),
  });
  const sections = visit.categories.map(({ cat, prefix }) => ({
    title: cat.title, items: cat.questions.map((text, idx) => item(text, qKey(prefix, cat.id, idx))),
  }));
  const custom = state.customQuestionsMap[conditionId] ?? [];
  if (custom.length) sections.push({
    title: t.ui.yourQuestionsTitle, items: custom.map(q => item(q.text, qKey(conditionId, "custom", q.id))),
  });
  const changed = (state.answersMap[visit.followup.key] ?? "").trim();
  if (visit.followup.visible && changed) sections.push({
    title: t.ui.followupCategory.title,
    items: [{ text: visit.followup.label, checked: changedSinceChecked, answer: changed }],
  });
  return sections;
}
const TOPIC_SECTIONS = [
  ["understanding", "Understanding it"], ["treatment", "Treatment"], ["monitoring", "Monitoring"],
  ["lifestyle", "Lifestyle"], ["followup", "Follow-up & complications"],
] as const;
export function topicCategories(sections: Record<string, string[]>, titles?: Record<string, string>): CustomTopicCategory[] {
  const categories = TOPIC_SECTIONS.map(([id, title]) => ({ id, title: titles?.[id] ?? title, questions: sections[id] ?? [] })).filter(c => c.questions.length > 0);
  if (!categories.length) throw new Error("Empty response");
  return categories;
}
export function suggestionDescription(description: string, extraContext?: string): string {
  return (extraContext?.trim() ? `${description.trim()}\n\nChanges since last visit: ${extraContext.trim()}` : description.trim()).slice(0, 2000);
}
export function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export interface VisitSelection {
  selectedId: string;
  selectedSubtypeId: string;
  ckdStage: string;
  transplantChecked: boolean;
  visitType: VisitType;
}
export function initialVisitSelection(selectedId = ""): VisitSelection {
  return { selectedId, selectedSubtypeId: "", ckdStage: "", transplantChecked: false, visitType: "first" };
}
export function createVisitSelectionActions(update: (updater: (selection: VisitSelection) => VisitSelection) => void) {
  return {
    selectCondition(selectedId: string) {
      // Condition changes clear dependent selectors, not the chosen visit type.
      update(previous => ({ ...initialVisitSelection(selectedId), visitType: previous.visitType }));
    },
    setSelectedSubtypeId(selectedSubtypeId: string) { update(s => ({ ...s, selectedSubtypeId })); },
    setCkdStage(ckdStage: string) { update(s => ({ ...s, ckdStage })); },
    setTransplantChecked(value: boolean | ((previous: boolean) => boolean)) {
      update(s => ({ ...s, transplantChecked: typeof value === "function" ? value(s.transplantChecked) : value }));
    },
    setVisitType(visitType: VisitType) { update(s => ({ ...s, visitType })); },
  };
}