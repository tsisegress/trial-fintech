export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div
      style={{
        border: "1px solid rgba(30,151,242,0.32)",
        borderRadius: 12,
        background: "rgba(196,199,242,0.04)",
        padding: "10px 12px",
      }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          border: "none",
          background: "transparent",
          color: "#c4c7f2",
          fontFamily: "'Syne', sans-serif",
          fontSize: 14,
          outline: "none",
        }}
      />
    </div>
  );
}
