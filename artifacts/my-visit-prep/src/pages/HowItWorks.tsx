import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { FileText, Sparkles, Stethoscope } from "lucide-react";
import { HOW_IT_WORKS_CONTENT } from "@workspace/vaani-core/information";

const stepIcons = [FileText, Sparkles, Stethoscope] as const;

export default function HowItWorks() {
  return (
    <>
      <Helmet>
        <title>{HOW_IT_WORKS_CONTENT.seoTitle}</title>
        <meta name="description" content={HOW_IT_WORKS_CONTENT.seoDescription} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-5 py-10 sm:py-16 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-how-it-works-heading">
            {HOW_IT_WORKS_CONTENT.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {HOW_IT_WORKS_CONTENT.introduction}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 relative">
          {/* Connector line for desktop */}
          <div className="hidden sm:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-primary/20 z-0" aria-hidden="true" />

          {HOW_IT_WORKS_CONTENT.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full bg-card border-4 border-background shadow-sm flex items-center justify-center mb-6 ${index === 1 ? "text-secondary" : "text-primary"}`}>
                  <Icon className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground text-base font-semibold hover:opacity-90 transition-opacity"
            data-testid="button-start-prep"
          >
            {HOW_IT_WORKS_CONTENT.callToAction}
          </Link>
        </div>
      </div>
    </>
  );
}