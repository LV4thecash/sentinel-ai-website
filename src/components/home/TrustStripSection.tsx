"use client";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";

const items = [
  {
    icon: "[ local ]",
    label: "Client-side only",
    description: "All processing happens in your browser extension. Nothing is sent to a Sentinel server.",
  },
  {
    icon: "[ ø wallet ]",
    label: "No wallet access",
    description: "Sentinel never requests wallet permissions. It cannot sign, read, or interact with your assets.",
  },
  {
    icon: "[ ø server ]",
    label: "No server storage",
    description: "Credentials are never transmitted or stored remotely. Your Telegram session stays local.",
  },
  {
    icon: "[ non-custodial ]",
    label: "Non-custodial",
    description: "No asset custody, no trade execution, no positions. Sentinel only forwards contract addresses.",
  },
];

function TrustCard({ item, index }: { item: typeof items[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.07}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "1.35rem 1.5rem",
          background: "var(--color-surface)",
          border: `1px solid ${hovered ? "var(--color-accent)" : "var(--color-border)"}`,
          borderRadius: 8,
          boxShadow: hovered
            ? "var(--shadow-hover)"
            : "var(--shadow-sm), var(--shadow-inset)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: `transform var(--motion-fast) var(--motion-spring), box-shadow var(--motion-fast) ease, border-color var(--motion-fast) ease`,
          cursor: "default",
          height: "100%",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.06em",
            color: "var(--color-accent)",
            opacity: 0.7,
            lineHeight: 1,
            marginBottom: "0.25rem",
          }}
        >
          {item.icon}
        </span>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
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
  );
}

export function TrustStripSection() {
  return (
    <section
      style={{
        padding: "var(--section-gap) var(--gutter)",
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
                fontWeight: 400,
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                letterSpacing: "-0.02em",
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
            <TrustCard key={item.label} item={item} index={i} />
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
