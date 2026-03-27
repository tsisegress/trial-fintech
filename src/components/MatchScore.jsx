export default function MatchScore({ value, label = "MATCH SCORE" }) {
  const tone = value >= 94 ? "#d39858" : value >= 90 ? "#d39858" : "#f2ba1e";

  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ color: tone, fontWeight: 700, fontSize: 26 }}>{value}%</div>
      <div style={{ color: "rgba(234,206,170,0.45)", fontSize: 11, letterSpacing: "0.08em" }}>{label}</div>
    </div>
  );
}
