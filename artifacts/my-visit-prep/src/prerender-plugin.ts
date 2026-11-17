import type { Plugin } from "vite";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { LanguageData, LangCode } from "./i18n/types";
import { LANG_MAP, RTL_LANGS as rtlLanguages } from "@workspace/vaani-core/content";
import { escapeHtml as escHtml } from "@workspace/vaani-core";
import { privacyPolicy as policy } from "./content/privacy";

const RTL_LANGS = new Set<LangCode>(rtlLanguages);

const NON_ENGLISH_LANGS = (Object.keys(LANG_MAP) as LangCode[]).filter(
  (l) => l !== "en",
);

function buildStaticContent(t: LanguageData): string {
  const conditionItems = t.conditions
    .map((c) => `<li>${escHtml(c.label)}</li>`)
    .join("");

  return [
    `<div style="font-family:sans-serif;max-width:680px;margin:0 auto;padding:24px 16px">`,
    `<h1 style="font-size:1.75rem;font-weight:700;margin-bottom:.5rem">${escHtml(t.ui.heroHeading)}</h1>`,
    `<p style="margin-bottom:1.25rem;color:#555">${escHtml(t.ui.heroDescription)}</p>`,
    `<p style="font-weight:600;margin-bottom:.5rem">${escHtml(t.ui.conditionSelectLabel)}</p>`,
    `<ul style="padding-left:1.25rem;color:#333">${conditionItems}</ul>`,
    `</div>`,
  ].join("");
}

function buildPrivacyContent(): string {
  return [
    `<div style="font-family:sans-serif;max-width:680px;margin:0 auto;padding:24px 16px">`,
    `<h1 style="font-size:1.75rem;font-weight:700;margin-bottom:.5rem">Privacy Policy</h1>`,
    `<p style="color:#888;margin-bottom:1rem">Effective date: ${escHtml(policy.effectiveDate)} · Applies to the Vaani mobile app and the Vaani website</p>`,
    `<p>Operator: ${escHtml(policy.operator)}</p>`,
    `<p>${escHtml(policy.notice)}</p>`,
    ...policy.sections.map((section) => [
      `<section id="${escHtml(section.id)}"><h2 style="font-size:1.1rem;font-weight:600;margin-top:1.5rem">${escHtml(section.title)}</h2>`,
      ...section.paragraphs.map((paragraph) => `<p>${escHtml(paragraph)}</p>`),
      section.items
        ? `<ul>${section.items.map((item) => `<li>${escHtml(item)}</li>`).join("")}</ul>`
        : "",
      `</section>`,
    ].join("")),
    `<h2 style="font-size:1.1rem;font-weight:600;margin-top:1.5rem">Contact</h2>`,
    `<p>For privacy questions or requests, email ${escHtml(policy.operator)} at <a href="mailto:${escHtml(policy.contactEmail)}">${escHtml(policy.contactEmail)}</a> or contact us through <a href="${escHtml(policy.contactUrl)}">yourvoicefirst.org</a>.</p>`,
    `</div>`,
  ].join("");
}

function injectContent(html: string, content: string): string {
  return html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
}

function applyLocaleMeta(
  html: string,
  lang: LangCode,
  t: LanguageData,
  appUrl: string,
  path: string,
  privacyPage = false,
): string {
  const dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
  const canonicalUrl = `${appUrl}${path}`;
  const title = privacyPage
    ? "Privacy Policy — Vaani"
    : `${escHtml(t.ui.appTitle)} — ${escHtml(t.ui.appSubtitle)}`;
  const description = escHtml(privacyPage ? policy.description : t.ui.heroDescription);

  return html
    .replace(/(<html)[^>]*(>)/, `$1 lang="${lang}" dir="${dir}"$2`)
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<link rel="canonical" href=")[^"]*(")/,
      `$1${canonicalUrl}$2`,
    )
    .replace(
      /(<meta property="og:url" content=")[^"]*(")/,
      `$1${canonicalUrl}$2`,
    )
    .replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<meta name="twitter:title" content=")[^"]*(")/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${description}$2`,
    );
}

function buildSitemap(appUrl: string): string {
  const today = new Date().toISOString().slice(0, 10);

  const urls: { loc: string; priority: string }[] = [
    { loc: `${appUrl}/`, priority: "1.0" },
    { loc: `${appUrl}/privacy`, priority: "0.5" },
  ];

  for (const lang of NON_ENGLISH_LANGS) {
    urls.push({ loc: `${appUrl}/${lang}/`, priority: "0.8" });
    urls.push({ loc: `${appUrl}/${lang}/privacy`, priority: "0.3" });
  }

  const urlEntries = urls
    .map(
      ({ loc, priority }) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
    )
    .join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urlEntries,
    `</urlset>`,
  ].join("\n");
}

export function prerenderPlugin(appUrl: string): Plugin {
  const __pluginDir = dirname(fileURLToPath(import.meta.url));
  const distDir = join(__pluginDir, "..", "dist", "public");

  return {
    name: "prerender-locales",
    apply: "build",
    closeBundle() {
      if (!existsSync(distDir)) return;

      const indexTemplate = readFileSync(join(distDir, "index.html"), "utf-8");
      const privacyTemplate = readFileSync(join(distDir, "privacy.html"), "utf-8");

      // Inject static English content into default pages
      const englishContent = buildStaticContent(LANG_MAP.en);
      const privacyContent = buildPrivacyContent();

      writeFileSync(
        join(distDir, "index.html"),
        injectContent(indexTemplate, englishContent),
      );
      writeFileSync(
        join(distDir, "privacy.html"),
        injectContent(privacyTemplate, privacyContent),
      );

      // Generate locale home + privacy pages for non-English languages
      for (const lang of NON_ENGLISH_LANGS) {
        const t = LANG_MAP[lang];
        const localePath = `/${lang}/`;

        let localeHtml = applyLocaleMeta(indexTemplate, lang, t, appUrl, localePath);
        localeHtml = injectContent(localeHtml, buildStaticContent(t));

        const outDir = join(distDir, lang);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(join(outDir, "index.html"), localeHtml);

        // Privacy page for this locale (English content, locale canonical URL)
        const privacyPath = `/${lang}/privacy`;
        let localePrivacyHtml = applyLocaleMeta(
          privacyTemplate,
          lang,
          t,
          appUrl,
          privacyPath,
          true,
        );
        localePrivacyHtml = injectContent(localePrivacyHtml, privacyContent);
        writeFileSync(join(outDir, "privacy.html"), localePrivacyHtml);
      }

      // Generate sitemap.xml
      if (appUrl) {
        writeFileSync(join(distDir, "sitemap.xml"), buildSitemap(appUrl));

        // Patch robots.txt to declare the sitemap
        const robotsPath = join(distDir, "robots.txt");
        if (existsSync(robotsPath)) {
          const existing = readFileSync(robotsPath, "utf-8").trimEnd();
          const sitemapLine = `Sitemap: ${appUrl}/sitemap.xml`;
          if (!existing.includes(sitemapLine)) {
            writeFileSync(robotsPath, `${existing}\n${sitemapLine}\n`);
          }
        }
      }

      console.log(
        `[prerender] generated English home + privacy + ${NON_ENGLISH_LANGS.length} locale home + privacy pages` +
          (appUrl ? " + sitemap.xml" : ""),
      );
    },
  };
}
