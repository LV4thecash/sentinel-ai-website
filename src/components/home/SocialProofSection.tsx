import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

const phase1Features = [
  "CA fragment reconstruction",
  "Multi-CA + ordinal resolution",
  "Warning context filtering",
  "Website link extraction",
  "Telegram link auto-join",
];

export function SocialProofSection() {
  return (
    <section
      style={{
        padding: "var(--section-gap) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--color-bg-alt)",
      }}
    >
      <div style={{ maxWidth: "var(--content-width)", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel>Current Status</SectionLabel>
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
              Currently in private evaluation.
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
              Sentinel is in controlled testing with 20 selected Solana traders.
              We&apos;re expanding access carefully — precision over growth.
            </p>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {/* Phase 1 — Live */}
          <FadeIn delay={0.07}>
            <div
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                padding: "1.75rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#16a34a",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                  }}
                >
                  Phase 1 · Live
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--color-text)",
                  marginBottom: "1rem",
                }}
              >
                Intelligence Layer
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {phase1Features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--color-text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ color: "var(--color-pass)", fontSize: "0.7rem" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Evaluation — Active */}
          <FadeIn delay={0.14}>
            <div
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                padding: "1.75rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#16a34a",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                  }}
                >
                  Evaluation · Active
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--color-text)",
                  marginBottom: "1rem",
                }}
              >
                Private Testing
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  20 traders. Invite-only.
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Controlled rollout — not yet open to the public.
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  Expanding when precision benchmarks are met.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Phase 2 — Planned */}
          <FadeIn delay={0.21}>
            <div
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                padding: "1.75rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                opacity: 0.7,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--color-border-hi)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Phase 2 · Planned
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--color-text)",
                  marginBottom: "1rem",
                }}
              >
                Execution Layer
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  Bot integration for automated execution.
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  No dates. No timeline promises.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
