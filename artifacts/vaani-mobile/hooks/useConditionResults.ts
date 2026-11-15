import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { parseTopicResults, topicKey, type ConditionResult } from "@/lib/topic-results";
import { sanitizeSpecialists } from "@workspace/vaani-core/content/specialists";
import type { FeatureStrings } from "@workspace/vaani-core/content/features";

const STORAGE_KEY = "vaani-native-condition-results-v1";
type Records = Record<string, ConditionResult>;

/** Native, normalized-topic sidecar; saved answer identities stay backward-compatible. */
export function useConditionResults(lang: string, ui?: FeatureStrings) {
  const [records, setRecords] = useState<Records>({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<"load" | "save" | null>(null);
  const dirty = useRef(false);
  const cleared = useRef(false);
  const writable = useRef(true);
  const writes = useRef(Promise.resolve());
  useEffect(() => {
    let active = true;
    void AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (!active) return;
      const stored = parseTopicResults(raw);
      setRecords(current => cleared.current ? current : { ...stored, ...current });
    }).catch(() => {
      if (!active) return;
      if (cleared.current) return;
      writable.current = false;
      setError("load");
    }).finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!loaded || !dirty.current || !writable.current) return;
    writes.current = writes.current.then(() => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records)))
      .then(() => setError(null)).catch(() => {
        setError("save");
      });
  }, [loaded, records]);

  const remember = useCallback((topic: string, result: ConditionResult) => {
    dirty.current = true;
    setRecords(previous => ({
      ...previous,
      [topicKey("condition", lang, topic)]: { ...result, specialists: sanitizeSpecialists(result.specialists) },
    }));
  }, [lang]);
  const clear = useCallback(() => {
    cleared.current = true;
    dirty.current = true;
    writable.current = true;
    setRecords({});
  }, []);
  return { loaded, error: error === "load" ? ui?.guidanceLoadError ?? "Saved specialist guidance could not be loaded. You can keep preparing; reset to clear the saved guidance."
      : error === "save" ? ui?.guidanceSaveError ?? "Specialist guidance could not be saved on this device. Keep this screen open to retain it." : null,
    records, remember, clear,
    forTopic: (topic: string) => records[topicKey("condition", lang, topic)],
  };
}
