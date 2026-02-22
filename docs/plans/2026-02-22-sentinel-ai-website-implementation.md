# Sentinel AI Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the full Sentinel AI marketing website — 8 pages, trust-first conversion funnel, waitlist CTA, and NowPayments-ready pricing — using Next.js 15, Tailwind CSS v4, and Motion.

**Architecture:** Next.js 15 App Router with static generation for all marketing pages; a single `/api/waitlist` route handles form submissions via Resend; design system is CSS-variable-first with a dark terminal aesthetic derived from the Sentinel brand.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, Motion (framer-motion v11+), Resend (email/waitlist), NowPayments API (subscription checkout), Google Fonts (display + mono pairing), TypeScript.

---

## Reference Files

- Wireframes: `docs/plans/2026-02-22-sentinel-ai-wireframes.md`
- Product research: `docs/plans/2026-02-22-sentinel-ai-website-design.md`
- Brand assets: `files (2) copy/` — use `Sentinel AI logo_B1_01.png` as primary logo

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `.env.local.example`

**Step 1: Bootstrap Next.js project**

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint
```

Expected: project scaffold created with `src/app/`, `src/app/layout.tsx`, `src/app/page.tsx`.

**Step 2: Install additional dependencies**

```bash
npm install motion @radix-ui/react-accordion resend
npm install -D @types/node
```

**Step 3: Copy brand logo to public**

```bash
mkdir -p public/brand
cp "files (2) copy/Sentinel AI logo_B1_01.png" public/brand/logo.png
cp "files (2) copy/Sentinel AI logo_B1_01.svg" public/brand/logo.svg
```

**Step 4: Create `.env.local.example`**

```
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_WAITLIST_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_NOWPAYMENTS_API_KEY=xxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://sentinelai.xyz
```

**Step 5: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 project with Tailwind and Motion"
```

---

## Task 2: Design System (CSS Variables + Typography)

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/lib/fonts.ts`

**Step 1: Define font pairings in `src/lib/fonts.ts`**

```typescript
import { Space_Mono, Bebas_Neue, DM_Sans } from "next/font/google";

// Display headline font — industrial, high-contrast
export const displayFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

// Body + UI font — clean, readable at small sizes
export const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

// Monospace — for CA strings, code, technical labels
export const monoFont = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});
```

**Step 2: Replace `src/app/globals.css` with the design token system**

```css
@import "tailwindcss";

:root {
  /* Core palette — deep terminal dark with amber signal accent */
  --color-bg:        #0a0a0b;
  --color-surface:   #111114;
  --color-border:    #1e1e24;
  --color-border-hi: #2e2e38;

  /* Accent — amber/gold: signal, speed, precision */
  --color-accent:    #f5a623;
  --color-accent-lo: #f5a62318;
  --color-accent-hi: #ffc04d;

  /* Status colors */
  --color-pass:      #22c55e;
  --color-block:     #ef4444;
  --color-neutral:   #6b7280;

  /* Typography */
  --font-display:    var(--font-display-next);
  --font-body:       var(--font-body-next);
  --font-mono:       var(--font-mono-next);

  /* Spacing scale */
  --section-gap:     7rem;
  --section-gap-sm:  4rem;
}

* { box-sizing: border-box; }

html {
  background: var(--color-bg);
  color: #e8e8ea;
  font-family: var(--font-body), system-ui, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body { min-height: 100vh; }

/* Utility: CA monospace string */
.ca-string {
  font-family: var(--font-mono);
  font-size: 0.8em;
  letter-spacing: 0.02em;
  color: var(--color-accent);
  background: var(--color-accent-lo);
  padding: 0.15em 0.4em;
  border-radius: 3px;
}

/* Utility: section padding */
.section { padding: var(--section-gap) 0; }
.section-sm { padding: var(--section-gap-sm) 0; }

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-border-hi); border-radius: 2px; }
```

**Step 3: Update `src/app/layout.tsx` to apply fonts**

```typescript
import type { Metadata } from "next";
import { displayFont, bodyFont, monoFont } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sentinel AI — The Intelligence Layer",
  description:
    "Sentinel reconstructs Solana contract addresses from any Telegram message format and forwards clean CAs to your bot before the launch window closes.",
  openGraph: {
    title: "Sentinel AI",
    description: "AI Trading is faster than you are.",
    images: ["/brand/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

**Step 4: Commit**

```bash
git add src/app/globals.css src/lib/fonts.ts src/app/layout.tsx
git commit -m "feat: design system — CSS variables, amber/dark palette, font trio"
```

---

## Task 3: Global Nav Component

**Files:**
- Create: `src/components/Nav.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create `src/components/Nav.tsx`**

```typescript
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
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(10,10,11,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "0 1.5rem",
          height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/brand/logo.png" alt="Sentinel AI" width={32} height={32} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", letterSpacing: "0.05em", color: "#fff" }}>
            SENTINEL AI
          </span>
        </Link>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ fontSize: "0.85rem", color: "var(--color-neutral)", textDecoration: "none", letterSpacing: "0.04em" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#waitlist"
            style={{
              background: "var(--color-accent)",
              color: "#000",
              fontWeight: 600,
              fontSize: "0.8rem",
              padding: "0.45rem 1.1rem",
              borderRadius: 4,
              textDecoration: "none",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "none" }}
          className="mobile-menu-btn"
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: "1px solid var(--color-border)", padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ color: "#e8e8ea", textDecoration: "none", fontSize: "1rem" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/#waitlist" onClick={() => setOpen(false)}
            style={{ background: "var(--color-accent)", color: "#000", fontWeight: 600, padding: "0.7rem 1rem", borderRadius: 4, textAlign: "center", textDecoration: "none" }}>
            Join Waitlist
          </Link>
        </div>
      )}
    </nav>
  );
}
```

**Step 2: Add mobile/desktop nav CSS to `globals.css`**

```css
@media (max-width: 768px) {
  .desktop-nav { display: none !important; }
  .mobile-menu-btn { display: block !important; }
}
```

**Step 3: Add `<Nav />` to `layout.tsx`**

```typescript
import { Nav } from "@/components/Nav";
// inside <body>:
<Nav />
{children}
```

**Step 4: Commit**

```bash
git add src/components/Nav.tsx src/app/globals.css src/app/layout.tsx
git commit -m "feat: sticky nav with mobile hamburger and Join Waitlist CTA"
```

---

## Task 4: Global Footer Component

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create `src/components/Footer.tsx`**

```typescript
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
    <footer style={{ borderTop: "1px solid var(--color-border)", padding: "3rem 1.5rem", marginTop: "auto" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "2rem", alignItems: "start" }}>
        <div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.05em" }}>SENTINEL AI</span>
          <p style={{ color: "var(--color-neutral)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
            © {new Date().getFullYear()} Sentinel AI. All rights reserved.
          </p>
        </div>
        <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem", justifyContent: "center" }}>
          {pages.map((p) => (
            <Link key={p.href} href={p.href}
              style={{ color: "var(--color-neutral)", fontSize: "0.8rem", textDecoration: "none" }}>
              {p.label}
            </Link>
          ))}
        </nav>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", alignItems: "center" }}>
          <a href="https://discord.gg/placeholder" target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--color-neutral)", fontSize: "0.85rem", textDecoration: "none" }}>Discord</a>
          <a href="https://t.me/placeholder" target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--color-neutral)", fontSize: "0.85rem", textDecoration: "none" }}>Telegram</a>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Add `<Footer />` to `layout.tsx`**

