"use client";
import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/* Mini product showcase data */
const sampleMessages = [
  { text: "🚀 NEXT 100X GEM!! ca below 👇", type: "noise" as const },
  { text: "Ep6vQ...split...across...msgs 🔥", type: "fragment" as const },
  { text: "SENTINEL → Ep6vQdRTaqvDz7GTi8pG3Zs...", type: "result" as const },
];

export function HeroSection() {
  return (
    <section
      style={{
        minHeight: "calc(100svh - var(--nav-height))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(3rem, 8vh, 5rem) clamp(1.5rem, 5vw, 4rem)",
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
            linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          pointerEvents: "none",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 70%)",
        }}
      />

      {/* Enhanced atmospheric gradients */}
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

      {/* Main content: split layout on desktop, stacked on mobile */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1120,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
          alignItems: "center",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* Text content — centered */}
        <div style={{ textAlign: "center" }}>
          {/* Phase 1 badge */}
          <motion.div
            initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: "2rem",
              border: "1px solid var(--glass-border)",
              borderRadius: "var(--radius-pill)",
              padding: "6px 16px 6px 12px",
              background: "var(--glass-bg-strong)",
              backdropFilter: "blur(var(--glass-blur))",
              WebkitBackdropFilter: "blur(var(--glass-blur))",
              boxShadow: "var(--shadow-glass)",
            }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                width: 7,
                height: 7,
              }}
            >
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

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 9vw, 6.5rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
              marginBottom: "1.75rem",
              color: "var(--color-text)",
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              style={{ display: "block" }}
            >
              AI TRADING
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              style={{ display: "block" }}
            >
              IS{" "}
              <span
                style={{
                  position: "relative",
                  color: "var(--color-accent)",
                  display: "inline-block",
                }}
              >
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1.8,
                    delay: 1.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    position: "absolute",
                    inset: "-12px -24px",
                    background: "var(--gradient-word-glow)",
                    borderRadius: "var(--radius-md)",
                    pointerEvents: "none",
                    zIndex: -1,
                  }}
                />
                FASTER
              </span>
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              style={{ display: "block" }}
            >
              THAN YOU ARE.
            </motion.span>
          </h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.75,
              maxWidth: 560,
              margin: "0 auto 2.25rem",
            }}
          >
            Sentinel sits between Telegram&apos;s noise and your bot,
            reconstructing contract addresses from fragments, filtering scam
            context, and delivering clean CAs before the launch window closes.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.75, ease }}
            style={{ marginBottom: "2.5rem" }}
          >
            <Link
              href="/waitlist"
              className="btn-primary"
              style={{
                display: "inline-block",
                background: "var(--color-accent)",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.95rem 2.5rem",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                boxShadow:
                  "0 4px 16px rgba(190,27,42,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              Request Access →
            </Link>
          </motion.div>
        </div>

        {/* Product showcase — floating glass card */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
          style={{
            maxWidth: 600,
            width: "100%",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "var(--glass-bg-strong)",
              backdropFilter: "blur(var(--glass-blur-strong))",
              WebkitBackdropFilter: "blur(var(--glass-blur-strong))",
              border: "1px solid var(--glass-border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.75rem",
              boxShadow:
                "var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.5)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glass card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--glass-border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "var(--radius-sm)",
                    background:
                      "linear-gradient(135deg, var(--color-accent), var(--color-accent-hi))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: "#fff",
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  S
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    letterSpacing: "0.04em",
                    color: "var(--color-text)",
                  }}
                >
                  SENTINEL AI
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-pass)",
                  background: "rgba(22, 163, 74, 0.08)",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid rgba(22, 163, 74, 0.15)",
                }}
              >
                ● Live
              </span>
            </div>

            {/* Processing flow */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {sampleMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.0 + i * 0.25,
                    ease,
                  }}
                >
                  {msg.type === "result" ? (
                    /* Result row */
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.65rem",
                        padding: "0.7rem 0.85rem",
                        background: "rgba(22, 163, 74, 0.06)",
                        border: "1px solid rgba(22, 163, 74, 0.15)",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: "var(--color-pass)",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        ✓ PASS
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.68rem",
                          color: "var(--color-text-secondary)",
                          letterSpacing: "0.02em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          minWidth: 0,
                        }}
                      >
                        {msg.text}
                      </span>
                    </div>
                  ) : (
                    /* Input rows */
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.65rem",
                        padding: "0.6rem 0.85rem",
                        overflow: "hidden",
                        background:
                          msg.type === "noise"
                            ? "rgba(190, 27, 42, 0.04)"
                            : "rgba(0,0,0,0.025)",
                        border: `1px solid ${
                          msg.type === "noise"
                            ? "rgba(190, 27, 42, 0.1)"
                            : "var(--glass-border)"
                        }`,
                        borderRadius: "var(--radius-md)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          color:
                            msg.type === "noise"
                              ? "var(--color-accent)"
                              : "var(--color-text-muted)",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {msg.type === "noise" ? "✕ SPAM" : "⟳ FRAG"}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.68rem",
                          color: "var(--color-text-muted)",
                          letterSpacing: "0.02em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          minWidth: 0,
                        }}
                      >
                        {msg.text}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.9 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1.25rem",
                paddingTop: "1rem",
                borderTop: "1px solid var(--glass-border)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
              }}
            >
              <span>Latency: 12ms</span>
              <span>Accuracy: 99.7%</span>
              <span>24h Vol: 847</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.1 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.06em",
            color: "var(--color-text-muted)",
            textAlign: "center",
          }}
        >
          Currently in private evaluation with 20 selected traders.
        </motion.p>
      </div>
    </section>
  );
}
