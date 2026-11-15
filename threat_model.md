# Threat Model

## Project Overview

Vaani is a public web and mobile application that helps patients prepare questions for doctor visits. Its production backend is a small Express API in `artifacts/api-server` that exposes unauthenticated AI features for generating questions from free-text symptoms and uploaded medical reports. The main production trust boundary is the public internet to the API, with a secondary boundary from the API to Gemini through Replit's AI integration.

## Assets

- **Uploaded medical reports and user health descriptions** — lab reports, symptoms, notes, and condition labels can contain sensitive health information. Exposure would disclose highly personal data.
- **Service availability and AI credits** — the backend forwards user requests to Gemini, so every successful or partially processed request consumes compute and billable third-party resources.
- **Deployment secrets and integration credentials** — `AI_INTEGRATIONS_GEMINI_API_KEY`, `AI_INTEGRATIONS_GEMINI_BASE_URL`, and `DATABASE_URL` enable backend integrations and must remain server-only.
- **Client-local visit notes and question lists** — the web and mobile clients store patient-prep content locally; compromise of this data would still harm user privacy even if the backend does not persist it.

## Trust Boundaries

- **Public client to API** — browsers, mobile devices, scripts, and arbitrary internet clients can reach the public deployment. All request bodies must be treated as attacker-controlled.
- **API to Gemini integration** — the backend sends user prompts and uploaded documents to Gemini using privileged credentials; misuse of this path can burn credits and process sensitive data.
- **Client device storage** — users keep question lists and notes locally on web/mobile devices. This is a separate boundary from backend storage and should not be confused with server persistence.
- **Production vs dev-only artifacts** — `artifacts/mockup-sandbox` is assumed dev-only and should be ignored unless future scans find an explicit production route or deployment path.

## Scan Anchors

- Production backend entry points: `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`, and `artifacts/api-server/src/routes/*`.
- Highest-risk code area: Gemini-backed routes in `artifacts/api-server/src/routes/suggest-questions.ts` and `artifacts/api-server/src/routes/analyze-report.ts`.
- Public surfaces: `/api/healthz`, `/api/suggest-questions`, `/api/analyze-report`, the web client in `artifacts/my-visit-prep`, and the mobile client in `artifacts/vaani-mobile`.
- Usually out of scope: `artifacts/mockup-sandbox`, build scripts, and other dev-only tooling unless production reachability is demonstrated.

## Threat Categories

### Spoofing

There is currently no user-account system, so the main spoofing risk is service impersonation or unauthorized use of privileged backend capabilities. Public API routes that invoke Gemini must not rely on client honesty or browser origin alone to distinguish legitimate product traffic from attacker automation.

### Tampering

All prompt text, uploaded file metadata, and uploaded base64 data cross from untrusted clients into the backend and then into the Gemini integration. The server must validate structure, size, and accepted media types before forwarding content and must never let the client influence privileged backend behavior beyond the intended AI task.

### Information Disclosure

The application processes sensitive health descriptions and optional medical-report uploads. These inputs must not be logged verbatim, echoed unnecessarily in responses, or stored beyond the immediate request path. Error handling must avoid leaking internals while preserving the guarantee that uploaded files are processed transiently if the product claims they are not retained.

### Denial of Service

The public deployment exposes AI-backed endpoints that can be called directly from the internet and from arbitrary third-party origins. These routes must enforce meaningful abuse controls such as authentication, per-user/device quotas, CAPTCHAs, rate limiting, or other throttling so attackers cannot exhaust AI credits, saturate backend capacity, or repeatedly trigger expensive model calls with oversized or high-volume requests.

### Elevation of Privilege

The most relevant privilege boundary is between anonymous internet users and privileged server-side integrations. Anonymous callers must not gain unrestricted use of backend-held Gemini credentials or any future database-backed features merely by reaching a public route. Any future authenticated or admin features must be enforced server-side, not only in the clients.
