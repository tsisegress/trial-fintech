import test from "node:test";
import assert from "node:assert/strict";
import { api } from "./api.js";

test("api returns parsed json payload for successful json response", async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => ({
    ok: true,
    headers: { get: () => "application/json" },
    json: async () => ({ matches: [1, 2, 3] }),
    text: async () => "",
  });

  try {
    const data = await api.get("/api/match");
    assert.deepEqual(data, { matches: [1, 2, 3] });
  } finally {
    global.fetch = originalFetch;
  }
});

test("api throws backend text for failed response", async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => ({
    ok: false,
    status: 500,
    text: async () => "backend failed",
    headers: { get: () => "text/plain" },
  });

  try {
    await assert.rejects(() => api.post("/api/search", { q: "fintech" }), /backend failed/);
  } finally {
    global.fetch = originalFetch;
  }
});
