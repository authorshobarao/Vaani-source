---
name: Replit AI Integrations (Gemini) gotchas
description: Non-obvious quirks when calling Gemini through the Replit AI Integrations proxy.
---

Provider choice and wiring for Vaani's AI routes live in `replit.md` (not repeated here). These are the non-obvious gotchas that cost time:

- **`httpOptions.apiVersion` MUST be `""`** when constructing `GoogleGenAI` against the Replit AI Integrations proxy. A non-empty/default apiVersion breaks routing through the proxy.
- **Gemini rejects degenerate images** with `400 "Provided image is not valid"` — e.g. a 1×1 transparent-pixel PNG used as a test placeholder. Always smoke-test vision routes with a real image (e.g. an ImageMagick-rendered text image), not a tiny stub, or you'll chase a non-existent code bug.
