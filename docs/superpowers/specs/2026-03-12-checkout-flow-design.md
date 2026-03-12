# Checkout Flow — Design Spec

**Date:** 2026-03-12
**Status:** Reviewed
**Context:** Sentinel AI website 2.0 is in private beta. Public users see "Apply for Access" on pricing. This spec adds a hidden dev-only checkout path for internal testing, plus the full checkout route structure.

---

## Objective

Build the checkout frontend as a shell that can later connect to the backend payment flow. The public pricing experience stays unchanged. A hidden dev trigger on `/pricing` gives the team access to the checkout flow during development.

---

## Plan IDs & Pricing

| ID | Label | Price | Period | Effective | Savings |
|---|---|---|---|---|---|
| `monthly` | Monthly | 1 SOL | / month | — | — |
| `quarterly` | Quarterly | 2 SOL | / quarter | 0.67 SOL / mo | 33% |
| `annual` | Annual | 5 SOL | / year | 0.42 SOL / mo | 58% |

Price is denominated in SOL. Users can pay with any cryptocurrency — NOWPayments handles currency conversion on their hosted payment page. The `payCurrency` parameter sent to NOWPayments is always `"SOL"` (what we receive), but the NOWPayments UI lets the buyer choose their preferred crypto to pay with. No changes needed to the existing `nowpayments.ts` types.

The `tiers` array currently defined in `/pricing/page.tsx` will be extracted to `src/lib/checkout.ts` so both the pricing page and checkout page share the same data.

### Plan Type Definition

```typescript
interface Plan {
  id: "monthly" | "quarterly" | "annual";
  label: string;
  price: string;        // e.g. "2 SOL"
  priceAmount: number;   // e.g. 2 (numeric, for API calls)
  period: string;        // e.g. "/ quarter"
  effective: string | null;  // e.g. "0.67 SOL / mo"
  save: string | null;       // e.g. "Save 33%"
  popular: boolean;     // drives "Most Popular" badge on pricing page only
}

type PlanId = Plan["id"];
const VALID_PLAN_IDS: PlanId[] = ["monthly", "quarterly", "annual"];
```

The `popular` field is consumed by the pricing page for the badge styling. The checkout page ignores it — the checkout plan summary card does not show a "Most Popular" badge.

---

## Architecture

### Route Structure

```
/pricing                    (existing, unchanged for public users)
  └── <DevCheckoutTrigger>  (renders only when NEXT_PUBLIC_CHECKOUT_ENABLED=true)

/checkout                   (new, guarded)
/checkout/success           (new)
/checkout/cancel            (new)
```

### New Files

| File | Type | Purpose |
|---|---|---|
| `src/lib/checkout.ts` | Shared module | Plan data (`PLANS`), `VALID_PLAN_IDS`, `createCheckoutOrder()` placeholder, `CheckoutOrder` type |
| `src/lib/guards.ts` | Shared module | `checkCheckoutAccess()` — server-side env flag check, structured for future auth/role checks |
| `src/components/checkout/DevCheckoutTrigger.tsx` | Client component | Hidden gear button + password gate + plan selector popover |
| `src/app/checkout/page.tsx` | Page (server) | Route guard + plan validation, delegates to `CheckoutForm` |
| `src/components/checkout/CheckoutForm.tsx` | Client component | Email input, plan summary, "Continue to Payment" button, loading/error states |
| `src/app/checkout/success/page.tsx` | Page | Payment initiated confirmation |
| `src/app/checkout/cancel/page.tsx` | Page | Checkout canceled state |

### Modified Files

| File | Change |
|---|---|
| `src/app/pricing/page.tsx` | Import `tiers` from `src/lib/checkout.ts` instead of defining inline. Add `<DevCheckoutTrigger />` at end of page. |
| `.env.local` | Add `NEXT_PUBLIC_CHECKOUT_ENABLED=true` and `CHECKOUT_ENABLED=true` |

---

## Feature Flag

Two environment variables:

