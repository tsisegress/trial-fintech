import { api } from "./api.js";

export async function fetchSearchResults(payload) {
  return api.post("/api/search", payload);
}
