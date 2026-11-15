---
name: js-yaml override cap
description: Why the workspace js-yaml security override must stay below v5
---
Rule: in `pnpm-workspace.yaml` overrides, keep `js-yaml: ">=4.2.0 <5"`.
**Why:** js-yaml 5.x removed the default export; orval (`pnpm run codegen` in lib/api-spec) imports `js-yaml` as default and crashes with "does not provide an export named 'default'".
**How to apply:** if bumping security overrides, don't widen js-yaml to 5.x until orval supports it; re-run codegen to verify.
