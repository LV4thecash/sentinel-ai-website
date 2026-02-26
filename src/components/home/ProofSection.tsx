"use client";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";

interface DemoCard {
  title: string;
  input: string[];
  output: string;
  stat: string;
  blocked: boolean;
  highlight?: string;
}

const cards: DemoCard[] = [
  {
    title: "Fragment Reconstruction",
    input: ["7xKp3mN  [partial fragment]", "⟶ lookup initiated"],
    output: "Full CA reconstructed · <500ms",
    stat: "< 500ms",
    blocked: false,
    highlight: "7xKp3mN",
  },
  {
    title: "Multi-CA + Ordinal",
    input: [
      "CA1: AbCdEfGh...",
      "CA2: XyZwVuTs...",
      "only buy the second",
    ],
    output: "XyZwVuTs... forwarded",
    stat: "correct pick",
    blocked: false,
    highlight: "second",
  },
  {
    title: "Warning Filter",
    input: ["XyZwVuTs...", "DO NOT BUY — honeypot confirmed"],
    output: "FORWARDING BLOCKED",
    stat: "protected",
    blocked: true,
    highlight: "DO NOT BUY",
  },
  {
    title: "Website Extraction",
    input: ["check the contract:", "https://token.xyz"],
    output: "CA extracted from page",
    stat: "auto-scraped",
    blocked: false,
  },
  {
    title: "Telegram Link",
    input: ["CA dropping here →", "t.me/alphagroup"],
    output: "Joined · CA found · forwarded",
    stat: "auto-joined",
    blocked: false,
    highlight: "t.me/alphagroup",
  },
];

function ProofCard({ card, index }: { card: DemoCard; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.08} style={{ height: "100%" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "var(--glass-bg-strong)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
          border: `1px solid ${
            card.blocked
              ? "rgba(190,27,42,0.2)"
              : hovered
                ? "var(--color-accent)"
                : "var(--glass-border)"
          }`,
          borderRadius: "var(--radius-md)",
          padding: "1.35rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          height: "100%",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? `var(--shadow-glass-hover)${card.blocked ? "" : ", var(--shadow-glow-accent)"}`
            : "var(--shadow-glass)",
          transition: `transform var(--motion-fast) var(--motion-spring), box-shadow var(--motion-fast) ease, border-color var(--motion-fast) ease`,
        }}
      >
        {/* Card label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--color-accent)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {card.title}
        </p>

        {/* Input bubble */}
        <ChatBubble
          lines={card.input}
          blocked={card.blocked}
          highlight={card.highlight}
        />

        {/* Arrow */}
        <div
          style={{
            textAlign: "center",
            color: "var(--color-text-muted)",
            fontSize: "0.85rem",
            lineHeight: 1,
          }}
        >
          ↓
        </div>

        {/* Output chip */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.67rem",
            padding: "0.5rem 0.75rem",
            background: card.blocked
              ? "rgba(190,27,42,0.06)"
              : "rgba(22,163,74,0.07)",
            border: `1px solid ${
              card.blocked
                ? "rgba(190,27,42,0.18)"
                : "rgba(22,163,74,0.2)"
            }`,
            borderRadius: "var(--radius-sm)",
            color: card.blocked
              ? "var(--color-accent)"
              : "var(--color-pass)",
            wordBreak: "break-all",
          }}
        >
          {card.output}
        </div>

        {/* Stat */}
        <p
          style={{
            fontSize: "0.63rem",
            color: "var(--color-text-muted)",
            textAlign: "right",
            fontFamily: "var(--font-mono)",
            margin: 0,
          }}
        >
          {card.stat}
        </p>
      </div>
    </FadeIn>
  );
}

export function ProofSection() {
  return (
    <>
      <section
        style={{
          padding: "var(--section-gap) clamp(1.5rem, 5vw, 4rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{ maxWidth: "var(--content-width)", margin: "0 auto" }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionLabel>What Sentinel Resolves</SectionLabel>
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
                Five patterns. Zero misses.
              </h2>
            </div>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {cards.map((card, index) => (
              <ProofCard key={card.title} card={card} index={index} />
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link
                href="/product"
                style={{
                  color: "var(--color-accent)",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  borderBottom: "1px solid rgba(190,27,42,0.3)",
                  paddingBottom: "1px",
                  transition:
                    "border-color var(--motion-fast) ease",
                }}
              >
                Full technical breakdown →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
