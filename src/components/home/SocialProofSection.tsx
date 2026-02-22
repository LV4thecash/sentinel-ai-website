import { Counter } from "@/components/ui/Counter";

const testimonials = [
  {
    handle: "@trader_placeholder_1",
    quote:
      "Testimonial placeholder — replace with real quote from KOL or beta tester.",
  },
  {
    handle: "@trader_placeholder_2",
    quote: "Testimonial placeholder — replace with real quote from group admin.",
  },
  {
    handle: "@trader_placeholder_3",
    quote:
      "Testimonial placeholder — replace with real quote from advanced trader.",
  },
];

export function SocialProofSection() {
  return (
    <section
      style={{
        padding: "6rem 1.5rem",
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Counter />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
            marginTop: "2.5rem",
            textAlign: "left",
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.handle}
              style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                padding: "1.25rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#b0b0c0",
                  lineHeight: 1.65,
                  marginBottom: "0.75rem",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--color-accent)",
                }}
              >
                {t.handle}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <a
            href="https://discord.gg/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--color-accent)",
              fontSize: "0.82rem",
              fontFamily: "var(--font-mono)",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            Join the community →
          </a>
        </div>
      </div>
    </section>
  );
}
