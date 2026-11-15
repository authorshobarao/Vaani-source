import { createVaaniClient } from "@workspace/api-client-react";
export const { suggestQuestions, analyzeReport, customTopicQuestions, whisperTranscribe, getPmfSummary } =
  createVaaniClient((url, init) => fetch(url, init));