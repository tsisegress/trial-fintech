import { useMemo } from "react";
import { setSelectedMatchId, useMatchStore } from "../store/useMatchStore";

const KPI_CARDS = [
  { label: "Active Matches", value: "128", delta: "+18 this week" },
  { label: "Warm Intros", value: "23", delta: "+6 this week" },
  { label: "Avg Match Score", value: "91%", delta: "+4 pts" },
  { label: "Response Rate", value: "67%", delta: "+9%" },
];

const PIPELINE_ROWS = [
  {
    id: "p-01",
    counterpart: "NiyamFlow",
    type: "Startup",
    stage: "Intro Requested",
    score: 97,
    owner: "You",
    eta: "2 days",
  },
  {
    id: "p-02",
    counterpart: "Monsoon Peak Ventures",
    type: "Investor",
    stage: "Meeting Scheduled",
    score: 94,
    owner: "You",
    eta: "Tomorrow",
  },
  {
    id: "p-03",
    counterpart: "LedgerRail",
    type: "Startup",
    stage: "AI Review",
    score: 90,
    owner: "Analyst Bot",
    eta: "Today",
  },
  {
    id: "p-04",
    counterpart: "Astra Syndicate",
    type: "Investor",
    stage: "Awaiting Reply",
    score: 87,
    owner: "You",
    eta: "4 days",
  },
];

const NEWS_FEED = [
  {
    id: "n-1",
    title: "Digital lending compliance updates may reshape underwriting vendors",
    source: "Market Pulse",
    impact: "High",
  },
  {
    id: "n-2",
    title: "B2B SaaS payment rails adoption accelerates across Southeast Asia",
    source: "FinTech Wire",
    impact: "Medium",
  },
  {
    id: "n-3",
    title: "Operator-led micro funds increase seed deployment velocity",
    source: "VC Daily",
    impact: "High",
  },
];

function Card({ children }) {
  return (
    <section
      style={{
        border: "1px solid rgba(234,206,170,0.14)",
        borderRadius: 14,
        background: "rgba(234,206,170,0.03)",
        padding: 16,
      }}
    >
      {children}
    </section>
  );
}

function Kpi({ label, value, delta }) {
  return (
    <div
      style={{
        border: "1px solid rgba(234,206,170,0.13)",
        borderRadius: 12,
        background: "rgba(3,3,13,0.35)",
        padding: 14,
      }}
    >
      <div style={{ fontSize: 11, color: "rgba(234,206,170,0.47)", letterSpacing: "0.11em", fontWeight: 600 }}>{label.toUpperCase()}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", color: "#eaceaa", fontSize: 31, marginTop: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: "#d39858", marginTop: 3 }}>{delta}</div>
    </div>
  );
}

function StagePill({ stage }) {
  const tone =
    stage === "Meeting Scheduled"
      ? { border: "rgba(83,227,166,0.5)", bg: "rgba(83,227,166,0.16)", color: "#d39858" }
      : stage === "Intro Requested"
        ? { border: "rgba(211,152,88,0.5)", bg: "rgba(211,152,88,0.16)", color: "#d39858" }
        : stage === "AI Review"
          ? { border: "rgba(242,186,30,0.5)", bg: "rgba(242,186,30,0.16)", color: "#ffd891" }
          : { border: "rgba(234,206,170,0.3)", bg: "rgba(234,206,170,0.08)", color: "rgba(234,206,170,0.8)" };

  return (
    <span
      style={{
        border: `1px solid ${tone.border}`,
        background: tone.bg,
        color: tone.color,
        fontSize: 11,
        borderRadius: 999,
        padding: "4px 9px",
        letterSpacing: "0.05em",
        fontWeight: 600,
      }}
    >
      {stage}
    </span>
  );
}

