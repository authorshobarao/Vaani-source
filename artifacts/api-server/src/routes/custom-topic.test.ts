import { beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import request from "supertest";

const mocks = vi.hoisted(() => ({ generate: vi.fn(), references: vi.fn(), validate: vi.fn() }));
vi.mock("../gemini", () => ({ ai: { models: { generateContent: mocks.generate } }, GEMINI_MODEL: "test-model" }));
vi.mock("../lib/medication-references", async (original) => ({
  ...await original<typeof import("../lib/medication-references")>(),
  lookupMedicationReferences: mocks.references,
  validateMedicationName: mocks.validate,
}));
import router from "./custom-topic";

const app = express();
app.use(express.json());
app.use((req, _res, next) => {
  req.log = { error: vi.fn() } as unknown as typeof req.log;
  next();
});
app.use(router);
beforeEach(() => { vi.resetAllMocks(); mocks.validate.mockResolvedValue(true); });

describe("additive medication generation mode", () => {
  it.each(Object.entries({
    en: "English", es: "Spanish", hi: "Hindi", vi: "Vietnamese", zh: "Simplified Chinese", ta: "Tamil", kn: "Kannada",
    fr: "French", pt: "Brazilian Portuguese", tl: "Tagalog", ja: "Japanese", ko: "Korean", th: "Thai",
    id: "Indonesian", bn: "Bengali", ur: "Urdu", te: "Telugu", ml: "Malayalam",
  }))("uses the selected %s language for custom questions without translating source URLs or specialty IDs", async (lang, language) => {
    const sections = Object.fromEntries(["understanding", "treatment", "monitoring", "lifestyle", "followup"].map(key => [key, [`${lang}: question`]]));
    mocks.generate.mockResolvedValue({ text: JSON.stringify({ ...sections, specialists: [{ name: "Rheumatologist", description: "Ignored" }] }) });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<nlmSearchResult/>")));
    const res = await request(app).post("/").send({ topic: "lupus", lang, includeSpecialists: true });
    vi.unstubAllGlobals();
    expect(res.status).toBe(200);
    expect(res.body.sections).toEqual(sections);
    expect(res.body.specialists[1].name).toBe("Rheumatologist");
    const system = mocks.generate.mock.calls[0][0].config.systemInstruction;
    expect(system).toContain(`respond in ${language}`);
    if (lang !== "en") expect(system).toContain(`in ${language}. Keep the patient's first-person voice`);
  });
  it("translates only retrieved label excerpts for a non-English medication, retaining drug/source names and URLs", async () => {
    const sections = Object.fromEntries(["understanding", "safety", "sideEffects", "monitoring"].map(key => [key, ["¿Qué debo preguntar?"]]));
    const excerpt = { foodAlcohol: ["No debe beber alcohol."], otherDrugs: ["Consulte con su farmacéutico."] };
    mocks.generate.mockResolvedValueOnce({ text: JSON.stringify(sections) }).mockResolvedValueOnce({ text: JSON.stringify(excerpt) });
    mocks.references.mockResolvedValue({ article: { name: "metformin", url: "https://medlineplus.gov/druginfo/" },
      medication: { foodAlcohol: ["Do not drink alcohol."], otherDrugs: ["Check with your pharmacist."],
        sources: [{ name: "DailyMed", url: "https://dailymed.nlm.nih.gov/" }] } });
    const res = await request(app).post("/").send({ topic: "metformin", lang: "es", mode: "medication" });
    expect(res.status).toBe(200);
    expect(res.body.medication.foodAlcohol).toEqual(excerpt.foodAlcohol);
    expect(res.body.medication.sources[0].name).toBe("DailyMed");
    expect(res.body.article.name).toBe("metformin");
    const prompt = mocks.generate.mock.calls[1][0].contents[0].parts[0].text;
    expect(prompt).toContain("Translate these official-label excerpts faithfully into Spanish");
    expect(prompt).toContain("Do not add, summarize, infer, or recommend anything");
  });
  it("never falls back to English interaction excerpts when translation fails", async () => {
    mocks.generate.mockResolvedValueOnce({ text: JSON.stringify(Object.fromEntries(["understanding", "safety", "sideEffects", "monitoring"].map(key => [key, ["¿Qué debo preguntar?"]]))) })
      .mockRejectedValueOnce(new Error("Translation unavailable"));
    mocks.references.mockResolvedValue({ article: { name: "metformin", url: "https://medlineplus.gov/" },
      medication: { foodAlcohol: ["English excerpt"], otherDrugs: [], sources: [] } });
    const res = await request(app).post("/").send({ topic: "metformin", lang: "es", mode: "medication" });
    expect(res.status).toBe(200);
    expect(res.body.medication.foodAlcohol).toEqual([]);
    expect(JSON.stringify(res.body)).not.toContain("English excerpt");
  });
  it("regenerates once if a native condition answer misses patient voice, without redoing the source lookup", async () => {
    const sections = Object.fromEntries(
      [["understanding", 4], ["treatment", 3], ["monitoring", 3], ["lifestyle", 3], ["followup", 3]].map(([key, count]) =>
        [key, Array.from({ length: Number(count) }, () => "What should I monitor?")],
      ),
    );
    const bad = { ...sections, understanding: ["What is lupus?"] };
    mocks.generate.mockResolvedValueOnce({ text: JSON.stringify(bad) })
      .mockResolvedValueOnce({ text: JSON.stringify(sections) });
    const search = vi.fn().mockResolvedValue(new Response("<nlmSearchResult/>"));
    vi.stubGlobal("fetch", search);
    const res = await request(app).post("/").send({ topic: "lupus", lang: "en", mode: "condition" });
    vi.unstubAllGlobals();
    expect(res.status).toBe(200);
    expect(res.body.sections).toEqual(sections);
    expect(mocks.generate).toHaveBeenCalledTimes(2);
    expect(search).toHaveBeenCalledTimes(1);
  });
  it("returns all 16 native condition questions and the top NLM result without changing default callers", async () => {
    const sections = Object.fromEntries(
      [["understanding", 4], ["treatment", 3], ["monitoring", 3], ["lifestyle", 3], ["followup", 3]].map(([key, count]) =>
        [key, Array.from({ length: Number(count) }, (_, i) => `What should I ask about ${key} ${i}?`)],
      ),
    );
    mocks.generate.mockResolvedValue({ text: JSON.stringify(sections) });
    const search = vi.fn().mockResolvedValue(new Response(
      '<nlmSearchResult><document rank="0" url="https://medlineplus.gov/lupus.html"><content name="title">Lupus</content></document></nlmSearchResult>',
    ));
    vi.stubGlobal("fetch", search);
    const res = await request(app).post("/").send({ topic: "lupus", lang: "en", mode: "condition" });
    vi.unstubAllGlobals();
    expect(res.status).toBe(200);
    expect(res.body.sections).toEqual(sections);
    expect(res.body.article.url).toBe("https://medlineplus.gov/lupus.html");
    expect(search.mock.calls[0][0]).toContain("db=healthTopics&term=lupus");
    expect(mocks.generate.mock.calls[0][0].contents[0].parts[0].text).toContain("Never write 'my doctor' or 'your doctor'");
    expect(mocks.references).not.toHaveBeenCalled();
  });
  it.each(["What should I ask my doctor?", "What should your doctor tell me?", "How has my condition changed since my last visit?", "What are the risks?"])(
    "rejects a native condition response with missing patient-voice questions: %s", async badQuestion => {
      const sections = Object.fromEntries(
        [["understanding", 4], ["treatment", 3], ["monitoring", 3], ["lifestyle", 3], ["followup", 3]].map(([key, count]) =>
          [key, Array.from({ length: Number(count) }, () => "What should I monitor?")],
        ),
      );
      sections.understanding[0] = badQuestion;
      mocks.generate.mockResolvedValue({ text: JSON.stringify(sections) });
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<nlmSearchResult/>")));
      const res = await request(app).post("/").send({ topic: "lupus", lang: "en", mode: "condition" });
      vi.unstubAllGlobals();
      expect(res.status).toBe(500);
      expect(res.body).not.toHaveProperty("sections");
    },
  );
  it("keeps omitted mode on the original condition prompt/schema and response shape", async () => {
    const sections = Object.fromEntries(["understanding", "treatment", "monitoring", "lifestyle", "followup"].map(key => [key, ["Original condition question"]]));
    mocks.generate.mockResolvedValue({ text: JSON.stringify(sections) });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<nlmSearchResult/>")));
    const res = await request(app).post("/").send({ topic: "lupus", lang: "en" });
    vi.unstubAllGlobals();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ sections, article: { name: "MedlinePlus", url: "https://medlineplus.gov/" } });
    expect(mocks.references).not.toHaveBeenCalled();
    expect(mocks.validate).not.toHaveBeenCalled();
    const config = mocks.generate.mock.calls[0][0].config;
    expect(config.responseSchema.required).toEqual(Object.keys(sections));
    expect(config.systemInstruction).not.toContain("This is medication mode");
    expect(config.responseSchema.properties).not.toHaveProperty("specialists");
  });
  it.each([
    ["lupus", "Rheumatologist"],
    ["high heart rate", "Cardiologist"],
    ["asdfgh", "Primary care doctor"],
  ])("adds allowlisted structured specialist guidance for web condition %s using the same generation call", async (topic, specialty) => {
    const sections = Object.fromEntries(["understanding", "treatment", "monitoring", "lifestyle", "followup"].map(key => [key, ["What should I ask?"]]));
    mocks.generate.mockResolvedValue({ text: JSON.stringify({ ...sections, specialists: [
      { name: "Dr Example", description: "Find my clinic online" },
      { name: specialty, description: "Untrusted generated description" },
    ] }) });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<nlmSearchResult/>")));
    const res = await request(app).post("/").send({ topic, lang: "en", includeSpecialists: true });
    vi.unstubAllGlobals();
    expect(res.status).toBe(200);
    expect(res.body.sections).toEqual(sections);
    expect(res.body.specialists[0].name).toBe("Primary care doctor");
    expect(res.body.specialists.map((item: { name: string }) => item.name)).toContain(specialty);
    expect(JSON.stringify(res.body.specialists)).not.toMatch(/Dr Example|clinic|Untrusted/);
    expect(mocks.generate).toHaveBeenCalledTimes(1);
    const prompt = mocks.generate.mock.calls[0][0].contents[0].parts[0].text;
    expect(prompt).toContain("not a real condition or symptom");
    expect(prompt).toContain("Never name individual doctors, clinics, or organizations");
  });
  it("reuses generation with medication groups but takes interactions only from verified lookup", async () => {
    const sections = Object.fromEntries(["understanding", "safety", "sideEffects", "monitoring"].map(key => [key, [`What should I ask about ${key}?`]]));
    sections.safety.push("Should I take 500 mg?", "Take this medicine every day.", "What should I discuss with my doctor?", "What should your doctor recommend for me?", "What are the side effects?");
    mocks.generate.mockResolvedValue({ text: JSON.stringify({ ...sections, interactions: ["What should I discuss with my doctor?"], medication: { foodAlcohol: ["Invented AI claim"] } }) });
    const verified = { article: { name: "Metformin", url: "https://medlineplus.gov/druginfo/meds/a696005.html" }, medication: { foodAlcohol: ["Verified label excerpt"], otherDrugs: [], sources: [] } };
    mocks.references.mockResolvedValue(verified);
    const res = await request(app).post("/").send({ topic: "metformin", lang: "en", mode: "medication", includeSpecialists: true });
    expect(res.status).toBe(200);
    expect(res.body.medication).toEqual(verified.medication);
    expect(res.body.sections.safety).toEqual(["What should I ask about safety?"]);
    expect(mocks.references).toHaveBeenCalledWith("metformin");
    expect(mocks.validate).toHaveBeenCalledWith("metformin");
    const config = mocks.generate.mock.calls[0][0].config;
    expect(config.systemInstruction).toContain("Never supply a dose");
    expect(config.systemInstruction).toContain("Write each question in first person, as the patient asking their doctor directly.");
    expect(config.systemInstruction).toContain("Never refer to 'my doctor' or 'your doctor' inside a question.");
    expect(config.responseSchema.required).not.toContain("interactions");
    expect(res.body.sections).not.toHaveProperty("interactions");
    expect(res.body).not.toHaveProperty("specialists");
    expect(JSON.stringify(res.body.sections)).not.toMatch(/my doctor|your doctor/i);
    expect(JSON.stringify(res.body)).not.toContain("Invented AI claim");
  });
  it.each(["metformn", "asdfgh"])("rejects unverified %s before generating questions or interaction references", async topic => {
    mocks.validate.mockResolvedValue(false);
    const res = await request(app).post("/").send({ topic, lang: "en", mode: "medication" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "We couldn't find that medication. Please check the spelling and try again." });
    expect(mocks.generate).not.toHaveBeenCalled();
    expect(mocks.references).not.toHaveBeenCalled();
  });
  it("waits for authoritative validation to finish before starting any generation or interactions", async () => {
    let finishValidation!: (valid: boolean) => void;
    let markStarted!: () => void;
    const started = new Promise<void>(resolve => { markStarted = resolve; });
    mocks.validate.mockImplementation(() => {
      markStarted();
      return new Promise<boolean>(resolve => { finishValidation = resolve; });
    });
    const pending = request(app).post("/").send({ topic: "Ozempic", mode: "medication" }).then(res => res);
    await started;
    expect(mocks.generate).not.toHaveBeenCalled();
    expect(mocks.references).not.toHaveBeenCalled();
    finishValidation(false);
    expect((await pending).status).toBe(400);
  });
  it("rejects invalid modes before generating or looking up medication data", async () => {
    expect((await request(app).post("/").send({ topic: "metformin", lang: "en", mode: "anything" })).status).toBe(400);
    expect(mocks.generate).not.toHaveBeenCalled();
    expect(mocks.references).not.toHaveBeenCalled();
    expect(mocks.validate).not.toHaveBeenCalled();
  });
});
