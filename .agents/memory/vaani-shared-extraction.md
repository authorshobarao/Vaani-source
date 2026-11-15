---
name: Shared Vaani extraction constraints
description: Preservation decisions and TypeScript tooling constraints for shared web/mobile content
---

Keep the historical deposit dataset separate from current runtime content.

**Why:** The original web/mobile runtime language objects matched except for mobile-only UI labels, but the deposit-generation dataset was genuinely different. Replacing it with current English would silently change the archival document.

**How to apply:** Preserve the historical export for document generation; never use it as a second runtime condition source.

Question ordering and key prefixes require persistence compatibility review.

**Why:** Saved answers and checks use question identities derived from their positions; a harmless-looking content reorder can associate existing notes with the wrong question.

**How to apply:** Review old saved records before reordering shared questions or changing key construction. Preserve intentional export presentation differences until explicitly requested otherwise.

Use Vite's runner config loader for TypeScript workspace content imported by prerender configuration.

**Why:** The default bundled-config loader externalizes workspace imports; Node 20 then rejects their TypeScript extensions even though type checks pass.

**How to apply:** Exercise actual Vite config loading when changing shared imports. Plain Node also cannot run document scripts importing these TypeScript exports; use the configured TypeScript runner.