export function normalizeMatch(row = {}, index = 0) {
  const typeRaw = String(row.type || row.entityType || "startup").toLowerCase();
  const type = typeRaw === "investor" ? "investor" : "startup";

  return {
    id: row.id || row._id || `match-${index}`,
    type,
    name: row.name || row.title || "Untitled",
    oneLiner: row.oneLiner || row.summary || row.description || "No summary provided.",
    stage: row.stage || "Seed",
    sector: row.sector || row.category || "Fintech",
    region: row.region || row.location || "India",
    score: Number(row.score || row.similarity || 80),
    ask: row.ask || row.round || row.ticket || "TBD",
    traction: row.traction || row.metrics || "No traction data",
    thesisFit: row.thesisFit || row.fitReason || "Fit analysis unavailable.",
    whyNow: row.whyNow || row.timing || "Timing context unavailable.",
    tags: Array.isArray(row.tags) && row.tags.length > 0 ? row.tags : [type === "startup" ? "Startup" : "Investor"],
  };
}

export function normalizeMatches(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map((row, index) => normalizeMatch(row, index));
}

export function normalizeSearchResult(row = {}, index = 0) {
  return {
    id: row.id || row._id || `result-${index}`,
    name: row.name || row.title || "Untitled",
    type: row.type || row.entityType || "Startup",
    sector: row.sector || row.category || "Fintech",
    region: row.region || row.location || "India",
    stage: row.stage || "Seed",
    similarity: Number(row.similarity || row.score || 80),
    summary: row.summary || row.oneLiner || row.description || "No summary available.",
    reasoning:
      Array.isArray(row.reasoning) && row.reasoning.length > 0
        ? row.reasoning
        : [row.fitReason || "Fetched from backend semantic search."],
  };
}

export function normalizeSearchResults(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map((row, index) => normalizeSearchResult(row, index));
}
