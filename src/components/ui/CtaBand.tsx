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
        padding: "var(--section-gap) clamp(1.5rem, 5vw, 4rem)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--glass-border)",
      }}
    >
      {/* Centered accent glow */}
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
              fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              color: "var(--color-text)",
              marginBottom: "1rem",
            }}
          >
            {headline}
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-secondary)",
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
              marginBottom: "1.5rem",
              boxShadow:
                "0 4px 20px rgba(190, 27, 42, 0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
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
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "var(--color-text-muted)",
              }}
            >
              Private beta · Invite-only expansion
            </p>
            <span
              style={{
                color: "var(--color-border)",
                fontSize: "0.6rem",
              }}
            >
              ·
            </span>
            <a
              href="https://discord.gg/saES7e6W"
              target="_blank"
              rel="noopener noreferrer"
              className="link-subtle"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              Discord
            </a>
            <a
              href="https://t.me/sentinelextension"
              target="_blank"
              rel="noopener noreferrer"
              className="link-subtle"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              Telegram
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
