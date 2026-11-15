import type { FeatureStrings } from "./features";
export type LangCode =
  | "en"
  | "es"
  | "hi"
  | "vi"
  | "zh"
  | "ta"
  | "kn"
  | "fr"
  | "pt"
  | "tl"
  | "ja"
  | "ko"
  | "th"
  | "id"
  | "bn"
  | "ur"
  | "te"
  | "ml";

export interface UIStrings extends FeatureStrings {
  appTitle: string;
  appSubtitle: string;
  heroHeading: string;
  heroDescription: string;
  tip: string;
  conditionSelectLabel: string;
  conditionSelectPlaceholder: string;
  printButton: string;
  downloadButton: string;
  savedLocallyNotice: string;
  visitTypeLabel: string;
  visitTypeFirst: string;
  visitTypeFollowup: string;
  followupCategory: CategoryTranslation;
  uploadTitle: string;
  uploadHint: string;
  uploadButton: string;
  uploadChooseAnother: string;
  uploadAnalyzing: string;
  uploadError: string;
  uploadTooLarge: string;
  resetButton: string;
  resetConfirmText: string;
  resetConfirmYes: string;
  resetConfirmCancel: string;
  notesLabel: string;
  notesPlaceholder: string;
  yourQuestionsTitle: string;
  yourQuestionsPlaceholder: string;
  yourQuestionsAdd: string;
  disclaimer: string;
  questionsSoonTitle: string;
  questionsSoonDesc: string;
  ckdStageLabel: string;
  ckdStagePlaceholder: string;
  ckdStageOptional: string;
  ckdStageNotes: Record<string, string>;
  transplantLabel: string;
  transplantSubLabel: string;
  cancerSubtypeLabel: string;
  cancerSubtypeOptional: string;
  cancerSubtypePlaceholder: string;
  aiPanelHeading: string;
  aiPanelLabel: string;
  aiPanelPlaceholder: string;
  aiPanelButton: string;
  aiPanelLoading: string;
  aiPanelDisclaimer: string;
  aiPanelError: string;
  safetyNoticeTitle: string;
  safetyNoticeLine988: string;
  safetyNoticeInternational: string;
  languageLabel: string;
  sourcesTitle: string;
  sourcesIntro: string;
  aboutArticleLabel: string;
  addTopicButton: string;
  addTopicPlaceholder: string;
  addTopicSave: string;
  permissionDeniedTitle: string;
  permissionDeniedMessage: string;
  openSettings: string;
}

export interface CategoryTranslation {
  id: string;
  title: string;
  questions: string[];
}

export interface SubtypeTranslation {
  id: string;
  label: string;
  categories: CategoryTranslation[];
}

export interface ExtraCategoryTranslation {
  id: string;
  triggerLabel: string;
  categories: CategoryTranslation[];
}

export interface ConditionTranslation {
  id: string;
  label: string;
  categories: CategoryTranslation[];
  subtypes?: SubtypeTranslation[];
  subtypeLabel?: string;
  extraCategories?: ExtraCategoryTranslation[];
}

export interface LanguageData {
  code: LangCode;
  label: string;
  ui: UIStrings;
  conditions: ConditionTranslation[];
}
