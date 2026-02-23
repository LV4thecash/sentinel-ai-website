interface TrustBadgeProps {
  icon: string;
  label: string;
  description: string;
}

export function TrustBadge({ icon, label, description }: TrustBadgeProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "1.25rem 1.5rem",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{icon}</span>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "0.88rem",
          color: "var(--color-text)",
          margin: 0,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "0.78rem",
          color: "var(--color-text-muted)",
          lineHeight: 1.55,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}
