---
name: Transitive override compatibility
description: Runtime validation required when a security override crosses module-format or major-version boundaries.
---

Do not accept a transitive security override that crosses a major version or CommonJS/ESM boundary based only on installation, typechecking, or bundling.

**Why:** A package can load successfully while a downstream caller receives a module namespace instead of the callable default export it expects. Static checks may not cover the transitive JavaScript path.

**How to apply:** Invoke the actual downstream API with representative input. If compatibility fails and the parent cannot be upgraded safely, preserve the compatible version and backport the security fix with a package-manager-managed patch.