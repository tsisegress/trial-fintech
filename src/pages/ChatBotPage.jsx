import { useState } from "react";

const FIN_RESPONSES = [
  "Based on current fit and traction, connect first and validate conviction in one call.",
  "This looks investable only if retention and unit economics stay stable for 2-3 months.",
  "Good strategic fit, but wait for one stronger proof point before committing capital.",
  "Strong match for partnership, medium confidence for immediate investment.",
];

export default function ChatBotPage({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [intent, setIntent] = useState("");
  const [email, setEmail] = useState("");
  const [connected, setConnected] = useState(false);
  const [finAnswer, setFinAnswer] = useState("");
  const [rating, setRating] = useState(0);

  const canProceed = query.trim().length > 0;
  const canConnect = canProceed && intent && email.includes("@");

  return (
    <div style={{ minHeight: "100vh", background: "#150D0B", color: "#EACEA9", fontFamily: "'TAN Mon Cheri', serif", padding: 24 }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "0.16em", fontSize: 11, color: "#D39758" }}>ASK FIN</div>
            <h1 style={{ margin: 0, fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>Fin assistant + history</h1>
          </div>
          <button type="button" onClick={() => onNavigate?.("landing")} style={{ border: "1px solid rgba(234,206,169,0.3)", background: "rgba(234,206,169,0.08)", color: "#EACEA9", borderRadius: 8, padding: "8px 12px", cursor: "pointer" }}>
            Back
          </button>
        </div>

        <section style={{ border: "1px solid rgba(234,206,169,0.24)", borderRadius: 12, padding: 14, background: "rgba(21,13,11,0.55)" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, marginBottom: 8 }}>What are you looking for?</div>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe founder/investor goals first"
            rows={4}
            style={{ width: "100%", boxSizing: "border-box", background: "rgba(234,206,169,0.08)", color: "#EACEA9", border: "1px solid rgba(234,206,169,0.2)", borderRadius: 8, padding: 10, fontFamily: "'TAN Mon Cheri', serif" }}
          />
          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <button type="button" disabled={!canProceed} onClick={() => setIntent("match")} style={{ border: "none", background: canProceed ? "#85441E" : "#5d3a2a", color: "#EACEA9", borderRadius: 8, padding: "8px 12px", cursor: canProceed ? "pointer" : "not-allowed" }}>
              Find a match
            </button>
            <button type="button" disabled={!canProceed} onClick={() => setIntent("search")} style={{ border: "none", background: canProceed ? "#D39758" : "#5d3a2a", color: "#150D0B", borderRadius: 8, padding: "8px 12px", cursor: canProceed ? "pointer" : "not-allowed" }}>
              Search for one
            </button>
          </div>
        </section>

        <section style={{ border: "1px solid rgba(234,206,169,0.24)", borderRadius: 12, padding: 14, background: "rgba(21,13,11,0.55)" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, marginBottom: 8 }}>Connect details</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email for connection" style={{ width: "100%", boxSizing: "border-box", background: "rgba(234,206,169,0.08)", color: "#EACEA9", border: "1px solid rgba(234,206,169,0.2)", borderRadius: 8, padding: 10, fontFamily: "'TAN Mon Cheri', serif" }} />
          <button type="button" disabled={!canConnect} onClick={() => setConnected(true)} style={{ marginTop: 10, border: "none", background: canConnect ? "#85441E" : "#5d3a2a", color: "#EACEA9", borderRadius: 8, padding: "8px 12px", cursor: canConnect ? "pointer" : "not-allowed" }}>
            Connect now
          </button>
        </section>

        <section style={{ border: "1px solid rgba(234,206,169,0.24)", borderRadius: 12, padding: 14, background: "rgba(21,13,11,0.55)", display: "grid", gap: 10 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14 }}>Need guidance?</div>
          <button
            type="button"
            disabled={!connected}
            onClick={() => setFinAnswer(FIN_RESPONSES[Math.floor(Math.random() * FIN_RESPONSES.length)])}
            style={{ border: "none", background: connected ? "#D39758" : "#5d3a2a", color: connected ? "#150D0B" : "#EACEA9", borderRadius: 8, padding: "8px 12px", cursor: connected ? "pointer" : "not-allowed" }}
          >
            Ask Fin
          </button>
          {finAnswer && <div style={{ color: "#EACEA9" }}>{finAnswer}</div>}

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span>Rate this advice:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} style={{ border: "1px solid rgba(234,206,169,0.3)", background: rating >= n ? "#D39758" : "transparent", color: rating >= n ? "#150D0B" : "#EACEA9", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}>
                {n}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
