const assert = require("node:assert/strict");
const { createRequire } = require("node:module");
const test = require("node:test");

const expoRouterRequire = createRequire(require.resolve("expo-router/package.json"));
const queryString = expoRouterRequire("query-string");

test("React Navigation query parsing keeps CommonJS decoder compatibility", () => {
  assert.deepEqual(
    { ...queryString.parse("topic=heart%20health&firstVisit=true") },
    { firstVisit: "true", topic: "heart health" },
  );
});

test("malformed percent encoding is decoded without exponential recursion", () => {
  const malformed = `${"%C2".repeat(10_000)}%`;
  const startedAt = Date.now();
  const parsed = queryString.parse(`topic=${malformed}`);

  assert.equal(typeof parsed.topic, "string");
  assert.ok(Date.now() - startedAt < 1_000);
});