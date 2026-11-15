---
name: Expo artifact workflow name
description: How the restart_workflow name is derived for Expo/artifact services
---

The `restart_workflow` name for an artifact is `artifacts/<slug>: <service name>`, where
`<service name>` is the `[[services]] name` in `.replit-artifact/artifact.toml` — NOT
always `web`.

**Why:** Restarting `artifacts/vaani-mobile: web` failed with RUN_COMMAND_NOT_FOUND because
the Expo scaffold names its service `expo`, so the workflow is `artifacts/vaani-mobile: expo`.

**How to apply:** If a workflow restart returns "run command ... doesn't exist", read the
artifact's `.replit-artifact/artifact.toml` and use the `[[services]] name` value.
