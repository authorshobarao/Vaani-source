import type { VisitSelection } from "./visit";
/** Persisted v1 shape; storage keys and hydration remain platform-owned. */
export interface CustomQuestion { id: string; text: string }
export interface CustomTopicCategory { id: string; title: string; questions: string[] }
export interface CustomTopicArticle { name: string; url: string }
export interface CustomTopic {
  id: string;
  label: string;
  categories?: CustomTopicCategory[];
  article?: CustomTopicArticle;
}
export interface PersistedState {
  checkedMap: Record<string, boolean>;
  notesMap: Record<string, string>;
  customQuestionsMap: Record<string, CustomQuestion[]>;
  answersMap: Record<string, string>;
  customTopics: CustomTopic[];
  /** Additive v1 field. Older records without a selection remain valid. */
  selection?: VisitSelection;
}
export const EMPTY_STATE: PersistedState = {
  checkedMap: {}, notesMap: {}, customQuestionsMap: {}, answersMap: {}, customTopics: [],
};
/** Framework-independent state operations; generate IDs before invoking an updater
 * so React can replay updater functions without changing persisted identities. */
export function createPrepActions(
  update: (updater: (state: PersistedState) => PersistedState) => void,
  generateId: () => string = uid,
) {
  return {
    toggleChecked(key: string) {
      update(s => ({ ...s, checkedMap: { ...s.checkedMap, [key]: !s.checkedMap[key] } }));
    },
    setNote(conditionId: string, value: string) {
      update(s => ({ ...s, notesMap: { ...s.notesMap, [conditionId]: value } }));
    },
    setAnswer(key: string, value: string) {
      update(s => ({ ...s, answersMap: { ...s.answersMap, [key]: value } }));
    },
    addCustomQuestion(conditionId: string, text: string) {
      const trimmed = text.trim();
      if (!trimmed) return;
      const question = { id: generateId(), text: trimmed };
      update(s => ({ ...s, customQuestionsMap: {
        ...s.customQuestionsMap, [conditionId]: [...(s.customQuestionsMap[conditionId] ?? []), question],
      } }));
    },
    removeCustomQuestion(conditionId: string, id: string) {
      update(s => ({ ...s, customQuestionsMap: {
        ...s.customQuestionsMap, [conditionId]: (s.customQuestionsMap[conditionId] ?? []).filter(q => q.id !== id),
      } }));
    },
    addCustomTopic(label: string, categories?: CustomTopicCategory[], article?: CustomTopicArticle) {
      const trimmed = label.trim();
      if (!trimmed) return "";
      const id = `custom-${generateId()}`;
      update(s => ({ ...s, customTopics: [...s.customTopics, { id, label: trimmed, categories, article }] }));
      return id;
    },
    setCustomTopicData(id: string, categories: CustomTopicCategory[], article?: CustomTopicArticle) {
      update(s => ({ ...s, customTopics: s.customTopics.map(t => t.id === id ? { ...t, categories, article } : t) }));
    },
    resetAll() { update(() => ({ ...EMPTY_STATE })); },
  };
}
export type PrepActions = ReturnType<typeof createPrepActions>;
export const PREP_LOAD_ERROR = "Your saved preparation could not be loaded. You can keep preparing, but changes will not be saved until you reset or reload.";
export const PREP_SAVE_ERROR = "Your preparation could not be saved on this device. Keep this page open and export a copy before leaving.";
const object = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const strings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(v => typeof v === "string");
const question = (value: unknown): boolean =>
  object(value) && typeof value.id === "string" && typeof value.text === "string";
const category = (value: unknown): boolean =>
  object(value) && typeof value.id === "string" && typeof value.title === "string" && strings(value.questions);
const topic = (value: unknown): boolean =>
  object(value) && typeof value.id === "string" && typeof value.label === "string" &&
  (value.categories === undefined || (Array.isArray(value.categories) && value.categories.every(category))) &&
  (value.article === undefined || (object(value.article) && typeof value.article.name === "string" && typeof value.article.url === "string"));

/** Accept additive v1 migrations, but never spread unvalidated persisted values. */
export function parsePrepState(value: unknown): PersistedState {
  if (!object(value)) throw new Error("Invalid saved preparation: expected an object");
  const state = { ...EMPTY_STATE, ...value };
  const maps: [string, unknown, (v: unknown) => boolean][] = [
    ["checkedMap", state.checkedMap, v => typeof v === "boolean"],
    ["notesMap", state.notesMap, v => typeof v === "string"],
    ["answersMap", state.answersMap, v => typeof v === "string"],
    ["customQuestionsMap", state.customQuestionsMap, v => Array.isArray(v) && v.every(question)],
  ];
  for (const [name, map, valid] of maps) {
    if (!object(map) || !Object.values(map).every(valid)) throw new Error(`Invalid saved preparation: ${name}`);
  }
  if (!Array.isArray(state.customTopics) || !state.customTopics.every(topic)) {
    throw new Error("Invalid saved preparation: customTopics");
  }
  if (state.selection !== undefined && (
    !object(state.selection) ||
    typeof state.selection.selectedId !== "string" ||
    typeof state.selection.selectedSubtypeId !== "string" ||
    typeof state.selection.ckdStage !== "string" ||
    typeof state.selection.transplantChecked !== "boolean" ||
    (state.selection.visitType !== "first" && state.selection.visitType !== "followup")
  )) throw new Error("Invalid saved preparation: selection");
  return {
    checkedMap: state.checkedMap, notesMap: state.notesMap, answersMap: state.answersMap,
    customQuestionsMap: state.customQuestionsMap, customTopics: state.customTopics,
    ...(state.selection === undefined ? {} : { selection: state.selection }),
  };
}
export function qKey(prefix: string, catId: string, idx: number | string): string {
  return `${prefix}::${catId}::${idx}`;
}
export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
export type VisitType = "first" | "followup";
export const CKD_STAGES = [
  { id: "stage-1", label: "Stage 1 (eGFR ≥ 90)" },
  { id: "stage-2", label: "Stage 2 (eGFR 60–89)" },
  { id: "stage-3", label: "Stage 3 (eGFR 30–59)" },
  { id: "stage-4", label: "Stage 4 (eGFR 15–29)" },
  { id: "stage-5", label: "Stage 5 (eGFR < 15)" },
  { id: "not-sure", label: "Not sure of my stage" },
];