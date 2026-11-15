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
export const { suggestQuestions, analyzeReport, customTopicQuestions, transcribeAudio, ingestEvents, submitPmfSurvey } =
  createVaaniClient(async (url, init) => {
    try {
      const response = await fetch(url, init);
      if (!response.ok) {
        console.error("[Vaani mobile] HTTP error", {
          url, status: response.status,
          responseBody: await response.clone().text().catch(() => "(unreadable response)"),
        });
      }
      return response;
    } catch (exception) {
      console.error("[Vaani mobile] Transport failed", { url, status: null, responseBody: null, exception });
      throw exception;
    }
  }, API_BASE_URL);