```typescript
import { Footer } from "@/components/Footer";
// inside <body>, after {children}:
<Footer />
```

**Step 3: Commit**

```bash
git add src/components/Footer.tsx src/app/layout.tsx
git commit -m "feat: global footer with page links and social links"
```

---

## Task 5: Waitlist API Route

**Files:**
- Create: `src/app/api/waitlist/route.ts`
- Create: `src/components/WaitlistForm.tsx`

**Step 1: Create `src/app/api/waitlist/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, telegram } = body as { email: string; telegram?: string };

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  try {
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.RESEND_WAITLIST_AUDIENCE_ID!,
      firstName: telegram ?? undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}
```

**Step 2: Create `src/components/WaitlistForm.tsx`**

```typescript
"use client";
import { useState } from "react";

interface Props {
  size?: "sm" | "lg";
}

export function WaitlistForm({ size = "lg" }: Props) {
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, telegram }),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <p style={{ color: "var(--color-pass)", fontWeight: 600, fontSize: size === "lg" ? "1.1rem" : "0.9rem" }}>
        ✓ You&apos;re on the list. We&apos;ll reach out before launch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", maxWidth: size === "lg" ? 440 : 320 }}>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-hi)",
          color: "#e8e8ea",
          padding: size === "lg" ? "0.85rem 1rem" : "0.6rem 0.85rem",
          borderRadius: 4,
          fontSize: size === "lg" ? "1rem" : "0.875rem",
          outline: "none",
          width: "100%",
        }}
      />
      <input
        type="text"
        placeholder="Telegram handle (optional)"
        value={telegram}
        onChange={(e) => setTelegram(e.target.value)}
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-hi)",
          color: "#e8e8ea",
          padding: size === "lg" ? "0.85rem 1rem" : "0.6rem 0.85rem",
          borderRadius: 4,
          fontSize: size === "lg" ? "1rem" : "0.875rem",
          outline: "none",
          width: "100%",
        }}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        style={{
          background: "var(--color-accent)",
          color: "#000",
          fontWeight: 700,
          fontSize: size === "lg" ? "0.95rem" : "0.8rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: size === "lg" ? "0.9rem 2rem" : "0.65rem 1.2rem",
          border: "none",
          borderRadius: 4,
          cursor: state === "loading" ? "wait" : "pointer",
          width: "100%",
          opacity: state === "loading" ? 0.7 : 1,
        }}
      >
        {state === "loading" ? "Joining…" : "Join Waitlist"}
      </button>
      {state === "error" && (
        <p style={{ color: "var(--color-block)", fontSize: "0.8rem" }}>
          Something went wrong. Try again or DM us on Discord.
        </p>
      )}
    </form>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/api/waitlist/route.ts src/components/WaitlistForm.tsx
git commit -m "feat: waitlist API route (Resend) + WaitlistForm component"
```

---

## Task 6: Shared UI Primitives

**Files:**
- Create: `src/components/ui/SectionLabel.tsx`
- Create: `src/components/ui/Counter.tsx`
- Create: `src/components/ui/ChatBubble.tsx`
- Create: `src/components/ui/TrustBadge.tsx`
- Create: `src/components/ui/CtaBand.tsx`

**Step 1: Create `src/components/ui/SectionLabel.tsx`**

```typescript
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.7rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "var(--color-accent)",
      display: "block",
      marginBottom: "0.75rem",
    }}>
      {children}
    </span>
  );
}
```

**Step 2: Create `src/components/ui/Counter.tsx`**

```typescript
export function Counter() {
  return (
    <p style={{ fontSize: "0.85rem", color: "var(--color-neutral)", marginTop: "0.75rem" }}>
      <span style={{ color: "var(--color-accent)" }}>★</span>
      {" "}2,000+ traders already joined
    </p>
  );
}
```

**Step 3: Create `src/components/ui/ChatBubble.tsx`**

```typescript
interface Props {
  lines: string[];
  highlight?: string; // substring to highlight in accent color
  blocked?: boolean;
}

export function ChatBubble({ lines, highlight, blocked }: Props) {
  return (
    <div style={{
      background: "var(--color-surface)",
      border: `1px solid ${blocked ? "var(--color-block)" : "var(--color-border-hi)"}`,
      borderRadius: 8,
      padding: "0.75rem 1rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.75rem",
      lineHeight: 1.6,
      color: "#c8c8ca",
    }}>
      {lines.map((line, i) => {
        if (highlight && line.includes(highlight)) {
          const [before, after] = line.split(highlight);
          return (
            <div key={i}>
              {before}
              <span style={{ color: "var(--color-accent)", background: "var(--color-accent-lo)", borderRadius: 2 }}>
                {highlight}
              </span>
              {after}
            </div>
          );
        }
        return <div key={i}>{line}</div>;
      })}
    </div>
  );
}
```

**Step 4: Create `src/components/ui/TrustBadge.tsx`**

```typescript
interface Props {
  icon: string;
  label: string;
}

export function TrustBadge({ icon, label }: Props) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: 6,
      fontSize: "0.8rem",
      color: "#c8c8ca",
      whiteSpace: "nowrap",
    }}>
      <span style={{ fontSize: "1rem" }}>{icon}</span>
      {label}
    </div>
  );
}
```

**Step 5: Create `src/components/ui/CtaBand.tsx`**

```typescript
import { WaitlistForm } from "@/components/WaitlistForm";
import { Counter } from "@/components/ui/Counter";

interface Props {
  headline?: string;
}

export function CtaBand({ headline = "Ready to stop missing launches?" }: Props) {
  return (
    <section style={{
      background: "var(--color-surface)",
      borderTop: "1px solid var(--color-border)",
      padding: "5rem 1.5rem",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", letterSpacing: "0.05em", marginBottom: "2rem" }}>
          {headline}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WaitlistForm size="lg" />
        </div>
        <Counter />
      </div>
    </section>
  );
}
```

**Step 6: Commit**

```bash
git add src/components/ui/
git commit -m "feat: shared UI primitives — SectionLabel, Counter, ChatBubble, TrustBadge, CtaBand"
```

---

## Task 7: HOME Page — Sections 1–4

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/ProblemSection.tsx`
- Create: `src/components/home/ProofSection.tsx`
- Create: `src/components/home/TrustStripSection.tsx`

**Step 1: Create `src/components/home/HeroSection.tsx`**

```typescript
import { WaitlistForm } from "@/components/WaitlistForm";
import { Counter } from "@/components/ui/Counter";

export function HeroSection() {
  return (
    <section id="waitlist" style={{
      minHeight: "92vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "4rem 1.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(245,166,35,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,166,35,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          color: "var(--color-accent)",
          marginBottom: "1.5rem",
          textTransform: "uppercase",
        }}>
          Intelligence Layer · Solana · Phase 1 Live
        </p>

        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 9vw, 7rem)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          color: "#fff",
          marginBottom: "1.5rem",
        }}>
          AI TRADING<br />
          IS FASTER<br />
          <span style={{ color: "var(--color-accent)" }}>THAN YOU ARE</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "#9090a0",
          maxWidth: 560,
          margin: "0 auto 2.5rem",
          lineHeight: 1.65,
        }}>
          Sentinel sits between Telegram&apos;s noise and your execution bot —
          reconstructing contract addresses from fragments, filtering scam contexts,
          and delivering clean CAs before the launch window closes.
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <WaitlistForm size="lg" />
        </div>
        <Counter />
      </div>
    </section>
  );
}
```

**Step 2: Create `src/components/home/ProblemSection.tsx`**

```typescript
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChatBubble } from "@/components/ui/ChatBubble";