export default function DashboardPage({ onNavigate }) {
  const storedPipeline = useMatchStore((state) => state.pipeline || []);
  const activity = useMatchStore((state) => state.activity || []);

  const bestPipeline = useMemo(() => {
    const merged = [...storedPipeline, ...PIPELINE_ROWS].reduce((acc, row) => {
      if (!acc.find((item) => item.id === row.id)) acc.push(row);
      return acc;
    }, []);

    return merged.sort((a, b) => b.score - a.score);
  }, [storedPipeline]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#150c0c",
        color: "#eaceaa",
        fontFamily: "'TAN Mon Cheri', serif",
        paddingBottom: 28,
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(3,3,13,0.93)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(211,152,88,0.24)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "13px 20px",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "#d39858", letterSpacing: "0.18em", fontWeight: 700 }}>DASHBOARD</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28 }}>Command center</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={() => onNavigate?.("search")}
            style={{
              border: "1px solid rgba(234,206,170,0.2)",
              background: "rgba(234,206,170,0.06)",
              color: "rgba(234,206,170,0.85)",
              borderRadius: 8,
              padding: "9px 11px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.06em",
              cursor: "pointer",
            }}
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("discover")}
            style={{
              border: "none",
              background: "linear-gradient(135deg, #85431e, #d39858)",
              color: "#e8eeff",
              borderRadius: 8,
              padding: "9px 11px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.06em",
              cursor: "pointer",
            }}
          >
            Discover
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "20px 20px 0", display: "grid", gap: 14 }}>
        <Card>
          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            {KPI_CARDS.map((kpi) => (
              <Kpi key={kpi.label} label={kpi.label} value={kpi.value} delta={kpi.delta} />
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)" }}>
          <Card>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 25 }}>Live pipeline</div>
              <div style={{ fontSize: 13, color: "rgba(234,206,170,0.52)" }}>Prioritized by fit score and workflow stage.</div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 630 }}>
                <thead>
                  <tr>
                    {[
                      "Counterpart",
                      "Type",
                      "Stage",
                      "Score",
                      "Owner",
                      "Next action",
                    ].map((title) => (
                      <th
                        key={title}
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid rgba(234,206,170,0.15)",
                          padding: "10px 10px 9px 0",
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          color: "rgba(234,206,170,0.46)",
                        }}
                      >
                        {title.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bestPipeline.map((row) => (
                    <tr key={row.id}>
                      <td style={{ borderBottom: "1px solid rgba(234,206,170,0.08)", padding: "12px 10px 12px 0", fontWeight: 600 }}>
                        {row.counterpart}
                      </td>
                      <td style={{ borderBottom: "1px solid rgba(234,206,170,0.08)", padding: "12px 10px 12px 0", color: "rgba(234,206,170,0.84)" }}>
                        {row.type}
                      </td>
                      <td style={{ borderBottom: "1px solid rgba(234,206,170,0.08)", padding: "12px 10px 12px 0" }}>
                        <StagePill stage={row.stage} />
                      </td>
                      <td style={{ borderBottom: "1px solid rgba(234,206,170,0.08)", padding: "12px 10px 12px 0", color: "#d39858", fontWeight: 700 }}>
                        {row.score}%
                      </td>
                      <td style={{ borderBottom: "1px solid rgba(234,206,170,0.08)", padding: "12px 10px 12px 0", color: "rgba(234,206,170,0.84)" }}>
                        {row.owner}
                      </td>
                      <td style={{ borderBottom: "1px solid rgba(234,206,170,0.08)", padding: "12px 0 12px 0", color: "rgba(234,206,170,0.84)" }}>
                        {row.eta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div style={{ display: "grid", gap: 14 }}>
            <Card>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 23 }}>Market intelligence</div>
                <div style={{ fontSize: 12, color: "rgba(234,206,170,0.52)" }}>News weighted by likely portfolio impact.</div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {NEWS_FEED.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border: "1px solid rgba(234,206,170,0.12)",
                      borderRadius: 10,
                      padding: "10px 11px",
                      background: "rgba(3,3,13,0.35)",
                    }}
                  >
                    <div style={{ color: "rgba(234,206,170,0.86)", fontSize: 13, lineHeight: 1.4 }}>{item.title}</div>
                    <div style={{ marginTop: 7, display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                      <span style={{ color: "rgba(234,206,170,0.5)" }}>{item.source}</span>
                      <span style={{ color: item.impact === "High" ? "#f2ba1e" : "#d39858" }}>{item.impact} impact</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>


            <Card>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 23 }}>Recent activity</div>
                <div style={{ fontSize: 12, color: "rgba(234,206,170,0.52)" }}>Actions from discover/search flows.</div>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {activity.length === 0 ? (
                  <div style={{ fontSize: 12, color: "rgba(234,206,170,0.48)" }}>No actions yet. Swipe in Discover to populate this feed.</div>
                ) : (
                  activity.slice(0, 6).map((event) => (
                    <div
                      key={event.id}
                      style={{
                        border: "1px solid rgba(234,206,170,0.12)",
                        borderRadius: 10,
                        padding: "9px 10px",
                        background: "rgba(3,3,13,0.35)",
                      }}
                    >
                      <div style={{ color: "rgba(234,206,170,0.9)", fontSize: 13 }}>{event.title}</div>
                      <div style={{ color: "rgba(234,206,170,0.58)", fontSize: 12 }}>{event.detail}</div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card>
              <div style={{ marginBottom: 9 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 23 }}>Actions</div>
              </div>
              <div style={{ display: "grid", gap: 9 }}>
                <button
                  type="button"
                  onClick={() => {
                    const top = bestPipeline[0];
                    if (top?.matchId) setSelectedMatchId(top.matchId, "dashboard");
                    onNavigate?.("discover");
                  }}
                  style={{
                    border: "none",
                    background: "linear-gradient(135deg, #85431e, #d39858)",
                    color: "#e7eeff",
                    borderRadius: 8,
                    padding: "10px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Review top matches
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate?.("search")}
                  style={{
                    border: "1px solid rgba(234,206,170,0.2)",
                    background: "rgba(234,206,170,0.06)",
                    color: "rgba(234,206,170,0.86)",
                    borderRadius: 8,
                    padding: "10px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Run semantic search
                </button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
