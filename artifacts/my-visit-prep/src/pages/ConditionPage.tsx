import { useParams } from "wouter";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { getTranslation, LANGUAGES } from "@/i18n";
import NotFound from "@/pages/not-found";
import type { ConditionTranslation } from "@/i18n/types";
import { MedicalSources } from "@/components/MedicalSources";

const en = getTranslation("en");

function ConditionContent({ condition }: { condition: ConditionTranslation }) {
  const pageTitle = `${condition.label} — Questions to ask your doctor | Vaani`;
  const pageDesc = `Prepare for your ${condition.label} appointment. Browse ${
    condition.categories.reduce((n, c) => n + c.questions.length, 0)
  } doctor-visit questions organized by topic — understanding, treatment, monitoring, and more.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <html lang="en" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": pageTitle,
          "description": pageDesc,
          "url": `https://vaani.shobarao.com/questions/${condition.id}`,
          "isPartOf": {
            "@type": "WebApplication",
            "name": "Vaani",
            "url": "https://vaani.shobarao.com/"
          },
          "inLanguage": LANGUAGES.map((l) => l.code)
        })}</script>
      </Helmet>

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-5 py-8 sm:py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">›</span>
            <span>{condition.label}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-2">
            {condition.label}: Questions to ask your doctor
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            Use these questions to prepare for your {condition.label} appointment.
            Check off the ones that apply to your situation, then bring your list to the doctor.
          </p>

          <Link
            href="/"
            className="
              inline-flex items-center gap-2 mb-8
              px-5 py-3 rounded-xl
              bg-primary text-primary-foreground
              text-sm font-semibold
              hover:opacity-90 active:opacity-80
              focus:outline-none focus:ring-2 focus:ring-primary/30
              transition-opacity
            "
          >
            Open interactive checklist →
          </Link>

          {condition.categories.length > 0 ? (
            <div className="space-y-8">
              {condition.categories.map((cat) => (
                <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
                  <h2
                    id={`cat-${cat.id}`}
                    className="text-base font-semibold text-foreground uppercase tracking-wide mb-3 pb-2 border-b border-border"
                  >
                    {cat.title}
                  </h2>
                  <ul className="space-y-2">
                    {cat.questions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
                        <span className="flex-shrink-0 w-4 h-4 mt-0.5 rounded border border-border bg-card" aria-hidden="true" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Questions for this topic are coming soon. Use the interactive tool to add your own.
            </p>
          )}

          {condition.subtypes && condition.subtypes.length > 0 && (
            <div className="mt-10 space-y-8">
              <h2 className="text-xl font-bold text-foreground">
                Questions by type
              </h2>
              {condition.subtypes.map((subtype) => (
                <section key={subtype.id} aria-labelledby={`subtype-${subtype.id}`}>
                  <h3
                    id={`subtype-${subtype.id}`}
                    className="text-base font-semibold text-foreground mb-4"
                  >
                    {subtype.label}
                  </h3>
                  <div className="space-y-6 pl-4 border-l-2 border-border">
                    {subtype.categories.map((cat) => (
                      <div key={cat.id}>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          {cat.title}
                        </h4>
                        <ul className="space-y-2">
                          {cat.questions.map((q, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
                              <span className="flex-shrink-0 w-4 h-4 mt-0.5 rounded border border-border bg-card" aria-hidden="true" />
                              {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          <MedicalSources conditionId={condition.id} />

          <div className="mt-12 pt-6 border-t border-border">
            <h2 className="text-base font-semibold text-foreground mb-4">
              Browse questions for other conditions
            </h2>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {en.conditions
                .filter((c) => c.id !== condition.id)
                .map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/questions/${c.id}`}
                      className="text-sm text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
      </div>
    </>
  );
}

export default function ConditionPage() {
  const { conditionId } = useParams<{ conditionId: string }>();
  const condition = en.conditions.find((c) => c.id === conditionId);

  if (!condition) return <NotFound />;

  return <ConditionContent condition={condition} />;
}
