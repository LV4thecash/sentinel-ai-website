"use client";
import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section
      style={{
        minHeight: "calc(100vh - var(--nav-height))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(4rem, 10vh, 6rem) var(--gutter)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Atmospheric gradients */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "var(--gradient-hero-bg)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "var(--gradient-hero-top)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, width: "100%" }}>

        {/* Phase 1 badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: "2.25rem",
            border: "1px solid var(--color-border)",
            borderRadius: 100,
            padding: "5px 14px 5px 10px",
            background: "var(--color-surface)",
            boxShadow: "var(--shadow-xs)",
          }}
        >
          {/* Pulsing green dot */}
          <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "#16a34a",
                animation: "pulse-dot 2s ease-out 0.6s 2",
              }}
            />
            <span
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "#16a34a",
                display: "block",
              }}
            />
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
            }}
          >
            Phase 1 · Private Beta
          </span>
        </motion.div>

        {/* Headline — line-by-line stagger */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(3.2rem, 10vw, 7.5rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            marginBottom: "2rem",
            color: "var(--color-text)",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            style={{ display: "block" }}
          >
            AI trading
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{ display: "block" }}
          >
            is{" "}
            <span
              style={{
                position: "relative",
                color: "var(--color-accent)",
                display: "inline-block",
              }}
            >
              {/* Signal pulse — appears once after headline settles */}
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: "absolute",
                  inset: "-10px -20px",
                  background: "var(--gradient-word-glow)",
                  borderRadius: 6,
                  pointerEvents: "none",
                  zIndex: -1,
                }}
              />
              faster
            </span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            style={{ display: "block" }}
          >
            than you are.
          </motion.span>
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease }}
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 auto 2.5rem",
          }}
        >
          Sentinel sits between Telegram&apos;s noise and your bot, reconstructing
          contract addresses from fragments, filtering scam context, and delivering
          clean CAs before the launch window closes.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.75, ease }}
          style={{ marginBottom: "1.5rem" }}
        >
          <Link
            href="/waitlist"
            style={{
              display: "inline-block",
              background: "var(--color-accent)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.9rem 2.25rem",
              borderRadius: 4,
              textDecoration: "none",
              transition: `background var(--motion-fast) ease, transform var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) ease`,
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
            Request Access →
          </Link>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.95 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.06em",
            color: "var(--color-text-muted)",
          }}
        >
          Currently in private evaluation with 20 selected traders.
        </motion.p>
      </div>
    </section>
  );
}
