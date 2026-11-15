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
const hashes = {
  en: "6b10cbb4f6543df2f6656dae21932e3225a8790a7a83508cfdfb41539361c1fb",
  es: "dd73b2aec56dd7f903dac733a42f77b2b738a957deeab01f4156a51f66852a2d",
  hi: "d07f3fe3ba400a976e87f76ffdaa8efbf0d2ad1026f28a878f21f6085c6d0f7a",
  vi: "f92d4a6de2dec59498cd02b8c556b26c3cd0da4aa8935336374ba1d070c91924",
  zh: "2839013ddd90380ac5b872eb3a79281677ced8239bb10181b2d20f362563eb3e",
  ta: "9726af9fd21f77bbe42a986e6dcbe0db7d6a52deca525c6cae1a9499ad03a1e4",
  kn: "9c03a169917c1f39fe7658a353e00fae3aa920edd541f99454f25037b44e952e",
  fr: "2ee8887d6e1f8ffcd24632a4700782b651f27896645212fd8ab1d17d4d4cec93",
  pt: "36791afabc21f3f00cf051005b4fe9d32571dd98a7fe673c74b4ee9907aa9411",
  tl: "f89849a32767ad49a5b2649616080eeb3eed2cda06c84c68167513a02b219b82",
  ja: "c5b67f5a193de450d58652e26fc76ee47502d81069df0e95f956fcb4f74dca24",
  ko: "170c0fe51265bac8a029b37a2912b874939f7804f60777e7c9f0e7e0e2751d08",
  th: "8f6e7458f287ea908035d2a33b72adffe4fcf28bba571dd446a7bc0be23c127e",
  id: "d94506df242620167373ae73d80da31761d2722449929582787c460decf0efab",
  bn: "86615f4098270f95f04dafce903680a3d5d020387157162df512ae4212be95db",
  ur: "62a4bed9852d7cf76eab979fc3b64a36c1729258302057c7f98d5176bde92a74",
  te: "9be1c33b9e0e931c87ae5582d3149d15241b33f000bcd36a3a42bdc339532a82",
  ml: "5ddfcbff171ead3582066c84d5ad9f6d9678d0872f2624a008c2b1127db2ee33",
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