"use client";
import Link from "next/link";

const pages = [
  { href: "/product",      label: "Product" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing",      label: "Pricing" },
  { href: "/security",     label: "Security" },
  { href: "/faq",          label: "FAQ" },
  { href: "/roadmap",      label: "Roadmap" },
  { href: "/partners",     label: "Partners" },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "2.5rem var(--gutter)",
        marginTop: "auto",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-width)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {/* Left: brand */}
        <div>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.08em",
              color: "var(--color-text)",
            }}
          >
            SENTINEL<span style={{ color: "var(--color-accent)" }}>AI</span>
          </span>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "0.75rem",
              marginTop: "0.4rem",
              lineHeight: 1.5,
            }}
          >
            © {new Date().getFullYear()} Sentinel AI. All rights reserved.
          </p>
        </div>

        {/* Center: page links */}
        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem 1.25rem",
            justifyContent: "center",
          }}
        >
          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.75rem",
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              {p.label}
            </Link>
          ))}
        </nav>

        {/* Right: social */}
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <a
            href="https://discord.gg/saES7e6W"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--color-text-muted)",
              fontSize: "0.75rem",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
          >
            Discord
          </a>
          <a
            href="https://t.me/sentinelextension"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--color-text-muted)",
              fontSize: "0.75rem",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
          >
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
