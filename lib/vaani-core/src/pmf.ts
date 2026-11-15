export interface PmfState {
  exports: number;
  asks: number;
  lastAskedAt: number | null;
  answered: boolean;
}
export const DEFAULT_PMF_STATE: PmfState = { exports: 0, asks: 0, lastAskedAt: null, answered: false };
export function parsePmfState(value: unknown): PmfState {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid saved survey state");
  const state = { ...DEFAULT_PMF_STATE, ...value };
  if (!Number.isInteger(state.exports) || state.exports < 0 ||
    !Number.isInteger(state.asks) || state.asks < 0 || typeof state.answered !== "boolean" ||
    (state.lastAskedAt !== null && (typeof state.lastAskedAt !== "number" || !Number.isFinite(state.lastAskedAt)))) throw new Error("Invalid saved survey state");
  return state;
}
export function recordPmfExport(previous: PmfState, now: number): { state: PmfState; show: boolean } {
  const state = { ...previous, exports: previous.exports + 1 };
  const show = !state.answered && state.exports >= 2 && state.asks < 3 &&
    (state.lastAskedAt === null || now - state.lastAskedAt >= 30 * 24 * 60 * 60 * 1000);
  if (show) { state.asks += 1; state.lastAskedAt = now; }
  return { state, show };
}