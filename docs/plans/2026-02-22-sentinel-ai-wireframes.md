# Sentinel AI — Low-Fidelity Wireframe Design Document

**Date:** 2026-02-22
**Product:** Sentinel AI
**Scope:** Website wireframes — all 8 pages
**Status:** Approved for implementation planning

---

## Non-Negotiables (locked)

- Primary CTA everywhere: **JOIN WAITLIST** (pre-launch)
- Social proof counter: **"2,000+ already joined"** — appears at Hero, Social Proof, and Final CTA
- Hero headline (exact): **"AI Trading is faster than you are"**
- Website objective: **TRUST-FIRST funnel** — security/credibility before feature depth
- Out of scope (do NOT mention): audio parsing, image/OCR parsing, Twitter/X monitoring
- No visual design, color, font, or code in this document
- **Live pricing CTA:** NowPayments crypto checkout (replaces waitlist CTA on launch)

---

## Global Navigation

**Sticky top nav (desktop):**
Left: Logo | Center: Product · How It Works · Pricing · Security · FAQ | Right: [JOIN WAITLIST] · Discord icon

**Collapsed nav (mobile):**
Left: Logo | Right: Hamburger · [JOIN WAITLIST] (persistent small button)

**Global footer:**
Left: Logo · copyright | Center: Product / How It Works / Pricing / Security / FAQ / Roadmap / Partners | Right: Discord · Telegram · contact email

---

## A) HOME PAGE — DESKTOP

Max 8 sections. Section order (approved):

1. Hero
2. Problem Frame
3. Core Proof (Demo Cards)
4. Trust Strip
5. How It Works (compressed)
6. Social Proof
7. Roadmap Teaser
8. Final CTA

---

### Section 1 — HERO

**Layout:** 1-col centered, full-viewport height

- Headline: "AI Trading is faster than you are"
- Subline: 1–2 sentences — intelligence layer + CA reconstruction from Telegram noise
- Primary CTA: [JOIN WAITLIST] — centered below subline
- Social proof counter: "★ 2,000+ traders already joined" — directly below CTA
- Background: ambient noise → signal visual (placeholder)

**Proof artifact:** Counter badge

---

### Section 2 — PROBLEM FRAME

**Layout:** 1-col centered, narrow content column (~640px)

- Section label: "The Problem"
- Short headline: [The launch chat is a minefield]
- 3-bullet pain list:
  - Fragments posted to avoid snipers
  - Multiple CAs, no instructions
  - Links to links — the CA is buried
- Proof artifact: 1 illustrative "hostile message" chat bubble (raw format, placeholder content)

**CTA placement:** None

---

### Section 3 — CORE PROOF (DEMO CARDS)

**Layout:** 3-col grid top row (3 cards) + 2-col grid bottom row (2 cards)

- Section label: "What Sentinel handles"
- 5 demo cards — each: input chat bubble → arrow → output (clean CA or BLOCKED)

| Card | Input | Output |
|---|---|---|
| Fragment Reconstruction | 9-char fragment | Full CA, < 500ms |
| Multi-CA + Ordinal | 2 CAs + "buy the second" | CA #2 forwarded |
| Warning Filter | CA + "DO NOT BUY" context | BLOCKED ✗ |
| Website Link | URL in message | CA extracted from page |
| Telegram Link (t.me) | t.me link | Auto-joined, CA found |

- Bottom of section: "See all capabilities →" (text link to Product page)

**Proof artifact:** 5 before/after demo cards

---

### Section 4 — TRUST STRIP

**Layout:** 1-col, horizontal 4-item strip (full-width band)

- 4 trust badges:
  - 🔒 Client-side only
  - ⛔ No wallet access
  - 🚫 No server credential storage
  - 🛡 Non-custodial
- "Learn more →" text link to Security page

**Proof artifact:** Trust badges

---

### Section 5 — HOW IT WORKS (COMPRESSED)

**Layout:** 1-col, horizontal 4-step flow with icons

- Section label: "Setup in ~10 minutes"
- Step 1: Install — Install from Chrome Web Store
- Step 2: Connect Telegram — API ID + Hash + phone
- Step 3: Pick chats + forwarding target
- Step 4: Done — Sentinel runs automatically
- "Full setup guide →" text link to How It Works page

**Proof artifact:** Step visualization (4-step horizontal icon flow)

---

### Section 6 — SOCIAL PROOF

**Layout:** 1-col header + 3-col testimonial card grid

- Counter (repeated): "★ 2,000+ traders already joined"
- 3 testimonial cards: [Avatar] · @handle · "Quote placeholder"
- Discord CTA: "Join the community →"

**Proof artifact:** Counter + testimonial cards

---

### Section 7 — ROADMAP TEASER

**Layout:** 2-col horizontal split

- Left panel: "PHASE 1 — LIVE ✓" — CA reconstruction, filtering, forwarding
- Right panel: "PHASE 2 — COMING" — Bot integration (no dates, no timeline)
- "Follow the roadmap →" text link

**Proof artifact:** Phase 1 feature list

---

