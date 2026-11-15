import { useEffect, useState } from "react";
import { sanitizeSpecialists, type Specialist } from "@/content/specialists";

// Web-only sidecar: do not change the shared/mobile preparation storage shape.
const STORAGE_KEY = "vaani-web-condition-specialists-v1";
type Records = Record<string, Specialist[]>;

function readRecords(): Records {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
    return Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, sanitizeSpecialists(value)]));
  } catch {
    return {};
  }
}

export function useConditionSpecialists(lang: string) {
  const [records, setRecords] = useState<Records>(readRecords);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      console.warn("Specialist guidance could not be saved on this device.");
    }
  }, [records]);

  return {
    forCondition: (id: string) => records[`${lang}:${id}`] ?? sanitizeSpecialists(null),
    remember: (id: string, input: unknown) => {
      const specialists = sanitizeSpecialists(input);
      setRecords(previous => ({ ...previous, [`${lang}:${id}`]: specialists }));
    },
  };
}
