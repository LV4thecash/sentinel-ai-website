"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/product",      label: "Product" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing",      label: "Pricing" },
  { href: "/security",     label: "Security" },
  { href: "/faq",          label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10,10,11,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/brand/logo.png" alt="Sentinel AI" width={32} height={32} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.2rem",
              letterSpacing: "0.06em",
              color: "#fff",
            }}
          >
            SENTINEL AI
          </span>
        </Link>

        {/* Desktop links */}
        <div
          className="desktop-nav"
          style={{ display: "flex", gap: "2rem", alignItems: "center" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: "0.82rem",
                color: "var(--color-neutral)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.15s",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#waitlist"
            style={{
              background: "var(--color-accent)",
              color: "#000",
              fontWeight: 700,
              fontSize: "0.75rem",
              padding: "0.45rem 1.1rem",
              borderRadius: 4,
              textDecoration: "none",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="mobile-menu-btn"
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "1.3rem",
            display: "none",
            padding: "0.25rem",
          }}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            background: "var(--color-bg)",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ color: "#e8e8ea", textDecoration: "none", fontSize: "1rem" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#waitlist"
            onClick={() => setOpen(false)}
            style={{
              background: "var(--color-accent)",
              color: "#000",
              fontWeight: 700,
              padding: "0.75rem 1rem",
              borderRadius: 4,
              textAlign: "center",
              textDecoration: "none",
              fontSize: "0.85rem",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            Join Waitlist
          </Link>
        </div>
      )}
    </nav>
  );
}