### Section 8 — FINAL CTA

**Layout:** 1-col, full-width dark band

- 1-line closing statement (placeholder)
- [JOIN WAITLIST] — primary CTA, centered
- "★ 2,000+ already joined" — counter below button

---

## B) HOME PAGE — MOBILE

All sections collapse to 1-col. Key layout changes:

- **Trust Strip:** 1-col stacked list (icon left + label right) — not horizontal row
- **Demo Cards:** Full-width stacked vertically (no carousel; 5 cards scroll)
- **Steps:** Vertical 1-col stack with connector line
- **Testimonials:** Single-col stacked cards (3 visible)
- **Roadmap:** Phase 1 full-width, Phase 2 full-width, stacked vertically
- Hero subline: condensed to 2 lines max
- All CTAs: full-width buttons

---

## C) PRODUCT PAGE

**Purpose:** Technical depth + edge case proof for Segments B, C.
**Primary CTA:** [JOIN WAITLIST]

### Sections (top → bottom)

1. **Page Hero** — 1-col centered
   - "Intelligence, not execution."
   - 1-line subline
   - [JOIN WAITLIST]

2. **System Pipeline** — 1-col horizontal flow diagram
   - DETECTION → RECONSTRUCTION → FILTERING → FORWARDING
   - 4 labeled boxes with arrows, 2-bullet description per box
   - Proof: Architecture diagram

3. **Supported Message Patterns** — 5-card grid (expanded with technical explanation)
   - Same 5 patterns as Home Section 3 — expanded with 1-sentence technical explanation per card
   - Proof: Detailed demo cards

4. **Performance Metrics** — 4-stat horizontal band
   - ≥97% Precision · ≥90% Recall · <500ms Detection · <3% False Block Rate
   - Definitions in small print
   - Proof: Benchmark stats

5. **Configuration Options** — 2-col (feature label + description)
   - Source selection · Ordinal handling · Warning filter toggle · Forwarding destination

6. **Page CTA** — 1-col band
   - [JOIN WAITLIST] · "★ 2,000+ already joined"

---

## D) HOW IT WORKS PAGE

**Purpose:** Reduce setup friction; transform evaluators into activators.
**Primary CTA:** [JOIN WAITLIST]

### Sections (top → bottom)

1. **Page Hero** — 1-col
   - "Setup in ~10 minutes."
   - Subline: step by step, then it runs itself
   - [JOIN WAITLIST]

2. **5-Step Onboarding Flow** — 1-col vertical (numbered)
   - Step 1: Install from Chrome Web Store [screenshot placeholder]
   - Step 2: Enter API ID, API Hash, phone number [screenshot + inline mini-guide: how to get Telegram API credentials from my.telegram.org]
   - Step 3: Enter one-time Telegram auth code [screenshot placeholder]
   - Step 4: Select chats to monitor + forwarding destination [screenshot placeholder]
   - Step 5: Activate — Sentinel is live [screenshot placeholder]
   - Proof: Annotated screenshots per step

3. **Daily Workflow Visual** — 1-col horizontal flow
   - Launch message → Sentinel detects + reconstructs → Filter check → Clean CA forwarded → Bot executes
   - Proof: End-to-end pipeline visualization

4. **Common Questions Mini-FAQ** — Accordion
   - "How do I change my forwarding target?"
   - "Can I monitor multiple chats at once?"
   - "What happens if the extension loses connection?"
   - "Do I need to keep the browser open?"

5. **Page CTA** — [JOIN WAITLIST] · "★ 2,000+ already joined"

---

## E) PRICING PAGE

**Purpose:** Show tiers, collect waitlist signups. No checkout flow in pre-launch mode.
**Pre-launch CTA:** [JOIN WAITLIST]
**Live CTA (on launch):** [Subscribe — NowPayments crypto checkout]

### Sections (top → bottom)

1. **Page Hero** — 1-col centered
   - "One subscription. Three tiers. SOL-denominated."
   - Subline: pricing is simple — join the waitlist now
   - "★ 2,000+ already joined"

2. **Pricing Table** — 3-col card grid
   - Monthly: 1 SOL / month · [JOIN WAITLIST]
   - Quarterly ★ MOST POPULAR: 2 SOL / quarter · (0.67 SOL/mo) · Save 33% · [JOIN WAITLIST]
   - Annual: 5 SOL / year · (0.42 SOL/mo) · Save 58% · [JOIN WAITLIST]
   - Quarterly card: highlighted border + "Most Popular" badge
   - Proof: Effective monthly rate calculation per tier

3. **Setup Preview Strip** — 1-col info band
   - After joining: Install → Set up in 10 min → First CA in <10 min

4. **Objection Strip** — 3-col mini-cards
   - "Cancel anytime on monthly"
   - "No wallet access required beyond payment"
   - "SOL-denominated: pay with Phantom / Solflare"

5. **Referral Callout** — 1-col centered band
   - "Refer a trader, earn subscription credits."
   - [JOIN WAITLIST to unlock referral link]

6. **Page CTA** — [JOIN WAITLIST] · "★ 2,000+ already joined"

