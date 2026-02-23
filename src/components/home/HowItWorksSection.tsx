"use client";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";
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
    label: "Done.",
    desc: "Sentinel runs automatically. Clean CAs arrive. Your bot executes.",
  },
];

export function HowItWorksSection() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <section
      style={{
        padding: "var(--section-gap) var(--gutter)",
        background: "var(--color-bg)",
      }}
    >
      <div style={{ maxWidth: "var(--content-width)", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel>Setup</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "var(--color-text)",
              }}
            >
              Running in ~10 minutes.
            </h2>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
            gap: "0.5rem 2rem",
          }}
        >
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.08}>
              <div
                onMouseEnter={() => setHoveredStep(step.n)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  position: "relative",
                  paddingTop: "0.5rem",
                  padding: "1rem 0.75rem",
                  borderRadius: "var(--radius-md)",
                  background: hoveredStep === step.n ? "rgba(0,0,0,0.015)" : "transparent",
                  transform: hoveredStep === step.n ? "translateY(-2px)" : "translateY(0)",
                  transition: `transform var(--motion-fast) var(--motion-ease-out), background var(--motion-fast) ease`,
                }}
              >
                {/* Watermark step number */}
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "5rem",
                    color: hoveredStep === step.n ? "var(--color-border-hi)" : "var(--color-border)",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                    userSelect: "none",
                    transition: `color var(--motion-fast) ease`,
                  }}
                >
                  {step.n}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: "var(--color-text)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {step.label}
                </p>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.65,
                  }}
                >
                  {step.desc}
                </p>

                {/* Connector arrow — desktop only */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "2.75rem",
                      right: "-1.2rem",
                      color: "var(--color-border-hi)",
                      fontSize: "1rem",
                    }}
                  >
                    →
                  </span>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.32}>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link
              href="/how-it-works"
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
              Full setup documentation →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
