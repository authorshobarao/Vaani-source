import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
} from "expo-audio";
import * as FileSystem from "expo-file-system/legacy";

import { transcribeAudio } from "@/lib/api";

/**
 * Only one field may dictate at a time. Every MicButton mounts its own
 * useDictation hook and subscribes to the shared native recognizer, so we gate
 * on a module-level owner token to make sure the transcript only lands in the
 * field the user actually started dictation on.
 *
 * `clearActiveListening` resets the previously-active button's local `listening`
 * state when a new field takes over, so we never leave a stale "listening" mic.
 *
 * Two capture paths:
 * - Native: the on-device speech recognizer (expo-speech-recognition), used in
 *   production builds where the native module is available.
 * - Fallback: when the native recognizer is unavailable (Expo Go, web browsers
 *   without the Web Speech API), we record audio with expo-audio and send it
 *   to the backend /api/transcribe endpoint for transcription.
 */
let activeOwner: symbol | null = null;
let clearActiveListening: (() => void) | null = null;
// Stops and discards the currently-active fallback recording (if any), the
// fallback-path equivalent of ExpoSpeechRecognitionModule.abort().
let abortActiveFallback: (() => void) | null = null;
let dictationGeneration = 0;

const LOCALES: Record<string, string> = {
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

export function speechLocale(lang: string): string {
  return LOCALES[lang] ?? "en-US";
}

function nativeRecognizerAvailable(): boolean {
  try {
    return ExpoSpeechRecognitionModule.isRecognitionAvailable() === true;
  } catch {
    return false;
  }
}

async function readRecordingAsBase64(
  uri: string
): Promise<{ data: string; mediaType: string }> {
  if (Platform.OS === "web") {
    const resp = await fetch(uri);
    const blob = await resp.blob();
    const buf = new Uint8Array(await blob.arrayBuffer());
    let bin = "";
    const chunk = 0x8000;
    for (let i = 0; i < buf.length; i += chunk) {
      bin += String.fromCharCode(...buf.subarray(i, i + chunk));
    }
    return {
      data: btoa(bin),
      mediaType: (blob.type || "audio/webm").split(";")[0],
    };
  }
  const data = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const lower = uri.toLowerCase();
  const mediaType = lower.endsWith(".wav")
    ? "audio/wav"
    : lower.endsWith(".mp3")
      ? "audio/mpeg"
      : "audio/m4a";
  return { data, mediaType };
}

export function useDictation({
  lang,
  getBase,
  onText,
  onPermissionDenied,
}: {
  lang: string;
  getBase: () => string;
  onText: (text: string) => void;
  onPermissionDenied?: () => void;
}) {
  const [listening, setListening] = useState(false);
  const ownerRef = useRef<symbol>(Symbol("dictation"));
  const baseRef = useRef("");
  const mounted = useRef(true);
  const session = useRef(0);
  const lastTranscriptValue = useRef<string | null>(null);
  const modeRef = useRef<"native" | "fallback" | null>(null);
  const transcribingRef = useRef(false);
  const onTextRef = useRef(onText);
  const getBaseRef = useRef(getBase);
  const onPermissionDeniedRef = useRef(onPermissionDenied);
  onTextRef.current = onText;
  getBaseRef.current = getBase;
  onPermissionDeniedRef.current = onPermissionDenied;

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const isMine = useCallback(() => activeOwner === ownerRef.current, []);

  const releaseGlobals = useCallback(() => {
    if (isMine()) {
      activeOwner = null;
      clearActiveListening = null;
    }
  }, [isMine]);

  useSpeechRecognitionEvent("result", (event) => {
    if (!isMine() || modeRef.current !== "native") return;
    const transcript = event.results?.[0]?.transcript ?? "";
    if (!transcript) return;
    const current = getBaseRef.current();
    if (current !== (lastTranscriptValue.current ?? baseRef.current)) {
      baseRef.current = current;
    }
    const base = baseRef.current;
    const joined = base.trim() ? `${base.trimEnd()} ${transcript}` : transcript;
    lastTranscriptValue.current = joined;
    onTextRef.current(joined);
  });

  useSpeechRecognitionEvent("end", () => {
    if (!isMine() || modeRef.current !== "native") return;
    releaseGlobals();
    setListening(false);
  });

  useSpeechRecognitionEvent("error", () => {
    if (!isMine() || modeRef.current !== "native") return;
    releaseGlobals();
    setListening(false);
  });

  const stopFallback = useCallback(async () => {
    if (transcribingRef.current) return;
    transcribingRef.current = true;
    const generation = dictationGeneration;
    const currentSession = session.current;
    try {
      if (isMine()) abortActiveFallback = null;
      await recorder.stop();
      const uri = recorder.uri;
      releaseGlobals();
      setListening(false);
      if (!uri) return;
      const audio = await readRecordingAsBase64(uri);
      const text = (await transcribeAudio({ lang, audio })).trim();
      if (!text || !mounted.current || generation !== dictationGeneration || currentSession !== session.current) return;
      const base = getBaseRef.current();
      const joined = base.trim() ? `${base.trimEnd()} ${text}` : text;
      onTextRef.current(joined);
    } catch {
      releaseGlobals();
      setListening(false);
    } finally {
      transcribingRef.current = false;
    }
  }, [lang, recorder, releaseGlobals]);

  const stop = useCallback(() => {
    // Only the owner may stop the shared native recognizer; a stale non-owner
    // button must never terminate another field's active dictation.
    if (isMine()) {
      if (modeRef.current === "fallback") {
        void stopFallback();
        return;
      }
      try {
        ExpoSpeechRecognitionModule.stop();
      } catch {
        /* recognizer already stopped */
      }
      releaseGlobals();
    }
    setListening(false);
  }, [isMine, releaseGlobals, stopFallback]);

  const takeOver = useCallback(() => {
    dictationGeneration += 1;
    session.current += 1;
    if (activeOwner !== ownerRef.current) {
      clearActiveListening?.();
      // Discard any in-flight fallback recording owned by another field so a
      // stale recorder never keeps running (or lands text) after takeover.
      abortActiveFallback?.();
    }
    activeOwner = ownerRef.current;
    clearActiveListening = () => setListening(false);
    abortActiveFallback = null;
    baseRef.current = getBaseRef.current();
    lastTranscriptValue.current = null;
  }, []);

  const startNative = useCallback(async () => {
    const pendingSession = ++session.current;
    const requestedGeneration = dictationGeneration;
    try {
      const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!mounted.current || pendingSession !== session.current || requestedGeneration !== dictationGeneration) return;
      if (!perm.granted) {
        onPermissionDeniedRef.current?.();
        return;
      }
    } catch {
      onPermissionDeniedRef.current?.();
      return;
    }

    // Take over any in-flight session and clear the previous button's UI state.
    takeOver();
    try {
      ExpoSpeechRecognitionModule.abort();
    } catch {
      /* nothing running */
    }

    modeRef.current = "native";
    setListening(true);

    try {
      ExpoSpeechRecognitionModule.start({
        lang: speechLocale(lang),
        interimResults: true,
        continuous: false,
      });
    } catch {
      releaseGlobals();
      setListening(false);
    }
  }, [lang, releaseGlobals, takeOver]);

  const startFallback = useCallback(async () => {
    const pendingSession = ++session.current;
    const requestedGeneration = dictationGeneration;
    try {
      const perm = await AudioModule.requestRecordingPermissionsAsync();
      if (!mounted.current || pendingSession !== session.current || requestedGeneration !== dictationGeneration) return;
      if (!perm.granted) {
        onPermissionDeniedRef.current?.();
        return;
      }
    } catch {
      onPermissionDeniedRef.current?.();
      return;
    }

    takeOver();
    modeRef.current = "fallback";

    try {
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
      await recorder.prepareToRecordAsync();
      if (!mounted.current || !isMine()) return;
      recorder.record();
      abortActiveFallback = () => {
        // Discard: stop the recorder without transcribing.
        recorder.stop().catch(() => {});
      };
      setListening(true);
    } catch {
      releaseGlobals();
      setListening(false);
    }
  }, [recorder, releaseGlobals, takeOver, isMine]);

  const start = useCallback(async () => {
    // Invalidate an older field even while its permission prompt is pending.
    dictationGeneration += 1;
    if (nativeRecognizerAvailable()) {
      await startNative();
    } else {
      await startFallback();
    }
  }, [startNative, startFallback]);

  const toggle = useCallback(() => {
    if (listening) stop();
    else void start();
  }, [listening, start, stop]);

  useEffect(
    () => {
      mounted.current = true;
      return () => {
      mounted.current = false;
      session.current += 1;
      if (isMine()) {
        if (modeRef.current === "fallback") {
          abortActiveFallback?.();
        } else {
          try {
            ExpoSpeechRecognitionModule.abort();
          } catch {
            /* nothing running */
          }
        }
        activeOwner = null;
        clearActiveListening = null;
        abortActiveFallback = null;
      }
      };
    },
    [isMine]
  );

  return { listening, toggle };
}
