import { Link, useLocation } from "wouter";
import { useState } from "react";
import vaaniLogoUrl from "@assets/Vaani_logo_1784941198328.png";
import { Menu, X } from "lucide-react";
import { useLanguage, LANGUAGES } from "@/i18n";
import type { LangCode, UIStrings } from "@/i18n/types";
import {
  ABOUT_CONTENT,
  FAQ_CONTENT,
  HOW_IT_WORKS_CONTENT,
} from "@workspace/vaani-core/information";

function LanguageSwitcher({
  lang,
  setLang,
  t,
}: {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: UIStrings;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <label
        htmlFor="language-select"
        className="hidden md:inline text-sm font-normal text-[#8A8378]"
      >
        Language
      </label>
      <select
        id="language-select"
        value={lang}
        onChange={(e) => setLang(e.target.value as LangCode)}
        aria-label={t.languageLabel}
        className="
          text-sm bg-card border border-border rounded-lg
          pl-2 pr-6 py-1.5 text-foreground appearance-none
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          cursor-pointer transition-colors
        "
        style={{ backgroundImage: "none" }}
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: HOW_IT_WORKS_CONTENT.navTitle },
    { href: "/about", label: ABOUT_CONTENT.navTitle },
    { href: "/faq", label: FAQ_CONTENT.navTitle },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <header className="no-print sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 h-16 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 min-w-0 hover:opacity-80 transition-opacity" data-testid="link-nav-logo">
            <div className="flex-shrink-0 w-8 h-8 rounded-xl overflow-hidden shadow-sm bg-white">
              <img src={vaaniLogoUrl} alt="Vaani logo" className="w-full h-full object-cover scale-[2.4] translate-y-[12%]" />
            </div>
            <span className="text-xl font-bold text-foreground leading-tight tracking-tight">
              Vaani
            </span>
          </Link>

          <div className="flex items-center gap-4 ml-auto">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
              {navLinks.map(link => {
                const isExact = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isExact ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <LanguageSwitcher lang={lang} setLang={setLang} t={t.ui} />

            {/* Mobile Nav Toggle */}
            <button
              className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <nav id="mobile-navigation" className="md:hidden border-t border-border bg-card px-4 py-4 flex flex-col gap-2 shadow-lg" aria-label="Mobile Navigation">
            {navLinks.map(link => {
              const isExact = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isExact ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>

      <footer className="no-print border-t border-border bg-muted/50 mt-auto" role="contentinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 py-5 flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground text-center" data-testid="text-disclaimer">
            {t.ui.disclaimer}
          </p>
          <p className="text-xs text-muted-foreground/80 text-center">
            © 2026{" "}
            <a
              href="https://yourvoicefirst.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
              data-testid="link-owner-website"
            >
              Your voice First
            </a>
            .{" "}
            <a
              href={`${import.meta.env.BASE_URL}privacy`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
              data-testid="link-privacy-policy"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}