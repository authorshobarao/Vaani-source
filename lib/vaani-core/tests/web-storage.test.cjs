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

function load(relative, extra = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpile(fs.readFileSync(path.join(root, relative), "utf8"), {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.React, esModuleInterop: true,
  }), {
    exports,
    require(name) {
      if (name === "react") return React;
      if (name === "@react-native-async-storage/async-storage") return { __esModule: true, default: extra.asyncStorage };
      if (name === "@workspace/vaani-core") return {
        ...load("lib/vaani-core/src/prep.ts"),
        ...load("lib/vaani-core/src/visit.ts"),
      };
      assert.ok(name.startsWith("."));
      return load(path.join(path.dirname(relative), `${name}.ts`));
    },
    ...extra,
  });
  return exports;
}
function memoryStorage(initial) {
  const values = new Map(initial ? [["my-visit-prep-v1", initial]] : []);
  return {
    writes: 0,
    getItem: key => values.get(key) ?? null,
    setItem(key, value) { this.writes += 1; values.set(key, value); },
  };
}
async function mount(storage, initialConditionId = "") {
  const { usePersistedState } = load("artifacts/my-visit-prep/src/hooks/usePersistedState.ts", { localStorage: storage });
  let current;
  function Consumer() { current = usePersistedState(initialConditionId); return null; }
  let renderer;
  await act(async () => { renderer = create(React.createElement(React.StrictMode, null, React.createElement(Consumer))); });
  return {
    get current() { return current; },
    async unmount() { await act(async () => renderer.unmount()); },
  };
}

test("GERD checkbox, typed notes and selected topic survive a real hook remount", async () => {
  const storage = memoryStorage();
  let app = await mount(storage);
  assert.equal(storage.writes, 0, "mount must not write an empty snapshot");
  const en = load("lib/vaani-core/src/content/en.ts").default;
  const firstCategory = en.conditions.find(c => c.id === "gerd").categories[0];
  const key = `gerd::${firstCategory.id}::0`;
  await act(async () => {
    app.current.selectionActions.selectCondition("gerd");
    app.current.toggleChecked(key);
    app.current.setNote("gerd", "Typed before reload — keep this note");
    app.current.setAnswer(key, "Doctor's answer");
  });
  const before = storage.getItem("my-visit-prep-v1");
  await app.unmount();
  const writes = storage.writes;
  app = await mount(storage);
  assert.equal(app.current.selection.selectedId, "gerd");
  assert.equal(app.current.state.checkedMap[key], true);
  assert.equal(app.current.state.notesMap.gerd, "Typed before reload — keep this note");
  assert.equal(app.current.state.answersMap[key], "Doctor's answer");
  assert.equal(storage.writes, writes, "Strict Mode hydration must be read-only");
  assert.equal(storage.getItem("my-visit-prep-v1"), before);
  await app.unmount();
});
test("older v1 notes remain untouched at mount and survive adding selection", async () => {
  const raw = JSON.stringify({
    checkedMap: { "gerd::understanding::0": true },
    notesMap: { gerd: "Existing saved note", ckd: "Other condition's note" },
    answersMap: { "gerd::understanding::0": "Existing answer" },
  });
  const storage = memoryStorage(raw);
  const app = await mount(storage);
  assert.equal(storage.getItem("my-visit-prep-v1"), raw);
  assert.equal(storage.writes, 0);
  await act(async () => app.current.selectionActions.selectCondition("gerd"));
  assert.equal(app.current.state.notesMap.gerd, "Existing saved note");
  const saved = JSON.parse(storage.getItem("my-visit-prep-v1"));
  assert.equal(saved.notesMap.ckd, "Other condition's note");
  assert.equal(saved.answersMap["gerd::understanding::0"], "Existing answer");
  assert.equal(saved.selection.selectedId, "gerd");
  await app.unmount();
});
test("explicit condition route wins without overwriting stored preparation", async () => {
  const storage = memoryStorage(JSON.stringify({
    notesMap: { gerd: "Keep GERD notes" },
    selection: { selectedId: "gerd", selectedSubtypeId: "", ckdStage: "", transplantChecked: false, visitType: "followup" },
  }));
  const app = await mount(storage, "ckd");
  assert.equal(app.current.selection.selectedId, "ckd");
  assert.equal(app.current.state.notesMap.gerd, "Keep GERD notes");
  assert.equal(storage.writes, 0);
  await app.unmount();
});
test("corrupt records are not overwritten and write failures surface", async () => {
  const storage = memoryStorage("{unreadable");
  const app = await mount(storage);
  assert.match(app.current.storageError, /could not be loaded/);
  await act(async () => app.current.setNote("gerd", "Temporary note"));
  assert.equal(storage.getItem("my-visit-prep-v1"), "{unreadable");
  storage.setItem = () => { throw new Error("Quota exceeded"); };
  await act(async () => app.current.resetAll());
  assert.match(app.current.storageError, /could not be saved/);
  await app.unmount();
});

