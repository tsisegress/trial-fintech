import { useEffect, useMemo, useRef, useState } from "react";
import useMatches from "../hooks/useMatches";
import EntityTag from "../components/EntityTag";
import MatchScore from "../components/MatchScore";
import { MatchAction, MatchEntityType } from "../types/match";
import { addMatchActivity, addPipelineItem, setSelectedMatchId, useMatchStore } from "../store/useMatchStore";
import { normalizeMatches } from "../utils/normalizers";

const MOCK_MATCHES = [
  {
    id: "st-001",
    type: "startup",
    name: "CredMosaic",
    oneLiner: "Embedded underwriting infra for India MSME lenders.",
    stage: "Seed",
    sector: "Fintech",
    region: "India",
    score: 96,
    ask: "$1.8M",
    traction: "ARR $540k • 12% MoM growth",
    thesisFit: "Matches your BFSI + infra thesis with strong unit economics and low CAC payback.",
    whyNow: "RBI digital lending compliance is increasing demand for compliant credit APIs.",
    tags: ["B2B SaaS", "Credit Infra", "RegTech"],
  },
  {
    id: "st-002",
    type: "startup",
    name: "VyapaarFlow",
    oneLiner: "AI collections copilot for NBFC and fintech recovery teams.",
    stage: "Pre-seed",
    sector: "AI/ML",
    region: "India",
    score: 91,
    ask: "$750k",
    traction: "18 pilots • 6 paid enterprise contracts",
    thesisFit: "Strong overlap with your portfolio in lending and workflow automation.",
    whyNow: "Collections efficiency pressure is rising across MSME and consumer books.",
    tags: ["Enterprise AI", "Collections", "Lending"],
  },
  {
    id: "inv-013",
    type: "investor",
    name: "Aarohan Capital",
    oneLiner: "Early-stage fund focused on climate + fintech in Bharat markets.",
    stage: "Seed to Series A",
    sector: "Fintech",
    region: "India",
    score: 93,
    ask: "Ticket $500k–$2M",
    traction: "42 investments • 11 follow-ons",
    thesisFit: "Portfolio pattern aligns with your GTM in tier-2/3 India and MSME distribution.",
    whyNow: "Fund II deployment cycle just opened with dedicated fintech allocation.",
    tags: ["Lead Investor", "Fintech", "Climate Fin"],
  },
  {
    id: "inv-027",
    type: "investor",
    name: "Orbit River Ventures",
    oneLiner: "Operator-led angels syndicate for commerce infra and B2B SaaS.",
    stage: "Pre-seed to Seed",
    sector: "SaaS",
    region: "Southeast Asia",
    score: 88,
    ask: "Ticket $100k–$450k",
    traction: "90+ angels • 27 active syndicate deals",
    thesisFit: "Strong fit for your current readiness and KPI profile at this stage.",
    whyNow: "They are actively looking for AI workflow + financial automation tools.",
    tags: ["Angel Syndicate", "SaaS", "Founder-friendly"],
  },
];

const FILTER_OPTIONS = {
  type: ["All", "Startup", "Investor"],
  sector: ["All", "Fintech", "AI/ML", "SaaS"],
  stage: ["All", "Pre-seed", "Seed", "Series A", "Seed to Series A", "Pre-seed to Seed"],
  region: ["All", "India", "Southeast Asia"],
};

