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
    <>
      <section
        style={{
          padding: "var(--section-gap) clamp(1.5rem, 5vw, 4rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle top warmth from dark zone transition above */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "20%",
            background:
              "linear-gradient(to bottom, rgba(37, 32, 34, 0.03) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{ maxWidth: "var(--content-width)", margin: "0 auto" }}
        >
          <FadeIn>
            <div
              style={{ textAlign: "center", marginBottom: "3.5rem" }}
            >
              <SectionLabel>Setup</SectionLabel>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
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
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0.75rem 1.5rem",
            }}
          >
            {steps.map((step, i) => (
              <FadeIn key={step.n} delay={i * 0.08}>
                <div
                  onMouseEnter={() => setHoveredStep(step.n)}
                  onMouseLeave={() => setHoveredStep(null)}
                  style={{
                    position: "relative",
                    padding: "1.25rem 1rem",
                    borderRadius: "var(--radius-md)",
                    background:
                      hoveredStep === step.n
                        ? "var(--glass-bg-subtle)"
                        : "transparent",
                    backdropFilter:
                      hoveredStep === step.n
                        ? "blur(12px)"
                        : "none",
                    WebkitBackdropFilter:
                      hoveredStep === step.n
                        ? "blur(12px)"
                        : "none",
                    border: `1px solid ${
                      hoveredStep === step.n
                        ? "var(--glass-border)"
                        : "transparent"
                    }`,
                    transform:
                      hoveredStep === step.n
                        ? "translateY(-3px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredStep === step.n
                        ? "var(--shadow-glass)"
                        : "none",
                    transition: `transform var(--motion-fast) var(--motion-ease-out), background var(--motion-fast) ease, border-color var(--motion-fast) ease, box-shadow var(--motion-fast) ease, backdrop-filter var(--motion-fast) ease`,
                  }}
                >
                  {/* Watermark step number */}
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "5rem",
                      color:
                        hoveredStep === step.n
                          ? "var(--color-border-hi)"
                          : "var(--color-border)",
                      lineHeight: 1,
                      marginBottom: "0.25rem",
                      userSelect: "none",
                      transition: "color var(--motion-fast) ease",
                    }}
                  >
                    {step.n}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
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
                        right: "-0.9rem",
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
            <div
              style={{ textAlign: "center", marginTop: "2.5rem" }}
            >
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
    </>
  );
}
