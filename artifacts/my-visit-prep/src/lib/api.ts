import { createVaaniClient } from "@workspace/api-client-react";
export const { suggestQuestions, analyzeReport, customTopicQuestions, whisperTranscribe, getPmfSummary, reportAiContent } =
  createVaaniClient((url, init) => fetch(url, init));