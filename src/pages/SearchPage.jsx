import { useEffect, useMemo, useState } from "react";
import MatchScore from "../components/MatchScore";
import SearchBar from "../components/SearchBar";
import useSearch from "../hooks/useSearch";
import { normalizeSearchResults } from "../utils/normalizers";

const RESULT_POOL = [
  {
    id: "r-001",
    name: "NiyamFlow",
    type: "Startup",
    sector: "Fintech",
    region: "India",
    stage: "Seed",
    similarity: 97,
    summary: "Compliance workflow infra for digital lenders and NBFCs.",
    reasoning: [
      "Strong overlap with your fintech + infra preference.",
      "Recent traction indicates high readiness for strategic investors.",
      "Regulatory timing in India makes category demand stronger now.",
    ],
  },
  {
    id: "r-002",
    name: "Monsoon Peak Ventures",
    type: "Investor",
    sector: "Fintech",
    region: "India",
    stage: "Pre-seed to Series A",
    similarity: 94,
    summary: "Operator-led fund focused on financial access and distribution.",
    reasoning: [
      "Portfolio pattern aligns with your GTM thesis.",
      "Writes checks in your target ticket band.",
      "Actively deploying in current quarter with fintech focus.",
    ],
  },
  {
    id: "r-003",
    name: "LedgerRail",
    type: "Startup",
    sector: "SaaS",
    region: "Southeast Asia",
    stage: "Series A",
    similarity: 90,
    summary: "B2B finance operations suite for cross-border sellers.",
    reasoning: [
      "High thesis fit for B2B tooling + transaction data moat.",
      "Cross-border exposure expands your regional diversification.",
      "Clear enterprise retention signals from existing customers.",
    ],
  },
  {
    id: "r-004",
    name: "Astra Syndicate",
    type: "Investor",
    sector: "AI/ML",
    region: "Global",
    stage: "Pre-seed to Seed",
    similarity: 87,
    summary: "Syndicate of operators backing AI-first workflow companies.",
    reasoning: [
      "Strong appetite for AI-enabled decision products.",
      "Prefers fast-moving founders with measurable early velocity.",
      "Can unlock follow-on network for Series A readiness.",
    ],
  },
];

