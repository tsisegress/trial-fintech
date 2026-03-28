import { useCallback, useRef, useState } from "react";
import { fetchSearchResults } from "../services/searchService.js";

export default function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);

  const cancelSearch = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  const runSearch = useCallback(async (payload) => {
    cancelSearch();

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError("");
    try {
      const data = await fetchSearchResults(payload, { signal: controller.signal });
      const list = Array.isArray(data?.results) ? data.results : [];
      setResults(list);
      return list;
    } catch (err) {
      if (err?.name === "AbortError") return [];
      setError(err instanceof Error ? err.message : "Search failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cancelSearch]);

  return {
    results,
    loading,
    error,
    runSearch,
    cancelSearch,
  };
}
