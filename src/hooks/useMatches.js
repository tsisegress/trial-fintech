import { useCallback, useState } from "react";
import { fetchMatches, sendMatchAction } from "../services/matchService.js";

export default function useMatches(initialPayload = null) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMatches = useCallback(async (payload = initialPayload) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchMatches(payload || {});
      const list = Array.isArray(data?.matches) ? data.matches : [];
      setMatches(list);
      return list;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch matches");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [initialPayload]);

  const actOnMatch = useCallback(async (payload) => {
    try {
      return await sendMatchAction(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit action");
      throw err;
    }
  }, []);

  return {
    matches,
    loading,
    error,
    loadMatches,
    actOnMatch,
  };
}