function asyncMemoryStorage(initial) {
  const values = new Map(initial ? [["vaani-prep-v1", initial]] : []);
  return {
    writes: 0,
    async getItem(key) { return values.get(key) ?? null; },
    async setItem(key, value) { this.writes += 1; values.set(key, value); },
  };
}
async function mountMobile(storage) {
  const { PrepProvider, usePrep } = load("artifacts/vaani-mobile/context/PrepContext.tsx", { asyncStorage: storage });
  let current;
  function Consumer() { current = usePrep(); return null; }
  let renderer;
  await act(async () => {
    renderer = create(React.createElement(React.StrictMode, null,
      React.createElement(PrepProvider, null, React.createElement(Consumer))));
  });
  return {
    get current() { return current; },
    async unmount() { await act(async () => renderer.unmount()); },
  };
}
test("mobile GERD selection, followup, checked questions, answers and notes survive provider remount", async () => {
  const storage = asyncMemoryStorage();
  let app = await mountMobile(storage);
  assert.equal(storage.writes, 0);
  const en = load("lib/vaani-core/src/content/en.ts").default;
  const category = en.conditions.find(c => c.id === "gerd").categories[0];
  const key = `gerd::${category.id}::0`;
  await act(async () => {
    app.current.selectionActions.selectCondition("gerd");
    app.current.selectionActions.setVisitType("followup");
    app.current.toggleChecked(key);
    app.current.setNote("gerd", "Saved mobile note");
    app.current.setAnswer(key, "Saved mobile answer");
  });
  const before = await storage.getItem("vaani-prep-v1");
  const writes = storage.writes;
  await app.unmount();
  app = await mountMobile(storage);
  assert.equal(app.current.selection.selectedId, "gerd");
  assert.equal(app.current.selection.visitType, "followup");
  assert.equal(app.current.state.checkedMap[key], true);
  assert.equal(app.current.state.notesMap.gerd, "Saved mobile note");
  assert.equal(app.current.state.answersMap[key], "Saved mobile answer");
  assert.equal(storage.writes, writes);
  assert.equal(await storage.getItem("vaani-prep-v1"), before);
  await app.unmount();
});
test("mobile legacy hydration is read-only and retains existing notes without a selection", async () => {
  const raw = JSON.stringify({ notesMap: { gerd: "Legacy mobile note" }, checkedMap: { "gerd::understanding::0": true } });
  const storage = asyncMemoryStorage(raw);
  const app = await mountMobile(storage);
  assert.equal(await storage.getItem("vaani-prep-v1"), raw);
  assert.equal(storage.writes, 0);
  await act(async () => app.current.selectionActions.selectCondition("gerd"));
  assert.equal(app.current.state.notesMap.gerd, "Legacy mobile note");
  assert.equal(app.current.state.checkedMap["gerd::understanding::0"], true);
  await app.unmount();
});
test("mobile pending user edits replay over delayed hydration without writing transient empty state", async () => {
  const raw = JSON.stringify({
    notesMap: { ckd: "Do not lose another condition's note", gerd: "Old GERD note" },
    checkedMap: { "ckd::understanding::0": true },
    answersMap: { "ckd::understanding::0": "Existing answer" },
  });
  const storage = asyncMemoryStorage(raw);
  let resolveRead;
  const pending = new Promise(resolve => { resolveRead = resolve; });
  storage.getItem = async () => pending;
  const app = await mountMobile(storage);
  await act(async () => {
    app.current.selectionActions.selectCondition("gerd");
    app.current.setNote("gerd", "New note typed while loading");
    app.current.toggleChecked("gerd::understanding::0");
  });
  assert.equal(storage.writes, 0, "must not save pre-hydration empty view");
  await act(async () => resolveRead(raw));
  assert.equal(app.current.selection.selectedId, "gerd");
  assert.equal(app.current.state.notesMap.gerd, "New note typed while loading");
  assert.equal(app.current.state.notesMap.ckd, "Do not lose another condition's note");
  assert.equal(app.current.state.checkedMap["ckd::understanding::0"], true);
  assert.equal(app.current.state.checkedMap["gerd::understanding::0"], true);
  assert.equal(app.current.state.answersMap["ckd::understanding::0"], "Existing answer");
  assert.equal(storage.writes, 1, "only merged hydrated snapshot is saved");
  await app.unmount();
});
test("mobile serializes saves so an earlier note cannot overwrite a newer one", async () => {
  const storage = asyncMemoryStorage();
  const releases = [];
  const written = [];
  storage.setItem = async (_key, value) => {
    storage.writes += 1;
    await new Promise(resolve => releases.push(resolve));
    written.push(JSON.parse(value));
  };
  const app = await mountMobile(storage);
  await act(async () => app.current.setNote("gerd", "First"));
  await act(async () => app.current.setNote("gerd", "Latest"));
  assert.equal(storage.writes, 1);
  await act(async () => releases.shift()());
  assert.equal(storage.writes, 2);
  await act(async () => releases.shift()());
  assert.equal(written[0].notesMap.gerd, "First");
  assert.equal(written[1].notesMap.gerd, "Latest");
  await app.unmount();
});
test("mobile invalid storage is protected until explicit reset", async () => {
  const storage = asyncMemoryStorage("{invalid");
  const app = await mountMobile(storage);
  assert.match(app.current.storageError, /could not be loaded/);
  await act(async () => {
    app.current.selectionActions.selectCondition("gerd");
    app.current.setNote("gerd", "Temporary edit");
  });
  assert.equal(storage.writes, 0);
  assert.equal(await storage.getItem("vaani-prep-v1"), "{invalid");
  await act(async () => app.current.resetAll());
  assert.equal(app.current.selection.selectedId, "");
  assert.equal(JSON.parse(await storage.getItem("vaani-prep-v1")).notesMap.gerd, undefined);
  await app.unmount();
});