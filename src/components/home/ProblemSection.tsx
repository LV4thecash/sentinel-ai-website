import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChatBubble } from "@/components/ui/ChatBubble";

export function ProblemSection() {
  return (
    <section style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>The Problem</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            letterSpacing: "0.03em",
            lineHeight: 1,
            marginBottom: "1.5rem",
          }}
        >
          THE LAUNCH CHAT<br />IS A MINEFIELD
        </h2>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 auto 2.5rem",
            maxWidth: 520,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {[
            "Fragments posted to avoid snipers — the full CA never appears",
            "Multiple CAs in one message, no instruction on which to buy",
            "Links to links — the contract address is buried two hops away",
          ].map((pain) => (
            <li
              key={pain}
              style={{
                color: "#8888a0",
                fontSize: "0.95rem",
                lineHeight: 1.65,
                textAlign: "left",
                paddingLeft: "1.25rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  color: "var(--color-block)",
                }}
              >
                ×
              </span>
              {pain}
            </li>
          ))}
        </ul>

        {/* Illustrative hostile message */}
        <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "left" }}>
          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--color-neutral)",
              fontFamily: "var(--font-mono)",
              marginBottom: "0.5rem",
            }}
          >
            // example: Solana launch group, real format
          </p>
          <ChatBubble
            lines={[
              "🚀 LAUNCH NOW",
              "first part: 7xKp3mN",
              "second: QrL9vWZ2",
              "join the tg for the rest → t.me/alphagroup",
              "only buy the SECOND one",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
