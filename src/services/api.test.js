import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { api } from "./api";

describe("api", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed json payload for successful json response", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({ matches: [1, 2, 3] }),
      text: async () => "",
    });

    const data = await api.get("/api/match");

    expect(data).toEqual({ matches: [1, 2, 3] });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("throws api errors with response text", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => "backend failed",
      headers: { get: () => "text/plain" },
    });

    await expect(api.post("/api/search", { q: "fintech" })).rejects.toThrow("backend failed");
  });
});
