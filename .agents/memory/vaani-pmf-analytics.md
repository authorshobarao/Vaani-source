---
name: Vaani PMF analytics decisions
description: Durable decisions behind Vaani's first-party PMF measurement
---
- Analytics stays first-party and anonymous (random device id, no PII, no third-party SDKs). **Why:** Vaani's privacy-first stance; keep it that way for any new tracking.
- PMF survey strings live in one Record-by-language map rather than the per-language content files. **Why:** small string sets don't justify touching 18 files; follow the same approach for future micro-features.
- Survey never re-asks after an answer, and any endpoint returning user free-text must sit behind the admin bearer-token guard (fails closed when unconfigured). **Why:** completion review rejected an unauthenticated feedback endpoint as a data-exposure risk.
**How to apply:** when adding analytics or feedback surfaces, keep ingestion public/anonymous but gate any read endpoint that returns raw user text.
