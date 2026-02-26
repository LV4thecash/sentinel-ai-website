import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { FadeIn } from "@/components/ui/FadeIn";

export function ProblemSection() {
  return (
    <section
      style={{
        padding: "var(--section-gap) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--zone-dark)",
        position: "relative",
      }}
    >
      <div
        style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}
      >
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
              color: "var(--zone-dark-text)",
            }}
          >
            The launch chat
            <br />
            is a minefield.
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
                  color: "var(--zone-dark-text-secondary)",
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

        {/* Illustrative hostile message — glass containment */}
        <FadeIn delay={0.18}>
          <div
            style={{
              maxWidth: 420,
              margin: "0 auto",
              textAlign: "left",
              background: "var(--glass-dark-bg-strong)",
              backdropFilter: "blur(var(--glass-blur))",
              WebkitBackdropFilter: "blur(var(--glass-blur))",
              border: "1px solid var(--glass-dark-border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              boxShadow: "var(--shadow-dark-glass)",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                color: "var(--zone-dark-text-muted)",
                fontFamily: "var(--font-mono)",
                marginBottom: "0.75rem",
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
              dark
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
