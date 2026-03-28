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
        color: "rgba(234,206,169,0.78)",
        border: "1px solid rgba(234,206,169,0.2)",
        background: "rgba(234,206,169,0.06)",
      }}
    >
      {children}
    </span>
  );
}
