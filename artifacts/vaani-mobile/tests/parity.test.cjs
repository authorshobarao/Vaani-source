const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const ts = require("typescript");
const root = path.resolve(__dirname, "../../..");
const webRequire = createRequire(path.join(root, "artifacts/my-visit-prep/package.json"));
const React = webRequire("react");
const { create, act } = webRequire("react-test-renderer");
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

function load(relative, mocks = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpile(fs.readFileSync(path.join(root, relative), "utf8"), {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React, esModuleInterop: true,
  }), { exports, console, require(name) {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    if (name === "react") return React;
    if (name === "@/lib/topic-results") return load("artifacts/vaani-mobile/lib/topic-results.ts");
    if (name === "@workspace/vaani-core/content/specialists") return load("lib/vaani-core/src/content/specialists.ts");
    throw new Error(`Unexpected import ${name}`);
  } });
  return exports;
}
const json = value => JSON.parse(JSON.stringify(value));
const example = { categories: [{ id: "understanding", title: "Understanding it", questions: ["What should I ask?"] }],
  article: { name: "Lupus", url: "https://medlineplus.gov/lupus.html" },
  specialists: [{ name: "Rheumatologist", description: "Untrusted description" }] };
test("native condition prompt and accessible input label use existing translations", () => {
  const source = fs.readFileSync(path.join(root, "artifacts/vaani-mobile/app/index.tsx"), "utf8");
  assert.match(source, /accessibilityLabel=\{t\.ui\.conditionSelectLabel\}/);
  assert.doesNotMatch(source, /What would you like to talk to your doctor about\?/);
});

test("native topic keys normalize names and isolate kind and language", () => {
  const { topicKey } = load("artifacts/vaani-mobile/lib/topic-results.ts");
  assert.equal(topicKey("condition", "en", "  LUPUS  "), "condition:en:lupus");
  assert.notEqual(topicKey("condition", "en", "lupus"), topicKey("condition", "es", "lupus"));
  assert.notEqual(topicKey("condition", "en", "lupus"), topicKey("medication", "en", "lupus"));
});
test("native topic storage rejects malformed entries and sanitizes every specialty", () => {
  const { parseTopicResults } = load("artifacts/vaani-mobile/lib/topic-results.ts");
  const parsed = parseTopicResults(JSON.stringify({ "condition:en:lupus": example,
    "condition:en:invalid": { categories: ["not a category"] },
    "condition:en:unsafe": { ...example, article: { name: "Fake", url: "https://provider.example/" } },
  }));
  assert.deepEqual(Object.keys(parsed), ["condition:en:lupus"]);
  assert.deepEqual(json(parsed["condition:en:lupus"].specialists.map(s => s.name)), ["Primary care doctor", "Rheumatologist"]);
  assert.doesNotMatch(JSON.stringify(parsed), /Untrusted/);
});
test("native normalized cache merges edits over delayed hydration and survives remount", async () => {
  let resolveRead;
  const values = new Map();
  const storage = { getItem: () => new Promise(resolve => { resolveRead = resolve; }),
    setItem: async (key, value) => values.set(key, value) };
  let hook, renderer;
  const { useConditionResults } = load("artifacts/vaani-mobile/hooks/useConditionResults.ts", {
    "@react-native-async-storage/async-storage": { __esModule: true, default: storage },
  });
  function Consumer() { hook = useConditionResults("en"); return null; }
  await act(async () => { renderer = create(React.createElement(Consumer)); });
  await act(async () => hook.remember(" LUPUS ", example));
  assert.equal(values.size, 0, "no writes before hydration");
  await act(async () => resolveRead(JSON.stringify({ "condition:en:diabetes": example })));
  assert.equal(Object.keys(hook.records).length, 2);
  assert.ok(hook.forTopic("lupus"));
  await act(async () => renderer.unmount());
  const saved = values.values().next().value;
  storage.getItem = async () => saved;
  await act(async () => { renderer = create(React.createElement(Consumer)); });
  assert.ok(hook.forTopic("  Lupus "));
  await act(async () => hook.clear());
  assert.equal(Object.keys(hook.records).length, 0);
  assert.deepEqual(JSON.parse(values.values().next().value), {});
  await act(async () => renderer.unmount());
});
test("switching language never reuses another language's native topic questions", async () => {
  let lang = "en", hook, renderer;
  const storage = { getItem: async () => null, setItem: async () => {} };
  const { useConditionResults } = load("artifacts/vaani-mobile/hooks/useConditionResults.ts", {
    "@react-native-async-storage/async-storage": { __esModule: true, default: storage },
  });
  function Consumer() { hook = useConditionResults(lang); return null; }
  await act(async () => { renderer = create(React.createElement(Consumer)); });
  await act(async () => hook.remember("lupus", example));
  assert.ok(hook.forTopic(" LUPUS "));
  lang = "es";
  await act(async () => renderer.update(React.createElement(Consumer)));
  assert.equal(hook.forTopic("lupus"), undefined);
  const spanish = { ...example, categories: [{ id: "understanding", title: "Entender", questions: ["¿Qué debo preguntar?"] }] };
  await act(async () => hook.remember("lupus", spanish));
  assert.equal(hook.forTopic("lupus").categories[0].questions[0], "¿Qué debo preguntar?");
  lang = "en";
  await act(async () => renderer.update(React.createElement(Consumer)));
  assert.equal(hook.forTopic("lupus").categories[0].questions[0], "What should I ask?");
  await act(async () => renderer.unmount());
});

