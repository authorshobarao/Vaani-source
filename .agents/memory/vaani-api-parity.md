---
name: Vaani generation request parity
description: Preserve equivalent generation policies across web and native callers.
---

Keep web and native generation requests behaviorally equivalent; do not enable an API policy opt-in just because it has the same name as a UI tab.

**Why:** A mobile-only explicit condition flag enabled stricter generated-output rejection than web's default request. Real GLP-1 requests intermittently failed with HTTP 500 despite a healthy backend, correct URLs, and passing mocked tests.

**How to apply:** Compare the full request contract and the server branch it selects before blaming native networking. Preserve medication's required mode discriminator. Test representative live generated results as well as request-shape regressions; never loosen medical safety checks or alter web behavior incidentally.

Use the browser page's own origin for mobile browser-preview API requests; reserve the injected absolute backend domain for native devices.

**Why:** The embedded preview reported a network failure while the backend saw a preflight but no generation POST. Top-level browser tests did not reproduce that context. Same-origin API routing removes the unnecessary cross-origin dependency without relaxing CORS or preview privacy.

**How to apply:** Verify the Expo origin routes `/api` to the shared backend. Exercise embedded-preview networking, not just a top-level page, when diagnosing browser-only mobile failures. Do not infer the exact browser blocking mechanism from a generic fetch exception.

Localize display text without translating canonical specialty IDs, drug names, source names, or URLs. Include the selected language in generation-result identity, and regenerate the active topic when language changes.

**Why:** The user requires parity in every supported language while preserving English wording. Shared saved preparation identities must remain stable so language work does not delete or rekey patient notes. An English-named API specialty is an identifier, not necessarily the text to show patients.

**How to apply:** Translate the allowlist's display names and descriptions through the existing UI dictionaries. Distinguish translated interaction excerpts from verbatim English quotations; translate retrieved source text faithfully rather than asking the model to invent interaction facts. Do not silently show English excerpts when translation fails.
