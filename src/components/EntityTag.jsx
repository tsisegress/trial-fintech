export default function EntityTag({ children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 11,
        letterSpacing: "0.04em",
        color: "rgba(196,199,242,0.78)",
        border: "1px solid rgba(196,199,242,0.2)",
        background: "rgba(196,199,242,0.06)",
      }}
    >
      {children}
    </span>
  );
}