async function dictationHarness({ native = false, granted = true } = {}) {
  let current, renderer, text = "Existing notes", finish;
  let denied = 0, permissionRequests = 0;
  const events = {};
  const speech = { isRecognitionAvailable: () => native, requestPermissionsAsync: async () => {
    permissionRequests++; return { granted };
  }, start() {}, abort() {}, stop() {} };
  const recorder = { uri: "recording.m4a", stop: async () => {}, prepareToRecordAsync: async () => {}, record() {} };
  const { useDictation } = load("artifacts/vaani-mobile/hooks/useDictation.ts", {
    "react-native": { Platform: { OS: "ios" } },
    "expo-speech-recognition": { ExpoSpeechRecognitionModule: speech, useSpeechRecognitionEvent: (event, handler) => { events[event] = handler; } },
    "expo-audio": { AudioModule: { requestRecordingPermissionsAsync: async () => {
      permissionRequests++; return { granted };
    } }, RecordingPresets: { HIGH_QUALITY: {} }, setAudioModeAsync: async () => {}, useAudioRecorder: () => recorder },
    "expo-file-system/legacy": { readAsStringAsync: async () => "encoded-test-audio", EncodingType: { Base64: "base64" } },
    "@/lib/api": { transcribeAudio: () => new Promise(resolve => { finish = resolve; }) },
  });
  function Consumer() {
    current = useDictation({ lang: "en", getBase: () => text, onText: value => { text = value; }, onPermissionDenied: () => { denied++; } });
    return null;
  }
  await act(async () => { renderer = create(React.createElement(Consumer)); });
  return { get hook() { return current; }, get text() { return text; }, set text(value) { text = value; },
    get denied() { return denied; }, get requests() { return permissionRequests; }, events,
    finish: async value => { await act(async () => finish(value)); },
    unmount: async () => { await act(async () => renderer.unmount()); } };
}
test("recorded dictation appends to the latest typed value after transcription", async () => {
  const app = await dictationHarness();
  await act(async () => app.hook.toggle());
  assert.equal(app.requests, 1);
  assert.equal(app.hook.listening, true);
  await act(async () => app.hook.toggle());
  app.text = "Existing notes plus typed changes";
  await app.finish("and spoken changes");
  assert.equal(app.text, "Existing notes plus typed changes and spoken changes");
  await app.unmount();
});
test("a late recording transcript cannot update a field after tab/topic unmount", async () => {
  const app = await dictationHarness();
  await act(async () => app.hook.toggle());
  await act(async () => app.hook.toggle());
  await app.unmount();
  await app.finish("stale transcript");
  assert.equal(app.text, "Existing notes");
});
test("native dictation preserves existing text and replaces cumulative interim results", async () => {
  const app = await dictationHarness({ native: true });
  await act(async () => app.hook.toggle());
  app.events.result({ results: [{ transcript: "spoken" }] });
  app.events.result({ results: [{ transcript: "spoken update" }] });
  assert.equal(app.text, "Existing notes spoken update");
  await app.unmount();
});
test("denied recording permission shows the permission flow and does not start listening", async () => {
  const app = await dictationHarness({ granted: false });
  await act(async () => app.hook.toggle());
  assert.equal(app.denied, 1);
  assert.equal(app.hook.listening, false);
  assert.equal(app.text, "Existing notes");
  await app.unmount();
});
