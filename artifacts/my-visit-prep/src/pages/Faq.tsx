import { Helmet } from "react-helmet-async";
import { FAQ_CONTENT } from "@workspace/vaani-core/information";

function FaqItem({ question, answer, id }: { question: string, answer: string, id: string }) {
  return (
    <details className="group border-b border-border last:border-0 py-5" data-testid={`faq-item-${id}`}>
      <summary className="flex items-center justify-between text-lg font-semibold text-foreground cursor-pointer list-none hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg outline-offset-4">
        <span>{question}</span>
        <span className="transition-transform group-open:rotate-180 flex-shrink-0 ml-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </span>
      </summary>
      <div className="pt-4 text-muted-foreground leading-relaxed text-base">
        {answer}
      </div>
    </details>
  );
}

export default function Faq() {
  return (
    <>
      <Helmet>
        <title>{FAQ_CONTENT.seoTitle}</title>
        <meta name="description" content={FAQ_CONTENT.seoDescription} />
      </Helmet>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-5 py-10 sm:py-16 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-faq-heading">
          {FAQ_CONTENT.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-10">
          {FAQ_CONTENT.introduction}
        </p>
        
        <div className="w-full">
          {FAQ_CONTENT.items.map((item) => <FaqItem key={item.id} {...item} />)}
        </div>
      </div>
    </>
  );
}