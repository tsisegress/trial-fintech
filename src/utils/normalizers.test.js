import test from "node:test";
import assert from "node:assert/strict";
import { normalizeMatch, normalizeSearchResult } from "./normalizers.js";

test("normalizeMatch maps mixed backend shape", () => {
  const out = normalizeMatch({
    _id: "abc",
    entityType: "Investor",
    title: "Fund One",
    summary: "Focuses on fintech",
    category: "Fintech",
    location: "India",
    similarity: 92,
    ticket: "$500k",
    metrics: "42 deals",
    fitReason: "Strong thesis overlap",
    timing: "Deploying this quarter",
  });

  assert.equal(out.id, "abc");
  assert.equal(out.type, "investor");
  assert.equal(out.name, "Fund One");
  assert.equal(out.score, 92);
  assert.equal(out.ask, "$500k");
});

test("normalizeSearchResult fills defaults", () => {
  const out = normalizeSearchResult({ name: "Startup A" }, 2);
  assert.equal(out.id, "result-2");
  assert.equal(out.name, "Startup A");
  assert.equal(out.sector, "Fintech");
  assert.equal(out.similarity, 80);
  assert.deepEqual(out.reasoning, ["Fetched from backend semantic search."]);
});
