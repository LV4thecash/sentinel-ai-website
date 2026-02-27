# Cinematic Polish & Mobile Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add premium cinematic motion (Lenis smooth scroll, enhanced reveals, organic atmosphere), fix mobile responsiveness across all pages, and standardize micro-interactions — zero copy changes.

**Architecture:** Surgical enhancement of existing components. One new file (SmoothScroll.tsx), one new dependency (lenis). All changes flow from updated CSS design tokens in globals.css outward to components. Mobile fixes use CSS `min()` trick and clamp() to prevent overflow without media-query-per-component sprawl.

**Tech Stack:** Next.js 15 / React 19 / Tailwind 4 / Motion (Framer Motion) / Lenis (new)

---

### Task 1: Install Lenis dependency

**Files:**
- Modify: `package.json`

**Step 1: Install lenis**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm install lenis`

Expected: lenis added to dependencies in package.json.

**Step 2: Verify install**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && node -e "require('lenis'); console.log('OK')"`

Expected: `OK`

**Step 3: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add package.json package-lock.json
git commit -m "chore: add lenis smooth scroll dependency"
```

---

### Task 2: Update globals.css — tokens, mobile fixes, keyframes, micro-interaction classes

**Files:**
- Modify: `src/app/globals.css`

This is the largest single change. It sets the foundation for everything else.

**Step 1: Update design tokens in :root**

Replace the Layout section:
```css
/* ─── Layout ────────────────────────────────────────────── */
--nav-height:      64px;
--content-width:   1200px;
--section-gap:     clamp(5rem, 12vw, 10rem);
--section-gap-sm:  clamp(3rem, 7vw, 5.5rem);
```

Replace the Motion tokens section:
```css
/* ─── Motion tokens ─────────────────────────────────────── */
--motion-fast:     0.3s;
--motion-base:     0.6s;
--motion-slow:     1.0s;
--motion-slower:   1.4s;
--motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--motion-ease:     cubic-bezier(0.4, 0, 0.2, 1);
--motion-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
--motion-reveal:   cubic-bezier(0.22, 1, 0.36, 1);
--motion-stagger:  0.08s;
```

**Step 2: Update html and body rules for mobile overflow protection**

Replace the `html` rule:
```css
html {
  background: var(--zone-light);
  color: var(--color-text);
  font-family: var(--font-body), system-ui, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  overflow-x: hidden;
  width: 100%;
}
```

Replace the `body` rule:
```css
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: var(--nav-height);
  overflow-x: hidden;
  width: 100%;
  overflow-wrap: break-word;
}
```

**Step 3: Update .content-wrap**

Replace:
```css
.content-wrap {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
  width: 100%;
}
```

**Step 4: Add global media reset after the `*` box-sizing rule**

After the `*::after { box-sizing: border-box; }` block, add:
```css
img, video, iframe { max-width: 100%; height: auto; }
```

**Step 5: Update keyframe durations (orb drift cycles)**

Replace the existing `orb-drift-1` keyframe — the animation itself stays the same, only the duration changes. Durations are set on the elements, not in the keyframe. So this step is actually about adding NEW keyframes.

Add after the existing `orb-drift-3` keyframe:

```css
@keyframes orb-drift-4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  20%      { transform: translate(40px, -60px) scale(1.04); }
  50%      { transform: translate(-50px, -30px) scale(0.97); }
  80%      { transform: translate(30px, 40px) scale(1.01); }
}

@keyframes wash-drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33%      { transform: translate(30px, -20px) scale(1.03) rotate(2deg); }
  66%      { transform: translate(-20px, 15px) scale(0.98) rotate(-1deg); }
}