export function ProblemSection() {
  return (
    <section className="section" style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>The Problem</SectionLabel>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
          THE LAUNCH CHAT<br />IS A MINEFIELD
        </h2>
        <ul style={{ listStyle: "none", padding: 0, marginBottom: "2.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            "Fragments posted to avoid snipers — the full CA never appears",
            "Multiple CAs in one message, no instructions on which to buy",
            "Links to links — the contract address is buried two hops away",
          ].map((pain) => (
            <li key={pain} style={{ color: "#9090a0", fontSize: "1rem", lineHeight: 1.6 }}>
              <span style={{ color: "var(--color-block)", marginRight: "0.5rem" }}>×</span>
              {pain}
            </li>
          ))}
        </ul>

        {/* Illustrative hostile message */}
        <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "left" }}>
          <p style={{ fontSize: "0.7rem", color: "var(--color-neutral)", fontFamily: "var(--font-mono)", marginBottom: "0.5rem" }}>
            // real message, Solana launch group
          </p>
          <ChatBubble
            lines={[
              "🚀 LAUNCH NOW",
              "first part: 7xKp3mN",
              "second: QrL9vWZ2",
              "join the tg for the rest → t.me/alphagroup",
              "only buy the SECOND one",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Create `src/components/home/ProofSection.tsx`**

```typescript
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChatBubble } from "@/components/ui/ChatBubble";
import Link from "next/link";

const cards = [
  {
    title: "Fragment Reconstruction",
    input: ["7xKp3mN [fragment posted]", "⟶ partial CA detected"],
    output: "7xKp3mNQrL9vWZ2...full44charCA",
    stat: "< 500ms",
    blocked: false,
  },
  {
    title: "Multi-CA + Ordinal",
    input: ["CA1: AbCdEfGh...", "CA2: XyZwVuTs...", "only buy the second"],
    output: "XyZwVuTs... forwarded",
    stat: "correct pick",
    blocked: false,
  },
  {
    title: "Warning Filter",
    input: ["XyZwVuTs... DO NOT BUY", "honeypot confirmed"],
    output: "FORWARDING BLOCKED",
    stat: "protected",
    blocked: true,
  },
  {
    title: "Website Link",
    input: ["check the contract:", "https://tokensiteXYZ.io"],
    output: "CA extracted from page",
    stat: "auto-scraped",
    blocked: false,
  },
  {
    title: "Telegram Link",
    input: ["CA dropping here →", "t.me/alphagroup"],
    output: "Joined · CA found · forwarded",
    stat: "auto-joined",
    blocked: false,
  },
];

export function ProofSection() {
  return (
    <section className="section" style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel>What Sentinel Handles</SectionLabel>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em" }}>
            EVERY FORMAT.<br />EVERY EDGE CASE.
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}>
          {cards.map((card) => (
            <div key={card.title} style={{
              background: "var(--color-surface)",
              border: `1px solid ${card.blocked ? "var(--color-block)22" : "var(--color-border)"}`,
              borderRadius: 8,
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {card.title}
              </p>
              <ChatBubble lines={card.input} blocked={card.blocked} />
              <div style={{ textAlign: "center", color: "var(--color-neutral)", fontSize: "0.9rem" }}>↓</div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                padding: "0.5rem 0.75rem",
                background: card.blocked ? "rgba(239,68,68,0.08)" : "rgba(34,197,94,0.08)",
                border: `1px solid ${card.blocked ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)"}`,
                borderRadius: 4,
                color: card.blocked ? "var(--color-block)" : "var(--color-pass)",
              }}>
                {card.output}
              </div>
              <p style={{ fontSize: "0.7rem", color: "var(--color-neutral)", textAlign: "right", fontFamily: "var(--font-mono)" }}>
                {card.stat}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/product" style={{ color: "var(--color-accent)", fontSize: "0.85rem", textDecoration: "none", fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>
            See all capabilities →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 4: Create `src/components/home/TrustStripSection.tsx`**

```typescript
import { TrustBadge } from "@/components/ui/TrustBadge";
import Link from "next/link";

const badges = [
  { icon: "🔒", label: "Client-side only" },
  { icon: "⛔", label: "No wallet access" },
  { icon: "🚫", label: "No server credential storage" },
  { icon: "🛡", label: "Non-custodial" },
];

export function TrustStripSection() {
  return (
    <section style={{
      background: "var(--color-surface)",
      borderTop: "1px solid var(--color-border)",
      borderBottom: "1px solid var(--color-border)",
      padding: "2.5rem 1.5rem",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", alignItems: "center" }}>
        {badges.map((b) => <TrustBadge key={b.label} icon={b.icon} label={b.label} />)}
        <Link href="/security" style={{ fontSize: "0.75rem", color: "var(--color-neutral)", fontFamily: "var(--font-mono)", marginLeft: "0.5rem", textDecoration: "none", letterSpacing: "0.04em" }}>
          Security architecture →
        </Link>
      </div>
    </section>
  );
}
```

**Step 5: Create `src/app/page.tsx`**

```typescript
import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ProofSection } from "@/components/home/ProofSection";
import { TrustStripSection } from "@/components/home/TrustStripSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <ProofSection />
      <TrustStripSection />
      {/* Tasks 8–9 add remaining sections */}
    </main>
  );
}
```

**Step 6: Run dev server and verify visually**

```bash
npm run dev
```

Expected: homepage loads at `http://localhost:3000` with hero, problem, 5 proof cards, trust strip.

**Step 7: Commit**

```bash
git add src/app/page.tsx src/components/home/
git commit -m "feat: home page sections 1-4 — hero, problem, proof cards, trust strip"
```

---

## Task 8: HOME Page — Sections 5–8

**Files:**
- Create: `src/components/home/HowItWorksSection.tsx`
- Create: `src/components/home/SocialProofSection.tsx`
- Create: `src/components/home/RoadmapSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create `src/components/home/HowItWorksSection.tsx`**

```typescript
import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";

const steps = [
  { n: "01", label: "Install", desc: "Add Sentinel AI from the Chrome Web Store in one click." },
  { n: "02", label: "Connect Telegram", desc: "Enter your API ID, API Hash, and phone. Auth code handled in-product." },
  { n: "03", label: "Pick sources", desc: "Select the chats and channels to monitor and define your forwarding target." },
  { n: "04", label: "Done", desc: "Sentinel runs automatically. CAs arrive. Your bot executes." },
];

