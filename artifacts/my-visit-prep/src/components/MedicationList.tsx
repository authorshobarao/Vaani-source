import { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n";

/** Patient-entered review list only. Never sent to an AI or interaction checker. */
export function MedicationList({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const { t: { ui } } = useLanguage();
  function addItem() {
    const name = draft.replace(/\s+/g, " ").trim();
    if (!name) return;
    if (!items.some(item => item.toLowerCase() === name.toLowerCase())) {
      onChange([...items, name]);
    }
    setDraft("");
  }

  return (
    <section className="print-category rounded-xl border border-border bg-card shadow-xs overflow-hidden" data-testid="category-interactions">
      <div className="no-print px-5 py-3.5 bg-accent/60 border-b border-border">
        <h3 className="text-sm font-semibold text-accent-foreground uppercase tracking-wide">{ui.interactionsTitle}</h3>
      </div>
      <div className="print-category-title hidden" aria-hidden="true">{ui.interactionsTitle}</div>
      <div className="p-5 space-y-3">
        <form className="no-print space-y-2" onSubmit={event => { event.preventDefault(); addItem(); }}>
          <label htmlFor="other-medication-input" className="block text-sm font-semibold text-foreground">
            {ui.medicationListTitle}
          </label>
          <p id="other-medication-help" className="text-sm text-muted-foreground">
            {ui.medicationListHelp}
          </p>
          <div className="flex gap-2">
            <input
              id="other-medication-input"
              data-testid="input-other-medication"
              aria-describedby="other-medication-help"
              value={draft}
              onChange={event => setDraft(event.target.value)}
              maxLength={200}
              autoComplete="off"
              className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              data-testid="button-add-medication"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >{ui.add}</button>
          </div>
        </form>
        <p className="hidden print-category-title" aria-hidden="true">{ui.medicationListTitle}</p>
        {items.length ? (
          <ul className="space-y-2" data-testid="other-medications-list" aria-label={ui.medicationListTitle}>
            {items.map(item => (
              <li key={item} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm">
                <span className="min-w-0 break-words">{item}</span>
                <button
                  type="button"
                  aria-label={ui.removeItem.replace("{name}", item)}
                  onClick={() => onChange(items.filter(value => value !== item))}
                  className="no-print shrink-0 rounded-md p-2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                ><X className="h-4 w-4" aria-hidden="true" /></button>
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-muted-foreground">{ui.noItems}</p>}
      </div>
    </section>
  );
}
