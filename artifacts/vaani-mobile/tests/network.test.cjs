const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "../../..");
const logs = [];
function load(file, mocks = {}, globals = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpile(fs.readFileSync(path.join(root, file), "utf8"), {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
  }), { exports, URL, Headers, Request, Response, console: { error: (...args) => logs.push(args) },
    require(name) {
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (name === "react-native") return { Platform: { OS: "ios" } };
      throw new Error(`Unexpected import ${name}`);
    }, ...globals });
  return exports;
}
const errors = load("artifacts/vaani-mobile/lib/api-errors.ts");
test("mobile domain resolver accepts injected HTTPS origins without double prefixes", () => {
  assert.equal(errors.resolveApiBaseUrl("api.example.com"), "https://api.example.com");
  assert.equal(errors.resolveApiBaseUrl(" https://api.example.com/ "), "https://api.example.com");
  assert.equal(errors.resolveApiBaseUrl(undefined), "https://askvaani.org");
  for (const domain of ["http://api.example.com", "https://user:password@api.example.com", "https://api.example.com/api"]) {
    assert.throws(() => errors.resolveApiBaseUrl(domain), /HTTPS API domain/);
  }
});
test("embedded browser preview stays same-origin while native keeps its injected backend", async () => {
  const previewOrigin = "https://mobile-preview.example.com";
  assert.equal(errors.resolveApiBaseUrl("backend-preview.example.com", previewOrigin), previewOrigin);
  assert.equal(errors.resolveApiBaseUrl("backend-preview.example.com"), "https://backend-preview.example.com");
  const requests = [];
  const adapter = load("artifacts/vaani-mobile/lib/api.ts", {
    "react-native": { Platform: { OS: "web" } },
    "expo/fetch": { fetch: async (url, init) => {
      requests.push({ url, init });
      return new Response('{"sections":{"understanding":["What should I ask?"]},"article":null}');
    } },
    "@workspace/api-client-react": load("lib/api-client-react/src/vaani.ts"),
    "./api-errors": errors,
  }, { process: { env: { EXPO_PUBLIC_DOMAIN: "backend-preview.example.com" } },
    window: { location: { origin: previewOrigin } } });
  assert.equal(adapter.API_BASE_URL, previewOrigin);
  await adapter.customTopicQuestions({ topic: "lupus", lang: "en" });
  assert.equal(requests[0].url, `${previewOrigin}/api/custom-topic-questions`);
  const generated = load("lib/api-client-react/src/custom-fetch.ts", {}, { fetch: async (url, init) => {
    requests.push({ url, init });
    return new Response('{"sections":{"understanding":["What should I ask?"]},"article":null}',
      { headers: { "Content-Type": "application/json" } });
  } });
  generated.setBaseUrl(adapter.API_BASE_URL);
  await generated.customFetch("/api/custom-topic-questions", {
    method: "POST", body: JSON.stringify({ topic: "Ozempic", lang: "en", mode: "medication" }),
  });
  assert.equal(requests[1].url, requests[0].url, "generated medication hook shares the browser origin");
});
test("mobile errors distinguish validation, network, rate limits and server errors", () => {
  logs.length = 0;
  assert.equal(errors.mobileApiError({ status: 400, data: { error: "invalid" } }, "fallback", true), errors.MEDICATION_NOT_FOUND);
  assert.equal(errors.mobileApiError(new TypeError("Network request failed"), "fallback"), errors.NETWORK_ERROR);
  assert.match(errors.mobileApiError({ status: 429 }, "fallback"), /Too many requests/);
  assert.match(errors.mobileApiError({ status: 503 }, "fallback"), /server couldn't complete/);
  assert.equal(errors.mobileApiError(new Error("Invalid response"), "fallback"), "fallback");
  assert.equal(logs[0][1].status, 400);
  assert.equal(logs[0][1].responseBody.error, "invalid");
  assert.ok(logs[0][1].exception);
});
test("Expo adapter and generated transport use the same URL and current request contract", async () => {
  const requests = [];
  const payload = { sections: { understanding: ["What should I ask?"] }, article: null, specialists: null };
  const transport = async (url, init) => {
    requests.push({ url, init });
    return new Response(JSON.stringify(payload), { status: 200, headers: { "Content-Type": "application/json" } });
  };
  const shared = load("lib/api-client-react/src/vaani.ts");
  const adapter = load("artifacts/vaani-mobile/lib/api.ts", {
    "expo/fetch": { fetch: transport },
    "@workspace/api-client-react": shared,
    "./api-errors": errors,
  }, { process: { env: { EXPO_PUBLIC_DOMAIN: "https://api.example.com/" } } });
  const result = await adapter.customTopicQuestions({ topic: "lupus", lang: "en", includeSpecialists: true });
  assert.equal(result.article, null);
  assert.equal(result.specialists, undefined);
  assert.equal(requests[0].url, "https://api.example.com/api/custom-topic-questions");
  assert.equal(requests[0].init.method, "POST");
  assert.equal(requests[0].init.headers["Content-Type"], "application/json");
  assert.deepEqual(JSON.parse(requests[0].init.body), { topic: "lupus", lang: "en", includeSpecialists: true });
  // Generated medication calls use customFetch, which uses native global fetch.
  const generatedTransport = load("lib/api-client-react/src/custom-fetch.ts", {}, { fetch: transport });
  generatedTransport.setBaseUrl(adapter.API_BASE_URL);
  await generatedTransport.customFetch("/api/custom-topic-questions", { method: "POST",
    body: JSON.stringify({ topic: "metformin", lang: "en", mode: "medication" }) });
  assert.equal(requests[1].url, requests[0].url);
  assert.equal(JSON.parse(requests[1].init.body).mode, "medication");
});
test("native custom-condition caller preserves web's omitted-mode request shape", () => {
  const source = fs.readFileSync(path.join(root, "artifacts/vaani-mobile/app/index.tsx"), "utf8");
  assert.match(source, /customTopicQuestions\(\{ topic, lang, includeSpecialists: true \}\)/);
  assert.doesNotMatch(source, /customTopicQuestions\(\{[^}]*mode:\s*"condition"/);
});
test("Expo adapter logs HTTP status and original body without consuming the response", async () => {
  logs.length = 0;
  const body = JSON.stringify({ error: errors.MEDICATION_NOT_FOUND });
  const adapter = load("artifacts/vaani-mobile/lib/api.ts", {
    "expo/fetch": { fetch: async () => new Response(body, { status: 400 }) },
    "@workspace/api-client-react": load("lib/api-client-react/src/vaani.ts"),
    "./api-errors": errors,
  }, { process: { env: {} } });
  await assert.rejects(adapter.customTopicQuestions({ topic: "metformn", mode: "medication", lang: "en" }),
    error => error.status === 400 && error.message === errors.MEDICATION_NOT_FOUND);
  assert.equal(logs[0][1].status, 400);
  assert.equal(logs[0][1].responseBody, body);
});
test("generated transport reads native responses without a ReadableStream body property", async () => {
  const transport = load("lib/api-client-react/src/custom-fetch.ts", {}, { fetch: async () => ({
    ok: true, status: 200, headers: new Headers({ "Content-Type": "application/json" }),
    body: undefined, text: async () => '{"sections":{"understanding":["What should I ask?"]},"medication":null}',
  }) });
  const data = await transport.customFetch("https://api.example.com/api/custom-topic-questions", { method: "POST", body: "{}" });
  assert.equal(data.sections.understanding[0], "What should I ask?");
  assert.equal(data.medication, null);
});
