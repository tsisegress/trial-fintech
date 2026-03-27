export default function BrandMark({ onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: "10px", cursor: onClick ? "pointer" : "default" }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          background: "linear-gradient(135deg, #091eca, #1e97f2)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <span style={{ color: "#fff", fontSize: "15px", fontFamily: "'Marcellus', serif" }}>F</span>
      </div>
      <span
        style={{
          fontFamily: "'Marcellus', serif",
          fontSize: "20px",
          color: "#c4c7f2",
          letterSpacing: "0.04em",
        }}
      >
        Fintech
      </span>
    </div>
  );
}
