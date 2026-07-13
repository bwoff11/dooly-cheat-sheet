import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Dooley Runbook", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Dooley Runbook/);
  assert.match(html, /Core Strategy Reference/);
  assert.match(html, /Merchant selection and reroll criteria/);
  assert.match(html, /Top 20 Dooley item priorities/);
  assert.match(html, /What actually works together/);
  assert.match(html, /RAMPage Drill/);
  assert.match(html, /core-analysis-lab\.png/);
  assert.match(html, /merchant-pool-lab\.png/);
  assert.match(html, /Patch 16/);
  assert.match(html, /The Core/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("keeps patch content and deployment configuration explicit", async () => {
  const [content, page, layout, packageJson, workflow] = await Promise.all([
    readFile(new URL("../app/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/deploy-pages.yml", import.meta.url), "utf8"),
  ]);

  for (const id of ["the-core", "launcher-core", "armored-core", "companion-core", "critical-core", "ignition-core", "primal-core", "weaponized-core"]) {
    assert.match(content, new RegExp(`id: "${id}"`));
  }
  assert.match(content, /merchantDirectory/);
  assert.match(content, /coreDepthById/);
  assert.match(content, /topDooleyItems/);
  assert.match(content, /Welding Torch conversion/);
  assert.match(content, /6 sec at every tier/);
  assert.doesNotMatch(content, /7 \/ 6 \/ 5 sec · At fight start/);
  assert.match(page, /Best merchants for/);
  assert.match(layout, /og\.png/);
  assert.match(packageJson, /"build:pages"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle/);
  assert.match(workflow, /actions\/deploy-pages/);
});
