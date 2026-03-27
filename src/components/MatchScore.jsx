export default function MatchScore({ value, label = "MATCH SCORE" }) {
  const tone = value >= 94 ? "#D39758" : value >= 90 ? "#D39758" : "#D39758";

  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ color: tone, fontWeight: 700, fontSize: 26 }}>{value}%</div>
      <div style={{ color: "rgba(234,206,169,0.45)", fontSize: 11, letterSpacing: "0.08em" }}>{label}</div>
    </div>
  );
}
