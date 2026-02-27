# Remove Dark Sections — All-Light Homepage Design

**Date:** 2026-02-27
**Approach:** B — Stronger Gradient Sections (alternate shade + gradient washes + visible borders)

## Summary

Convert all dark-zone sections on the homepage to light backgrounds with visual distinction via alternating base shades, radial gradient washes, and subtle glass borders. Remove SectionDivider. Zero copy changes.

---

## Color Zone Strategy

Three visual tiers on a light base:

| Tier | Base BG | Sections | Gradient Wash | Borders |
|------|---------|----------|---------------|---------|
| Neutral | `--zone-light` (#F5F0F1) | Hero, Proof, HowItWorks | none | none |
| Warm accent | `--color-bg-alt` (#EDE9EB) | Problem, SocialProof | Warm rose/amber glow | top/bottom `var(--glass-border)` |
| Cool accent | `--color-bg-alt` (#EDE9EB) | Trust | Cool slate glow | top/bottom `var(--glass-border)` |
| CTA | `--zone-light` | CtaBand | Centered accent glow | top `var(--glass-border)` |

---

## Per-Section Changes

### ProblemSection.tsx
- Background: `var(--zone-dark)` → `var(--color-bg-alt)`
- Add border-top/bottom: `1px solid var(--glass-border)`
- Gradient wash: `radial-gradient(ellipse 80% 50% at 50% 30%, rgba(190, 27, 42, 0.07) 0%, transparent 65%)`
- Text: `--zone-dark-text` → `--color-text`, `--zone-dark-text-secondary` → `--color-text-secondary`, `--zone-dark-text-muted` → `--color-text-muted`
- Glass card: dark glass → light glass (bg, border, shadow vars)
- ChatBubble: remove `dark` prop
- Keep atmospheric gradient overlays but adjust opacity for light bg

### TrustStripSection.tsx
- Background: `var(--zone-dark)` → `var(--color-bg-alt)`
- Add border-top/bottom
- Gradient wash: `radial-gradient(ellipse 70% 50% at 30% 50%, rgba(100, 116, 139, 0.07) 0%, transparent 65%)`
- Text: all `zone-dark-*` → standard light text vars
- Trust cards: dark glass → light glass
- Remove textShadow glow effects on icons/labels (no longer needed on light bg)
- Keep card hover behavior

### SocialProofSection.tsx
- Background: `var(--zone-dark)` → `var(--color-bg-alt)`
- Add border-top/bottom
- Gradient wash: `radial-gradient(ellipse 60% 50% at 60% 40%, rgba(217, 119, 57, 0.06) 0%, transparent 60%)`
- Text: all `zone-dark-*` → standard light text vars
- Phase cards: dark glass → light glass
- Status dots: stay green (#16a34a)
- Remove textShadow glow on accent links

### CtaBand.tsx
- Background: `var(--gradient-cta)` → remove, use no explicit bg (inherits `--zone-light`)
- Add accent gradient: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(190, 27, 42, 0.06) 0%, transparent 70%)`
- Add border-top: `1px solid var(--glass-border)`
- Text: `#fff` → `var(--color-text)`, `rgba(255,255,255,0.55)` → `var(--color-text-secondary)`, muted → `var(--color-text-muted)`
- Button: invert from white-on-dark to accent-on-light: bg `var(--color-accent)`, color `#fff`, add `className="btn-primary"`, remove `className="btn-secondary"`
- Social links: `rgba(255,255,255,0.35)` → `var(--color-text-muted)`, remove `link-subtle-light` → use `link-subtle`

### SectionDivider.tsx
- Remove from homepage (page.tsx does not import it, but check if it's used between sections via any wrapper)
- File can remain in codebase for potential use on other pages

### SectionLabel.tsx
- Check if it has dark-zone variants — update if needed

### ChatBubble.tsx
- Check if `dark` prop affects rendering — the `dark` prop should still work for other pages but ProblemSection no longer passes it

---

## Files Modified

1. `src/components/home/ProblemSection.tsx` — dark → warm accent light
2. `src/components/home/TrustStripSection.tsx` — dark → cool accent light
3. `src/components/home/SocialProofSection.tsx` — dark → warm accent light
4. `src/components/ui/CtaBand.tsx` — dark gradient → light with accent glow
5. `src/app/page.tsx` — remove SectionDivider imports if present

## Constraints
- Zero copy changes
- Existing palette preserved (no new colors — reuse existing vars at different opacities)
- Existing fonts/typography preserved
- All other pages unaffected
