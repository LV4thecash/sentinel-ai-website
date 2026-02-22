import { Counter } from "@/components/ui/Counter";
import { WaitlistForm } from "@/components/WaitlistForm";

const tiers = [
  {
    id: "monthly",
    label: "Monthly",
    price: "1 SOL",
    period: "/ month",
    effective: null,
    save: null,
    popular: false,
  },
  {
    id: "quarterly",
    label: "Quarterly",
    price: "2 SOL",
    period: "/ quarter",
    effective: "0.67 SOL / mo",
    save: "Save 33%",
    popular: true,
  },
  {
    id: "annual",
    label: "Annual",
    price: "5 SOL",
    period: "/ year",
    effective: "0.42 SOL / mo",
    save: "Save 58%",
    popular: false,
  },
];

const objections = [
  "Cancel anytime on monthly",
  "No wallet access required beyond payment",
  "SOL-denominated — pay with Phantom or Solflare",
];

export default function PricingPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "0.03em",
            lineHeight: 0.95,
            marginBottom: "1rem",
          }}
        >
          ONE SUBSCRIPTION.<br />THREE TIERS.
        </h1>
        <p style={{ color: "#8888a0", marginTop: "1rem", lineHeight: 1.65 }}>
          SOL-denominated. Simple pricing. No hidden fees.
        </p>
        <Counter />
      </section>

      {/* Tiers */}
      <section style={{ padding: "2rem 1.5rem 5rem" }}>
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {tiers.map((t) => (
            <div
              key={t.id}
              style={{
                background: "var(--color-surface)",
                border: `1px solid ${t.popular ? "var(--color-accent)" : "var(--color-border)"}`,
                borderRadius: 8,
                padding: "2rem 1.5rem",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {t.popular && (
                <span
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--color-accent)",
                    color: "#000",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.85rem",
                    borderRadius: 20,
                    whiteSpace: "nowrap",
                  }}
                >
                  Most Popular
                </span>
              )}

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  letterSpacing: "0.06em",
                }}
              >
                {t.label}
              </p>

              <div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3rem",
                    color: t.popular ? "var(--color-accent)" : "#fff",
                    lineHeight: 1,
                  }}
                >
                  {t.price}
                </span>
                <span style={{ color: "var(--color-neutral)", fontSize: "0.85rem", marginLeft: "0.25rem" }}>
                  {t.period}
                </span>
              </div>

              {t.effective && (
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--color-pass)",
                  }}
                >
                  {t.effective} · {t.save}
                </p>
              )}

              <WaitlistForm size="sm" />
            </div>
          ))}
        </div>
      </section>

      {/* Setup preview */}
      <section
        style={{
          padding: "2rem 1.5rem",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            fontSize: "0.78rem",
            color: "#8888a0",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span>After joining:</span>
          <span>Install</span>
          <span style={{ color: "var(--color-border-hi)" }}>→</span>
          <span>Set up in ~10 min</span>
          <span style={{ color: "var(--color-border-hi)" }}>→</span>
          <span>First CA in &lt;10 min</span>
        </div>
      </section>

      {/* Objections */}
      <section style={{ padding: "3rem 1.5rem" }}>
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {objections.map((o) => (
            <div
              key={o}
              style={{
                padding: "0.85rem 1rem",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 6,
                fontSize: "0.8rem",
                color: "#8888a0",
              }}
            >
              <span style={{ color: "var(--color-pass)", marginRight: "0.5rem" }}>✓</span>
              {o}
            </div>
          ))}
        </div>
      </section>

      {/* Referral */}
      <section
        style={{
          padding: "3rem 1.5rem",
          textAlign: "center",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>
          Refer a trader, earn subscription credits.
        </p>
        <p style={{ color: "#8888a0", fontSize: "0.82rem", marginTop: "0.5rem" }}>
          Join the waitlist to unlock your referral link at launch.
        </p>
      </section>
    </main>
  );
}
