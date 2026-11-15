import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadConfigFromFile } from "vite";

// Exercise the actual script-selected loader without starting a server. The
// default esbuild config loader externalizes workspace TS imports and fails on
// Node 20, even though tsc and the application bundler accept those imports.
process.env.PORT = "19264";
process.env.BASE_PATH = "/";
const { scripts } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
for (const name of ["dev", "build", "serve"]) {
  test(`${name} loads workspace TypeScript prerender imports`, async () => {
    const loader = scripts[name].match(/--configLoader\s+(\w+)/)?.[1];
    const configFile = scripts[name].match(/--config\s+(\S+)/)?.[1];
    assert.equal(loader, "runner");
    assert.equal(configFile, "vite.config.ts");
    const result = await loadConfigFromFile({
      command: name === "build" ? "build" : "serve",
      mode: name === "dev" ? "development" : "production",
      isSsrBuild: false,
      isPreview: name === "serve",
    }, configFile, process.cwd(), "warn", undefined, loader);
    assert.ok(result);
    assert.equal(result.config.base, "/");
    assert.equal(result.config.server.port, 19264);
  });
}