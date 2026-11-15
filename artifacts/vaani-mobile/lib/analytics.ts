import AsyncStorage from "@react-native-async-storage/async-storage";
import { ingestEvents, submitPmfSurvey as postPmfSurvey } from "./api";
import type { ClientEvent } from "@workspace/api-client-react";

import { uid } from "@/lib/keys";

/**
 * Privacy-first anonymous analytics:
 * - Device-scoped random anonymous ID (no PII, no account linkage).
 * - Events queue on device (AsyncStorage) and sync in batches when the API
 *   is reachable; failures keep events queued for the next attempt.
 */

const DEVICE_ID_KEY = "vaani-device-id-v1";
const QUEUE_KEY = "vaani-analytics-queue-v1";
const MAX_QUEUE = 500;
const MAX_BATCH = 100;
const FLUSH_DEBOUNCE_MS = 4000;

type QueuedEvent = ClientEvent;

let deviceIdPromise: Promise<string> | null = null;
let queue: QueuedEvent[] = [];
let queueLoaded = false;
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let flushing = false;

export function getDeviceId(): Promise<string> {
  if (!deviceIdPromise) {
    deviceIdPromise = (async () => {
      try {
        const existing = await AsyncStorage.getItem(DEVICE_ID_KEY);
        if (existing) return existing;
        const fresh = `d-${uid()}${uid()}`;
        await AsyncStorage.setItem(DEVICE_ID_KEY, fresh);
        return fresh;
      } catch {
        return `d-session-${uid()}`;
      }
    })();
  }
  return deviceIdPromise;
}

async function loadQueue(): Promise<void> {
  if (queueLoaded) return;
  queueLoaded = true;
  try {
    const raw = await AsyncStorage.getItem(QUEUE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as QueuedEvent[];
      if (Array.isArray(parsed)) queue = [...parsed, ...queue];
    }
  } catch {
    /* start with empty queue */
  }
}

function persistQueue(): void {
  AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue)).catch(() => {});
}

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flush();
  }, FLUSH_DEBOUNCE_MS);
}

/** Record an anonymous event. Fire-and-forget; never throws. */
export function track(
  name: string,
  props?: Record<string, unknown>,
  lang?: string
): void {
  void (async () => {
    try {
      await loadQueue();
      queue.push({
        name,
        ...(props && Object.keys(props).length > 0 ? { props } : {}),
        ...(lang ? { lang } : {}),
        ts: new Date().toISOString(),
      });
      if (queue.length > MAX_QUEUE) queue = queue.slice(-MAX_QUEUE);
      persistQueue();
      scheduleFlush();
    } catch {
      /* analytics must never break the app */
    }
  })();
}

/** Attempt to sync queued events to the server. Safe to call anytime. */
export async function flush(): Promise<void> {
  if (flushing) return;
  flushing = true;
  try {
    await loadQueue();
    while (queue.length > 0) {
      const batch = queue.slice(0, MAX_BATCH);
      const deviceId = await getDeviceId();
      await ingestEvents({ deviceId, events: batch });
      queue = queue.slice(batch.length);
      persistQueue();
    }
  } catch {
    /* offline — events stay queued */
  } finally {
    flushing = false;
  }
}

/** Submit a PMF survey response. Resolves true on success. */
export async function submitPmfSurvey(params: {
  disappointment: "very" | "somewhat" | "not";
  feedback?: string;
  lang?: string;
}): Promise<boolean> {
  try {
    const deviceId = await getDeviceId();
    await postPmfSurvey({ deviceId, ...params });
    return true;
  } catch {
    return false;
  }
}
