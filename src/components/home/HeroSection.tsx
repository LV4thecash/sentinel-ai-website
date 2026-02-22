import { WaitlistForm } from "@/components/WaitlistForm";
import { Counter } from "@/components/ui/Counter";
import { FadeIn } from "@/components/ui/FadeIn";

export function HeroSection() {
  return (
    <section
      id="waitlist"
      style={{
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(190,27,42,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(190,27,42,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
        {/* Eyebrow */}
        <FadeIn delay={0}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              color: "var(--color-accent)",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
            }}
          >
            Intelligence Layer · Solana · Phase 1 Live
          </p>
        </FadeIn>

        {/* Main headline */}
        <FadeIn delay={0.1}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3rem, 10vw, 7.5rem)",
              lineHeight: 0.92,
              letterSpacing: "0.02em",
              color: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            AI TRADING<br />
            IS FASTER<br />
            <span style={{ color: "var(--color-accent)" }}>THAN YOU ARE</span>
          </h1>
        </FadeIn>

        {/* Subline */}
        <FadeIn delay={0.2} style={{ maxWidth: 560, margin: "0 auto 2.5rem" }}>
          <p
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
              color: "#8888a0",
              lineHeight: 1.65,
            }}
          >
            Sentinel sits between Telegram&apos;s noise and your execution bot —
            reconstructing contract addresses from fragments, filtering scam contexts,
            and delivering clean CAs before the launch window closes.
          </p>
        </FadeIn>

        {/* Waitlist form */}
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WaitlistForm size="lg" />
          </div>
        </FadeIn>

        {/* Counter */}
        <FadeIn delay={0.4}>
          <Counter />
        </FadeIn>
      </div>
    </section>
  );
}