function MatchCard({ match, onSkip, onLike, onExplain }) {
  return (
    <article
      style={{
        background: "linear-gradient(180deg, rgba(9,65,202,0.16), rgba(9,65,202,0.04))",
        border: "1px solid rgba(30,151,242,0.34)",
        borderRadius: 16,
        padding: 24,
        minHeight: 380,
        boxShadow: "0 16px 34px rgba(0,0,0,0.26)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, color: "#eaceaa" }}>{match.name}</div>
          <div style={{ color: "rgba(196,199,242,0.62)", fontSize: 14 }}>{match.oneLiner}</div>
        </div>
        <MatchScore value={match.score} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        <EntityTag>{match.type === MatchEntityType.STARTUP ? "Startup" : "Investor"}</EntityTag>
        <EntityTag>{match.sector}</EntityTag>
        <EntityTag>{match.stage}</EntityTag>
        <EntityTag>{match.region}</EntityTag>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
        <InfoBlock label="Round / Ticket" value={match.ask} />
        <InfoBlock label="Traction" value={match.traction} />
      </div>

      <ReasonLine title="Why this fits" body={match.thesisFit} />
      <ReasonLine title="Why now" body={match.whyNow} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "16px 0 22px" }}>
        {match.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 11,
              color: "#d39858",
              border: "1px solid rgba(30,151,242,0.35)",
              borderRadius: 6,
              padding: "4px 8px",
              background: "rgba(30,151,242,0.08)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <ActionButton variant="ghost" onClick={onSkip}>
          Skip
        </ActionButton>
        <ActionButton variant="ghost" onClick={onExplain}>
          Explain fit
        </ActionButton>
        <ActionButton variant="primary" onClick={onLike}>
          Interested
        </ActionButton>
      </div>
    </article>
  );
}

function ReasonLine({ title, body }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, color: "rgba(196,199,242,0.46)", letterSpacing: "0.1em", marginBottom: 2 }}>{title.toUpperCase()}</div>
      <div style={{ color: "rgba(196,199,242,0.83)", fontSize: 13, lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div
      style={{
        border: "1px solid rgba(196,199,242,0.12)",
        borderRadius: 10,
        padding: "10px 12px",
        background: "rgba(3,3,13,0.32)",
      }}
    >
      <div style={{ fontSize: 11, color: "rgba(196,199,242,0.46)", letterSpacing: "0.1em", marginBottom: 4 }}>{label.toUpperCase()}</div>
      <div style={{ color: "rgba(196,199,242,0.9)", fontWeight: 600, fontSize: 13 }}>{value}</div>
    </div>
  );
}

function ActionButton({ children, variant, ...props }) {
  const base = {
    borderRadius: 10,
    border: "1px solid rgba(196,199,242,0.2)",
    padding: "10px 12px",
    cursor: "pointer",
    fontFamily: "'TAN Mon Cheri', serif",
    fontWeight: 600,
    letterSpacing: "0.04em",
    fontSize: 12,
  };

  const style =
    variant === "primary"
      ? {
          ...base,
          background: "linear-gradient(135deg, #85431e, #d39858)",
          color: "#e6ecff",
          border: "none",
          marginLeft: "auto",
        }
      : {
          ...base,
          background: "rgba(196,199,242,0.04)",
          color: "rgba(196,199,242,0.85)",
        };

  return (
    <button type="button" style={style} {...props}>
      {children}
    </button>
  );
}

