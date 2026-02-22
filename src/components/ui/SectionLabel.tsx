export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.68rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--color-accent)",
        display: "block",
        marginBottom: "0.75rem",
      }}
    >
      {children}
    </span>
  );
}
