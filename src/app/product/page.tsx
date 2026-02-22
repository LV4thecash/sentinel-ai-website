"use client";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProofSection } from "@/components/home/ProofSection";
import { CtaBand } from "@/components/ui/CtaBand";
import Link from "next/link";

const pipeline = [
  {
    label: "Detection",
    n: "01",
    bullets: ["Regex + Base58 alphabet sweep", "Fragment / split-token scan"],
  },
  {
    label: "Reconstruction",
    n: "02",
    bullets: ["Reverse-map CA database lookup", "AI-assisted completion candidates"],
  },
  {
    label: "Filtering",
    n: "03",
    bullets: ["Warning keyword scan", "Ordinal instruction parser"],
  },
  {
    label: "Forwarding",
    n: "04",
    bullets: ["Clean CA to user-defined destination", "Source metadata attached"],
  },
];

const metrics = [
  { stat: "≥ 97%", label: "Extraction Precision" },
  { stat: "≥ 90%", label: "Extraction Recall" },
  { stat: "< 500ms", label: "p95 Detection (full CA)" },
  { stat: "< 3%", label: "False Block Rate" },
];

const configOptions: [string, string][] = [
  ["Source selection", "Monitor any Telegram chat, channel, or user"],
  ["Ordinal handling", "Forward all CAs, or only when an ordinal instruction is explicit"],
  ["Warning filter", "Toggle on/off; customize the keyword list in advanced mode"],
  ["Forwarding destination", "Any Telegram group, bot, or DM"],
];

export default function ProductPage() {
  const [hoveredPipeline, setHoveredPipeline] = useState<string | null>(null);

  return (
    <main>
      {/* Hero */}
      <section style={{ padding: "5rem clamp(1.5rem, 5vw, 4rem)", textAlign: "center" }}>
        <FadeIn>
          <nav
            aria-label="Breadcrumb"
            style={{
              fontSize: "0.72rem",
              color: "var(--color-neutral)",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-mono)",
            }}
          >
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </Link>
            {" / "}Product
          </nav>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "0.03em",
              lineHeight: 0.95,
              marginBottom: "1.25rem",
              color: "var(--color-text)",
            }}
          >
            INTELLIGENCE,<br />NOT EXECUTION.
          </h1>
          <p
            style={{
              color: "var(--color-text-secondary)",
              maxWidth: 520,
              margin: "0 auto 2.5rem",
              lineHeight: 1.65,
              fontSize: "1rem",
            }}
          >
            Sentinel is the layer that turns hostile Telegram noise into clean
            contract addresses — ready for your bot to act on.
          </p>
          <Link
            href="/waitlist"
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              fontWeight: 700,
              padding: "0.85rem 2rem",
              borderRadius: 4,
              textDecoration: "none",
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: `background var(--motion-fast) ease, transform var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) ease`,
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent-hi)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(190,27,42,0.28)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-accent)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Apply for Access
          </Link>
        </FadeIn>
      </section>

      {/* Pipeline */}
      <FadeIn>
        <section
          style={{
            padding: "4rem clamp(1.5rem, 5vw, 4rem)",
            background: "var(--color-surface)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div style={{ maxWidth: 1060, margin: "0 auto" }}>
            <SectionLabel>System Architecture</SectionLabel>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              {pipeline.map((p, i) => (
                <div key={p.label} style={{ position: "relative" }}>
                  <div
                    onMouseEnter={() => setHoveredPipeline(p.label)}
                    onMouseLeave={() => setHoveredPipeline(null)}
                    style={{
                      background: "var(--color-bg)",
                      border: `1px solid ${hoveredPipeline === p.label ? "var(--color-accent)" : "var(--color-border)"}`,
                      borderRadius: 6,
                      padding: "1rem 1.1rem",
                      transform: hoveredPipeline === p.label ? "translateY(-2px)" : "translateY(0)",
                      boxShadow: hoveredPipeline === p.label ? "0 6px 16px rgba(0,0,0,0.07)" : "none",
                      transition: `transform var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) ease, border-color var(--motion-fast) ease`,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: "var(--color-accent)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {p.n} {p.label}
                    </p>
                    {p.bullets.map((b) => (
                      <p
                        key={b}
                        style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", lineHeight: 1.55 }}
                      >
                        · {b}
                      </p>
                    ))}
                  </div>
                  {i < pipeline.length - 1 && (
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "-0.75rem",
                        transform: "translateY(-50%)",
                        color: "var(--color-border-hi)",
                        fontSize: "1rem",
                        zIndex: 1,
                      }}
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Proof cards — reuse home ProofSection */}
      <ProofSection />

      {/* Metrics */}
      <FadeIn>
        <section
          style={{
            padding: "4rem clamp(1.5rem, 5vw, 4rem)",
            background: "var(--color-surface)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              textAlign: "center",
            }}
          >
            {metrics.map((m, i) => (
              <FadeIn key={m.label} delay={i * 0.07}>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2.8rem",
                      color: "var(--color-accent)",
                      lineHeight: 1,
                    }}
                  >
                    {m.stat}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "var(--color-neutral)", marginTop: "0.35rem" }}>
                    {m.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Config options */}
      <FadeIn>
        <section style={{ padding: "4rem clamp(1.5rem, 5vw, 4rem)" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <SectionLabel>Configuration</SectionLabel>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              {configOptions.map(([label, desc]) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr",
                    gap: "1rem",
                    padding: "0.85rem 1rem",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--color-text)",
                    }}
                  >
                    {label}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <CtaBand />
    </main>
  );
}