function FilterPill({ label, value, options, onChange }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(196,199,242,0.46)", fontWeight: 600 }}>{label.toUpperCase()}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "rgba(196,199,242,0.06)",
          color: "#eaceaa",
          border: "1px solid rgba(196,199,242,0.16)",
          borderRadius: 8,
          padding: "8px 10px",
          fontFamily: "'TAN Mon Cheri', serif",
          fontSize: 13,
          minWidth: 150,
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function DiscoverPage({ profile, onNavigate }) {
  const [filters, setFilters] = useState({
    type: "All",
    sector: "All",
    stage: "All",
    region: "All",
  });
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef(null);
  const [matchesData, setMatchesData] = useState(MOCK_MATCHES);
  const { loadMatches, loading: matchesLoading, error: matchesError, actOnMatch } = useMatches();
  const selectedMatchId = useMatchStore((state) => state.selectedMatchId);
  const selectedSource = useMatchStore((state) => state.selectedSource);

  useEffect(() => {
    let active = true;

    loadMatches({ profile })
      .then((list) => {
        if (!active) return;
        const normalized = normalizeMatches(list);
        if (normalized.length > 0) setMatchesData(normalized);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [loadMatches, profile]);

  const filtered = useMemo(() => {
    return matchesData.filter((item) => {
      const typeLabel = item.type === "startup" ? "Startup" : "Investor";
      return (
        (filters.type === "All" || filters.type === typeLabel) &&
        (filters.sector === "All" || filters.sector === item.sector) &&
        (filters.stage === "All" || filters.stage === item.stage) &&
        (filters.region === "All" || filters.region === item.region)
      );
    });
  }, [filters, matchesData]);

  const current = filtered[index] || null;

  useEffect(() => {
    if (!selectedMatchId || filtered.length === 0) return;
    const targetIndex = filtered.findIndex((item) => item.id === selectedMatchId);
    if (targetIndex >= 0) setIndex(targetIndex);
  }, [selectedMatchId, filtered]);

  const moveNext = () => setIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : prev));

  const showToast = (message) => {
    setToast(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 1700);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#150c0c",
        color: "#eaceaa",
        fontFamily: "'TAN Mon Cheri', serif",
        paddingBottom: 30,
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(3,3,13,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(30,151,242,0.25)",
          padding: "14px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "#d39858", letterSpacing: "0.18em", fontWeight: 600 }}>DISCOVER</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28 }}>Your AI-ranked matches</div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate?.("profile")}
          style={{
            border: "1px solid rgba(196,199,242,0.2)",
            background: "rgba(196,199,242,0.06)",
            color: "#eaceaa",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 12,
            letterSpacing: "0.08em",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Edit profile
        </button>
      </header>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 22px 0" }}>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            background: "rgba(196,199,242,0.03)",
            border: "1px solid rgba(196,199,242,0.09)",
            borderRadius: 14,
            padding: 14,
            marginBottom: 16,
          }}
        >
          {Object.entries(FILTER_OPTIONS).map(([key, values]) => (
            <FilterPill
              key={key}
              label={key}
              value={filters[key]}
              options={values}
              onChange={(next) => {
                setFilters((prev) => ({ ...prev, [key]: next }));
                setIndex(0);
              }}
            />
          ))}
        </div>

        <div style={{ color: "rgba(196,199,242,0.5)", marginBottom: 18, fontSize: 13 }}>
          {filtered.length} matches for {profile?.name || "you"}
        </div>

        {selectedMatchId && selectedSource === "dashboard" && current && (
          <div
            style={{
              marginBottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(30,151,242,0.35)",
              background: "rgba(30,151,242,0.12)",
              color: "#d39858",
              borderRadius: 999,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Opened from Dashboard: {current.name}
          </div>
        )}

        {matchesLoading && (
          <div style={{ color: "rgba(196,199,242,0.5)", marginBottom: 10, fontSize: 12 }}>
            Syncing latest matches from backend...
          </div>
        )}

        {matchesError && (
          <div style={{ color: "#f2ba1e", marginBottom: 10, fontSize: 12 }}>
            Live match sync unavailable. Showing local demo data.
          </div>
        )}

        {current ? (
          <MatchCard
            match={current}
            onSkip={() => {
              if (current) {
                addMatchActivity({
                  id: `skip-${current.id}-${Date.now()}`,
                  title: "Skipped match",
                  detail: current.name,
                  tone: "warn",
                });
              }

              showToast("Skipped. Updating your ranking model.");
              moveNext();
            }}
            onLike={async () => {
              if (!current) return;

              try {
                await actOnMatch({ matchId: current.id, action: MatchAction.LIKE });
              } catch (_) {}

              addPipelineItem({
                id: `pipe-${current.id}`,
                matchId: current.id,
                counterpart: current.name,
                type: current.type === MatchEntityType.STARTUP ? "Startup" : "Investor",
                stage: "Intro Requested",
                score: current.score,
                owner: "You",
                eta: "2 days",
              });

              addMatchActivity({
                id: `like-${current.id}-${Date.now()}`,
                title: "Interest sent",
                detail: current.name,
                tone: "success",
              });

              setSelectedMatchId(current.id, "discover");
              showToast("Interest sent. Added to dashboard pipeline.");
              moveNext();
            }}
            onExplain={() => {
              if (current) {
                addMatchActivity({
                  id: `explain-${current.id}-${Date.now()}`,
                  title: "Viewed explanation",
                  detail: current.name,
                  tone: "info",
                });
              }
              showToast("AI explanation expanded in chat panel.");
            }}
          />
        ) : (
          <div
            style={{
              border: "1px dashed rgba(196,199,242,0.2)",
              borderRadius: 14,
              padding: 24,
              textAlign: "center",
              color: "rgba(196,199,242,0.66)",
            }}
          >
            No matches for this filter set yet. Try widening your preferences.
          </div>
        )}
      </section>

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            border: "1px solid rgba(30,151,242,0.35)",
            background: "rgba(3,3,13,0.95)",
            borderRadius: 10,
            padding: "12px 14px",
            color: "#d39858",
            fontSize: 12,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
