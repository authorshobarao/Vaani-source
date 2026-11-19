import { fetch } from "expo/fetch";
import { Platform } from "react-native";
import { createVaaniClient } from "@workspace/api-client-react";
import { resolveApiBaseUrl } from "./api-errors";
export type { SuggestParams, AnalyzeParams, CustomTopicResponse } from "@workspace/api-client-react";

// Preserve the native build-time domain and Expo transport.
export const API_BASE_URL = resolveApiBaseUrl(
  process.env.EXPO_PUBLIC_DOMAIN,
  Platform.OS === "web" && typeof window !== "undefined" ? window.location.origin : undefined,
);
export const { suggestQuestions, analyzeReport, customTopicQuestions, transcribeAudio, ingestEvents, submitPmfSurvey, reportAiContent } =
  createVaaniClient(async (url, init) => {
    let response: Awaited<ReturnType<typeof fetch>>;
    try {
      response = await fetch(url, init);
    } catch (exception) {
      console.error("[Vaani mobile] Transport failed", { url, status: null, responseBody: null, exception });
      throw exception;
    }
    if (response.ok) return response;
    // expo/fetch does not implement Response.clone(), so read the error body
    // once and hand the client a response whose json() reuses that text.
    const text = await response.text().catch(() => "");
    console.error("[Vaani mobile] HTTP error", { url, status: response.status, responseBody: text || "(empty response)" });
    return {
      ok: false,
      status: response.status,
      json: async () => JSON.parse(text),
    };
  }, API_BASE_URL);