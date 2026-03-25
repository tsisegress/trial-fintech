import { api } from "./api";

export async function fetchSearchResults(payload) {
  return api.post("/api/search", payload);
}
