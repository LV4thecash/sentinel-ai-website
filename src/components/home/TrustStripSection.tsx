import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";

const items = [
  {
    icon: "🔒",
    label: "Client-side only",
    description: "All processing happens in your browser extension. Nothing is sent to a Sentinel server.",
  },
  {
    icon: "◎",
    label: "No wallet access",
    description: "Sentinel never requests wallet permissions. It cannot sign, read, or interact with your assets.",
  },
  {
    icon: "◻",
    label: "No server storage",
    description: "Credentials are never transmitted or stored remotely. Your Telegram session stays local.",
  },
  {
    icon: "⬡",
    label: "Non-custodial",
    description: "No asset custody, no trade execution, no positions. Sentinel only forwards contract addresses.",
  },
];

export function TrustStripSection() {
  return (
    <section
      style={{
        padding: "var(--section-gap) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--color-bg-alt)",
      }}
    >
      <div style={{ maxWidth: "var(--content-width)", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionLabel>Security Architecture</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
                color: "var(--color-text)",
                marginBottom: "1rem",
              }}
            >
              Built on zero-trust principles.
            </h2>
            <p
              style={{
                fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              Sentinel runs entirely in your browser. No credentials leave your machine.
              No server touches your session.
            </p>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {items.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.07}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  padding: "1.35rem 1.5rem",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontSize: "1rem", lineHeight: 1 }}>{item.icon}</span>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: "var(--color-text)",
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.28}>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link
              href="/security"
              style={{
                color: "var(--color-accent)",
                fontSize: "0.82rem",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                borderBottom: "1px solid rgba(190,27,42,0.3)",
                paddingBottom: "1px",
              }}
            >
              Review the full security model →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