- **`NEXT_PUBLIC_CHECKOUT_ENABLED`** — Client-side. Controls whether the dev trigger button renders on the pricing page. Set to `"true"` to enable.
- **`CHECKOUT_ENABLED`** — Server-side. Guards the `/checkout` route itself. Even if someone discovers the URL, they can't access checkout without this flag set to `"true"` on the server.

In production (Vercel), both are unset or `"false"` — checkout is invisible and inaccessible. During development, both are `"true"` in `.env.local`.

---

## Dev Checkout Trigger

### Component: `DevCheckoutTrigger`

**Location:** Bottom-right corner of the pricing page. Uses `position: absolute` within the pricing page's `<main>` element (not `position: fixed`) to avoid conflicts with the root layout's `overflow: clip` container. The pricing page's `<main>` should have `position: relative` to act as the positioning anchor.

**Render condition:** Only renders when `process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true"`.

**Appearance:** 28px semi-transparent gear icon (`opacity: 0.25`), nearly invisible to regular users. Subtle border, rounded corners, blends into the page background.

**Interaction flow:**

1. **Click gear icon** → small popover appears anchored to the button
2. **Password prompt** — single input field asking for a password
3. **User enters `1234`** → password field is replaced by the plan selector
4. **Plan selector** — 3 compact rows (Monthly / 1 SOL, Quarterly / 2 SOL, Annual / 5 SOL)
5. **Click a plan** → redirect to `/checkout?plan={id}`
6. **Click outside popover** → closes it

The password is a simple client-side check (not security — just a gate to prevent accidental clicks). The real protection is the server-side `CHECKOUT_ENABLED` env var on the checkout route.

---

## Checkout Page — `/checkout`

### Server/Client Split

`src/app/checkout/page.tsx` is a **Server Component**. It runs the route guard and validates the plan query parameter. If checks pass, it renders `<CheckoutForm plan={plan} />`, which is a **Client Component** handling the interactive form (email input, button state, API call, error handling).

This split is required because Next.js `redirect()` can only be called from Server Components, while the form needs client-side interactivity.

### Route Guard

Before rendering, `checkCheckoutAccess()` runs:

1. Is `CHECKOUT_ENABLED === "true"`? → No → redirect to `/pricing`
2. _(Future: is user authenticated? → No → redirect to /login)_
3. _(Future: is email verified? → No → redirect to /verify)_
4. _(Future: is user on allowlist? → No → redirect to /pricing)_

Currently only step 1 is implemented. Steps 2-4 are commented placeholders in `guards.ts`.

### Query Parameter

Reads `plan` from the URL query string. Validates against `VALID_PLAN_IDS` (`monthly`, `quarterly`, `annual`). If missing or invalid, redirects to `/pricing`.

### UI Layout

Single-column, max-width 520px, centered. Sections top to bottom:

1. **Back link** — "← Back to pricing" mono link to `/pricing`
2. **Section label** — Use the `<SectionLabel>` component from `src/components/ui/SectionLabel.tsx` with text "CHECKOUT"
3. **Heading** — "CONFIRM YOUR PLAN" in display font
4. **Subline** — "Enter your email, review your plan, and continue to payment."
5. **Plan summary card** — glassmorphic card showing:
   - Plan label + price (large, brand red)
   - Period
   - Effective price and savings (if applicable, green mono text)
6. **Includes grid** — 2-column checklist of features:
   - Real-time CA scraping
   - Fragment reconstruction
   - Multi-CA detection
   - Bot auto-forwarding
   - Spam filtering
   - Priority support
7. **Email input** — labeled "Your Email", placeholder `you@example.com`, helper text: "Your license will be linked to this email. Use the same email to log in." Required field with email validation.
8. **Payment method strip** — centered row: "Pay with any crypto · Price in SOL · via NOWPayments"
9. **CTA button** — full-width, brand red: "CONTINUE TO PAYMENT →"
10. **Fine print** — "You'll be redirected to NOWPayments to complete your purchase. Your license will be activated after payment confirmation."
11. **Trust strip** — 3 items in bracket notation: `[ local ] Client-side only`, `[ ø ] No wallet access`, `[ ✓ ] Non-custodial`

