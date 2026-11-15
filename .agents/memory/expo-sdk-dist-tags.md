---
name: Pin Expo native modules to SDK dist-tags
description: Caret ranges on community Expo native modules can pull a next-SDK major and crash the app natively at launch.
---

**Rule:** For community Expo native modules (e.g. expo-speech-recognition), install the version matching the project's SDK dist-tag (`npm view <pkg> dist-tags` → `sdk-54: 3.1.3`) with a `~` range — never `^`.

**Why:** Vaani's App Store build 6 crashed on launch (EXC_BAD_ACCESS in Hermes/native-module init, Apple 2.1(a) rejection) because `^56.0.1` resolved to the package's *next*-SDK release while the app ran Expo SDK 54. `expo install --check` reported "up to date" — it does not catch this for third-party modules. Native ABI mismatch crashes ~0.2s after launch; no JS error boundary can catch it.

**How to apply:** When adding or auditing native modules, check `npm view <pkg> dist-tags` against the Expo SDK version and pin accordingly. Suspect this first for launch-time SIGSEGV crashes on New Architecture builds.
