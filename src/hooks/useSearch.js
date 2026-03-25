import { useCallback, useState } from "react";
import { fetchSearchResults } from "../services/searchService.js";

export default function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runSearch = useCallback(async (payload) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSearchResults(payload);
      const list = Array.isArray(data?.results) ? data.results : [];
      setResults(list);
      return list;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    results,
    loading,
    error,
    runSearch,
  };
}
