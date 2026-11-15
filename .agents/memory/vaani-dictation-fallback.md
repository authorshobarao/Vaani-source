---
name: Vaani mic dictation fallback
description: Why mic dictation has two paths and how to keep them working
---

The mic dictation buttons use expo-speech-recognition, a custom native module that does NOT exist in Expo Go and only works on the web in browsers with the Web Speech API. In those environments tapping the mic used to fail silently.

**Rule:** dictation must keep two paths — native recognizer when `ExpoSpeechRecognitionModule.isRecognitionAvailable()` is true, otherwise record with expo-audio and transcribe server-side via `POST /api/transcribe` (Gemini audio, same rate limiter and ~8 MB base64 cap as analyze-report).

**Why:** users test in Expo Go / Replit web preview where the native module is absent; only production dev-builds have it.

**How to apply:** any new dictation field should reuse `useDictation` (which owns the single-active-session token logic, including aborting a prior fallback recording on takeover). Don't add a third input mechanism. A pure sine-wave test clip correctly transcribes to an empty string — that's expected, not a bug.