@keyframes wash-drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  25%      { transform: translate(-25px, 30px) scale(1.02) rotate(-2deg); }
  50%      { transform: translate(20px, -10px) scale(0.97) rotate(1deg); }
  75%      { transform: translate(-15px, -20px) scale(1.01) rotate(-1deg); }
}
```

**Step 6: Add micro-interaction CSS classes**

Add before the `/* ─── Prefers-reduced-motion ─── */` section:

```css
/* ─── Micro-interaction classes ─────────────────────────── */
.btn-primary {
  transition: background var(--motion-fast) ease,
              transform var(--motion-fast) var(--motion-reveal),
              box-shadow var(--motion-fast) ease;
}
.btn-primary:hover {
  background: var(--color-accent-hi) !important;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 28px rgba(190,27,42,0.32), inset 0 1px 0 rgba(255,255,255,0.15) !important;
}
.btn-primary:active {
  transform: translateY(0) scale(0.98);
}
.btn-primary:focus-visible {
  transform: translateY(-2px) scale(1.02);
}

.btn-secondary {
  transition: opacity var(--motion-fast) ease,
              transform var(--motion-fast) var(--motion-reveal),
              box-shadow var(--motion-fast) ease;
}
.btn-secondary:hover {
  opacity: 0.95;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9) !important;
}
.btn-secondary:active {
  transform: translateY(0) scale(0.98);
}

.card-hover {
  transition: transform var(--motion-fast) var(--motion-reveal),
              box-shadow var(--motion-fast) ease,
              border-color var(--motion-fast) ease,
              background var(--motion-fast) ease,
              backdrop-filter var(--motion-fast) ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-glass-hover);
  border-color: var(--glass-border-hi);
}

.card-hover-dark {
  transition: transform var(--motion-fast) var(--motion-reveal),
              box-shadow var(--motion-fast) ease,
              border-color var(--motion-fast) ease;
}
.card-hover-dark:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-dark-glass-hover);
  border-color: var(--glass-dark-border-hi);
}

.link-subtle {
  transition: color var(--motion-fast) ease;
}
.link-subtle:hover {
  color: var(--color-text) !important;
}

.link-subtle-light {
  transition: color var(--motion-fast) ease;
}
.link-subtle-light:hover {
  color: rgba(255,255,255,0.75) !important;
}

.link-accent {
  transition: opacity var(--motion-fast) ease,
              border-color var(--motion-fast) ease;
}
.link-accent:hover {
  opacity: 0.85;
  border-color: rgba(190,27,42,0.6);
}
```

**Step 7: Add mobile-specific media query block**

Add before the `/* ─── Prefers-reduced-motion ─── */` section (after the micro-interaction classes):

```css
/* ─── Mobile overrides ──────────────────────────────────── */
@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr !important; text-align: center !important; }
  .footer-grid > *:last-child { justify-content: center !important; }
  .hide-mobile { display: none !important; }
}
```

**Step 8: Update prefers-reduced-motion to also handle micro-interactions**

The existing `prefers-reduced-motion` block is fine as-is — it already kills all transitions and animations globally. No change needed.

**Step 9: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds with no errors.

**Step 10: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/app/globals.css
git commit -m "feat: update design tokens, add mobile fixes, micro-interaction classes, new keyframes"
```

---

### Task 3: Create SmoothScroll.tsx

**Files:**
- Create: `src/components/ui/SmoothScroll.tsx`

**Step 1: Create the SmoothScroll component**

Create `src/components/ui/SmoothScroll.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0, // disable smooth touch — native mobile scroll
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
```

**Step 2: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds. The component is created but not yet used.

**Step 3: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/components/ui/SmoothScroll.tsx
git commit -m "feat: add SmoothScroll component with Lenis integration"
```

---

### Task 4: Update layout.tsx — integrate SmoothScroll

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add SmoothScroll import and wrap content**

Add import:
```tsx
import { SmoothScroll } from "@/components/ui/SmoothScroll";
```

Wrap the content div inside `<SmoothScroll>`:
```tsx
<body>
  <AtmosphereBackground />
  <SmoothScroll>
    <div style={{ position: "relative", zIndex: 1 }}>
      <Nav />
      {children}
      <Footer />
    </div>
  </SmoothScroll>
