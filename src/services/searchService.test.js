import { describe, expect, it, vi, afterEach } from "vitest";
import { fetchSearchResults } from "./searchService";
import { api } from "./api";

describe("searchService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls /api/search with payload", async () => {
    const spy = vi.spyOn(api, "post").mockResolvedValue({ results: [{ id: "r-1" }] });

    const payload = { query: "seed fintech india" };
    const data = await fetchSearchResults(payload);

    expect(spy).toHaveBeenCalledWith("/api/search", payload);
    expect(data).toEqual({ results: [{ id: "r-1" }] });
  });
});