export function HowItWorksSection() {
  return (
    <section style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel>Setup</SectionLabel>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em" }}>
            RUNNING IN ~10 MINUTES
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
          {steps.map((step, i) => (
            <div key={step.n} style={{ position: "relative" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", color: "var(--color-border-hi)", lineHeight: 1 }}>{step.n}</p>
              <p style={{ fontWeight: 600, fontSize: "0.95rem", margin: "0.5rem 0 0.35rem" }}>{step.label}</p>
              <p style={{ fontSize: "0.82rem", color: "#7070808", lineHeight: 1.6 }}>{step.desc}</p>
              {i < steps.length - 1 && (
                <span aria-hidden style={{ position: "absolute", top: 28, right: -16, color: "var(--color-border-hi)", fontSize: "1.2rem" }}>→</span>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href="/how-it-works" style={{ color: "var(--color-accent)", fontSize: "0.85rem", fontFamily: "var(--font-mono)", textDecoration: "none", letterSpacing: "0.05em" }}>
            Full setup guide →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create `src/components/home/SocialProofSection.tsx`**

```typescript
import { Counter } from "@/components/ui/Counter";

const testimonials = [
  { handle: "@trader_placeholder_1", quote: "Testimonial placeholder — replace with real quote from KOL or beta tester." },
  { handle: "@trader_placeholder_2", quote: "Testimonial placeholder — replace with real quote from group admin." },
  { handle: "@trader_placeholder_3", quote: "Testimonial placeholder — replace with real quote from advanced trader." },
];

export function SocialProofSection() {
  return (
    <section style={{ padding: "6rem 1.5rem", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Counter />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "2.5rem", textAlign: "left" }}>
          {testimonials.map((t) => (
            <div key={t.handle} style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: 8, padding: "1.25rem" }}>
              <p style={{ fontSize: "0.85rem", color: "#c0c0c8", lineHeight: 1.65, marginBottom: "0.75rem" }}>&ldquo;{t.quote}&rdquo;</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-accent)" }}>{t.handle}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2rem" }}>
          <a href="https://discord.gg/placeholder" target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--color-accent)", fontSize: "0.85rem", fontFamily: "var(--font-mono)", textDecoration: "none", letterSpacing: "0.05em" }}>
            Join the community →
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Create `src/components/home/RoadmapSection.tsx`**

```typescript
import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";

export function RoadmapSection() {
  return (
    <section style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionLabel>Roadmap</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 8, padding: "1.5rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-pass)", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>
              PHASE 1 — LIVE ✓
            </p>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.05em", marginBottom: "1rem" }}>INTELLIGENCE LAYER</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {["CA reconstruction from fragments", "Multi-CA + ordinal parsing", "Warning keyword filtering", "Website link scraping", "Telegram link auto-join"].map((f) => (
                <li key={f} style={{ fontSize: "0.82rem", color: "#9090a0" }}>
                  <span style={{ color: "var(--color-pass)", marginRight: "0.5rem" }}>✓</span>{f}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: "var(--color-surface)", border: "1px dashed var(--color-border)", borderRadius: 8, padding: "1.5rem", opacity: 0.7 }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-neutral)", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>
              PHASE 2 — COMING
            </p>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.05em", marginBottom: "1rem" }}>EXECUTION LAYER</h3>
            <p style={{ fontSize: "0.82rem", color: "#7070808", lineHeight: 1.65 }}>
              Optional bot integration. Sentinel will execute directly from the intelligence layer — 1% per trade side, industry standard. No timeline commitment.
            </p>
          </div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <Link href="/roadmap" style={{ color: "var(--color-accent)", fontSize: "0.82rem", fontFamily: "var(--font-mono)", textDecoration: "none", letterSpacing: "0.05em" }}>
            Follow the roadmap →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 4: Update `src/app/page.tsx`**

```typescript
import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ProofSection } from "@/components/home/ProofSection";
import { TrustStripSection } from "@/components/home/TrustStripSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { RoadmapSection } from "@/components/home/RoadmapSection";
import { CtaBand } from "@/components/ui/CtaBand";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <ProofSection />
      <TrustStripSection />
      <HowItWorksSection />
      <SocialProofSection />
      <RoadmapSection />
      <CtaBand />
    </main>
  );
}
```

**Step 5: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: home page complete — all 8 sections wired"
```

---

## Task 9: Product Page

**Files:**
- Create: `src/app/product/page.tsx`

```typescript
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProofSection } from "@/components/home/ProofSection";
import { CtaBand } from "@/components/ui/CtaBand";

const pipeline = [
  { label: "Detection", bullets: ["Regex + Base58 sweep", "Fragment / split token scan"] },
  { label: "Reconstruction", bullets: ["Reverse-map CA database", "AI-assisted completion"] },
  { label: "Filtering", bullets: ["Warning keyword scan", "Ordinal instruction parser"] },
  { label: "Forwarding", bullets: ["Clean CA to destination", "Source metadata attached"] },
];

const metrics = [
  { stat: "≥ 97%", label: "Extraction Precision" },
  { stat: "≥ 90%", label: "Extraction Recall" },
  { stat: "< 500ms", label: "p95 Detection (full CA)" },
  { stat: "< 3%", label: "False Block Rate" },
];

const configOptions = [
  ["Source selection", "Monitor any Telegram chat, channel, or user"],
  ["Ordinal handling", "Forward all CAs or only when ordinal is explicit"],
  ["Warning filter", "Toggle on/off; customize keyword list (advanced mode)"],
  ["Forwarding destination", "Telegram group, bot, or DM"],
];

export default function ProductPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <nav style={{ fontSize: "0.75rem", color: "var(--color-neutral)", marginBottom: "1.5rem", fontFamily: "var(--font-mono)" }}>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a> / Product
        </nav>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 5rem)", letterSpacing: "0.04em" }}>
          INTELLIGENCE,<br />NOT EXECUTION.
        </h1>
        <p style={{ color: "#9090a0", maxWidth: 520, margin: "1.5rem auto 2.5rem", lineHeight: 1.65 }}>
          Sentinel is the layer that turns hostile Telegram noise into clean contract addresses — ready for your bot to act on.
        </p>
        <a href="/#waitlist" style={{ background: "var(--color-accent)", color: "#000", fontWeight: 700, padding: "0.85rem 2rem", borderRadius: 4, textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Join Waitlist
        </a>
      </section>

      {/* Pipeline */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionLabel>System Architecture</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "1.5rem" }}>
            {pipeline.map((p, i) => (
              <div key={p.label} style={{ position: "relative" }}>
                <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: 6, padding: "1rem" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-accent)", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>0{i + 1} {p.label.toUpperCase()}</p>
                  {p.bullets.map(b => <p key={b} style={{ fontSize: "0.78rem", color: "#9090a0", lineHeight: 1.5 }}>· {b}</p>)}
                </div>
                {i < pipeline.length - 1 && (
                  <span aria-hidden style={{ position: "absolute", top: "50%", right: -14, transform: "translateY(-50%)", color: "var(--color-border-hi)", fontSize: "1.1rem", zIndex: 1 }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof cards — reuse home component */}
      <ProofSection />

      {/* Metrics */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", textAlign: "center" }}>
          {metrics.map(m => (
            <div key={m.label}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--color-accent)" }}>{m.stat}</p>
              <p style={{ fontSize: "0.78rem", color: "var(--color-neutral)" }}>{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Config options */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <SectionLabel>Configuration</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
            {configOptions.map(([label, desc]) => (
              <div key={label} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "1rem", padding: "0.85rem 1rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 6 }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#e8e8ea" }}>{label}</p>
                <p style={{ fontSize: "0.82rem", color: "#9090a0" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
```

**Step 1: Run dev and check `/product`**

```bash
npm run dev
```

Expected: product page renders with pipeline diagram, proof cards, metrics band, config table.

**Step 2: Commit**

```bash
git add src/app/product/
git commit -m "feat: product page — pipeline, proof cards, metrics, config options"
```

---

## Task 10: How It Works Page

**Files:**
- Create: `src/app/how-it-works/page.tsx`

```typescript
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBand } from "@/components/ui/CtaBand";

const steps = [
  {
    n: "01", label: "Install",
    desc: "Install Sentinel AI from the Chrome Web Store. Takes under 30 seconds.",
    note: null,
  },
  {
    n: "02", label: "Connect Telegram",
    desc: "Enter your Telegram API ID, API Hash, and phone number in the extension UI.",
    note: "To get your API credentials: visit my.telegram.org → Log in → App configuration → copy API ID and App hash.",
  },
  {
    n: "03", label: "Enter Auth Code",
    desc: "Telegram sends a one-time auth code to your account. Enter it in the extension. This authenticates your local session — no server ever receives your credentials.",
    note: null,
  },
  {
    n: "04", label: "Select Sources + Forwarding Target",
    desc: "Browse your Telegram chats and channels. Select which ones Sentinel should monitor. Define where clean CAs should be forwarded: a Telegram group, bot, or DM.",
    note: null,
  },
  {
    n: "05", label: "Activate",
    desc: "Sentinel is live. The extension popup shows your active source count and forwarding target. From this point, CAs arrive automatically.",
    note: null,
  },
];

const workflow = [
  "Launch message posted in monitored chat",
  "Sentinel detects CA shape (fragment, full, obfuscated)",
  "Reconstruction pipeline runs → confidence gate",
  "Filter check: pass or block (warning keywords)",
  "Clean CA forwarded to your destination",
  "Your bot executes",
];

const miniQA = [
  ["How do I change my forwarding target?", "Open the extension → Settings → Forwarding. Update the destination and save."],
  ["Can I monitor multiple chats?", "Yes — add as many sources as needed. Sentinel listens to all simultaneously."],
  ["What happens if the extension loses connection?", "Sentinel will attempt to reconnect automatically. You will see a disconnected state indicator in the popup."],
  ["Do I need to keep the browser open?", "Yes — Sentinel runs inside Chrome. The browser must be open and the extension must be active."],
];

export default function HowItWorksPage() {
  return (
    <main>
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 5rem)", letterSpacing: "0.04em" }}>
          SETUP IN ~10 MINUTES
        </h1>
        <p style={{ color: "#9090a0", maxWidth: 480, margin: "1.25rem auto 2.5rem", lineHeight: 1.65 }}>
          Step by step. Then it runs itself.
        </p>
        <a href="/#waitlist" style={{ background: "var(--color-accent)", color: "#000", fontWeight: 700, padding: "0.85rem 2rem", borderRadius: 4, textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Join Waitlist
        </a>
      </section>

      {/* Steps */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, i) => (
            <div key={step.n} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: "1.5rem", paddingBottom: "2.5rem", borderLeft: i < steps.length - 1 ? "1px solid var(--color-border)" : "none", marginLeft: 30, paddingLeft: "1.5rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--color-surface)", border: "1px solid var(--color-border-hi)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-accent)", marginLeft: -55, flexShrink: 0 }}>
                {step.n}
              </div>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.5rem" }}>{step.label}</h3>
                <p style={{ fontSize: "0.85rem", color: "#9090a0", lineHeight: 1.65 }}>{step.desc}</p>
                {step.note && (
                  <div style={{ marginTop: "0.75rem", padding: "0.6rem 0.85rem", background: "var(--color-accent-lo)", border: "1px solid var(--color-accent)33", borderRadius: 4, fontSize: "0.78rem", color: "#c8c8c0", fontFamily: "var(--font-mono)", lineHeight: 1.55 }}>
                    ↳ {step.note}
                  </div>
                )}
                <div style={{ marginTop: "0.75rem", height: 80, background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--color-neutral)", fontFamily: "var(--font-mono)" }}>[screenshot placeholder]</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily workflow */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <SectionLabel>Daily Workflow</SectionLabel>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
            {workflow.map((step, i) => (
              <>
                <div key={step} style={{ padding: "0.5rem 0.85rem", background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: "0.78rem", color: "#c8c8ca" }}>
                  {step}
                </div>
                {i < workflow.length - 1 && <span style={{ color: "var(--color-border-hi)", fontSize: "1rem" }}>→</span>}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <SectionLabel>Common Questions</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {miniQA.map(([q, a]) => (
              <details key={q} style={{ borderBottom: "1px solid var(--color-border)", padding: "1rem 0" }}>
                <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", listStyle: "none" }}>{q}</summary>
                <p style={{ marginTop: "0.75rem", fontSize: "0.83rem", color: "#9090a0", lineHeight: 1.65 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
```

**Step 1: Commit**

```bash
git add src/app/how-it-works/
git commit -m "feat: how it works page — 5-step onboarding, workflow, mini FAQ"
```

---

## Task 11: Pricing Page

**Files:**
- Create: `src/app/pricing/page.tsx`

```typescript
import { Counter } from "@/components/ui/Counter";
import { WaitlistForm } from "@/components/WaitlistForm";

const tiers = [
  {
    id: "monthly",
    label: "Monthly",
    price: "1 SOL",
    period: "/ month",
    effective: null,
    save: null,
    popular: false,
  },
  {
    id: "quarterly",
    label: "Quarterly",
    price: "2 SOL",
    period: "/ quarter",
    effective: "0.67 SOL / mo",
    save: "Save 33%",
    popular: true,
  },
  {
    id: "annual",
    label: "Annual",
    price: "5 SOL",
    period: "/ year",
    effective: "0.42 SOL / mo",
    save: "Save 58%",
    popular: false,
  },
];

const objections = [
  "Cancel anytime on monthly",
  "No wallet access required beyond payment",
  "SOL-denominated — pay with Phantom or Solflare",
];

export default function PricingPage() {
  return (
    <main>
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "0.04em" }}>
          ONE SUBSCRIPTION.<br />THREE TIERS.
        </h1>
        <p style={{ color: "#9090a0", marginTop: "1rem", lineHeight: 1.65 }}>SOL-denominated. Simple pricing. No hidden fees.</p>
        <div style={{ marginTop: "0.75rem" }}>
          <Counter />
        </div>
      </section>

      {/* Tiers */}
      <section style={{ padding: "2rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
          {tiers.map((t) => (
            <div key={t.id} style={{
              background: "var(--color-surface)",
              border: `1px solid ${t.popular ? "var(--color-accent)" : "var(--color-border)"}`,
              borderRadius: 8,
              padding: "2rem 1.5rem",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
              {t.popular && (
                <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--color-accent)", color: "#000", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.25rem 0.75rem", borderRadius: 20 }}>
                  Most Popular
                </span>
              )}
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.06em" }}>{t.label}</p>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: t.popular ? "var(--color-accent)" : "#fff" }}>{t.price}</span>
                <span style={{ color: "var(--color-neutral)", fontSize: "0.85rem" }}>{t.period}</span>
              </div>
              {t.effective && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-pass)" }}>
                  {t.effective} · {t.save}
                </p>
              )}
              <WaitlistForm size="sm" />
            </div>
          ))}
        </div>
      </section>

      {/* Setup preview */}
      <section style={{ padding: "2rem 1.5rem", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", fontSize: "0.8rem", color: "#9090a0", fontFamily: "var(--font-mono)" }}>
          <span>After joining:</span>
          <span>Install</span><span style={{ color: "var(--color-border-hi)" }}>→</span>
          <span>Set up in ~10 min</span><span style={{ color: "var(--color-border-hi)" }}>→</span>
          <span>First CA in &lt;10 min</span>
        </div>
      </section>

      {/* Objections */}
      <section style={{ padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {objections.map(o => (
            <div key={o} style={{ padding: "0.85rem 1rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: "0.8rem", color: "#9090a0" }}>
              <span style={{ color: "var(--color-pass)", marginRight: "0.5rem" }}>✓</span>{o}
            </div>
          ))}
        </div>
      </section>

      {/* Referral */}
      <section style={{ padding: "3rem 1.5rem", textAlign: "center", borderTop: "1px solid var(--color-border)" }}>
        <p style={{ fontWeight: 600 }}>Refer a trader, earn subscription credits.</p>
        <p style={{ color: "#9090a0", fontSize: "0.85rem", marginTop: "0.5rem" }}>Join the waitlist to unlock your referral link at launch.</p>
      </section>
    </main>
  );
}
```

**Step 1: Commit**

```bash
git add src/app/pricing/
git commit -m "feat: pricing page — 3 tiers, waitlist CTAs, objection strip, referral callout"
```

---

## Task 12: Security Page

**Files:**
- Create: `src/app/security/page.tsx`

```typescript
import { CtaBand } from "@/components/ui/CtaBand";

const doTable = [
  ["Reads Telegram messages from chats you select", "Store credentials on any server"],
  ["Extracts + reconstructs Solana contract addresses", "Access your Solana wallet"],
  ["Forwards clean CAs to a target you define", "Execute trades"],
  ["Runs in your browser, locally", "Have custody of any assets"],
  ["Uses Telegram's official MTProto API", "Send your data to external servers"],
];

const permissions = [
  ["tabs", "Open and read extension UI tabs"],
  ["storage", "Save your local configuration (stored in browser, not on a server)"],
  ["activeTab", "Interact with the current tab when extension is open"],
  ["host_permissions: api.telegram.org", "Connect to Telegram's official MTProto API"],
];

export default function SecurityPage() {
  return (
    <main>
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "0.04em" }}>
          CLIENT-SIDE.<br />NON-CUSTODIAL.<br />NO HIDDEN REACH.
        </h1>
        <p style={{ color: "#9090a0", maxWidth: 560, margin: "1.5rem auto 0", lineHeight: 1.65 }}>
          This page explains exactly what Sentinel can and cannot do. No vague claims.
        </p>
      </section>

      {/* Do / Don't table */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid var(--color-border)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.5rem", background: "rgba(34,197,94,0.06)", borderBottom: "1px solid var(--color-border)", borderRight: "1px solid var(--color-border)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-pass)", letterSpacing: "0.1em" }}>WHAT SENTINEL DOES</p>
            </div>
            <div style={{ padding: "1rem 1.5rem", background: "rgba(239,68,68,0.06)", borderBottom: "1px solid var(--color-border)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-block)", letterSpacing: "0.1em" }}>WHAT SENTINEL DOES NOT DO</p>
            </div>
            {doTable.map(([does, doesnt], i) => (
              <>
                <div key={`do-${i}`} style={{ padding: "0.85rem 1.5rem", borderRight: "1px solid var(--color-border)", borderBottom: i < doTable.length - 1 ? "1px solid var(--color-border)" : "none", fontSize: "0.83rem", color: "#c8c8ca" }}>
                  <span style={{ color: "var(--color-pass)", marginRight: "0.5rem" }}>✓</span>{does}
                </div>
                <div key={`dont-${i}`} style={{ padding: "0.85rem 1.5rem", borderBottom: i < doTable.length - 1 ? "1px solid var(--color-border)" : "none", fontSize: "0.83rem", color: "#c8c8ca" }}>
                  <span style={{ color: "var(--color-block)", marginRight: "0.5rem" }}>×</span>{doesnt}
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", letterSpacing: "0.05em", marginBottom: "1rem" }}>
            YOUR SESSION LIVES IN YOUR BROWSER
          </h2>
          <p style={{ color: "#9090a0", lineHeight: 1.7, fontSize: "0.88rem" }}>
            Sentinel uses Telegram&apos;s official MTProto protocol. When you enter your API credentials, they authenticate a local session inside your Chrome extension. Your API keys never leave your machine. There is no Sentinel server in the authentication path.
          </p>
          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#9090a0" }}>
            Your machine → Telegram MTProto API<br />
            <span style={{ color: "var(--color-block)" }}>No Sentinel server in this chain.</span>
          </div>
        </div>
      </section>

      {/* Permissions */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.05em", marginBottom: "1.5rem" }}>CHROME PERMISSIONS</h2>
          <div style={{ border: "1px solid var(--color-border)", borderRadius: 6, overflow: "hidden" }}>
            {permissions.map(([perm, reason], i) => (
              <div key={perm} style={{ display: "grid", gridTemplateColumns: "220px 1fr", borderBottom: i < permissions.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                <div style={{ padding: "0.85rem 1rem", background: "var(--color-bg)", borderRight: "1px solid var(--color-border)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-accent)" }}>{perm}</div>
                <div style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", color: "#9090a0" }}>{reason}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wallet isolation */}
      <section style={{ padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ padding: "1.5rem", background: "rgba(245,166,35,0.05)", border: "1px solid var(--color-accent)33", borderRadius: 8 }}>
            <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>
              Sentinel has zero connection to your Solana wallet or private keys.
            </p>
            <p style={{ color: "#9090a0", fontSize: "0.83rem", marginTop: "0.5rem", lineHeight: 1.65 }}>
              It does not request wallet access. It does not sign transactions. It never could — there is no wallet integration in the codebase.
            </p>
          </div>
        </div>
      </section>

      <CtaBand headline="Satisfied with the security model?" />
    </main>
  );
}
```

**Step 1: Commit**

```bash
git add src/app/security/
git commit -m "feat: security page — do/don't table, architecture, permissions, wallet isolation"
```

---

## Task 13: FAQ Page

**Files:**
- Create: `src/app/faq/page.tsx`

```typescript
import { CtaBand } from "@/components/ui/CtaBand";

const faqs: { cluster: string; items: [string, string][] }[] = [
  {
    cluster: "Security",
    items: [
      ["Is my Telegram session safe?", "Yes. Your credentials authenticate a local MTProto session inside the extension. They are never transmitted to any Sentinel server."],
      ["Can Sentinel access my wallet?", "No. Sentinel has no wallet integration. It cannot access your Solana wallet or private keys."],
      ["What happens if the extension is updated?", "Extension updates do not affect your credentials — they are stored locally in your browser's extension storage, not on any server. A malicious update could not exfiltrate them either, as the non-custodial architecture has no outbound credential path."],
    ],
  },
  {
    cluster: "Reconstruction Accuracy",
    items: [
      ["How short a fragment can Sentinel reconstruct?", "Reconstruction is most reliable at 12+ characters. From 6–11 characters, Sentinel attempts a database lookup and AI-assisted completion with a confidence gate. Fragments below 6 characters are too ambiguous to reconstruct reliably."],
      ["What is the false positive rate on CA extraction?", "Extraction precision targets ≥97%. Any Base58-shaped string that is not a valid Solana CA is discarded before forwarding."],
      ["What is the false block rate on warning filtering?", "The false block rate target is <3%. If Sentinel blocks a real CA due to a false positive, you can check the extension log, and you can customize warning keywords in advanced settings."],
      ["Can I customize warning keywords?", "Yes. The default keyword list covers 'DO NOT BUY', 'honeypot', 'scam', 'rug', 'caution'. You can add or remove keywords in the extension's advanced settings."],
    ],
  },
  {
    cluster: "Setup",
    items: [
      ["Where do I get my Telegram API ID and Hash?", "Go to my.telegram.org, log in with your phone number, navigate to 'App configuration', and create an app. Your API ID and API Hash will be shown there."],
      ["Do I need to keep the browser open?", "Yes. Sentinel runs as a Chrome extension and requires Chrome to be open and the extension to be active."],
      ["Can I monitor multiple chats?", "Yes — you can add as many source chats as you want."],
      ["What forwarding destinations are supported?", "Any Telegram group, bot, or DM. Set it in the extension's forwarding settings."],
    ],
  },
  {
    cluster: "Pricing",
    items: [
      ["Can I cancel my subscription?", "Monthly subscriptions can be cancelled before the next billing cycle. Quarterly and annual plans are non-refundable but remain active for the full paid period."],
      ["Can I upgrade from monthly to annual?", "Yes — upgrade at any time from within the extension. The remaining monthly period is prorated."],
      ["What wallets are supported for payment?", "Phantom and Solflare. Payment is processed via NowPayments."],
    ],
  },
  {
    cluster: "Compatibility",
    items: [
      ["Which execution bots does Sentinel work with?", "Any bot that accepts a Telegram message containing a contract address — BonkBot, Trojan, custom bots, etc. Sentinel forwards a clean CA to the destination you define; the bot does the rest."],
      ["What Telegram chat types are supported?", "Groups, channels, and direct messages. Bot-to-user messages are also supported."],
    ],
  },
];

export default function FaqPage() {
  return (
    <main>
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "0.04em" }}>
          COMMON QUESTIONS
        </h1>
        <p style={{ color: "#9090a0", marginTop: "1rem" }}>
          Not answered here?{" "}
          <a href="https://discord.gg/placeholder" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)" }}>Join our Discord.</a>
        </p>
      </section>

      <section style={{ padding: "2rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: "3rem" }}>
          {faqs.map((cluster) => (
            <div key={cluster.cluster}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{cluster.cluster}</p>
              {cluster.items.map(([q, a]) => (
                <details key={q} style={{ borderBottom: "1px solid var(--color-border)", padding: "1rem 0" }}>
                  <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", listStyle: "none" }}>{q}</summary>
                  <p style={{ marginTop: "0.75rem", fontSize: "0.83rem", color: "#9090a0", lineHeight: 1.7 }}>{a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>

      <CtaBand headline="Still have questions? Ask in Discord." />
    </main>
  );
}
```

**Step 1: Commit**

```bash
git add src/app/faq/
git commit -m "feat: FAQ page — 5 clusters, accordion Q&A"
```

---

## Task 14: Partners Page

**Files:**
- Create: `src/app/partners/page.tsx`

```typescript
import { SectionLabel } from "@/components/ui/SectionLabel";

const valueProps = [
  { label: "Referral Credits", desc: "Earn subscription credits for every trader you refer who subscribes." },
  { label: "Proof Assets", desc: "Get access to GIF demos, fragment reconstruction demos, and product walkthroughs to share with your audience." },
  { label: "Priority Access", desc: "Early feature access, direct team channel, and a feedback loop that shapes the roadmap." },
];

export default function PartnersPage() {
  return (
    <main>
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "0.04em" }}>
          PARTNER WITH<br />SENTINEL AI
        </h1>
        <p style={{ color: "#9090a0", maxWidth: 520, margin: "1.25rem auto 0", lineHeight: 1.65 }}>
          Referral program, proof assets, and priority access for KOLs, group admins, and trading communities.
        </p>
      </section>

      {/* Value props */}
      <section style={{ padding: "3rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "4rem" }}>
            {valueProps.map(vp => (
              <div key={vp.label} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 8, padding: "1.5rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-accent)", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>{vp.label.toUpperCase()}</p>
                <p style={{ fontSize: "0.83rem", color: "#9090a0", lineHeight: 1.6 }}>{vp.desc}</p>
              </div>
            ))}
          </div>

          {/* Inquiry form */}
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <SectionLabel>Partnership Inquiry</SectionLabel>
            <form style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
              onSubmit={(e) => { e.preventDefault(); alert("Inquiry received — placeholder"); }}>
              {[
                { name: "handle", placeholder: "Name / Handle", type: "text" },
                { name: "telegram", placeholder: "Telegram handle", type: "text" },
                { name: "email", placeholder: "Email address", type: "email" },
              ].map(f => (
                <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder} required
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-hi)", color: "#e8e8ea", padding: "0.85rem 1rem", borderRadius: 4, fontSize: "0.9rem", outline: "none" }} />
              ))}
              <select name="type" required
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-hi)", color: "#9090a0", padding: "0.85rem 1rem", borderRadius: 4, fontSize: "0.9rem" }}>
                <option value="">Community type</option>
                <option value="kol">KOL</option>
                <option value="group">Trading group</option>
                <option value="developer">Developer</option>
                <option value="other">Other</option>
              </select>
              <select name="size" required
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-hi)", color: "#9090a0", padding: "0.85rem 1rem", borderRadius: 4, fontSize: "0.9rem" }}>
                <option value="">Community size</option>
                <option value="lt500">&lt;500</option>
                <option value="500-5k">500–5K</option>
                <option value="5k-50k">5K–50K</option>
                <option value="50k+">50K+</option>
              </select>
              <textarea name="message" placeholder="What interests you about partnering with Sentinel?" rows={4}
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-hi)", color: "#e8e8ea", padding: "0.85rem 1rem", borderRadius: 4, fontSize: "0.9rem", resize: "vertical", outline: "none" }} />
              <button type="submit"
                style={{ background: "var(--color-accent)", color: "#000", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.9rem", border: "none", borderRadius: 4, cursor: "pointer" }}>
                Submit Inquiry
              </button>
            </form>

            <div style={{ marginTop: "2rem", padding: "1rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: "0.78rem", color: "#7070808" }}>
              Sentinel is non-custodial and client-side. Review our{" "}
              <a href="/security" style={{ color: "var(--color-accent)" }}>Security page</a>{" "}
              before reaching out.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```

**Step 1: Commit**

```bash
git add src/app/partners/
git commit -m "feat: partners page — value props, inquiry form, trust note"
```

---

## Task 15: Roadmap Page (Stub)

**Files:**
- Create: `src/app/roadmap/page.tsx`

```typescript
import { CtaBand } from "@/components/ui/CtaBand";

export default function RoadmapPage() {
  return (
    <main>
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "0.04em" }}>ROADMAP</h1>
      </section>
      <section style={{ padding: "2rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-pass)44", borderRadius: 8, padding: "2rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-pass)", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>PHASE 1 — LIVE ✓</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", letterSpacing: "0.05em", marginBottom: "1rem" }}>INTELLIGENCE LAYER</h2>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {["CA reconstruction from fragments", "Multi-CA + ordinal parsing", "Warning keyword filtering", "Website link scraping", "Telegram link auto-join + scrape", "Client-side, non-custodial"].map(f => (
                <li key={f} style={{ fontSize: "0.82rem", color: "#9090a0" }}><span style={{ color: "var(--color-pass)", marginRight: "0.5rem" }}>✓</span>{f}</li>
              ))}
            </ul>
          </div>
          <div style={{ background: "var(--color-surface)", border: "1px dashed var(--color-border)", borderRadius: 8, padding: "2rem", opacity: 0.65 }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-neutral)", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>PHASE 2 — COMING</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", letterSpacing: "0.05em", marginBottom: "1rem" }}>EXECUTION LAYER</h2>
            <p style={{ fontSize: "0.83rem", color: "#7070808", lineHeight: 1.7 }}>
              Optional direct bot integration. When Phase 2 ships, Sentinel will execute trades directly from the intelligence layer at 1% per trade side — industry standard. No timeline commitments. Community feedback shapes the priority.
            </p>
            <p style={{ marginTop: "1rem", fontSize: "0.78rem", color: "var(--color-neutral)", fontFamily: "var(--font-mono)" }}>Join Discord to follow progress →</p>
          </div>
        </div>
      </section>
      <CtaBand headline="Follow Phase 2 in our Discord." />
    </main>
  );
}
```

**Step 1: Commit**

```bash
git add src/app/roadmap/
git commit -m "feat: roadmap page — phase 1 live, phase 2 teaser, no timeline commitments"
```

---

## Task 16: Motion Animations

**Files:**
- Modify: `src/components/home/HeroSection.tsx`
- Modify: `src/components/home/ProofSection.tsx`
- Create: `src/components/ui/FadeIn.tsx`

**Step 1: Create `src/components/ui/FadeIn.tsx`**

```typescript
"use client";
import { motion } from "motion/react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeIn({ children, delay = 0, className, style }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Wrap hero content in `HeroSection.tsx` with staggered FadeIn**

In `HeroSection.tsx`, import `FadeIn` and wrap the tag line, h1, subline, form, and counter each with `<FadeIn delay={0}>`, `<FadeIn delay={0.1}>`, `<FadeIn delay={0.2}>`, `<FadeIn delay={0.3}>`, `<FadeIn delay={0.4}>` respectively.

**Step 3: Wrap each proof card in `ProofSection.tsx` with FadeIn**

Import `FadeIn`, wrap each card `<div>` with `<FadeIn delay={index * 0.08}>`.

**Step 4: Commit**

```bash
git add src/components/ui/FadeIn.tsx src/components/home/HeroSection.tsx src/components/home/ProofSection.tsx
git commit -m "feat: staggered fade-in animations on hero and proof cards"
```

---

## Task 17: NowPayments Integration (Live Mode Prep)

**Files:**
- Create: `src/app/api/create-payment/route.ts`
- Create: `src/lib/nowpayments.ts`

**Step 1: Create `src/lib/nowpayments.ts`**

```typescript
const BASE = "https://api.nowpayments.io/v1";

export interface CreatePaymentParams {
  priceAmount: number;
  priceCurrency: "SOL";
  payCurrency: "SOL";
  orderId: string;
  orderDescription: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createInvoice(params: CreatePaymentParams) {
  const res = await fetch(`${BASE}/invoice`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_NOWPAYMENTS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: params.priceAmount,
      price_currency: params.priceCurrency,
      pay_currency: params.payCurrency,
      order_id: params.orderId,
      order_description: params.orderDescription,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    }),
  });
  if (!res.ok) throw new Error(`NowPayments error: ${res.status}`);
  return res.json() as Promise<{ invoice_url: string; id: string }>;
}
```

**Step 2: Create `src/app/api/create-payment/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createInvoice } from "@/lib/nowpayments";

const TIER_PRICES: Record<string, { amount: number; label: string }> = {
  monthly:   { amount: 1,   label: "Sentinel AI — Monthly (1 SOL)" },
  quarterly: { amount: 2,   label: "Sentinel AI — Quarterly (2 SOL)" },
  annual:    { amount: 5,   label: "Sentinel AI — Annual (5 SOL)" },
};

export async function POST(req: NextRequest) {
  const { tier } = await req.json() as { tier: string };
  const config = TIER_PRICES[tier];
  if (!config) return NextResponse.json({ error: "Invalid tier" }, { status: 400 });

  try {
    const invoice = await createInvoice({
      priceAmount: config.amount,
      priceCurrency: "SOL",
      payCurrency: "SOL",
      orderId: `${tier}-${Date.now()}`,
      orderDescription: config.label,
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?success=1`,
      cancelUrl:  `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    });
    return NextResponse.json({ invoiceUrl: invoice.invoice_url });
  } catch (err) {
    console.error("NowPayments error:", err);
    return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
  }
}
```

**Step 3: Note on pricing page**

The pricing page currently shows `<WaitlistForm>` per tier. On launch, swap each tier's CTA to a button that calls `/api/create-payment` with the tier name and redirects to the returned `invoiceUrl`. This swap is isolated to `src/app/pricing/page.tsx`.

**Step 4: Commit**

```bash
git add src/lib/nowpayments.ts src/app/api/create-payment/
git commit -m "feat: NowPayments invoice API route — monthly/quarterly/annual SOL tiers"
```

---

## Task 18: Build Verification

**Step 1: Run production build**

```bash
npm run build
```

Expected: no TypeScript errors, no missing modules, all 8 pages statically generated.

**Step 2: Fix any build errors**

Resolve any type errors or missing imports flagged by the build.

**Step 3: Run lint**

```bash
npm run lint
```

Expected: no errors.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: Sentinel AI website — all 8 pages, waitlist API, NowPayments integration"
```

---

## Deployment Notes

- Set environment variables in Vercel (or chosen host): `RESEND_API_KEY`, `RESEND_WAITLIST_AUDIENCE_ID`, `NEXT_PUBLIC_NOWPAYMENTS_API_KEY`, `NEXT_PUBLIC_SITE_URL`
- Replace all Discord/Telegram placeholder URLs before deploy
- Replace testimonial placeholders with real quotes before launch
- Replace `[screenshot placeholder]` blocks in How It Works with actual annotated screenshots
- NowPayments sandbox mode: use sandbox API key for testing (`https://sandbox.nowpayments.io`)

---

## Task Summary

| # | Task | Key Output |
|---|---|---|
| 1 | Project scaffold | Next.js 15, deps, brand assets |
| 2 | Design system | CSS vars, amber/dark palette, font trio |
| 3 | Nav | Sticky, mobile hamburger, Join Waitlist CTA |
| 4 | Footer | Page links, social links |
| 5 | Waitlist API | Resend API route + WaitlistForm component |
| 6 | UI primitives | SectionLabel, Counter, ChatBubble, TrustBadge, CtaBand |
| 7 | Home Sections 1–4 | Hero, Problem, Proof cards, Trust strip |
| 8 | Home Sections 5–8 | How It Works, Social Proof, Roadmap, Final CTA |
| 9 | Product page | Pipeline, proof cards, metrics, config |
| 10 | How It Works page | 5-step onboarding, workflow, mini FAQ |
| 11 | Pricing page | 3-tier table, objections, referral |
| 12 | Security page | Do/don't table, architecture, permissions |
| 13 | FAQ page | 5 clusters, accordion |
| 14 | Partners page | Value props, inquiry form |
| 15 | Roadmap page | Phase 1 live, Phase 2 teaser |
| 16 | Animations | FadeIn component, hero + proof stagger |
| 17 | NowPayments | Invoice API route, lib |
| 18 | Build verify | Clean build, lint pass |
