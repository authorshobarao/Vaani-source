import { type Specialist } from "@/content/specialists";
import { translatedSpecialists } from "@workspace/vaani-core/content/features";
import { useLanguage } from "@/i18n";

export function SpecialistCard({ specialists }: { specialists: Specialist[] }) {
  const { t } = useLanguage();
  return (
    <section className="print-category mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-xs" data-testid="specialist-card" aria-labelledby="specialist-card-title">
      <div className="border-b border-border bg-accent/60 px-5 py-3.5">
        <h2 id="specialist-card-title" className="text-sm font-semibold text-accent-foreground">
          {t.ui.specialistHeading}
        </h2>
      </div>
      <div className="space-y-3 px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">{t.ui.specialistTitle}</h3>
        <ul className="space-y-3 text-sm leading-relaxed text-foreground">
          {translatedSpecialists(specialists, t.ui).map(specialist => (
            <li key={specialist.name}>
              <span className="font-semibold">{specialist.name}:</span>{" "}{specialist.description}
            </li>
          ))}
        </ul>
        <p className="border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
          {t.ui.specialistNote}
        </p>
      </div>
    </section>
  );
}
