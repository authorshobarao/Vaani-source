import type { LangCode, LanguageData } from "./types";
import en from "./en";
import es from "./es";
import hi from "./hi";
import vi from "./vi";
import zh from "./zh";
import ta from "./ta";
import kn from "./kn";
import fr from "./fr";
import pt from "./pt";
import tl from "./tl";
import ja from "./ja";
import ko from "./ko";
import th from "./th";
import id from "./id";
import bn from "./bn";
import ur from "./ur";
import te from "./te";
import ml from "./ml";

export type {
  LangCode,
  LanguageData,
  UIStrings,
  ConditionTranslation,
  CategoryTranslation,
  SubtypeTranslation,
  ExtraCategoryTranslation,
} from "./types";

export const ALL_LANGUAGES: LanguageData[] = [
  en,
  es,
  hi,
  vi,
  zh,
  ta,
  kn,
  fr,
  pt,
  tl,
  ja,
  ko,
  th,
  id,
  bn,
  ur,
  te,
  ml,
];

export const LANGUAGES: { code: LangCode; label: string }[] = ALL_LANGUAGES.map(
  (l) => ({ code: l.code, label: l.label })
);

export const LANG_MAP: Record<LangCode, LanguageData> = Object.fromEntries(
  ALL_LANGUAGES.map((l) => [l.code, l])
) as Record<LangCode, LanguageData>;

/** Languages that read right-to-left. */
export const RTL_LANGS: LangCode[] = ["ur"];

export const DEFAULT_LANG: LangCode = "en";

export function getTranslation(code: LangCode): LanguageData {
  return LANG_MAP[code] ?? en;
}
