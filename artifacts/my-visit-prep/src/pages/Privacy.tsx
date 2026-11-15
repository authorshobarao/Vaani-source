import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { privacyPolicy as policy } from "../content/privacy";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Vaani</title>
        <meta name="description" content={policy.description} />
        <link rel="canonical" href={`${import.meta.env.VITE_APP_URL ?? ""}/privacy`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${import.meta.env.VITE_APP_URL ?? ""}/privacy`} />
        <meta property="og:title" content="Privacy Policy — Vaani" />
        <meta property="og:description" content={policy.description} />
        <meta name="twitter:title" content="Privacy Policy — Vaani" />
        <meta name="twitter:description" content={policy.description} />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-700">
          ← Back to Vaani
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-stone-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-stone-500">
          Effective date: {policy.effectiveDate} · Applies to the Vaani mobile app
          and the Vaani website
        </p>
        <p className="mt-2 text-sm text-stone-700">Operator: {policy.operator}</p>
        <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {policy.notice}
        </div>
        <div className="mt-8 space-y-8 text-stone-700 leading-relaxed">
          {policy.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-xl font-semibold text-stone-900">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-2">{paragraph}</p>
              ))}
              {section.items && (
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}
          <section id="contact">
            <h2 className="text-xl font-semibold text-stone-900">Contact</h2>
            <p className="mt-2">
              For privacy questions or requests, contact {policy.operator} through{" "}
              <a href={policy.contactUrl} className="text-[#3a826a] underline"
                target="_blank" rel="noopener noreferrer">
                yourvoicefirst.org
              </a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
