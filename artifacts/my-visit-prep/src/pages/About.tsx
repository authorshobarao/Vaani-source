import { Helmet } from "react-helmet-async";
import { ABOUT_CONTENT } from "@workspace/vaani-core/information";

export default function About() {
  return (
    <>
      <Helmet>
        <title>{ABOUT_CONTENT.seoTitle}</title>
        <meta name="description" content={ABOUT_CONTENT.seoDescription} />
      </Helmet>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-5 py-10 sm:py-16 w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6" data-testid="text-about-heading">
          {ABOUT_CONTENT.title}
        </h1>
        
        <div className="prose prose-stone max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed font-medium mb-8">
            {ABOUT_CONTENT.mission}
          </p>

          <div className="space-y-6 text-foreground leading-relaxed text-base">
            {ABOUT_CONTENT.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className="mt-12 p-8 bg-card rounded-2xl border border-border shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-4">{ABOUT_CONTENT.founderNoteTitle}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed italic">
              {ABOUT_CONTENT.founderNote.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-6 font-semibold text-foreground">
              —{" "}
              <a
                href={ABOUT_CONTENT.founderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
                data-testid="link-founder-website"
              >
                {ABOUT_CONTENT.founderName}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}