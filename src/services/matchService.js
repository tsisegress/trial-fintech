import { api } from "./api";

export async function fetchMatches(payload) {
  return api.post("/api/match", payload);
}

export async function sendMatchAction(payload) {
  return api.post("/api/match/action", payload);
}
