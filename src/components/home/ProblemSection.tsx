import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { FadeIn } from "@/components/ui/FadeIn";

export function ProblemSection() {
  return (
    <section
      style={{
        padding: "var(--section-gap) var(--gutter)",
        background: "var(--color-bg-alt)",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <SectionLabel>The Problem</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              marginBottom: "1.5rem",
              color: "var(--color-text)",
            }}
          >
            The launch chat<br />is a minefield.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 auto 3rem",
              maxWidth: 520,
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              textAlign: "left",
            }}
          >
            {[
              "Fragments posted deliberately to avoid snipers. The full CA never appears.",
              "Multiple CAs in one message, no instruction on which to act",
              "CA buried inside a link inside another link. Two hops to find it.",
            ].map((pain) => (
              <li
                key={pain}
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                  paddingLeft: "1.5rem",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    color: "var(--color-accent)",
                    fontWeight: 700,
                  }}
                >
                  ×
                </span>
                {pain}
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* Illustrative hostile message */}
        <FadeIn delay={0.18}>
          <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "left" }}>
            <p
              style={{
                fontSize: "0.65rem",
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-mono)",
                marginBottom: "0.5rem",
                letterSpacing: "0.06em",
              }}
            >
              // real format — Solana launch group
            </p>
            <ChatBubble
              lines={[
                "🚀 LAUNCH NOW",
                "first part: 7xKp3mN",
                "second: QrL9vWZ2",
                "join the tg for the rest → t.me/alphagroup",
                "only buy the SECOND one",
              ]}
              highlight="SECOND"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
