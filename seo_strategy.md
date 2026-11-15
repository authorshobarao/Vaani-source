# SEO Strategy

## In scope
- Public web app in `artifacts/my-visit-prep`
- Home route (`/`)
- Privacy policy route (`/privacy`)
- Shared HTML shell and public assets under `artifacts/my-visit-prep/index.html` and `artifacts/my-visit-prep/public/`
- International discoverability for supported public languages

## Out of scope
- Authenticated/internal flows if added later
- Express API routes in `artifacts/api-server` except where they affect public crawlability or web asset delivery
- Mobile app in `artifacts/vaani-mobile`
- Dev-only `artifacts/mockup-sandbox`

## Target audience
- Patients preparing for doctor visits, especially people who want help organizing questions before an appointment.
- Multilingual patients who may search in English, Spanish, Hindi, Urdu, and other supported languages.

## Primary keywords
- doctor visit questions
- questions to ask your doctor
- prepare for a doctor appointment
- patient visit prep

## Dismissed categories
- (None yet)

## Notes
- Current public site is a Vite + React SPA using Wouter routing.
- Public routes discovered from source: `/` and `/privacy`.
- Static HTML shell is `artifacts/my-visit-prep/index.html`; page body content is rendered client-side from `src/main.tsx`.
- Production artifact serves `dist/public` statically and rewrites `/*` to `/index.html`, so unknown public URLs currently resolve through the SPA shell unless explicit files or prerendered routes exist.
- The app ships many language packs in `src/i18n`, so locale routing and crawlable language variants are part of the SEO surface.
