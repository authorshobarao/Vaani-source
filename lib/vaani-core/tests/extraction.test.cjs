const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");
const ts = require("typescript");
const root = path.resolve(__dirname, "../../..");
function load(relative) {
  const exports = {};
  vm.runInNewContext(ts.transpile(fs.readFileSync(path.join(root, relative), "utf8"), {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
  }), { exports, Date, Math, require: (name) => {
    assert.ok(name.startsWith("."), `Core tests must not load platform modules: ${name}`);
    return load(path.join(path.dirname(relative), `${name}.ts`));
  } });
  return exports;
}
// Semantic hashes of all original mobile languages, a strict superset of the
// original web languages (the audit found only five additional UI keys).
// uploadHint was intentionally reworded in Nov 2026 to name Google Gemini.
const hashes = {
  en: "c40b8ea00361d56cedae178649134aa255225d52b7fbcdb9c486dd508375f641",
  es: "33da063d987f67610dbd52b79e63b18bd8ac1cc42b7b3cd48e028312d748f6b5",
  hi: "3efedaa8d23364b5f4bc5c868ca25f15aeda894a3a44549905b720103630a2fb",
  vi: "5c046aac699cf8ec52aef5794dbaa12e263a1a7c579969d6a13cb531034e1ef6",
  zh: "a0f4089a86c786443c2924821c9942c4d0d050bb3a31ca663183323980185f38",
  ta: "549e99ea7052a4e050ee5b411847085a201aca264943fc9884f4940d80813f9c",
  kn: "ca8cdf31d2d7096e6dae9a90ec0a342577b897ed5db473f4818b003d982f0c02",
  fr: "1383cf426e07e606b23f1b65ccaefdee42396c2ebc417d04debe0ddd05a9692c",
  pt: "27171e7403dd946426daf5add273d226ffbbd6fefac560c613aa40683de90474",
  tl: "d5cb7d60c31ad052c0a36f5120ba121b8898ea67ac41869f491f7bcd59dced95",
  ja: "7a66ba2df5cda27159c87047d22b953faf4f6380ddb39065ca22c5d62ee4ed28",
  ko: "d480ad8a01790210c18eac662b61d1edecc8196b9814e786b7e956d725f4ca61",
  th: "99a4dda6e04eee561567acc6122e108077a7fd477f853a64682bed33773f03b5",
  id: "a7ff78a33c0e819465700a61f07a536b741c47384974b509ac51d537c1b15871",
  bn: "70177876f84bcfde2b42f42c84c4e61a2ce8a1a49fa8943a4f40533ba0fd797f",
  ur: "5cca9e4f76a8945bf51e76458a6aec1459b45cfc6ecd5808fce479b7ff79683c",
  te: "75db2dd05b6de8541049a9c24ab66de69f35fac725375b4136005ac23cb04876",
  ml: "08e8c549365326ff760549f3cd47ed63f71c14160144a99a77c73a1431bb0be1",
};
for (const [code, hash] of Object.entries(hashes)) {
  test(`preserves every original ${code} question and translation`, () => {
    const content = load(`lib/vaani-core/src/content/${code}.ts`).default;
    // New feature keys are additive. Keep the original-content preservation
    // assertion strict instead of replacing its baseline hashes.
    const featureKeys = new Set(Object.keys(load("lib/vaani-core/src/content/features.ts").FEATURE_EN));
    const original = { ...content, ui: Object.fromEntries(Object.entries(content.ui).filter(([key]) => !featureKeys.has(key))) };
    assert.equal(crypto.createHash("sha256").update(JSON.stringify(original)).digest("hex"), hash);
  });
}
test("v1 state migration preserves checked/answer keys and rejects malformed state", () => {
  const { parsePrepState, qKey } = load("lib/vaani-core/src/prep.ts");
  const key = qKey("diabetes", "understanding", 2);
  assert.equal(key, "diabetes::understanding::2");
  const state = parsePrepState({ checkedMap: { [key]: true }, answersMap: { [key]: "notes" } });
  assert.equal(state.checkedMap[key], true);
  assert.equal(state.answersMap[key], "notes");
  assert.equal(state.customTopics.length, 0);
  for (const value of [null, [], { answersMap: [] }, { checkedMap: { x: "true" } }, { customTopics: [{ id: "x" }] }]) {
    assert.throws(() => parsePrepState(value), /Invalid saved preparation/);
  }
});
test("all 18 languages provide every feature string, placeholder, and allowlisted specialty translation", () => {
  const { FEATURE_EN, translatedSpecialists, conditionSectionTitles } = load("lib/vaani-core/src/content/features.ts");
  const { SPECIALTIES } = load("lib/vaani-core/src/content/specialists.ts");
  const check = (original, translated) => {
    for (const [key, value] of Object.entries(original)) {
      if (typeof value === "string") {
        assert.equal(typeof translated[key], "string", key);
        assert.ok(translated[key].trim(), key);
        for (const token of value.match(/\{[^}]+\}/g) ?? []) assert.ok(translated[key].includes(token), `${key} preserves ${token}`);
      } else check(value, translated[key]);
    }
  };
  for (const code of Object.keys(hashes)) {
    const language = load(`lib/vaani-core/src/content/${code}.ts`).default;
    check(FEATURE_EN, language.ui);
    assert.deepEqual(Object.keys(language.ui.specialties).sort(), Object.keys(SPECIALTIES).sort());
    const specialists = translatedSpecialists([{ name: "Rheumatologist" }], language.ui);
    assert.equal(specialists[1].name, language.ui.specialties.Rheumatologist.name);
    const { topicCategories, composeVisit } = load("lib/vaani-core/src/visit.ts");
    const categories = topicCategories({ understanding: ["patient-generated question"] }, conditionSectionTitles(language.ui));
    assert.equal(categories[0].title, language.ui.conditionUnderstanding);
    assert.equal(categories[0].questions[0], "patient-generated question");
    const visit = composeVisit(language, "diabetes", "", [], false, "followup");
    assert.equal(visit.followup.placeholder, language.ui.changedPlaceholder);
    assert.equal(visit.followup.label, language.ui.changedLabel);
  }
});
test("web and native transport adapters have identical payloads and validation", async () => {
  const { createVaaniClient } = load("lib/api-client-react/src/vaani.ts");
  for (const base of ["", "https://native.example/"]) {
    const calls = [];
    let result = { questions: ["A question"] };
    let ok = true;
    const api = createVaaniClient(async (url, init) => {
      calls.push({ url, ...init });
      return { ok, status: ok ? 200 : 503, json: async () => result };
    }, base);
    const params = { condition: "diabetes", description: "context", lang: "ta" };
    assert.equal((await api.suggestQuestions(params))[0], "A question");
    assert.equal(calls[0].url, `${base.replace(/\/$/, "")}/api/suggest-questions`);
    assert.deepEqual(JSON.parse(calls[0].body), params);
    await api.analyzeReport({ condition: "ckd", lang: "ur", file: { mediaType: "application/pdf", data: "base64" } });
    result = { sections: { treatment: ["Ask"] }, article: null };
    assert.equal((await api.customTopicQuestions({ topic: "pain", lang: "en" })).sections.treatment[0], "Ask");
    result = { text: "spoken answer" };
    assert.equal(await api.transcribeAudio({ lang: "en", audio: { mediaType: "audio/webm", data: "base64" } }), "spoken answer");
    result = { questions: [42] };
    await assert.rejects(api.suggestQuestions(params), /Invalid questions/);
    ok = false;
    await assert.rejects(api.suggestQuestions(params), /503/);
  }
});
test("historical deposit questions are preserved independently of runtime content", () => {
  const legacy = load("lib/vaani-core/src/historical/deposit-questions.ts");
  assert.equal(crypto.createHash("sha256").update(JSON.stringify(legacy)).digest("hex"), "6fd138a37776306dbe2ae157612d1c4488d90a9e2fa588d319173ac7b02584e8");
  assert.match(fs.readFileSync(path.join(root, "scripts/gen-deposit-copy.mjs"), "utf8"), /lib\/vaani-core\/src\/historical\/deposit-questions/);
  assert.equal(fs.existsSync(path.join(root, "artifacts/my-visit-prep/src/data/questions.ts")), false);
});
test("shared preparation actions preserve v1 semantics, isolation and stable replay IDs", () => {
  const { EMPTY_STATE, createPrepActions, parsePrepState } = load("lib/vaani-core/src/prep.ts");
  let state = EMPTY_STATE;
  let generated = 0;
  const actions = createPrepActions(updater => {
    const replay = updater(state);
    const result = updater(state);
    assert.equal(JSON.stringify(result), JSON.stringify(replay));
    state = result;
  }, () => `id-${++generated}`);
  actions.addCustomQuestion("ckd", "  ");
  assert.equal(generated, 0);
  actions.addCustomQuestion("ckd", "  Ask about numbers  ");
  const id = state.customQuestionsMap.ckd[0].id;
  assert.equal(state.customQuestionsMap.ckd[0].text, "Ask about numbers");
  assert.equal(generated, 1);
  actions.toggleChecked("ckd::custom::id-1");
  actions.setAnswer("ckd::custom::id-1", "  Preserve raw input  ");
  actions.setNote("ckd", "My notes");
  actions.toggleChecked("ckd::custom::id-1");
  assert.equal(state.checkedMap["ckd::custom::id-1"], false);
  assert.equal(state.answersMap["ckd::custom::id-1"], "  Preserve raw input  ");
  actions.removeCustomQuestion("ckd", id);
  assert.equal(state.customQuestionsMap.ckd.length, 0);
  assert.equal(state.answersMap["ckd::custom::id-1"], "  Preserve raw input  ");
  assert.equal(actions.addCustomTopic(" "), "");
  const topicId = actions.addCustomTopic("  My topic ");
  actions.setCustomTopicData(topicId, [{ id: "a", title: "A", questions: ["Q"] }], { name: "source", url: "https://example.org" });
  assert.equal(state.customTopics[0].label, "My topic");
  assert.equal(parsePrepState(state).customTopics[0].categories[0].questions[0], "Q");
  assert.equal(EMPTY_STATE.customTopics.length, 0);
  actions.resetAll();
  assert.equal(JSON.stringify(state), JSON.stringify(EMPTY_STATE));
});
test("selection resets dependent choices but preserves first/followup preference", () => {
  const { initialVisitSelection, createVisitSelectionActions } = load("lib/vaani-core/src/visit.ts");
  let state = initialVisitSelection("ckd");
  const actions = createVisitSelectionActions(fn => { state = fn(state); });
  actions.setCkdStage("stage-3");
  actions.setSelectedSubtypeId("old-subtype");
  actions.setTransplantChecked(v => !v);
  actions.setVisitType("followup");
  actions.selectCondition("cancer");
  assert.equal(state.selectedId, "cancer");
  assert.equal(state.selectedSubtypeId, "");
  assert.equal(state.ckdStage, "");
  assert.equal(state.transplantChecked, false);
  assert.equal(state.visitType, "followup");
});
test("visit composition preserves subtype/transplant order, keys and followup presentation across languages", () => {
  const { composeVisit, collectVisitSections } = load("lib/vaani-core/src/visit.ts");
  const { EMPTY_STATE, qKey } = load("lib/vaani-core/src/prep.ts");
  for (const code of Object.keys(hashes)) {
    const t = load(`lib/vaani-core/src/content/${code}.ts`).default;
    for (const condition of t.conditions) {
      const ids = ["", ...(condition.subtypes ?? []).map(s => s.id)];
      for (const subtypeId of ids) {
        const visit = composeVisit(t, condition.id, subtypeId, [], true, "followup");
        const subtype = condition.subtypes?.find(s => s.id === subtypeId);
        const expected = [
          ...condition.categories,
          ...(condition.id === "ckd" ? (condition.extraCategories ?? []).flatMap(e => e.categories) : []),
          ...(subtype?.categories ?? []),
        ];
        assert.equal(JSON.stringify(visit.categories.map(c => c.cat)), JSON.stringify(expected));
        assert.equal(visit.followup.startIdx, 1);
        assert.equal(visit.followup.category.questions[0], t.ui.followupCategory.questions[1]);
        assert.equal(visit.followup.key, `${condition.id}-followup-changed`);
        const state = { ...EMPTY_STATE, answersMap: { [visit.followup.key]: "  Changes  " } };
        const web = collectVisitSections(visit, state, t, true);
        const mobile = collectVisitSections(visit, state, t, false);
        assert.equal(web.length, expected.length + 1);
        assert.equal(web.at(-1).items[0].checked, true);
        assert.equal(mobile.at(-1).items[0].checked, false);
        assert.equal(mobile.at(-1).items[0].answer, "Changes");
        for (const { cat, prefix } of visit.categories) {
          assert.ok(qKey(prefix, cat.id, 0).startsWith(condition.id));
        }
        const first = composeVisit(t, condition.id, subtypeId, [], false, "first");
        assert.equal(first.followup.visible, false);
        assert.equal(first.extras.length, 0);
      }
    }
  }
});
test("custom topic composition, question conversion and pure utility validation", () => {
  const { composeVisit, topicCategories, suggestionDescription, escapeHtml } = load("lib/vaani-core/src/visit.ts");
  const t = load("lib/vaani-core/src/content/en.ts").default;
  const categories = topicCategories({ treatment: ["Ask"] });
  const visit = composeVisit(t, "custom-1", "", [{ id: "custom-1", label: "My topic", categories }], false, "first");
  assert.equal(visit.selected.label, "My topic");
  assert.equal(visit.general[0].id, "treatment");
  assert.equal(visit.hasSubtypes, false);
  assert.throws(() => topicCategories({}), /Empty response/);
  assert.equal(suggestionDescription("  Symptoms ", " changes "), "Symptoms\n\nChanges since last visit: changes");
  assert.equal(suggestionDescription("x".repeat(3000)).length, 2000);
  assert.equal(escapeHtml('"<>&'), "&quot;&lt;&gt;&amp;");
});
test("sources retain preset/custom/general ordering and custom article fallback", () => {
  const { getMedicalSources, getAboutArticle, GENERAL_SOURCES, CONDITION_SOURCES } = load("lib/vaani-core/src/content/sources.ts");
  const preset = getMedicalSources("ckd", "ignored");
  assert.equal(preset[0].url, CONDITION_SOURCES.ckd[0].url);
  assert.equal(preset.length, CONDITION_SOURCES.ckd.length + GENERAL_SOURCES.length);
  const staleCustomArticle = { name: "Old topic", url: "https://medlineplus.gov/old-topic.html" };
  assert.equal(getAboutArticle("diabetes", { article: staleCustomArticle }).url, "https://medlineplus.gov/diabetes.html");
  assert.equal(getAboutArticle("thyroid", { article: staleCustomArticle }).url, "https://medlineplus.gov/thyroiddiseases.html");
  assert.equal(getMedicalSources("diabetes", "Old topic", staleCustomArticle).some((source) => source.url === staleCustomArticle.url), false);
  const custom = getMedicalSources("custom-1", "My topic", { name: "Article", url: "https://example.org" });
  assert.equal(custom[0].name, "MedlinePlus — My topic");
  assert.equal(custom[0].url, "https://example.org");
  assert.equal(getAboutArticle("custom-1", {}).url, "https://medlineplus.gov/");
});
test("PMF caps and corrupt-state validation are platform-independent", () => {
  const { DEFAULT_PMF_STATE, recordPmfExport, parsePmfState } = load("lib/vaani-core/src/pmf.ts");
  let next = recordPmfExport(DEFAULT_PMF_STATE, 100);
  assert.equal(next.show, false);
  next = recordPmfExport(next.state, 200);
  assert.equal(next.show, true);
  assert.equal(next.state.asks, 1);
  next = recordPmfExport(next.state, 201);
  assert.equal(next.show, false);
  next = recordPmfExport(next.state, 200 + 30 * 24 * 60 * 60 * 1000);
  assert.equal(next.show, true);
  assert.equal(recordPmfExport({ ...next.state, answered: true }, Number.MAX_SAFE_INTEGER).show, false);
  assert.equal(recordPmfExport({ ...next.state, asks: 3 }, Number.MAX_SAFE_INTEGER).show, false);
  assert.throws(() => parsePmfState({ asks: -1 }), /Invalid saved survey/);
});
test("analytics, survey, dashboard and Whisper share transport, preserve auth and cancellation", async () => {
  const { createVaaniClient, VaaniApiError } = load("lib/api-client-react/src/vaani.ts");
  for (const base of ["", "https://native.example"]) {
    const calls = [];
    let result = { accepted: 1 }, status = 200;
    const api = createVaaniClient(async (url, init) => {
      calls.push({ url, ...init });
      return { ok: status === 200, status, json: async () => result };
    }, base);
    await api.ingestEvents({ deviceId: "anonymous", events: [{ name: "app_opened", lang: "en" }] });
    assert.equal(calls.at(-1).url, `${base}/api/events`);
    result = { ok: true };
    await api.submitPmfSurvey({ deviceId: "anonymous", disappointment: "very" });
    assert.equal(calls.at(-1).url, `${base}/api/pmf-survey`);
    result = { totals: { devices: 1, events: 1 }, pmf: { responses: 0, very: 0, somewhat: 0, notDisappointed: 0, score: 0 }, eventCounts: [], funnel: [], recentFeedback: [] };
    await api.getPmfSummary("admin-token");
    assert.equal(calls.at(-1).method, "GET");
    assert.equal(calls.at(-1).body, undefined);
    assert.equal(calls.at(-1).headers.Authorization, "Bearer admin-token");
    result = { text: "answer" };
    const controller = new AbortController();
    assert.equal(await api.whisperTranscribe({ lang: "ta", audio: { mediaType: "audio/mp4", data: "encoded" } }, { signal: controller.signal }), "answer");
    assert.equal(calls.at(-1).url, `${base}/api/whisper-transcribe`);
    assert.equal(calls.at(-1).signal, controller.signal);
    assert.equal(calls.at(-1).headers.Authorization, undefined, "dashboard token must not leak to other requests");
    status = 401; result = { error: "Unauthorized" };
    await assert.rejects(api.getPmfSummary("bad"), e => e instanceof VaaniApiError && e.status === 401);
    status = 200; result = {};
    await assert.rejects(api.ingestEvents({ deviceId: "x", events: [] }), /Invalid events/);
    await assert.rejects(api.submitPmfSurvey({ deviceId: "x", disappointment: "not" }), /Invalid survey/);
    await assert.rejects(api.getPmfSummary("x"), /Invalid PMF/);
    await assert.rejects(api.whisperTranscribe({ lang: "en", audio: { mediaType: "audio/webm", data: "" } }), /Invalid transcription/);
  }
});
test("artifact HTTP stays in platform transport adapters; native file reads remain local", () => {
  const files = [
    "artifacts/my-visit-prep/src/pages/Home.tsx", "artifacts/my-visit-prep/src/pages/PmfDashboard.tsx",
    "artifacts/my-visit-prep/src/hooks/useAnswerRecorder.ts", "artifacts/vaani-mobile/lib/analytics.ts",
  ];
  for (const file of files) assert.doesNotMatch(fs.readFileSync(path.join(root, file), "utf8"), /\bfetch\s*\(/);
});