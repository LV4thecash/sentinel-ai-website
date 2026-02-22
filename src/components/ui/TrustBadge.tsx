interface TrustBadgeProps {
  icon: string;
  label: string;
}

export function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 6,
        fontSize: "0.78rem",
        color: "#c0c0c8",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: "1rem" }}>{icon}</span>
      {label}
    </div>
  );
}