</body>
```

**Step 2: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds. Lenis smooth scroll is now active on desktop.

**Step 3: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/app/layout.tsx
git commit -m "feat: integrate Lenis smooth scroll in root layout"
```

---

### Task 5: Enhance FadeIn.tsx

**Files:**
- Modify: `src/components/ui/FadeIn.tsx`

**Step 1: Update the component with new defaults and props**

Replace the entire file content with:

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";
import React from "react";

type Direction = "up" | "down" | "left" | "right";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Enable blur-to-sharp entrance (cinematic) — default true */
  blur?: boolean;
  /** Distance to travel in px (default 40) */
  distance?: number;
  /** Entrance direction (default "up") */
  direction?: Direction;
  /** Stagger delay between children (wraps each child in its own animation) */
  stagger?: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

function getInitialTransform(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
  }
}

export function FadeIn({
  children,
  delay = 0,
  className,
  style,
  blur = true,
  distance = 40,
  direction = "up",
  stagger,
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Stagger mode: wrap each child individually
  if (stagger != null) {
    const items = React.Children.toArray(children);
    return (
      <div className={className} style={style}>
        {items.map((child, i) => {
          const initial = getInitialTransform(direction, distance);
          return (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                ...initial,
                filter: blur ? "blur(6px)" : "blur(0px)",
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: delay + i * stagger,
                ease,
              }}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Single element mode
  const initial = getInitialTransform(direction, distance);

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initial,
        filter: blur ? "blur(6px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease,
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds. All existing `<FadeIn>` calls now get enhanced defaults (40px distance, blur on, new easing).

**Step 3: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/components/ui/FadeIn.tsx
git commit -m "feat: enhance FadeIn with cinematic blur, 40px travel, stagger and direction support"
```

---

### Task 6: Enhance AtmosphereBackground.tsx

**Files:**
- Modify: `src/components/ui/AtmosphereBackground.tsx`

**Step 1: Update with slower cycles, softer blur, and new ambient washes**

Replace the entire file content with:

```tsx
"use client";

import { useEffect, useRef } from "react";

export function AtmosphereBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const scrollY = window.scrollY;
            containerRef.current.style.setProperty(
              "--scroll-y",
              `${scrollY}px`
            );
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Orb 1 — Warm red-rose, upper right */}
      <div
        style={{
          position: "absolute",
          top: "calc(-5% + calc(var(--scroll-y, 0px) * 0.08))",
          right: "-8%",
          width: "clamp(350px, 45vw, 600px)",
          height: "clamp(350px, 45vw, 600px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(190, 27, 42, 0.18) 0%, rgba(225, 70, 90, 0.12) 40%, transparent 70%)",
          filter: "blur(120px)",
          animation: "orb-drift-1 40s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Orb 2 — Amber-peach, lower left */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(10% + calc(var(--scroll-y, 0px) * -0.05))",
          left: "-12%",
          width: "clamp(300px, 40vw, 520px)",
          height: "clamp(300px, 40vw, 520px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(217, 119, 57, 0.12) 0%, rgba(217, 119, 57, 0.025) 50%, transparent 70%)",
          filter: "blur(130px)",
          animation: "orb-drift-2 52s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Orb 3 — Cool blue-slate, center bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(-10% + calc(var(--scroll-y, 0px) * -0.04))",
          left: "30%",
          width: "clamp(280px, 35vw, 480px)",
          height: "clamp(280px, 35vw, 480px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100, 116, 139, 0.10) 0%, rgba(100, 116, 139, 0.015) 50%, transparent 70%)",
          filter: "blur(110px)",
          animation: "orb-drift-3 36s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Orb 4 — Subtle rose accent, mid-page left */}
      <div
        style={{
          position: "absolute",
          top: "calc(40% + calc(var(--scroll-y, 0px) * 0.06))",
          left: "5%",
          width: "clamp(200px, 25vw, 380px)",
          height: "clamp(200px, 25vw, 380px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(225, 70, 90, 0.13) 0%, transparent 65%)",
          filter: "blur(100px)",
          animation: "orb-drift-4 58s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Ambient wash 1 — Warm undertone, upper-left area */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: "clamp(500px, 60vw, 900px)",
          height: "clamp(400px, 50vw, 700px)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(225, 70, 90, 0.04) 0%, transparent 60%)",
          filter: "blur(140px)",
          animation: "wash-drift-1 45s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Ambient wash 2 — Cool undertone, lower-right area */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          width: "clamp(450px, 55vw, 850px)",
          height: "clamp(350px, 45vw, 650px)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(100, 116, 139, 0.035) 0%, transparent 60%)",
          filter: "blur(140px)",
          animation: "wash-drift-2 55s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
```

**Step 2: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds. Atmosphere has slower, softer orbs + 2 new ambient washes.

**Step 3: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/components/ui/AtmosphereBackground.tsx
git commit -m "feat: enhance atmosphere with slower orb cycles and ambient gradient washes"
```

---

### Task 7: Update Nav.tsx — CSS hover classes, remove inline JS hover

**Files:**
- Modify: `src/components/Nav.tsx`

**Step 1: Replace inline hover handlers with CSS classes**

On the desktop CTA link (the "Request Access" `<Link>` inside `desktop-nav`):
- Add `className="btn-primary"`
- Remove `onMouseEnter` and `onMouseLeave` handlers
- Keep the existing inline `style` but remove the `transition` property from it (now handled by `.btn-primary` class)

On each desktop nav link:
- Add `className="nav-link link-subtle"` (combining existing nav-link with new link-subtle)
- Remove `onMouseEnter` and `onMouseLeave` handlers

On Footer-style links in mobile menu — no hover handlers to remove there, so leave as-is.

**Step 2: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds.

**Step 3: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/components/Nav.tsx
git commit -m "refactor: replace Nav inline hover handlers with CSS utility classes"
```

---

### Task 8: Update HeroSection.tsx — mobile fixes + CSS hover

**Files:**
- Modify: `src/components/home/HeroSection.tsx`

**Step 1: Fix mobile issues**

1. Change `minHeight` from `calc(100vh - var(--nav-height))` to `calc(100svh - var(--nav-height))` for mobile browser chrome support.

2. Change headline `fontSize` from `clamp(2.8rem, 9vw, 6.5rem)` to `clamp(2.2rem, 9vw, 6.5rem)` to prevent overflow on 375px.

3. On the CTA `<Link>` to `/waitlist`:
   - Add `className="btn-primary"`
   - Remove `onMouseEnter` and `onMouseLeave` handlers
   - Remove `transition` from inline style (handled by class)

**Step 2: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds.

**Step 3: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/components/home/HeroSection.tsx
git commit -m "fix: hero mobile viewport, headline clamp, CSS hover classes"
```

---

### Task 9: Update HowItWorksSection.tsx — grid fix, arrow hide, CSS hover

**Files:**
- Modify: `src/components/home/HowItWorksSection.tsx`

**Step 1: Fix grid overflow**

Change `gridTemplateColumns` from:
```
"repeat(auto-fit, minmax(200px, 1fr))"
```
to:
```
"repeat(auto-fit, minmax(min(200px, 100%), 1fr))"
```

**Step 2: Hide connector arrows on mobile**

Add `className="hide-mobile"` to the connector arrow `<span>` elements (the `→` spans). The `.hide-mobile` class was added to globals.css in Task 2.

**Step 3: Replace card hover with CSS class**

On each step card `<div>`:
- Add `className="card-hover"`
- Remove `onMouseEnter` and `onMouseLeave` handlers
- Simplify inline styles: remove conditional `background`, `backdropFilter`, `border`, `transform`, `boxShadow` from hover state. Keep the non-hover defaults in the inline style. The `.card-hover` class handles the hover transition.

The simplified card style should be:
```tsx
style={{
  position: "relative",
  padding: "1.25rem 1rem",
  borderRadius: "var(--radius-md)",
  background: "transparent",
  border: "1px solid transparent",
}}
```

**Step 4: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds.

**Step 5: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/components/home/HowItWorksSection.tsx
git commit -m "fix: HowItWorks grid mobile overflow, arrow hide, CSS hover classes"
```

---

### Task 10: Update Footer.tsx — mobile grid collapse + CSS hover

**Files:**
- Modify: `src/components/Footer.tsx`

**Step 1: Add footer-grid class for mobile collapse**

On the grid container `<div>` (the one with `gridTemplateColumns: "1fr auto 1fr"`):
- Add `className="footer-grid"`

The `@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; text-align: center !important; } }` rule from globals.css (Task 2) will handle the mobile collapse.

**Step 2: Replace link hover handlers with CSS classes**

On each footer page link:
- Add `className="link-subtle"`
- Remove `onMouseEnter` and `onMouseLeave`

On each social link (Discord, Telegram):
- Add `className="link-subtle"`
- Remove `onMouseEnter` and `onMouseLeave`

**Step 3: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds.

**Step 4: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/components/Footer.tsx
git commit -m "fix: footer mobile grid collapse, CSS hover classes"
```

---

### Task 11: Update CtaBand.tsx — font fix + CSS hover

**Files:**
- Modify: `src/components/ui/CtaBand.tsx`

**Step 1: Fix headline font size floor**

Change `fontSize` from `clamp(1.8rem, 4vw, 2.8rem)` to `clamp(1.5rem, 5vw, 2.8rem)`.

**Step 2: Replace CTA button hover with CSS class**

On the "Apply for Access" `<Link>`:
- Add `className="btn-secondary"`
- Remove `onMouseEnter` and `onMouseLeave` handlers
- Remove `transition` from inline style

**Step 3: Replace social link hovers with CSS class**

On the Discord and Telegram `<a>` links:
- Add `className="link-subtle-light"`
- Remove `onMouseEnter` and `onMouseLeave` handlers

**Step 4: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds.

**Step 5: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/components/ui/CtaBand.tsx
git commit -m "fix: CtaBand headline mobile font floor, CSS hover classes"
```

---

### Task 12: Update pricing/page.tsx — grid + padding fixes

**Files:**
- Modify: `src/app/pricing/page.tsx`

**Step 1: Fix tier cards grid**

Change `gridTemplateColumns` from:
```
"repeat(auto-fit, minmax(240px, 1fr))"
```
to:
```
"repeat(auto-fit, minmax(min(240px, 100%), 1fr))"
```

**Step 2: Fix objections grid**

Change `gridTemplateColumns` from:
```
"repeat(auto-fit, minmax(200px, 1fr))"
```
to:
```
"repeat(auto-fit, minmax(min(200px, 100%), 1fr))"
```

**Step 3: Fix FAQ section padding**

Change `padding` from `"2rem clamp(1.5rem, 5vw, 4rem) 6rem"` to `"clamp(2rem, 5vw, 6rem) clamp(1.5rem, 5vw, 4rem)"`.

**Step 4: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds.

**Step 5: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/app/pricing/page.tsx
git commit -m "fix: pricing grid mobile overflow, FAQ padding"
```

---

### Task 13: Update product/page.tsx — grid + font fixes

**Files:**
- Modify: `src/app/product/page.tsx`

**Step 1: Fix pipeline grid**

Change `gridTemplateColumns` from:
```
"repeat(auto-fit, minmax(200px, 1fr))"
```
to:
```
"repeat(auto-fit, minmax(min(200px, 100%), 1fr))"
```

**Step 2: Fix metrics grid**

Change `gridTemplateColumns` from:
```
"repeat(auto-fit, minmax(180px, 1fr))"
```
to:
```
"repeat(auto-fit, minmax(min(180px, 100%), 1fr))"
```

**Step 3: Fix config options grid**

Change `gridTemplateColumns` from `"200px 1fr"` to `"minmax(min(200px, 100%), auto) 1fr"`.

**Step 4: Fix large metric font size**

Change `fontSize` from `"2.8rem"` to `"clamp(2rem, 6vw, 2.8rem)"`.

**Step 5: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds.

**Step 6: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/app/product/page.tsx
git commit -m "fix: product page grid mobile overflow, metric font scaling"
```

---

### Task 14: Update security/page.tsx — grid fixes

**Files:**
- Modify: `src/app/security/page.tsx`

**Step 1: Fix Do/Don't table grid**

On both the header row and data rows, change `gridTemplateColumns` from `"1fr 1fr"` to `"repeat(auto-fit, minmax(min(250px, 100%), 1fr))"`.

**Step 2: Fix permissions table grid**

Change `gridTemplateColumns` from `"220px 1fr"` to `"minmax(min(220px, 100%), auto) 1fr"`.

**Step 3: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds.

**Step 4: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/app/security/page.tsx
git commit -m "fix: security page grid mobile overflow for tables"
```

---

### Task 15: Update faq/page.tsx — padding fix

**Files:**
- Modify: `src/app/faq/page.tsx`

**Step 1: Fix section padding**

Change `padding` from `"2rem clamp(1.5rem, 5vw, 4rem) 6rem"` to `"clamp(2rem, 5vw, 6rem) clamp(1.5rem, 5vw, 4rem)"`.

**Step 2: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds.

**Step 3: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/app/faq/page.tsx
git commit -m "fix: FAQ page padding mobile overflow"
```

---

### Task 16: Update roadmap/page.tsx — grid + padding fix

**Files:**
- Modify: `src/app/roadmap/page.tsx`

**Step 1: Fix phase cards grid**

Change `gridTemplateColumns` from:
```
"repeat(auto-fit, minmax(300px, 1fr))"
```
to:
```
"repeat(auto-fit, minmax(min(300px, 100%), 1fr))"
```

**Step 2: Fix section padding**

Change `padding` from `"2rem clamp(1.5rem, 5vw, 4rem) 6rem"` to `"clamp(2rem, 5vw, 6rem) clamp(1.5rem, 5vw, 4rem)"`.

**Step 3: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds.

**Step 4: Commit**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add src/app/roadmap/page.tsx
git commit -m "fix: roadmap grid mobile overflow, padding"
```

---

### Task 17: Final build verification + visual check

**Files:** None (verification only)

**Step 1: Full production build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build`

Expected: Build succeeds with zero errors, zero warnings about the changed files.

**Step 2: Start dev server for visual check**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run dev`

Visual checks to perform:
- [ ] Desktop: smooth scroll active (mouse wheel feels buttery)
- [ ] Desktop: section reveals have blur-to-sharp + 40px slide up
- [ ] Desktop: button hovers show scale + glow
- [ ] Desktop: card hovers show lift + shadow
- [ ] Desktop: atmosphere orbs drift slowly (40-58s cycles)
- [ ] Mobile (375px in devtools): no horizontal scrollbar on any page
- [ ] Mobile: hero headline fits without overflow
- [ ] Mobile: footer stacks to single column
- [ ] Mobile: all grids collapse to single column on narrow screens
- [ ] Mobile: native scroll momentum (no Lenis interference)
- [ ] Reduced motion: disable animations in OS settings, verify static rendering

**Step 3: Final commit (if any fixes needed)**

```bash
cd "/Users/leoneandreis/claude/website 2.0"
git add -A
git commit -m "chore: final polish adjustments after visual verification"
```
