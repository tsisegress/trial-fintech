import { useState } from "react";

export default function BrandMark({ onClick, logoSrc = "/branding/fi.png" }) {
  const [imageOk, setImageOk] = useState(true);

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
        {imageOk ? (
          <img
            src={logoSrc}
            alt="Fintech"
            onError={() => setImageOk(false)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#fff", fontSize: "15px", fontFamily: "'Marcellus', serif" }}>F</span>
        )}
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
