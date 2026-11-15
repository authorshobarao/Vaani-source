---
name: Unbounded @babel/core override breaks Expo
description: Why a >=X babel/core override must be capped below 8 in this monorepo
---

An unbounded `@babel/core: ">=7.x"` entry in `pnpm-workspace.yaml` `overrides`
resolves to the newest major (8.x), which breaks the Expo artifact: metro/babel-preset-expo
require Babel `^7.0.0-0` and fail with `Requires Babel "^7.0.0-0", but was loaded with "8.0.1"`.

**Why:** A security-CVE fix pinned `@babel/core: ">=7.29.6"` with no upper bound; pnpm chose
8.0.1 and the Expo web bundle failed. Cap it: `">=7.29.6 <8"` still satisfies the CVE and keeps Expo working.

**How to apply:**
- Any workspace-wide `@babel/core` override must stay `<8` while an Expo/React Native artifact exists.
- After changing an override, `pnpm install` alone can leave orphaned `_@babel+core@8.0.1`
  store dirs and a STALE metro cache; run `pnpm prune` and restart the expo workflow.
- IMPORTANT: `/tmp/logs/*.log` are point-in-time SNAPSHOTS written by refresh_all_logs, NOT live.
  After a restart_workflow, call refresh_all_logs again before trusting the log — tailing the old
  file shows pre-restart output and looks like the fix failed when it didn't.
