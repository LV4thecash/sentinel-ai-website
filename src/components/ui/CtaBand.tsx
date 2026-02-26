"use client";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

interface CtaBandProps {
  headline?: string;
}

export function CtaBand({
  headline = "Want access before public launch?",
}: CtaBandProps) {
  return (
    <section
      style={{
        background: "var(--gradient-cta)",
        padding: "var(--section-gap) clamp(1.5rem, 5vw, 4rem)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glass overlay for depth */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(190, 27, 42, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          position: "relative",
        }}
      >
        <FadeIn>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            {headline}
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
            }}
          >
            Applications reviewed weekly. Access is invite-only. Not all
            applications are accepted.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Link
            href="/waitlist"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#212323",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.95rem 2.5rem",
              borderRadius: "var(--radius-md)",
              textDecoration: "none",
              marginBottom: "1.5rem",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
              transition:
                "opacity 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.95";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)";
            }}
          >
            Apply for Access →
          </Link>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Private beta · Invite-only expansion
            </p>
            <span
              style={{
                color: "rgba(255,255,255,0.15)",
                fontSize: "0.6rem",
              }}
            >
              ·
            </span>
            <a
              href="https://discord.gg/saES7e6W"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
              }
            >
              Discord
            </a>
            <a
              href="https://t.me/sentinelextension"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
              }
            >
              Telegram
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
