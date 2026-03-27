import { useMemo, useState } from "react";
import BrandMark from "../components/BrandMark";

const COMMON_SECTORS = [
  "Fintech",
  "SaaS",
  "AI/ML",
  "HealthTech",
  "ClimateTech",
  "Cybersecurity",
  "Consumer",
  "DeepTech",
];

const FOUNDER_STAGES = ["Idea", "Pre-seed", "Seed", "Series A", "Series B+"];
const INVESTOR_STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Growth"];

function Section({ title, subtitle, children }) {
  return (
    <section
      style={{
        border: "1px solid rgba(234,206,170,0.14)",
        borderRadius: 14,
        background: "rgba(234,206,170,0.03)",
        padding: 18,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <h3
          style={{
            margin: 0,
            fontFamily: "'Syne', sans-serif",
            fontSize: 24,
            color: "#eaceaa",
            fontWeight: 400,
          }}
        >
          {title}
        </h3>
        <p style={{ margin: "6px 0 0", color: "rgba(234,206,170,0.5)", fontSize: 13 }}>{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <span style={{ fontSize: 11, color: "rgba(234,206,170,0.46)", letterSpacing: "0.12em", fontWeight: 600 }}>{label.toUpperCase()}</span>
      {children}
    </label>
  );
}

function inputStyle() {
  return {
    background: "rgba(234,206,170,0.05)",
    border: "1px solid rgba(234,206,170,0.17)",
    color: "#eaceaa",
    borderRadius: 9,
    padding: "11px 12px",
    fontFamily: "'TAN Mon Cheri', serif",
    fontSize: 14,
    outline: "none",
  };
}

function SelectTag({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        borderRadius: 8,
        border: active ? "1px solid rgba(211,152,88,0.5)" : "1px solid rgba(234,206,170,0.2)",
        background: active ? "rgba(211,152,88,0.2)" : "rgba(234,206,170,0.04)",
        color: active ? "#eaceaa" : "rgba(234,206,170,0.75)",
        padding: "8px 10px",
        fontSize: 12,
        cursor: "pointer",
        fontFamily: "'TAN Mon Cheri', serif",
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );
}

export default function ProfilePage({ initialProfile, onNavigate }) {
  const seedProfile = useMemo(
    () => ({
      role: initialProfile?.role || "founder",
      fullName: initialProfile?.fullName || "",
      email: initialProfile?.email || "",
      location: initialProfile?.location || "India",
      orgName: initialProfile?.orgName || "",
      stage: initialProfile?.stage || "Seed",
      ticket: initialProfile?.ticket || "$250K-$1M",
      thesis: initialProfile?.thesis || "",
      objective: initialProfile?.objective || "Find high-quality matches and warm intros quickly.",
      sectors: initialProfile?.sectors || ["Fintech", "AI/ML"],
      minScore: initialProfile?.minScore || 85,
    }),
    [initialProfile],
  );

  const [profile, setProfile] = useState(seedProfile);
  const [saved, setSaved] = useState(false);

  const stageOptions = profile.role === "founder" ? FOUNDER_STAGES : INVESTOR_STAGES;

  const toggleSector = (sector) => {
    setProfile((prev) => {
      const exists = prev.sectors.includes(sector);
      return {
        ...prev,
        sectors: exists ? prev.sectors.filter((s) => s !== sector) : [...prev.sectors, sector],
      };
    });
  };

  const saveProfile = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

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
          zIndex: 10,
          background: "rgba(3,3,13,0.93)",
          borderBottom: "1px solid rgba(211,152,88,0.24)",
          backdropFilter: "blur(10px)",
          padding: "14px 22px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ color: "#d39858", fontSize: 11, letterSpacing: "0.18em", fontWeight: 600 }}>PROFILE</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28 }}>Tune your matching persona</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={() => onNavigate?.("discover")}
            style={{
              borderRadius: 8,
              border: "1px solid rgba(234,206,170,0.2)",
              background: "rgba(234,206,170,0.06)",
              color: "rgba(234,206,170,0.86)",
              padding: "10px 12px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.07em",
              cursor: "pointer",
            }}
          >
            Back to discover
          </button>
          <button
            type="button"
            onClick={saveProfile}
            style={{
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg, #85431e, #d39858)",
              color: "#e8eeff",
              padding: "10px 14px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.07em",
              cursor: "pointer",
            }}
          >
            Save changes
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1020, margin: "0 auto", padding: "20px 20px 0", display: "grid", gap: 14 }}>

        <Section title="Brand preview" subtitle="Logo + product identity used across nav bars.">
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <BrandMark />
              <div style={{ fontSize: 12, color: "rgba(234,206,170,0.56)" }}>
                Current source: <span style={{ color: "#d39858" }}>/branding/fi.png</span>
              </div>
            </div>
            <div
              style={{
                border: "1px dashed rgba(234,206,170,0.2)",
                borderRadius: 10,
                padding: "10px 12px",
                background: "rgba(3,3,13,0.35)",
                color: "rgba(234,206,170,0.68)",
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              Put your PNG logo file at <strong style={{ color: "#eaceaa" }}>public/branding/fi.png</strong>. If the image is missing,
              the app automatically falls back to the "F" mark.
            </div>
          </div>
        </Section>

        <Section title="Identity" subtitle="Core metadata used to personalize the match engine.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            <Field label="Role">
              <select
                value={profile.role}
                onChange={(e) => setProfile((prev) => ({ ...prev, role: e.target.value }))}
                style={inputStyle()}
              >
                <option value="founder">Founder</option>
                <option value="investor">Investor</option>
              </select>
            </Field>
            <Field label="Full name">
              <input
                value={profile.fullName}
                onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))}
                style={inputStyle()}
                placeholder="Your name"
              />
            </Field>
            <Field label="Email">
              <input
                value={profile.email}
                onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                style={inputStyle()}
                placeholder="you@company.com"
              />
            </Field>
            <Field label={profile.role === "founder" ? "Startup" : "Fund / Firm"}>
              <input
                value={profile.orgName}
                onChange={(e) => setProfile((prev) => ({ ...prev, orgName: e.target.value }))}
                style={inputStyle()}
                placeholder={profile.role === "founder" ? "Company name" : "Fund name"}
              />
            </Field>
          </div>
        </Section>

        <Section title="Matching preferences" subtitle="Set your primary filters and ranking constraints.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 12 }}>
            <Field label="Focus stage">
              <select
                value={profile.stage}
                onChange={(e) => setProfile((prev) => ({ ...prev, stage: e.target.value }))}
                style={inputStyle()}
              >
                {stageOptions.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={profile.role === "founder" ? "Raise amount" : "Ticket size"}>
              <input
                value={profile.ticket}
                onChange={(e) => setProfile((prev) => ({ ...prev, ticket: e.target.value }))}
                style={inputStyle()}
                placeholder={profile.role === "founder" ? "$1M-$2M" : "$250K-$1M"}
              />
            </Field>
            <Field label="Location">
              <input
                value={profile.location}
                onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                style={inputStyle()}
                placeholder="India"
              />
            </Field>
            <Field label="Minimum match score">
              <input
                type="range"
                min={50}
                max={99}
                value={profile.minScore}
                onChange={(e) => setProfile((prev) => ({ ...prev, minScore: Number(e.target.value) }))}
              />
              <div style={{ fontSize: 12, color: "#d39858", fontWeight: 700 }}>{profile.minScore}%</div>
            </Field>
          </div>

          <Field label="Priority sectors">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {COMMON_SECTORS.map((sector) => (
                <SelectTag
                  key={sector}
                  label={sector}
                  active={profile.sectors.includes(sector)}
                  onClick={() => toggleSector(sector)}
                />
              ))}
            </div>
          </Field>
        </Section>

        <Section
          title="AI guidance"
          subtitle="This context helps the model justify each match and personalize recommendations."
        >
          <div style={{ display: "grid", gap: 12 }}>
            <Field label={profile.role === "founder" ? "Startup thesis" : "Investment thesis"}>
              <textarea
                value={profile.thesis}
                onChange={(e) => setProfile((prev) => ({ ...prev, thesis: e.target.value }))}
                style={{ ...inputStyle(), minHeight: 90, resize: "vertical" }}
                placeholder={
                  profile.role === "founder"
                    ? "What problem do you solve, for whom, and what edge do you have?"
                    : "What sectors, stages, and patterns are you most excited to back?"
                }
              />
            </Field>
            <Field label="Current objective">
              <textarea
                value={profile.objective}
                onChange={(e) => setProfile((prev) => ({ ...prev, objective: e.target.value }))}
                style={{ ...inputStyle(), minHeight: 72, resize: "vertical" }}
              />
            </Field>
          </div>
        </Section>
      </main>

      {saved && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
            background: "rgba(3,3,13,0.96)",
            border: "1px solid rgba(211,152,88,0.45)",
            color: "#d39858",
            fontSize: 12,
            borderRadius: 10,
            padding: "12px 14px",
          }}
        >
          Profile saved. Future match scoring will use these settings.
        </div>
      )}
    </div>
  );
}
