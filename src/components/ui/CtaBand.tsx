"use client";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

interface CtaBandProps {
  headline?: string;
}

export function CtaBand({ headline = "Want access before public launch?" }: CtaBandProps) {
  return (
    <section
      style={{
        background: "var(--gradient-cta)",
        padding: "var(--section-gap) var(--gutter)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <FadeIn>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Want access before public launch?
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
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.9rem 2.25rem",
              borderRadius: 4,
              textDecoration: "none",
              marginBottom: "1.5rem",
              transition: "opacity 0.15s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
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
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.6rem" }}>·</span>
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
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
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
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >
              Telegram
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
