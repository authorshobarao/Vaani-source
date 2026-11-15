import type { FeatureStrings } from "@workspace/vaani-core/content/features";
export const MEDICATION_NOT_FOUND = "We couldn't find that medication. Please check the spelling and try again.";
export const NETWORK_ERROR = "We couldn't reach the server. Check your connection and try again.";

/** Mobile-only diagnostics. Never log request bodies containing personal notes. */
export function mobileApiError(error: unknown, fallback: string, medication = false, ui?: FeatureStrings): string {
  const detail = error as {
    status?: number; data?: { error?: string }; rawBody?: string; message?: string; name?: string;
  } | null;
  console.error("[Vaani mobile] API request failed", {
    status: detail?.status ?? null,
    responseBody: detail?.data ?? detail?.rawBody ?? null,
    exception: error,
  });
  if (detail?.status === 400 && medication) return ui?.medicationNotFound ?? MEDICATION_NOT_FOUND;
  if (detail?.status === 429) return ui?.rateLimitError ?? "Too many requests. Please wait a few minutes and try again.";
  if (detail?.status === 401 || detail?.status === 403) return ui?.accessError ?? "The server denied access. Please try again later.";
  if (detail?.status === 404) return ui?.serviceError ?? "This service isn't available at the configured server. Please try again later.";
  if (detail?.name === "TypeError" || /network|failed to fetch|unable to resolve host|internet connection|timed? ?out/i.test(detail?.message ?? "")) return ui?.networkError ?? NETWORK_ERROR;
  if (detail?.status && detail.status >= 500) return ui?.serverError ?? "The server couldn't complete the request. Please try again in a moment.";
  return fallback;
}

export function resolveApiBaseUrl(domain: string | undefined, browserOrigin?: string): string {
  // The Expo browser preview already routes /api to the shared backend.
  // Keep requests on that origin so an embedded preview does not depend on
  // cross-origin preflights or access cookies for a second preview hostname.
  // Native callers have no browser origin and retain the build-time domain.
  const value = browserOrigin || domain?.trim() || "askvaani.org";
  const url = new URL(value.includes("://") ? value : `https://${value}`);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("Vaani requires an HTTPS API domain without credentials, a path, or query parameters.");
  }
  return url.origin;
}
