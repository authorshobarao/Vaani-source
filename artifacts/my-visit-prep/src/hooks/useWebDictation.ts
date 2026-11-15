import { useCallback, useEffect, useRef, useState } from "react";

const BCP47: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  hi: "hi-IN",
  vi: "vi-VN",
  zh: "zh-CN",
  ta: "ta-IN",
  kn: "kn-IN",
  fr: "fr-FR",
  pt: "pt-BR",
  tl: "fil-PH",
  ja: "ja-JP",
  ko: "ko-KR",
  th: "th-TH",
  id: "id-ID",
  bn: "bn-IN",
  ur: "ur-PK",
  te: "te-IN",
  ml: "ml-IN",
};

type SpeechRecognitionType = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: any) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: any) => void) | null;
};

function getRecognitionCtor(): (new () => SpeechRecognitionType) | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export const isDictationSupported = getRecognitionCtor() !== null;

let activeStop: (() => void) | null = null;

export function useWebDictation(
  lang: string,
  onTranscript: (text: string) => void,
) {
  const [listening, setListening] = useState(false);
  const recRef = useRef<SpeechRecognitionType | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;
  const baseRef = useRef("");

  const stop = useCallback(() => {
    const rec = recRef.current;
    recRef.current = null;
    if (rec) {
      rec.onresult = null;
      rec.onend = null;
      rec.onerror = null;
      try {
        rec.stop();
      } catch {
        /* already stopped */
      }
    }
    if (activeStop === stopRef.current) activeStop = null;
    setListening(false);
  }, []);

  const stopRef = useRef(stop);
  stopRef.current = stop;

  const start = useCallback(
    (currentValue: string) => {
      const Ctor = getRecognitionCtor();
      if (!Ctor) return;
      if (activeStop) activeStop();

      baseRef.current = currentValue ? currentValue.replace(/\s+$/, "") + " " : "";

      const rec = new Ctor();
      rec.lang = BCP47[lang] ?? "en-US";
      rec.interimResults = true;
      rec.continuous = true;
      rec.onresult = (event: any) => {
        let text = "";
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        onTranscriptRef.current(baseRef.current + text);
      };
      rec.onend = () => {
        if (recRef.current === rec) {
          recRef.current = null;
          if (activeStop === stopRef.current) activeStop = null;
          setListening(false);
        }
      };
      rec.onerror = rec.onend;

      recRef.current = rec;
      activeStop = () => stopRef.current();
      try {
        rec.start();
        setListening(true);
      } catch {
        recRef.current = null;
        if (activeStop === stopRef.current) activeStop = null;
      }
    },
    [lang],
  );

  const toggle = useCallback(
    (currentValue: string) => {
      if (listening) stop();
      else start(currentValue);
    },
    [listening, start, stop],
  );

  useEffect(() => () => stopRef.current(), []);

  return { listening, toggle, stop, supported: isDictationSupported };
}
