---
name: Web answer voice input
description: Provider and preservation decisions for Doctor's answer recording
---

Doctor's answer web dictation uses recorded audio sent to direct OpenAI Whisper with the server-only OPENAI_API_KEY. Keep the native mobile Gemini fallback independent.

**Why:** The user explicitly requested Whisper to replace unreliable browser SpeechRecognition on phones, not a provider migration for the existing mobile app.

**How to apply:** Append transcripts to the latest answer rather than overwriting notes typed while waiting. Cancel synchronously when hiding an answer field and ignore late results. Mobile-emulated mocked tests are not evidence of physical iPhone/Android microphone compatibility.