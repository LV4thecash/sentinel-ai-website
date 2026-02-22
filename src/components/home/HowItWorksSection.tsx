import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";

const steps = [
  {
    n: "01",
    label: "Install",
    desc: "Add Sentinel AI from the Chrome Web Store in one click.",
  },
  {
    n: "02",
    label: "Connect Telegram",
    desc: "Enter your API ID, API Hash, and phone. Auth code handled in-product.",
  },
  {
    n: "03",
    label: "Pick sources",
    desc: "Select chats and channels to monitor. Define your forwarding target.",
  },
  {
    n: "04",
    label: "Done",
    desc: "Sentinel runs automatically. CAs arrive. Your bot executes.",
  },
];

export function HowItWorksSection() {
  return (
    <section style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel>Setup</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              letterSpacing: "0.03em",
              lineHeight: 1,
            }}
          >
            RUNNING IN ~10 MINUTES
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {steps.map((step, i) => (
            <div key={step.n} style={{ position: "relative" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3.5rem",
                  color: "var(--color-border-hi)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {step.n}
              </p>
              <p style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.35rem" }}>
                {step.label}
              </p>
              <p style={{ fontSize: "0.82rem", color: "#8888a0", lineHeight: 1.6 }}>
                {step.desc}
              </p>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "1.6rem",
                    right: "-0.85rem",
                    color: "var(--color-border-hi)",
                    fontSize: "1.1rem",
                  }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link
            href="/how-it-works"
            style={{
              color: "var(--color-accent)",
              fontSize: "0.82rem",
              fontFamily: "var(--font-mono)",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            Full setup guide →
          </Link>
        </div>
      </div>
    </section>
  );
}
