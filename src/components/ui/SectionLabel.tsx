export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.68rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--color-accent)",
        opacity: 0.8,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.65rem",
        marginBottom: "0.85rem",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 18,
          height: 1,
          background: "var(--color-accent)",
          flexShrink: 0,
          opacity: 0.7,
        }}
      />
      {children}
    </span>
  );
}