### Button Click Logic

1. Validate email is provided and is a valid email format
2. Show loading state on button ("Processing...")
3. Call `createCheckoutOrder({ planId, email })` from `src/lib/checkout.ts`
4. On success: receive `{ orderId, paymentUrl }` → redirect to `paymentUrl`
5. On error: show inline error message below the button

### `createCheckoutOrder()` — Placeholder

```typescript
interface CreateCheckoutOrderParams {
  planId: "monthly" | "quarterly" | "annual";
  email: string;
}

interface CheckoutOrder {
  orderId: string;
  paymentUrl: string;
}

async function createCheckoutOrder(
  params: CreateCheckoutOrderParams
): Promise<CheckoutOrder> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) throw new Error("Failed to create checkout order");
  return res.json();
}
```

The `/api/checkout` route does not exist yet. This abstraction keeps the frontend clean — when the backend is built, the API route will:
1. Create/find user account by email
2. Call NOWPayments `createInvoice()` (already in `src/lib/nowpayments.ts`)
3. Return `{ orderId, paymentUrl: invoice_url }`

---

## Success Page — `/checkout/success`

Minimal confirmation shell. No backend logic yet.

### UI

1. **Section label** — "PAYMENT"
2. **Heading** — "PAYMENT INITIATED"
3. **Message** — "Your payment is being processed. Once confirmed, your license will be generated and linked to your account."
4. **Info card** — Shows plan and email. Before redirecting to NOWPayments, the checkout form stores `{ planId, email }` in `sessionStorage` under the key `"sentinel_checkout"`. The success page reads from `sessionStorage` on mount and clears it after reading. This avoids depending on NOWPayments passing custom query params back.
5. **Note** — "This usually takes a few minutes. You'll receive a confirmation email."
6. **Button** — "Back to Pricing" linking to `/pricing` (later: "Go to Dashboard")

---

## Cancel Page — `/checkout/cancel`

### UI

1. **Section label** — "CHECKOUT"
2. **Heading** — "CHECKOUT CANCELED"
3. **Message** — "No payment was processed. You can try again anytime."
4. **Button** — "Back to Pricing" linking to `/pricing`

---

## Styling Approach

All new components follow the existing site patterns:

- **Inline CSS with CSS custom properties** — no Tailwind utility classes
- **`var(--font-display)`** for headings, **`var(--font-mono)`** for labels, **`var(--font-body)`** for body text
- **Brand red `var(--color-accent)`** for accent elements
- **Glassmorphic cards** — `var(--glass-bg-strong)`, `backdrop-filter: blur(var(--glass-blur))`, `var(--shadow-glass)`
- **Hover states via `useState`** + `onMouseEnter/onMouseLeave` (matching existing pattern)
- **`FadeIn` wrapper** for scroll-reveal on checkout page sections
- **Bracket notation** `[ label ]` for trust indicators (matching `TrustStripSection`)

---

## Security Summary

| Layer | Mechanism | Purpose |
|---|---|---|
| Client visibility | `NEXT_PUBLIC_CHECKOUT_ENABLED` env var | Dev trigger button only renders when flag is true |
| Client gate | Password prompt (`1234`) | Prevents accidental activation, not real security |
| Server access | `CHECKOUT_ENABLED` env var in `checkCheckoutAccess()` | Blocks `/checkout` route entirely when flag is off |
| Future: auth | Placeholder in `guards.ts` | Will check user session/JWT |
| Future: email verification | Placeholder in `guards.ts` | Will verify email before allowing payment |
| Future: allowlist | Placeholder in `guards.ts` | Will check user role or allowlist |

---

## Out of Scope

- Backend API route (`/api/checkout`) — frontend uses placeholder abstraction
- NOWPayments webhook handling
- License generation via Rust API
- User authentication system
- Email verification flow
- Dashboard / account pages
