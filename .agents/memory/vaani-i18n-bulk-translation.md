---
name: Vaani bulk i18n translation
description: How to add new language files to the Vaani my-visit-prep app at scale via Gemini, and the gotchas that make it fail.
---

# Adding new languages to Vaani (my-visit-prep i18n)

Each language is one file `artifacts/my-visit-prep/src/i18n/<code>.ts` exporting a
`LanguageData` object (default export). `en.ts` is the source of truth (~557
translatable strings, 19 conditions). Wiring lives in three places that must all
be updated together: `types.ts` `LangCode` union, `index.ts`
(`import`, `LANGUAGES` array, `LANG_MAP`), and `Home.tsx` `SPEECH_LANG` BCP-47 map.

## Reliable bulk-translation approach
Translate the English **object** value-by-value, not the file text, to avoid TS
syntax breakage: parse `en.ts` into a JS object (strip `import type`, turn
`const en: LanguageData =` into `return`, drop the export, `new Function`), walk
it collecting every string value except keys `code`/`id`/`appTitle` (keep brand
"Vaani"), translate the flat array in batches via Gemini with
`responseMimeType:"application/json"` + array `responseSchema`, assert the
returned array length matches, write values back, then serialize with
`JSON.stringify(obj, null, 2)` (valid TS object literal; non-ASCII is emitted
literally, which is fine). Set `code` and top-level `label` manually per language.

## Gotchas (these cost multiple attempts)
- **Gemini creds are NOT in the code_execution sandbox.** `process.env` is
  undefined there and `viewEnvVars` returns secret *names only*, not values. Run
  translation as a standalone Node script via the **bash** tool instead — the bash
  `node` process DOES have `AI_INTEGRATIONS_GEMINI_API_KEY` /
  `AI_INTEGRATIONS_GEMINI_BASE_URL`.
- **Import path for @google/genai from repo root:** it is installed under a
  package, not root. Import the resolved
  `node_modules/.pnpm/@google+genai@<ver>/node_modules/@google/genai/dist/node/index.mjs`.
- **Rate limits (RATELIMIT_EXCEEDED) are the main failure mode.** Do NOT run
  multiple translation processes concurrently. One script at a time, in-script
  batch concurrency ~3–5, is safe. After a burst, wait ~60–75s for the per-minute
  window to reset before the next run.
- **bash tool max timeout is 120s.** One language ≈ 40–75s, so generate at most
  ~2 languages per bash call (do NOT rely on `nohup ... &` — the background process dies when the bash tool call ends; run foreground batches and poll the
  log). Files are written only after all batches succeed, so a partial/killed run
  either wrote the full valid file or nothing — safe to resume by re-running only
  the missing codes.

## RTL
`index.ts` `useLanguage()` sets `document.documentElement.dir` from an
`RTL_LANGS` set (currently only `ur`). Add any future RTL language (ar, fa, he)
to that set.