---

## F) SECURITY / TRUST PAGE

**Purpose:** Eliminate the security objection entirely.
**Primary CTA:** None — link back to [JOIN WAITLIST] after trust established.

### Sections (top → bottom)

1. **Page Hero** — 1-col
   - "Client-side. Non-custodial. No hidden reach."
   - Subline: this page explains exactly what Sentinel can and cannot do

2. **What We Do / What We Don't Do Table** — 2-col full-width table

| WHAT SENTINEL DOES | WHAT SENTINEL DOES NOT DO |
|---|---|
| Reads Telegram messages from chats you select | Store credentials on any server |
| Extracts + reconstructs Solana contract addresses | Access your Solana wallet |
| Forwards clean CAs to a target you define | Execute trades |
| Runs in your browser, locally | Have custody of any assets |
| Uses Telegram's official MTProto API | Send your data to external servers |

   - Proof: Explicit trust table

3. **Architecture Explanation** — 1-col prose + inline diagram
   - "Your Telegram session lives in your browser."
   - Plain-language MTProto explanation
   - Diagram: Your machine → Telegram API (MTProto) — no Sentinel server in the chain
   - Proof: No-server path architecture diagram

4. **Chrome Permissions Table** — 2-col table
   - Permission name | Why it's needed
   - All actual permissions listed with plain-language justification
   - Proof: Full transparency on browser permissions

5. **Solana Wallet Isolation Callout** — 1-col highlighted box
   - "Sentinel has zero connection to your Solana wallet or private keys. It does not request wallet access. It does not sign transactions."

6. **Data Policy Summary** — 1-col bullet list
   - What is logged locally vs. what is not transmitted
   - How to wipe local data

7. **Link Back to Waitlist** — [JOIN WAITLIST]

---

## G) FAQ PAGE

**Purpose:** Long-tail objection handling. Reduce support volume.

### Sections (top → bottom)

1. **Page Hero** — 1-col
   - "Common Questions"
   - Subline: if you don't find your answer, join our Discord

2. **FAQ Accordion (5 clusters)**

   **Security**
   - Is my Telegram session safe?
   - Can Sentinel access my wallet?
   - What happens if the extension is updated?
   - Is Sentinel open source?

   **Reconstruction Accuracy**
   - How short a fragment can Sentinel reconstruct?
   - What is the false positive rate on CA extraction?
   - What is the false block rate on warning filtering?
   - Can I customize warning keywords?

   **Setup**
   - Where do I get my Telegram API ID and Hash?
   - Do I need to keep the browser open?
   - Can I monitor multiple chats?
   - What forwarding destinations are supported?

   **Pricing**
   - Can I cancel my subscription?
   - Can I upgrade from monthly to annual?
   - How does SOL-denominated payment work?
   - What wallets are supported for payment?

   **Compatibility**
   - Which execution bots does Sentinel work with?
   - Does Sentinel work with Discord?
   - What Telegram chat types are supported?

3. **Still Have Questions** — 1-col
   - "Not answered here? Ask in our Discord."
   - [Join Discord] · [Contact Us]

---

## H) PARTNERS PAGE

**Purpose:** KOL + group admin partnership inquiry.
**Primary CTA:** [Submit Partnership Inquiry]

### Sections (top → bottom)

1. **Page Hero** — 1-col centered
   - "Partner with Sentinel AI"
   - Subline: referral program, proof assets, and priority access for KOLs and trading communities
   - [Submit Partnership Inquiry]

2. **Partnership Value Prop** — 3-col cards
   - Referral Credits: earn subscription credits per referred subscriber
   - Proof Assets: demo videos, GIF demos of edge cases for your audience
   - Priority Access: early features, direct team contact, feedback loop

3. **Proof Assets Preview** — 2-col (description left, asset placeholder right)
   - Fragment reconstruction GIF demo
   - Multi-CA ordinal resolution demo
   - Warning filter demo
   - Full product walkthrough video (placeholder)
   - One-pager PDF (placeholder)

4. **Partnership Inquiry Form** — 1-col form (~480px)
   - Name / Handle [text]
   - Telegram handle [text]
   - Community type [dropdown: KOL / Trading group / Developer / Other]
   - Community size [dropdown: <500 / 500–5K / 5K–50K / 50K+]
   - What interests you [textarea]
   - [Submit Inquiry]

5. **Trust Note for Partners** — 1-col callout
   - "Sentinel is non-custodial and client-side. Review our Security page before reaching out."
   - [Security page link]

---

## Decisions Locked in This Document

| Decision | Choice |
|---|---|
| Trust strip position on HOME | Section 4 (after Demo Cards) |
| Pricing live CTA | NowPayments crypto checkout |
| Pre-launch CTA everywhere | JOIN WAITLIST |
| Social proof counter | "2,000+ already joined" |
| Hero headline | "AI Trading is faster than you are" |
| Max HOME sections | 8 |
| HOME section order | Hero → Problem → Core Proof → Trust Strip → How It Works → Social Proof → Roadmap Teaser → Final CTA |
