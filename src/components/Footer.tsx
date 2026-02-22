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
        padding: "3rem 1.5rem",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Left: brand */}
        <div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              letterSpacing: "0.06em",
              color: "#fff",
            }}
          >
            SENTINEL AI
          </span>
          <p
            style={{
              color: "var(--color-neutral)",
              fontSize: "0.78rem",
              marginTop: "0.5rem",
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
            gap: "0.5rem 1.5rem",
            justifyContent: "center",
          }}
        >
          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              style={{
                color: "var(--color-neutral)",
                fontSize: "0.78rem",
                textDecoration: "none",
              }}
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
            href="https://discord.gg/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-neutral)", fontSize: "0.82rem", textDecoration: "none" }}
          >
            Discord
          </a>
          <a
            href="https://t.me/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-neutral)", fontSize: "0.82rem", textDecoration: "none" }}
          >
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
