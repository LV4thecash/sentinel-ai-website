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
    input: ["7xKp3mN  [partial CA]", "⟶ fragment detected"],
    output: "7xKp3mNQrL9vWZ2...full44charCA",
    stat: "< 500ms",
    blocked: false,
    highlight: "7xKp3mN",
  },
  {
    title: "Multi-CA + Ordinal",
    input: ["CA1: AbCdEfGh...", "CA2: XyZwVuTs...", "only buy the second"],
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
    title: "Website Link",
    input: ["check the contract:", "https://tokensiteXYZ.io"],
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

export function ProofSection() {
  return (
    <section style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel>What Sentinel Handles</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              letterSpacing: "0.03em",
              lineHeight: 1,
            }}
          >
            EVERY FORMAT.<br />EVERY EDGE CASE.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(195px, 1fr))",
            gap: "1rem",
          }}
        >
          {cards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 0.08} style={{ height: "100%" }}>
              <div
                style={{
                  background: "var(--color-surface)",
                  border: `1px solid ${card.blocked ? "rgba(239,68,68,0.25)" : "var(--color-border)"}`,
                  borderRadius: 8,
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  height: "100%",
                }}
              >
                {/* Card label */}
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "var(--color-accent)",
                    letterSpacing: "0.1em",
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
                    color: "var(--color-neutral)",
                    fontSize: "0.9rem",
                    lineHeight: 1,
                  }}
                >
                  ↓
                </div>

                {/* Output */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    padding: "0.5rem 0.75rem",
                    background: card.blocked
                      ? "rgba(239,68,68,0.07)"
                      : "rgba(34,197,94,0.07)",
                    border: `1px solid ${card.blocked ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)"}`,
                    borderRadius: 4,
                    color: card.blocked ? "var(--color-block)" : "var(--color-pass)",
                    wordBreak: "break-all",
                  }}
                >
                  {card.output}
                </div>

                {/* Stat */}
                <p
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--color-neutral)",
                    textAlign: "right",
                    fontFamily: "var(--font-mono)",
                    margin: 0,
                  }}
                >
                  {card.stat}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link
            href="/product"
            style={{
              color: "var(--color-accent)",
              fontSize: "0.82rem",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
            }}
          >
            See all capabilities →
          </Link>
        </div>
      </div>
    </section>
  );
}
