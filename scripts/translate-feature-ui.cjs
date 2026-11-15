// Generates translation data only; existing source files are edited separately.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const apiRequire = createRequire(path.resolve("artifacts/api-server/package.json"));
const ts = apiRequire("typescript");
const { GoogleGenAI } = apiRequire("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: { baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL, apiVersion: "" } });
function load(file) {
  const exports = {};
  vm.runInNewContext(ts.transpile(fs.readFileSync(file, "utf8"), { module: ts.ModuleKind.CommonJS }), {
    exports, require: name => load(path.join(path.dirname(file), `${name}.ts`)),
  });
  return exports;
}
const { FEATURE_EN } = load("lib/vaani-core/src/content/features.ts");
const languages = { es:"Spanish",hi:"Hindi",vi:"Vietnamese",zh:"Simplified Chinese",ta:"Tamil",kn:"Kannada",
  fr:"French",pt:"Brazilian Portuguese",tl:"Tagalog",ja:"Japanese",ko:"Korean",th:"Thai",id:"Indonesian",
  bn:"Bengali",ur:"Urdu",te:"Telugu",ml:"Malayalam" };
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
function validate(original, result) {
  for (const [key, value] of Object.entries(original)) {
    if (typeof value === "string") {
      if (typeof result?.[key] !== "string" || !result[key].trim()) throw new Error(`Missing ${key}`);
      for (const token of value.match(/\{[^}]+\}/g) ?? []) if (!result[key].includes(token)) throw new Error(`Lost placeholder ${key}`);
    } else validate(value, result?.[key]);
  }
}
async function translate(source, language) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await ai.models.generateContent({ model:"gemini-2.5-flash",
        contents:`Translate every STRING VALUE in this JSON into ${language}, using clear patient-friendly health app language. Keep every JSON key EXACTLY unchanged, including English specialty names used as IDs. Keep placeholders such as {name} and {topic} unchanged. Keep Vaani, MedlinePlus, NIH, AHRQ, CDC, FDA, DailyMed and drug names metformin/Ozempic unchanged. Translate specialist display names and descriptions, not their object keys. Do not add medical advice. Return only the same JSON object.\n${JSON.stringify(source)}`,
        config:{ responseMimeType:"application/json", maxOutputTokens:8192, thinkingConfig:{thinkingBudget:0} } });
      const result = JSON.parse(response.text);
      validate(source, result);
      return result;
    } catch(error) {
      if (attempt === 4) throw error;
      console.log(`Retry ${language}: ${error.message.slice(0,90)}`);
      await wait(5000 * 2 ** attempt);
    }
  }
}
async function main() {
  const results = { en: FEATURE_EN };
  const { specialties, ...labels } = FEATURE_EN;
  // Two bounded workers; checkpoints allow resuming without repeated AI calls.
  const queue = Object.entries(languages);
  await Promise.all([0,1].map(async () => {
    for (;;) {
      const item = queue.shift();
      if (!item) return;
      const [code, language] = item;
      const checkpoint = `/tmp/vaani-features-${code}.json`;
      if (fs.existsSync(checkpoint)) {
        results[code] = JSON.parse(fs.readFileSync(checkpoint,"utf8"));
        const missing = Object.fromEntries(Object.entries(labels).filter(([key]) => !results[code][key]));
        if (Object.keys(missing).length) {
          Object.assign(results[code], await translate(missing, language));
          fs.writeFileSync(checkpoint, JSON.stringify(results[code]));
        }
      }
      else {
        const translatedLabels = await translate(labels, language);
        const translatedSpecialties = await translate(specialties, language);
        results[code] = { ...translatedLabels, specialties: translatedSpecialties };
        fs.writeFileSync(checkpoint, JSON.stringify(results[code]));
      }
      validate(FEATURE_EN, results[code]);
      console.log(`Translated ${code}`);
      await wait(1500);
    }
  }));
  const ordered = Object.fromEntries(["en", ...Object.keys(languages)].map(code => [code, results[code]]));
  fs.writeFileSync("lib/vaani-core/src/content/feature-translations.ts",
    '// Generated translation data. English source: features.ts.\nimport type { FeatureStrings } from "./features";\n' +
    'export const FEATURE_TRANSLATIONS: Record<string, FeatureStrings> = ' + JSON.stringify(ordered,null,2) + ';\n');
  console.log("All 18 language feature bundles generated.");
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
