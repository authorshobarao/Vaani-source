# My Visit Prep / Vaani

Multilingual web and mobile tools that help patients prepare questions and documents for medical visits.

## Run & Operate

- Start the managed `artifacts/api-server: API Server` workflow for the API.
- Start the managed `artifacts/my-visit-prep: web` workflow for the root web app.
- Start the managed `artifacts/vaani-mobile: expo` workflow only when working on the Expo app.
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required services: Replit PostgreSQL and Replit AI Integrations for Gemini.
- Required env: `DATABASE_URL`, `AI_INTEGRATIONS_GEMINI_API_KEY`, and `AI_INTEGRATIONS_GEMINI_BASE_URL` (provisioned by Replit).

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/my-visit-prep` — React/Vite web app served at `/`
- `artifacts/vaani-mobile` — Expo mobile app
- `artifacts/api-server` — Express API served under `/api`
- `lib/api-spec/openapi.yaml` — API contract source of truth
- `lib/db/src/schema` — Drizzle database schema

## Architecture decisions

- Specialist guidance belongs to the Health condition tab on both web and mobile: curate every preset, allowlist custom specialty types, use fixed plain-language descriptions, and start with primary care for referral. No individual doctors, clinics, provider search, or diagnosis. Custom guidance opts into the existing generation call; preserve default API behavior and platform-specific rendering. Native result caches use normalized names; retain legacy preparation IDs so existing answers stay attached to their original questions.
- Medication mode is supported on web and mobile through the same backend lookups, with separate browser and native UI, voice, and export adapters. Preserve default/omitted-mode condition API behavior and the web app when adding mobile parity. Validate the medication against an authoritative drug database before any AI generation; never accept an approximate name as a verified drug. The Interactions question group is a patient-entered review list, never an AI interaction checker. Keep the separate sourced Key interactions block authoritative-only with an explicit fallback. Questions must be first-person requests addressed directly to the clinician, not refer to "my doctor" or "your doctor". These are user-specified medical-safety requirements, not reasons to guess missing facts.
- Preserve platform boundaries: web UI uses Radix/shadcn and DOM components; mobile uses native React Native components. Keep Wouter routing on web and Expo Router on mobile. Do not try to share rendering components or routing implementations.
- Keep localStorage and AsyncStorage implementations separate while sharing preparation-state shapes/types and validation. Voice recording, uploads, and export generation/delivery must retain browser-specific versus Expo-specific adapters, consuming shared content/types and pure domain utilities.
- Changes must be additive or behavior-preserving refactors, not rewrites of working website or mobile features. Preserve existing user data, navigation, and device capabilities; verify affected flows on both platforms when shared code changes.
- Shared Vaani domain content belongs in `lib/vaani-core`, not in either artifact. All 18 language objects, question content, source references, PMF translations, prep-state schema/validation, question keys, and CKD options have shared owners. Artifact content modules may only adapt/re-export these owners; never add a second editable copy. Keep browser/AsyncStorage persistence and native APIs in the artifact.
- Cross-platform feature request logic belongs in `lib/api-client-react`; artifacts provide transport/base URL only. Describe new endpoints in `lib/api-spec/openapi.yaml` and regenerate contracts. Preserve existing persistence keys and question-index semantics when changing shared content.
- `composeVisit`, `collectVisitSections`, preparation/selection actions and PMF eligibility rules are platform-independent core functions. UI rendering, browser/AsyncStorage, export delivery, mic/file APIs and analytics queue scheduling stay in adapters. The isolated `vaani-core/historical/deposit-questions` export preserves the copyright-deposit dataset; never use it as a runtime question bank. All feature HTTP, including analytics/PMF/dashboard and the intentionally separate Whisper/Gemini transcription routes, uses the shared API client.

- AI features (`/api/suggest-questions`, `/api/analyze-report`) use **Gemini** (`gemini-2.5-flash`) via the Replit AI Integrations proxy — no user-supplied API key, billed to Replit credits. Client is in `artifacts/api-server/src/gemini.ts`; requires env `AI_INTEGRATIONS_GEMINI_API_KEY` + `AI_INTEGRATIONS_GEMINI_BASE_URL` and `httpOptions.apiVersion: ""`.
- `gemini-2.5-flash` is vision-capable, so both the text route and the lab-report (photo/PDF) route share one model. Report files are passed as base64 `inlineData` parts, capped ~8 MB.

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
