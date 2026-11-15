import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { DEFAULT_LANG, getTranslation, RTL_LANGS } from "@/content";
import type { LangCode, LanguageData } from "@/content";

const LANG_KEY = "vaani-lang-v1";

interface LanguageContextValue {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: LanguageData;
  isRTL: boolean;
  ready: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(DEFAULT_LANG);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(LANG_KEY)
      .then((v) => {
        if (active && v) setLangState(v as LangCode);
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const setLang = useCallback((l: LangCode) => {
    setLangState(l);
    AsyncStorage.setItem(LANG_KEY, l).catch(() => {});
  }, []);

  const t = getTranslation(lang);
  const isRTL = RTL_LANGS.includes(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL, ready }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
