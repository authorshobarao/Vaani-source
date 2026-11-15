---
name: Vaani App Store submission readiness
description: iOS/Android store-submission config decisions and the metadata items Apple requires that live outside the codebase.
---

Vaani requests four runtime permissions, all configured via config plugins in `app.json` (verify with `pnpm exec expo config --type introspect --json` — `--type prebuild` does NOT show plugin Info.plist mods):
- Microphone + Speech Recognition (expo-speech-recognition) — voice dictation
- Camera + Photo Library (expo-image-picker) — lab-report photo upload

**Why it matters:** missing NSCameraUsageDescription / NSPhotoLibraryUsageDescription = instant crash on tap + Apple Guideline 5.1.1 rejection. Any new native module that touches a permission MUST get its usage string added before submitting.

Android permission audits must examine dependency manifests as well as Expo introspection, then verify the final signed bundle's merged manifest.

**Why:** Introspection applies config plugins but does not perform Android's complete native-library manifest merge. A camera or foreground-service permission can therefore be absent from app.json/introspection and still be included by a dependency.

**How to apply:** Treat app.json's permission list as incomplete. Do not certify permission minimization or remove permissions without checking the actual native feature and supported Android versions.

Decisions made:
- Bundle identifier / Android package: `app.replit.vaani` — confirmed from the existing App Store Connect record (already in TestFlight). Never change it.
- `ios.config.usesNonExemptEncryption: false` set to skip the export-compliance question (app only uses standard HTTPS).
- `eas.json` uses `appVersionSource: "remote"` + `autoIncrement` on production so EAS manages build numbers.

**Metadata items Apple requires that are NOT in code (App Store Connect):** Privacy Policy URL (mandatory — app sends medical report images to a server→Gemini, so App Privacy "Data Collection" must be disclosed as health data), Support URL, age rating, and screenshots — App Store Connect now wants 6.7"/6.9" (1290×2796) as the primary size; the existing 1242×2688 (6.5") set may need regenerating. Keep the in-app medical disclaimer (already present) — health apps get scrutinized.

## Android / Google Play (July 8, 2026)
- EAS project linked to the user's own Expo account (owner + projectId set in app.json). EXPO_TOKEN now valid for this account.
- Must build with `EAS_NO_VCS=1` — EAS's git-based archiving hits the workspace git lock protection.
- versionCode is remote-managed (autoIncrement); first Play build is versionCode 3.
- Keystore generated & stored on Expo servers . AAB downloaded to screenshots/vaani-1.0.0.aab.

## Guideline 1.4.1 (medical citations) — fixed in build 8
Apple rejected build 7 for missing citations for medical info. Fix: always-visible (expanded by default) "Medical sources & references" section on the main screen — `content/sources.ts` (general AHRQ/MedlinePlus/CDC + per-condition org sources for all 19 conditions) rendered by `components/vaani/MedicalSources.tsx`. When resubmitting, add App Store Connect Review Notes pointing reviewers to: Main screen → scroll to "Medical sources & references" section above the footer.
