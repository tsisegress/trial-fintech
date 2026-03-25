export default function MatchScore({ value, label = "MATCH SCORE" }) {
  const tone = value >= 94 ? "#53e3a6" : value >= 90 ? "#1e97f2" : "#f2ba1e";

  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ color: tone, fontWeight: 700, fontSize: 26 }}>{value}%</div>
      <div style={{ color: "rgba(196,199,242,0.45)", fontSize: 11, letterSpacing: "0.08em" }}>{label}</div>
    </div>
  );
}
