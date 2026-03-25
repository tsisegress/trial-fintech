import { api } from "./api.js";

export async function fetchSearchResults(payload, options = {}) {
  return api.post("/api/search", payload, options);
}
