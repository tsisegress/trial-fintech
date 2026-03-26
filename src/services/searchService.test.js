import test from "node:test";
import assert from "node:assert/strict";
import { fetchSearchResults } from "./searchService.js";

test("fetchSearchResults calls /api/search with payload", async () => {
  const originalFetch = global.fetch;
  let calledUrl = "";
  let calledBody = "";

  global.fetch = async (url, options) => {
    calledUrl = String(url);
    calledBody = options?.body || "";

    return {
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({ results: [{ id: "r-1" }] }),
      text: async () => "",
    };
  };

  try {
    const payload = { query: "seed fintech india" };
    const data = await fetchSearchResults(payload);

    assert.match(calledUrl, /\/api\/search$/);
    assert.equal(calledBody, JSON.stringify(payload));
    assert.deepEqual(data, { results: [{ id: "r-1" }] });
  } finally {
    global.fetch = originalFetch;
  }
});
