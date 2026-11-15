/** Transport injection keeps native fetch and browser storage out of shared logic. */
import type { SuggestQuestionsBody, AnalyzeReportBody, CustomTopicResult, CustomTopicBody, TranscribeBody, IngestEventsBody, IngestEventsResponse, PmfSurveyBody, OkResponse, PmfSummaryResponse } from "./generated/api.schemas";
export type VaaniTransport = (url: string, init: { method: "POST" | "GET"; headers: Record<string, string>; body?: string; signal?: AbortSignal }) => Promise<Pick<Response, "ok" | "status" | "json">>;
export type SuggestParams = SuggestQuestionsBody;
export type AnalyzeParams = AnalyzeReportBody;
export type CustomTopicResponse = CustomTopicResult;
const object = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const strings = (v: unknown): v is string[] => Array.isArray(v) && v.every(s => typeof s === "string");
export class VaaniApiError extends Error {
  constructor(public readonly status: number, message: string) { super(message); this.name = "VaaniApiError"; }
}

export function createVaaniClient(transport: VaaniTransport, baseUrl = "") {
  async function request(path: string, body?: unknown, options?: { signal?: AbortSignal; token?: string }): Promise<Record<string, unknown>> {
    const response = await transport(`${baseUrl.replace(/\/$/, "")}/api/${path}`, {
      method: body === undefined ? "GET" : "POST",
      headers: {
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      ...(options?.signal ? { signal: options.signal } : {}),
    });
    if (!response.ok) {
      const detail: unknown = await response.json().catch(() => null);
      throw new VaaniApiError(response.status, object(detail) && typeof detail.error === "string" ? detail.error : `Vaani API ${path} failed (${response.status})`);
    }
    const data: unknown = await response.json();
    if (!object(data)) throw new Error(`Invalid Vaani API response: ${path}`);
    return data;
  }
  const post = request;
  async function transcribe(path: string, params: TranscribeBody, options?: { signal?: AbortSignal }): Promise<string> {
    const data = await request(path, params, options);
    if (typeof data.text !== "string") throw new Error("Invalid transcription response");
    return data.text;
  }
  async function questions(path: string, body: unknown): Promise<string[]> {
    const data = await post(path, body);
    if (!strings(data.questions)) throw new Error(`Invalid questions response: ${path}`);
    return data.questions;
  }
  return {
    suggestQuestions: (params: SuggestParams) => questions("suggest-questions", params),
    analyzeReport: (params: AnalyzeParams) => questions("analyze-report", params),
    async customTopicQuestions(params: CustomTopicBody): Promise<CustomTopicResponse> {
      const data = await post("custom-topic-questions", params);
      if (!object(data.sections) || !Object.values(data.sections).every(strings)) throw new Error("Invalid topic sections response");
      if (data.article != null && (!object(data.article) || typeof data.article.name !== "string" || typeof data.article.url !== "string")) throw new Error("Invalid topic article response");
      return { sections: data.sections as Record<string, string[]>, article: (data.article ?? null) as CustomTopicResponse["article"],
        ...(Array.isArray(data.specialists) ? { specialists: data.specialists as NonNullable<CustomTopicResponse["specialists"]> } : {}),
      };
    },
    transcribeAudio: (params: TranscribeBody, options?: { signal?: AbortSignal }) => transcribe("transcribe", params, options),
    // Browser answer recording intentionally uses Whisper; native dictation
    // intentionally uses the existing Gemini route. Do not merge their paths.
    whisperTranscribe: (params: TranscribeBody, options?: { signal?: AbortSignal }) => transcribe("whisper-transcribe", params, options),
    async ingestEvents(params: IngestEventsBody): Promise<IngestEventsResponse> {
      const data = await post("events", params);
      if (typeof data.accepted !== "number") throw new Error("Invalid events response");
      return data as unknown as IngestEventsResponse;
    },
    async submitPmfSurvey(params: PmfSurveyBody): Promise<OkResponse> {
      const data = await post("pmf-survey", params);
      if (data.ok !== true) throw new Error("Invalid survey response");
      return { ok: true };
    },
    async getPmfSummary(token: string): Promise<PmfSummaryResponse> {
      const data = await request("pmf-summary", undefined, { token });
      if (!object(data.totals) || !object(data.pmf) || !Array.isArray(data.eventCounts) || !Array.isArray(data.funnel) || !Array.isArray(data.recentFeedback)) throw new Error("Invalid PMF summary response");
      return data as unknown as PmfSummaryResponse;
    },
  };
}