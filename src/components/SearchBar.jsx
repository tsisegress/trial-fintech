export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div
      style={{
        border: "1px solid rgba(211,152,88,0.32)",
        borderRadius: 12,
        background: "rgba(234,206,170,0.04)",
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
          color: "#eaceaa",
          fontFamily: "'TAN Mon Cheri', serif",
          fontSize: 14,
          outline: "none",
        }}
      />
    </div>
  );
}
