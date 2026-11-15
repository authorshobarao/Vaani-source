---
name: Vaani voice dictation
description: How speech-to-text dictation is wired in the Vaani mobile app and the single-recognizer ownership rule.
---

Voice dictation (speak to fill questions/notes) uses `expo-speech-recognition` (native SFSpeechRecognizer / Android SpeechRecognizer). It only works in an EAS dev/production build — NOT in Expo Go or the Replit web preview. Validate with typecheck only; must ship a new EAS build to actually test on device.

The reusable piece is `hooks/useDictation.ts` + `components/vaani/MicButton.tsx`, wired into three text inputs (custom-question draft, per-question answer, main notes).

**Rule: there is exactly one shared native recognizer, but many MicButtons.** Every MicButton mounts its own `useDictation` and subscribes to the shared "result"/"end"/"error" events.
**Why:** without gating, a transcript lands in every field and a stale button can stop another field's live session.
**How to apply:** gate with a module-level `activeOwner` symbol token — only the owning instance applies transcript and reacts to end/error. On takeover, call the previous owner's `clearActiveListening` to reset its `listening` UI. `stop()` must be owner-gated: a non-owner button only clears its own local state, never calls the global `ExpoSpeechRecognitionModule.stop()`.

Locale comes from the app language via a BCP-47 map in `useDictation.ts` (en→en-US, hi→hi-IN, etc.); `interimResults: true, continuous: false` so `results[0].transcript` is the cumulative phrase for one utterance (recompute base+transcript each result, don't append). iOS permission strings live in the `expo-speech-recognition` plugin block in `app.json`.

## Web app dictation
- Web app uses browser Web Speech API (`useWebDictation` hook + `MicButton`), not expo-speech-recognition. Hidden when unsupported (Firefox). Module-level `activeStop` mirrors mobile's single-recognizer rule.
- Manual typing while listening must stop dictation (onChange handlers call `dictation.stop()`), else the next onresult overwrites typed edits with `base + transcript`.
