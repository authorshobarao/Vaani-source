import { useCallback, useEffect, useRef, useState } from "react";
import { whisperTranscribe } from "@/lib/api";

type RecorderStatus = "idle" | "requesting" | "recording" | "transcribing";

const MAX_RECORDING_MS = 60_000;
import { MAX_UPLOAD_BYTES as MAX_AUDIO_BYTES } from "@workspace/vaani-core";

let microphoneOwner: symbol | null = null;

function preferredMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined" || !MediaRecorder.isTypeSupported) return undefined;

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const candidates = isSafari
    ? ["audio/mp4", "audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/ogg"]
    : ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/ogg", "audio/mp4"];

  return candidates.find((type) => MediaRecorder.isTypeSupported(type));
}

function permissionError(error: unknown): string {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError" || error.name === "SecurityError") {
      return "Microphone permission was denied. You can still type the doctor's answer.";
    }
    if (error.name === "NotFoundError") {
      return "No microphone was found. You can still type the doctor's answer.";
    }
    if (error.name === "NotReadableError" || error.name === "AbortError") {
      return "The microphone is unavailable. Check whether another app is using it.";
    }
  }
  return "We couldn't access the microphone. Please try again or type the answer.";
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Unable to read audio"));
        return;
      }
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.readAsDataURL(blob);
  });
}

export function useAnswerRecorder({
  enabled,
  lang,
  onTranscript,
}: {
  enabled: boolean;
  lang: string;
  onTranscript: (text: string) => void;
}) {
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const ownerRef = useRef(Symbol("answer-recorder"));
  const sessionRef = useRef(0);
  const mountedRef = useRef(true);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const bytesRef = useRef(0);
  const tooLargeRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const limitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const onTranscriptRef = useRef(onTranscript);

  onTranscriptRef.current = onTranscript;

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (limitTimerRef.current) clearTimeout(limitTimerRef.current);
    intervalRef.current = null;
    limitTimerRef.current = null;
  }, []);

  const releaseMicrophone = useCallback(() => {
    clearTimers();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    recorderRef.current = null;
    if (microphoneOwner === ownerRef.current) microphoneOwner = null;
  }, [clearTimers]);

  const cancel = useCallback(() => {
    sessionRef.current += 1;
    requestRef.current?.abort();
    requestRef.current = null;
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
    releaseMicrophone();
    chunksRef.current = [];
    bytesRef.current = 0;
    if (mountedRef.current) {
      setStatus("idle");
      setElapsedSeconds(0);
      setError(null);
    }
  }, [releaseMicrophone]);

  const transcribe = useCallback(async (blob: Blob, mediaType: string, session: number) => {
    if (!blob.size) {
      if (mountedRef.current && sessionRef.current === session) {
        setError("No speech was captured. Please try again or type the answer.");
        setStatus("idle");
      }
      return;
    }
    if (blob.size > MAX_AUDIO_BYTES) {
      if (mountedRef.current && sessionRef.current === session) {
        setError("That recording was too large. Please record a shorter answer.");
        setStatus("idle");
      }
      return;
    }

    try {
      const data = await blobToBase64(blob);
      if (!mountedRef.current || sessionRef.current !== session) return;
      const controller = new AbortController();
      requestRef.current = controller;
      const timeout = setTimeout(() => controller.abort(), 55_000);
      let transcript: string;
      try {
        transcript = await whisperTranscribe({ lang, audio: { mediaType, data } }, { signal: controller.signal });
      } finally {
        clearTimeout(timeout);
      }
      if (!mountedRef.current || sessionRef.current !== session) return;
      const text = transcript.trim();
      if (!text) {
        setError("We couldn't hear any speech. Please try again or type the answer.");
      } else {
        onTranscriptRef.current(text);
      }
      setStatus("idle");
      requestRef.current = null;
    } catch (transcriptionError) {
      if (!mountedRef.current || sessionRef.current !== session) return;
      setError("Couldn't transcribe — please type your answer instead, or try again.");
      setStatus("idle");
      requestRef.current = null;
    }
  }, [lang]);

  const stop = useCallback(() => {
    if (status === "requesting") {
      cancel();
      return;
    }
    const recorder = recorderRef.current;
    if (recorder?.state === "recording") recorder.stop();
  }, [cancel, status]);

  const start = useCallback(async () => {
    setError(null);
    if (!enabled) return;
    if (
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setError("Voice recording isn't supported in this browser. You can still type the answer.");
      return;
    }
    if (microphoneOwner !== null) {
      setError("Another answer is already using the microphone. Stop it before recording here.");
      return;
    }

    const session = sessionRef.current + 1;
    sessionRef.current = session;
    microphoneOwner = ownerRef.current;
    setStatus("requesting");
    setElapsedSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mountedRef.current || sessionRef.current !== session || !enabled) {
        stream.getTracks().forEach((track) => track.stop());
        if (microphoneOwner === ownerRef.current) microphoneOwner = null;
        return;
      }

      streamRef.current = stream;
      const mimeType = preferredMimeType();
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      streamRef.current = stream;
      recorderRef.current = recorder;
      chunksRef.current = [];
      bytesRef.current = 0;
      tooLargeRef.current = false;

      recorder.ondataavailable = (event) => {
        if (!event.data.size || sessionRef.current !== session) return;
        chunksRef.current.push(event.data);
        bytesRef.current += event.data.size;
        if (bytesRef.current > MAX_AUDIO_BYTES && recorder.state === "recording") {
          tooLargeRef.current = true;
          recorder.stop();
        }
      };
      recorder.onerror = () => {
        if (sessionRef.current !== session) return;
        sessionRef.current += 1;
        releaseMicrophone();
        if (mountedRef.current) {
          setError("Recording stopped unexpectedly. Please try again or type the answer.");
          setStatus("idle");
        }
      };
      recorder.onstop = () => {
        if (sessionRef.current !== session) return;
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || mimeType || chunksRef.current[0]?.type || "application/octet-stream",
        });
        const mediaType = blob.type;
        const exceededLimit = tooLargeRef.current;
        releaseMicrophone();
        if (!mountedRef.current || sessionRef.current !== session) return;
        if (exceededLimit) {
          setError("That recording was too large. Please record a shorter answer.");
          setStatus("idle");
          return;
        }
        setStatus("transcribing");
        void transcribe(blob, mediaType, session);
      };

      recorder.start(1000);
      setStatus("recording");
      const startedAt = Date.now();
      intervalRef.current = setInterval(() => {
        setElapsedSeconds(Math.min(60, Math.floor((Date.now() - startedAt) / 1000)));
      }, 250);
      limitTimerRef.current = setTimeout(() => {
        if (recorder.state === "recording") recorder.stop();
      }, MAX_RECORDING_MS);
    } catch (recordingError) {
      if (sessionRef.current !== session) return;
      releaseMicrophone();
      if (mountedRef.current) {
        setError(permissionError(recordingError));
        setStatus("idle");
      }
    }
  }, [enabled, releaseMicrophone, transcribe]);

  useEffect(() => {
    if (!enabled) cancel();
  }, [cancel, enabled]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancel();
    };
  }, [cancel]);

  return { status, elapsedSeconds, error, start, stop, cancel };
}