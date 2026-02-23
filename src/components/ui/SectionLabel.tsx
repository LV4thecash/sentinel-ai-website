export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--color-accent)",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        marginBottom: "1rem",
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
