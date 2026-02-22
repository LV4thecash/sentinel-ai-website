import { TrustBadge } from "@/components/ui/TrustBadge";
import Link from "next/link";

const badges = [
  { icon: "🔒", label: "Client-side only" },
  { icon: "⛔", label: "No wallet access" },
  { icon: "🚫", label: "No server credential storage" },
  { icon: "🛡️", label: "Non-custodial" },
];

export function TrustStripSection() {
  return (
    <section
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "2.5rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {badges.map((b) => (
          <TrustBadge key={b.label} icon={b.icon} label={b.label} />
        ))}
        <Link
          href="/security"
          style={{
            fontSize: "0.72rem",
            color: "var(--color-neutral)",
            fontFamily: "var(--font-mono)",
            marginLeft: "0.5rem",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
        >
          Security architecture →
        </Link>
      </div>
    </section>
  );
}
