import { createContext, createElement, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { LangCode, LanguageData } from "./types";
import { LANG_MAP, RTL_LANGS } from "@workspace/vaani-core/content";
export { LANGUAGES } from "@workspace/vaani-core/content";

export type { LangCode, LanguageData };

const LS_KEY = "mvp-lang";

type LanguageContextValue = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: LanguageData;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLang(): LangCode {
  try {
    // Check URL path prefix first (e.g., /es/, /hi/)
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    if (pathParts.length > 0 && pathParts[0] in LANG_MAP) {
      return pathParts[0] as LangCode;
    }
    // Check URL query param (e.g., ?lang=es)
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang && urlLang in LANG_MAP) return urlLang as LangCode;
    // Fall back to localStorage
    const stored = localStorage.getItem(LS_KEY);
    if (stored && stored in LANG_MAP) return stored as LangCode;
  } catch {}
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(getStoredLang);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, lang);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
    }
  }, [lang]);

  function setLang(l: LangCode) {
    setLangState(l);
  }

  return createElement(
    LanguageContext.Provider,
    { value: { lang, setLang, t: LANG_MAP[lang] } },
    children
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return value;
}

export function getTranslation(lang: LangCode): LanguageData {
  return LANG_MAP[lang];
}