function ResultCard({ item, onOpen }) {
  return (
    <article
      style={{
        border: "1px solid rgba(196,199,242,0.14)",
        borderRadius: 12,
        background: "rgba(196,199,242,0.03)",
        padding: 14,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "'Marcellus', serif", fontSize: 25, color: "#c4c7f2" }}>{item.name}</div>
          <div style={{ fontSize: 13, color: "rgba(196,199,242,0.58)", marginTop: 2 }}>{item.summary}</div>
        </div>
        <MatchScore value={item.similarity} label="SIMILARITY" />
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
        {[item.type, item.sector, item.region, item.stage].map((token) => (
          <span
            key={token}
            style={{
              padding: "4px 8px",
              borderRadius: 999,
              border: "1px solid rgba(196,199,242,0.2)",
              color: "rgba(196,199,242,0.78)",
              fontSize: 11,
            }}
          >
            {token}
          </span>
        ))}
      </div>

      <div style={{ marginTop: 12, display: "grid", gap: 7 }}>
        {item.reasoning.map((row) => (
          <div key={row} style={{ color: "rgba(196,199,242,0.84)", fontSize: 13 }}>
            • {row}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
        <button
          type="button"
          onClick={() => onOpen(item)}
          style={{
            border: "none",
            borderRadius: 8,
            background: "linear-gradient(135deg, #091eca, #1e97f2)",
            color: "#e9efff",
            padding: "8px 12px",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.06em",
            cursor: "pointer",
          }}
        >
          Open profile
        </button>
      </div>
    </article>
  );
}

function SegmentedControl({ value, onChange }) {
  const items = ["All", "Startup", "Investor"];

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          style={{
            borderRadius: 999,
            border: value === item ? "1px solid rgba(30,151,242,0.5)" : "1px solid rgba(196,199,242,0.2)",
            background: value === item ? "rgba(30,151,242,0.2)" : "rgba(196,199,242,0.04)",
            color: value === item ? "#def0ff" : "rgba(196,199,242,0.7)",
            padding: "7px 11px",
            fontSize: 12,
            cursor: "pointer",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default function SearchPage({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [remoteResults, setRemoteResults] = useState([]);
  const { runSearch, loading: searchLoading, error: searchError, cancelSearch } = useSearch();

  const normalized = query.trim().toLowerCase();
  const sourceResults = remoteResults.length > 0 ? remoteResults : RESULT_POOL;

  const results = useMemo(() => {
    return sourceResults
      .filter((item) => {
        const matchesType = typeFilter === "All" || item.type === typeFilter;
        const searchable = `${item.name} ${item.summary} ${item.sector} ${item.region} ${item.stage}`.toLowerCase();
        const matchesQuery = !normalized || searchable.includes(normalized);
        return matchesType && matchesQuery;
      })
      .sort((a, b) => b.similarity - a.similarity);
  }, [normalized, typeFilter, sourceResults]);

  const handleSemanticSearch = async () => {
    try {
      const list = await runSearch({ query, type: typeFilter });
      const mapped = normalizeSearchResults(list);
      if (mapped.length > 0) setRemoteResults(mapped);
    } catch (_) {}
  };

  useEffect(() => {
    if (query.trim().length < 3) return undefined;

    const timer = window.setTimeout(() => {
      handleSemanticSearch();
    }, 450);

    return () => {
      window.clearTimeout(timer);
      cancelSearch();
    };
  }, [query, typeFilter]);

  return (
    <div style={{ minHeight: "100vh", background: "#03030d", color: "#c4c7f2", fontFamily: "'Syne', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Syne:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <header style={{ position: "sticky", top: 0, zIndex: 12, backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(30,151,242,0.25)", background: "rgba(3,3,13,0.93)", padding: "13px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: "#1e97f2", letterSpacing: "0.2em", fontWeight: 700 }}>SEARCH</div>
          <div style={{ fontFamily: "'Marcellus', serif", fontSize: 27 }}>Personalized semantic search</div>
        </div>
        <button type="button" onClick={() => onNavigate?.("discover")} style={{ border: "1px solid rgba(196,199,242,0.2)", background: "rgba(196,199,242,0.06)", color: "rgba(196,199,242,0.86)", borderRadius: 8, padding: "9px 12px", fontSize: 12, letterSpacing: "0.06em", fontWeight: 700, cursor: "pointer" }}>
          Back to discover
        </button>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 20px 30px", display: "grid", gap: 14 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <SearchBar value={query} onChange={setQuery} placeholder="Try: seed fintech investors in India with operator background" />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <SegmentedControl value={typeFilter} onChange={setTypeFilter} />
            <button type="button" onClick={handleSemanticSearch} style={{ border: "none", background: "linear-gradient(135deg, #091eca, #1e97f2)", color: "#e8eeff", borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              Run AI search
            </button>
          </div>
          {searchLoading && <div style={{ fontSize: 12, color: "rgba(196,199,242,0.54)" }}>Querying backend semantic search...</div>}
          {searchError && <div style={{ fontSize: 12, color: "#f2ba1e" }}>Live search unavailable. Showing local demo results.</div>}
          <div style={{ fontSize: 12, color: "rgba(196,199,242,0.54)" }}>{results.length} results</div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {results.map((item) => (
            <ResultCard key={item.id} item={item} onOpen={setSelected} />
          ))}
        </div>
      </main>

      {selected && (
        <div role="dialog" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "grid", placeItems: "center", padding: 20, zIndex: 30 }}>
          <div style={{ width: "min(620px, 100%)", borderRadius: 14, border: "1px solid rgba(30,151,242,0.45)", background: "#050617", padding: 18, display: "grid", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <div>
                <div style={{ fontFamily: "'Marcellus', serif", fontSize: 28 }}>{selected.name}</div>
                <div style={{ fontSize: 13, color: "rgba(196,199,242,0.6)" }}>{selected.summary}</div>
              </div>
              <button type="button" onClick={() => setSelected(null)} style={{ border: "1px solid rgba(196,199,242,0.2)", background: "transparent", color: "rgba(196,199,242,0.85)", borderRadius: 8, padding: "6px 10px", fontSize: 12, cursor: "pointer" }}>
                Close
              </button>
            </div>

            <div style={{ fontSize: 12, color: "rgba(196,199,242,0.45)", letterSpacing: "0.09em" }}>AI RATIONALE</div>
            <div style={{ display: "grid", gap: 8 }}>
              {selected.reasoning.map((point) => (
                <div key={point} style={{ color: "rgba(196,199,242,0.85)", fontSize: 14 }}>
                  • {point}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button type="button" onClick={() => setSelected(null)} style={{ border: "1px solid rgba(196,199,242,0.2)", background: "rgba(196,199,242,0.06)", color: "rgba(196,199,242,0.86)", borderRadius: 8, padding: "8px 11px", fontSize: 12, cursor: "pointer" }}>
                Dismiss
              </button>
              <button type="button" onClick={() => { setSelected(null); onNavigate?.("discover"); }} style={{ border: "none", background: "linear-gradient(135deg, #091eca, #1e97f2)", color: "#e8eeff", borderRadius: 8, padding: "8px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                Continue in discover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
