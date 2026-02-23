"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const links = [
  { href: "/product",      label: "Product" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing",      label: "Pricing" },
  { href: "/security",     label: "Security" },
  { href: "/faq",          label: "FAQ" },
];

export function Nav() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg      = scrolled ? "rgba(250,250,250,0.92)" : "transparent";
  const navBorder  = scrolled ? "1px solid #E4E4E7"      : "1px solid transparent";
  const navShadow  = scrolled ? "0 1px 0 rgba(0,0,0,0.04)" : "none";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: navBg,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: navBorder,
        boxShadow: navShadow,
        transition: "background var(--motion-fast) var(--motion-ease), border-color var(--motion-fast) var(--motion-ease), box-shadow var(--motion-fast) var(--motion-ease)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-width)",
          margin: "0 auto",
          padding: "0 var(--gutter)",
          height: "var(--nav-height)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/brand/logo.png" alt="Sentinel AI" width={34} height={34} />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.08em",
              color: "var(--color-text)",
            }}
          >
            SENTINEL<span style={{ color: "var(--color-accent)" }}>AI</span>
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
              className="nav-link"
              style={{
                fontSize: "0.82rem",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color var(--motion-fast) ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/waitlist"
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.72rem",
              padding: "0.48rem 1.1rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "background var(--motion-fast) ease, transform var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent-hi)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(190,27,42,0.28)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-accent)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Request Access
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="mobile-menu-btn"
          style={{
            background: "none",
            border: "none",
            color: "var(--color-text)",
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
            padding: "1.25rem var(--gutter)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            background: "rgba(250,250,250,0.97)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                color: "var(--color-text)",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/waitlist"
            onClick={() => setOpen(false)}
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-sm)",
              textAlign: "center",
              textDecoration: "none",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Request Access
          </Link>
        </div>
      )}
    </nav>
  );
}
