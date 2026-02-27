# Cinematic Polish & Mobile Responsiveness Design

**Date:** 2026-02-27
**Approach:** A — Surgical Enhancement (minimal churn, maximum impact)
**Reference:** hyperfoundation.org cinematic Web3/SaaS aesthetic

## Summary

Refactor the existing Sentinel AI website to add premium cinematic motion, fix mobile responsiveness across all pages, and standardize micro-interactions — without changing any copy, colors, or fonts.

**Scope:** ~15 files modified, 1 new file (`SmoothScroll.tsx`), 1 new dependency (`lenis`).

---

## 1. Global Foundation (globals.css + layout.tsx)

### Mobile overflow fix
- `html, body { overflow-x: hidden; width: 100%; }`
- `-webkit-text-size-adjust: 100%` on html
- `img, video, iframe { max-width: 100%; height: auto; }`
- `overflow-wrap: break-word` on body

### Updated design tokens
```
--content-width:  1200px              (was 1120px)
--section-gap:    clamp(5rem, 12vw, 10rem)  (was 7.5rem fixed)
--section-gap-sm: clamp(3rem, 7vw, 5.5rem)  (was 4.5rem fixed)
```

### Updated motion tokens (standardized to 0.3s/0.6s/1.0s)
```
--motion-fast:    0.3s               (was 0.2s)
--motion-base:    0.6s               (was 0.45s)
--motion-slow:    1.0s               (was 0.7s)
--motion-slower:  1.4s               (was 1s)
--motion-reveal:  cubic-bezier(0.22, 1, 0.36, 1)  (new)
```

### Content-wrap update
```css
.content-wrap {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
  width: 100%;
}
```

---

## 2. Smooth Scrolling (Lenis)

### New file: `src/components/ui/SmoothScroll.tsx`
- `"use client"` wrapper component initializing Lenis
- Config: `duration: 1.2`, standard Lenis easing `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- `smoothWheel: true`, `smoothTouch: false` (native mobile scroll preserved)
- Integrates with Motion's animation frame for RAF sync
- Respects `prefers-reduced-motion`

### Layout integration
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

---

## 3. Scroll-Linked Reveals (Enhanced FadeIn)

### Updated defaults

| Property | Current | New |
|----------|---------|-----|
| `distance` default | 16px | 40px |
| `blur` default | `false` | `true` |
| Initial blur amount | 8px | 6px |
| `duration` | 0.55s | 0.6s |
| `ease` | `[0.16, 1, 0.3, 1]` | `[0.22, 1, 0.36, 1]` |
| `viewport.margin` | `-60px` | `-80px` |

### New props
- `stagger?: number` — delay between children for stagger groups
- `direction?: "up" | "down" | "left" | "right"` — entrance direction

Backward-compatible: existing `<FadeIn>` calls get improved defaults automatically.

---

## 4. Atmosphere Background Enhancement

### Existing orb adjustments
- Slow drift cycles: 24s->40s, 28s->52s, 22s->36s, 30s->58s
- Soften blur: 80-110px -> 100-140px
- Reduce opacity ~10-15%

### 2 new ambient gradient washes
1. **Warm wash** — large, subtle radial gradient at ~30% top, 60% left. 45s drift cycle. Uses `--orb-rose` at very low opacity.
2. **Cool wash** — positioned lower-right, 55s drift cycle. Uses `--orb-cool`.

### New CSS keyframes
- `orb-drift-4` for the 4th orb (currently reuses orb-drift-1 reversed)
- `wash-drift-1` and `wash-drift-2` for ambient washes

---

## 5. Micro-Interactions System

### New CSS utility classes (globals.css)

```css
.btn-primary        /* scale(1.02) + translateY(-2px) + glow on hover, scale(0.98) on active */
.btn-primary-dark   /* same but with dark-zone shadow values */
.card-hover         /* translateY(-4px) + shadow-glass-hover on hover */
.card-hover-dark    /* dark zone variant */
.link-accent        /* opacity + border-color transition on hover */
```

### Components updated (remove inline JS hover handlers)
- Nav.tsx — CTA button
- HeroSection.tsx — CTA button
- HowItWorksSection.tsx — step cards
- Any other components with inline onMouseEnter/onMouseLeave hover patterns

---

## 6. Mobile Responsiveness Pass

### Global fixes
- `overflow-x: hidden` on html/body
- `@media (max-width: 768px)` block in globals.css

### Per-component fixes

| Component | Issue | Fix |
|-----------|-------|-----|
| **HeroSection** | `minHeight: calc(100vh - nav)` | Use `100svh` for mobile browser chrome |
| **HeroSection** | Headline floor 2.8rem too large | `clamp(2.2rem, 9vw, 6.5rem)` |
| **HowItWorksSection** | `minmax(200px, 1fr)` too wide | `minmax(min(200px, 100%), 1fr)` |
| **HowItWorksSection** | Connector arrows overflow on mobile | Hide at 768px |
| **Footer** | `1fr auto 1fr` never collapses | Stack to single column at 768px |
| **product/page** | `200px 1fr` hard grid | Stack on mobile |
| **security/page** | `220px 1fr` hard grid | Stack on mobile |
| **security/page** | `1fr 1fr` Do/Don't table | Stack on mobile |
| **pricing/page** | Trailing `5rem` fixed padding | Replace with clamp() |
| **faq/page** | Trailing `6rem` fixed padding | Replace with clamp() |
| **roadmap/page** | `minmax(300px, 1fr)` too wide | `minmax(min(300px, 100%), 1fr)` |
| **roadmap/page** | Trailing `6rem` fixed padding | Replace with clamp() |
| **CtaBand** | `clamp(1.8rem, 4vw, 2.8rem)` too small at 375px | `clamp(1.5rem, 5vw, 2.8rem)` |

---

## 7. Performance & Accessibility

### GPU compositing
- All animations use `transform`, `opacity`, `filter` (GPU-compositable)
- `will-change: transform` on all animated atmospheric elements
- No layout-triggering properties in transitions

### 60fps target
- Lenis manages its own RAF loop
- AtmosphereBackground uses ticking guard on scroll
- No scroll handlers read layout properties

### `prefers-reduced-motion`
- globals.css: kills all animation/transition durations
- FadeIn.tsx: renders static div
- SmoothScroll: disables Lenis
- CSS hover classes: remove transform transitions, keep color changes

### Bundle impact
- Lenis: ~8kb gzipped
- 2 new CSS gradient elements: zero JS cost
- No additional animation loops

---

## Files Modified

1. `src/app/globals.css` — tokens, mobile fixes, micro-interaction classes, keyframes
2. `src/app/layout.tsx` — SmoothScroll wrapper
3. `src/components/ui/SmoothScroll.tsx` — **NEW** Lenis wrapper
4. `src/components/ui/FadeIn.tsx` — enhanced defaults + new props
5. `src/components/ui/AtmosphereBackground.tsx` — slower orbs + new washes
6. `src/components/ui/CtaBand.tsx` — mobile font fix
7. `src/components/Nav.tsx` — CSS class hover, mobile menu animation
8. `src/components/Footer.tsx` — mobile grid collapse
9. `src/components/home/HeroSection.tsx` — svh, headline clamp, CSS hover
10. `src/components/home/HowItWorksSection.tsx` — grid fix, arrow hide, CSS hover
11. `src/app/pricing/page.tsx` — padding fix
12. `src/app/product/page.tsx` — grid stack on mobile
13. `src/app/security/page.tsx` — grid stack on mobile
14. `src/app/faq/page.tsx` — padding fix
15. `src/app/roadmap/page.tsx` — grid + padding fix

## Constraints
- Zero copy changes
- Existing palette preserved exactly
- Existing fonts/typography preserved exactly
- All changes are additive enhancements or responsive fixes
