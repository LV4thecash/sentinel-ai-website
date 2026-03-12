# Checkout Flow Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hidden dev-only checkout entry to the pricing page and build the `/checkout`, `/checkout/success`, and `/checkout/cancel` route shells.

**Architecture:** Server Component checkout page runs route guards and validates plan query param, then delegates to a Client Component `CheckoutForm` for interactivity. A `DevCheckoutTrigger` client component on the pricing page (gated by env var + password) provides the hidden entry point. Shared plan data and checkout API abstraction live in `src/lib/checkout.ts`.

**Tech Stack:** Next.js 15 (App Router), TypeScript, inline CSS with CSS custom properties, Motion.js (FadeIn), NOWPayments integration placeholder.

**Spec:** `docs/superpowers/specs/2026-03-12-checkout-flow-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/lib/checkout.ts` | Create | `Plan` type, `PLANS` array, `VALID_PLAN_IDS`, `createCheckoutOrder()` placeholder |
| `src/lib/guards.ts` | Create | `checkCheckoutAccess()` — server-side env flag check |
| `src/components/checkout/DevCheckoutTrigger.tsx` | Create | Hidden gear button + password gate + plan selector popover |
| `src/components/checkout/CheckoutForm.tsx` | Create | Email input, plan summary, CTA button, loading/error states |
| `src/app/checkout/page.tsx` | Create | Server Component: route guard, plan validation, renders `CheckoutForm` |
| `src/app/checkout/success/page.tsx` | Create | Payment initiated confirmation shell |
| `src/app/checkout/cancel/page.tsx` | Create | Checkout canceled shell |
| `src/app/pricing/page.tsx` | Modify | Import `PLANS` from checkout.ts, remove inline `tiers`, add `DevCheckoutTrigger`, add `position: relative` to `<main>` |
| `.env.local` | Create | `NEXT_PUBLIC_CHECKOUT_ENABLED=true` and `CHECKOUT_ENABLED=true` |

---

## Chunk 1: Shared Data & Guards

### Task 1: Create `src/lib/checkout.ts`

**Files:**
- Create: `src/lib/checkout.ts`

- [ ] **Step 1: Create the shared checkout module**

```typescript
// src/lib/checkout.ts

export interface Plan {
  id: "monthly" | "quarterly" | "annual";
  label: string;
  price: string;
  priceAmount: number;
  period: string;
  effective: string | null;
  save: string | null;
  popular: boolean;
}

export type PlanId = Plan["id"];

export const PLANS: Plan[] = [
  {
    id: "monthly",
    label: "Monthly",
    price: "1 SOL",
    priceAmount: 1,
    period: "/ month",
    effective: null,
    save: null,
    popular: false,
  },
  {
    id: "quarterly",
    label: "Quarterly",
    price: "2 SOL",
    priceAmount: 2,
    period: "/ quarter",
    effective: "0.67 SOL / mo",
    save: "Save 33%",
    popular: true,
  },
  {
    id: "annual",
    label: "Annual",
    price: "5 SOL",
    priceAmount: 5,
    period: "/ year",
    effective: "0.42 SOL / mo",
    save: "Save 58%",
    popular: false,
  },
];

export const VALID_PLAN_IDS: PlanId[] = ["monthly", "quarterly", "annual"];

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

// --- Checkout API abstraction ---

export interface CreateCheckoutOrderParams {
  planId: PlanId;
  email: string;
}

export interface CheckoutOrder {
  orderId: string;
  paymentUrl: string;
}

export async function createCheckoutOrder(
  params: CreateCheckoutOrderParams
): Promise<CheckoutOrder> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`Checkout failed: ${text}`);
  }

  return res.json();
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors related to `src/lib/checkout.ts`

- [ ] **Step 3: Commit**

```bash
git add src/lib/checkout.ts
git commit -m "feat: add shared checkout plan data and API abstraction"
```

---

### Task 2: Create `src/lib/guards.ts`

**Files:**
- Create: `src/lib/guards.ts`

- [ ] **Step 1: Create the route guard module**

```typescript
// src/lib/guards.ts

/**
 * Server-side checkout access check.
 * Currently only checks the CHECKOUT_ENABLED env var.
 * Structured for future auth/role/allowlist checks.
 *
 * Returns { allowed: true } or { allowed: false, redirect: string }.
 */
export function checkCheckoutAccess(): {
  allowed: boolean;
  redirect?: string;
} {
  // Gate 1: Feature flag
  if (process.env.CHECKOUT_ENABLED !== "true") {
    return { allowed: false, redirect: "/pricing" };
  }

  // Gate 2 (future): Authentication
  // if (!session?.user) {
  //   return { allowed: false, redirect: "/login" };
  // }

  // Gate 3 (future): Email verification
  // if (!session.user.emailVerified) {
  //   return { allowed: false, redirect: "/verify" };
  // }

  // Gate 4 (future): Allowlist / role check
  // if (!isAllowlisted(session.user.email)) {
  //   return { allowed: false, redirect: "/pricing" };
  // }

  return { allowed: true };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors related to `src/lib/guards.ts`

- [ ] **Step 3: Commit**

```bash
git add src/lib/guards.ts
git commit -m "feat: add checkout route guard with feature flag"
```

---

### Task 3: Create `.env.local`

**Files:**
- Create: `.env.local`

- [ ] **Step 1: Create `.env.local`**

```
# Checkout feature flags (dev only)
NEXT_PUBLIC_CHECKOUT_ENABLED=true
CHECKOUT_ENABLED=true
```

- [ ] **Step 2: Verify `.env.local` is gitignored**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && git status`
Expected: `.env.local` should NOT appear in untracked files (`.env*` is already in `.gitignore`)

No commit needed — `.env.local` is gitignored.

---

### Task 4: Update pricing page to use shared plan data

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: Replace inline `tiers` with import from `checkout.ts`**

In `src/app/pricing/page.tsx`:
- Remove the `const tiers = [...]` block (lines 5-33)
- Add import: `import { PLANS } from "@/lib/checkout";`
- Replace all references to `tiers` with `PLANS`
- Specifically: line 103 `{tiers.map((t) => {` becomes `{PLANS.map((t) => {`

- [ ] **Step 2: Add `position: relative` to `<main>`**

Change `<main>` (line 45) to:
```tsx
<main style={{ position: "relative" }}>
```

This is needed so `DevCheckoutTrigger` can use `position: absolute` relative to the page.

- [ ] **Step 3: Verify the pricing page still renders**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build 2>&1 | tail -20`
Expected: Build succeeds, `/pricing` page compiles without errors

- [ ] **Step 4: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "refactor: extract pricing tiers to shared checkout module"
```

---

## Chunk 2: Dev Checkout Trigger

### Task 5: Create `DevCheckoutTrigger` component

**Files:**
- Create: `src/components/checkout/DevCheckoutTrigger.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/checkout/DevCheckoutTrigger.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PLANS } from "@/lib/checkout";

const DEV_PASSWORD = "1234";

export function DevCheckoutTrigger() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click — hooks must be before any early return
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setPassword("");
        setAuthenticated(false);
        setError(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Don't render if feature flag is off
  if (process.env.NEXT_PUBLIC_CHECKOUT_ENABLED !== "true") {
    return null;
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === DEV_PASSWORD) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  function handlePlanClick(planId: string) {
    router.push(`/checkout?plan=${planId}`);
  }

  return (
    <div
      ref={popoverRef}
      style={{
        position: "absolute",
        bottom: 16,
        right: 16,
        zIndex: 50,
      }}
    >
      {/* Gear trigger button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 12,
          color: "var(--color-text-muted)",
          opacity: 0.4,
          padding: 0,
          lineHeight: 1,
        }}
        aria-label="Dev checkout"
      >
        ⚙
      </button>

      {/* Popover */}
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 0,
            width: 220,
            background: "var(--color-surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--glass-border-hi)",
            boxShadow: "var(--shadow-lg)",
            padding: 16,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: 12,
            }}
          >
            Internal Checkout
          </div>

          {!authenticated ? (
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Password"
                autoFocus
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: `1px solid ${error ? "var(--color-block)" : "var(--color-border)"}`,
                  borderRadius: 8,
                  fontSize: 13,
                  background: "var(--color-bg-alt)",
                  color: "var(--color-text)",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "var(--font-mono)",
                }}
              />
              {error && (
                <p
                  style={{
                    fontSize: "0.6rem",
                    color: "var(--color-block)",
                    marginTop: 4,
                    marginBottom: 0,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Wrong password
                </p>
              )}
            </form>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handlePlanClick(plan.id)}
                  style={{
                    padding: "10px 12px",
                    border: "1px solid var(--glass-border)",
                    borderRadius: 10,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 12,
                    background: "transparent",
                    color: "var(--color-text)",
                    fontFamily: "inherit",
                    textAlign: "left",
                    width: "100%",
                    transition:
                      "border-color var(--motion-fast) ease, background var(--motion-fast) ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--color-accent)";
                    e.currentTarget.style.background =
                      "var(--color-accent-lo)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--glass-border)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{plan.label}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {plan.price}
                  </span>
                </button>
              ))}
              <div
                style={{
                  marginTop: 4,
                  fontSize: "0.55rem",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-mono)",
                  textAlign: "center",
                  letterSpacing: "0.03em",
                }}
              >
                click a plan to proceed
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/checkout/DevCheckoutTrigger.tsx
git commit -m "feat: add hidden dev checkout trigger for pricing page"
```

---

### Task 6: Add `DevCheckoutTrigger` to pricing page

**Depends on:** Task 5 (DevCheckoutTrigger component must exist)

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: Import and render `DevCheckoutTrigger`**

Add import at the top of `src/app/pricing/page.tsx`:
```tsx
import { DevCheckoutTrigger } from "@/components/checkout/DevCheckoutTrigger";
```

Add `<DevCheckoutTrigger />` just before the closing `</main>` tag (before line 361 in the original file, after the Referral section's closing `</section>`):
```tsx
      <DevCheckoutTrigger />
    </main>
```

- [ ] **Step 2: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 3: Manual smoke test**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run dev`
- Visit `http://localhost:3000/pricing`
- Confirm the tiny gear icon appears in the bottom-right corner
- Click it → password prompt appears
- Enter `1234` → plan selector appears
- Click a plan → navigates to `/checkout?plan=<id>` (will 404 for now, that's expected)

- [ ] **Step 4: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat: wire up dev checkout trigger on pricing page"
```

---

## Chunk 3: Checkout Page

### Task 7: Create `CheckoutForm` client component

**Files:**
- Create: `src/components/checkout/CheckoutForm.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/checkout/CheckoutForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { type Plan, createCheckoutOrder } from "@/lib/checkout";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

const FEATURES = [
  "Real-time CA scraping",
  "Fragment reconstruction",
  "Multi-CA detection",
  "Bot auto-forwarding",
  "Spam filtering",
  "Priority support",
];

interface CheckoutFormProps {
  plan: Plan;
}

export function CheckoutForm({ plan }: CheckoutFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [btnHover, setBtnHover] = useState(false);

  async function handleSubmit() {
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const order = await createCheckoutOrder({
        planId: plan.id,
        email,
      });

      // Store in sessionStorage for success page (after API succeeds)
      sessionStorage.setItem(
        "sentinel_checkout",
        JSON.stringify({ planId: plan.id, email })
      );

      // Redirect to payment
      window.location.href = order.paymentUrl;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 520,
        margin: "0 auto",
        padding: "3rem clamp(1.25rem, 5vw, 2rem)",
      }}
    >
      {/* Back link */}
      <FadeIn>
        <Link
          href="/pricing"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.05em",
            color: "var(--color-text-muted)",
            textDecoration: "none",
            marginBottom: "2rem",
          }}
        >
          ← Back to pricing
        </Link>
      </FadeIn>

      {/* Header */}
      <FadeIn delay={0.05}>
        <SectionLabel>Checkout</SectionLabel>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
            fontWeight: 800,
            letterSpacing: "0.03em",
            color: "var(--color-text)",
            margin: "0 0 0.5rem 0",
            lineHeight: 1,
          }}
        >
          CONFIRM YOUR PLAN
        </h1>
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
            margin: "0 0 2rem 0",
            lineHeight: 1.5,
          }}
        >
          Enter your email, review your plan, and continue to payment.
        </p>
      </FadeIn>

      {/* Plan summary card */}
      <FadeIn delay={0.1}>
        <div
          style={{
            background: "var(--glass-bg-strong)",
            backdropFilter: "blur(var(--glass-blur))",
            WebkitBackdropFilter: "blur(var(--glass-blur))",
            border: "1px solid var(--glass-border)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-glass)",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: 4,
                }}
              >
                Selected Plan
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  letterSpacing: "0.02em",
                  fontFamily: "var(--font-display)",
                }}
              >
                {plan.label}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "var(--color-accent)",
                  lineHeight: 1,
                  fontFamily: "var(--font-display)",
                }}
              >
                {plan.price}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-text-muted)",
                }}
              >
                {plan.period}
              </div>
            </div>
          </div>
          {(plan.effective || plan.save) && (
            <div
              style={{
                borderTop: "1px solid var(--glass-border)",
                paddingTop: "0.75rem",
                display: "flex",
                gap: "1rem",
              }}
            >
              {plan.effective && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-pass)",
                  }}
                >
                  {plan.effective}
                </span>
              )}
              {plan.save && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-pass)",
                  }}
                >
                  {plan.save}
                </span>
              )}
            </div>
          )}
        </div>
      </FadeIn>

      {/* Features grid */}
      <FadeIn delay={0.15}>
        <div
          style={{
            background: "var(--color-bg-alt)",
            border: "1px solid var(--glass-border)",
            borderRadius: "var(--radius-md)",
            padding: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: 10,
            }}
          >
            Includes
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 6,
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    color: "var(--color-pass)",
                    fontSize: "0.65rem",
                  }}
                >
                  ✓
                </span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Email input */}
      <FadeIn delay={0.2}>
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: 8,
            }}
          >
            Your Email
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              border: `1px solid ${error ? "var(--color-block)" : "var(--color-border)"}`,
              borderRadius: "var(--radius-sm)",
              fontSize: 14,
              color: "var(--color-text)",
              background: "var(--color-bg-alt)",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
              transition: "border-color var(--motion-fast) ease",
            }}
          />
          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--color-text-muted)",
              marginTop: 6,
              marginBottom: 0,
            }}
          >
            Your license will be linked to this email. Use the same email to
            log in.
          </p>
        </div>
      </FadeIn>

      {/* Payment method strip */}
      <FadeIn delay={0.25}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "0.75rem",
            background: "rgba(0, 0, 0, 0.02)",
            borderRadius: "var(--radius-sm)",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Pay with any crypto
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              color: "var(--color-text-muted)",
            }}
          >
            ·
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Price in SOL
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              color: "var(--color-text-muted)",
            }}
          >
            ·
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            via NOWPayments
          </span>
        </div>
      </FadeIn>

      {/* CTA button — no btn-primary class here to avoid !important hover conflict with loading state */}
      <FadeIn delay={0.3}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            width: "100%",
            padding: "1rem",
            background: loading
              ? "var(--color-text-muted)"
              : btnHover
                ? "var(--color-accent-hi)"
                : "var(--color-accent)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-sm)",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
            transform: btnHover && !loading ? "translateY(-2px) scale(1.02)" : "none",
            boxShadow: btnHover && !loading
              ? "var(--shadow-glow-accent-strong)"
              : "var(--shadow-glow-accent)",
            transition: "background var(--motion-fast) ease, transform var(--motion-fast) var(--motion-reveal), box-shadow var(--motion-fast) ease",
          }}
        >
          {loading ? "Processing..." : "Continue to Payment →"}
        </button>

        {/* Error message */}
        {error && (
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--color-block)",
              textAlign: "center",
              marginTop: "0.75rem",
              fontFamily: "var(--font-mono)",
            }}
          >
            {error}
          </p>
        )}

        {/* Fine print */}
        <p
          style={{
            fontSize: "0.65rem",
            color: "var(--color-text-muted)",
            textAlign: "center",
            marginTop: "0.75rem",
            lineHeight: 1.5,
          }}
        >
          You&apos;ll be redirected to NOWPayments to complete your purchase.
          <br />
          Your license will be activated after payment confirmation.
        </p>
      </FadeIn>

      {/* Trust strip */}
      <FadeIn delay={0.35}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.25rem",
            marginTop: "1.5rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--glass-border)",
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: "[ local ]", text: "Client-side only" },
            { icon: "[ ø ]", text: "No wallet access" },
            { icon: "[ ✓ ]", text: "Non-custodial" },
          ].map((item) => (
            <div
              key={item.text}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.05em",
                color: "var(--color-text-muted)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ color: "var(--color-text-secondary)" }}>
                {item.icon}
              </span>
              {item.text}
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/checkout/CheckoutForm.tsx
git commit -m "feat: add checkout form client component"
```

---

### Task 8: Create checkout page (Server Component)

**Files:**
- Create: `src/app/checkout/page.tsx`

- [ ] **Step 1: Create the server component page**

```tsx
// src/app/checkout/page.tsx
import { redirect } from "next/navigation";
import { checkCheckoutAccess } from "@/lib/guards";
import { getPlan, VALID_PLAN_IDS } from "@/lib/checkout";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

interface CheckoutPageProps {
  searchParams: Promise<{ plan?: string }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  // Route guard
  const access = checkCheckoutAccess();
  if (!access.allowed) {
    redirect(access.redirect ?? "/pricing");
  }

  // Validate plan
  const params = await searchParams;
  const planId = params.plan;

  if (!planId || !(VALID_PLAN_IDS as string[]).includes(planId)) {
    redirect("/pricing");
  }

  const plan = getPlan(planId)!;

  return (
    <main>
      <CheckoutForm plan={plan} />
    </main>
  );
}
```

**Note:** In Next.js 15, `searchParams` is a `Promise` and must be awaited. This is a breaking change from Next.js 14.

- [ ] **Step 2: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build 2>&1 | tail -20`
Expected: Build succeeds, `/checkout` page compiles

- [ ] **Step 3: Commit**

```bash
git add src/app/checkout/page.tsx
git commit -m "feat: add checkout page with route guard and plan validation"
```

---

## Chunk 4: Success & Cancel Pages

### Task 9: Create success page

**Files:**
- Create: `src/app/checkout/success/page.tsx`

- [ ] **Step 1: Create the success page**

```tsx
// src/app/checkout/success/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";
import { getPlan } from "@/lib/checkout";

interface CheckoutData {
  planId: string;
  email: string;
}

export default function CheckoutSuccessPage() {
  const [data, setData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("sentinel_checkout");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
      sessionStorage.removeItem("sentinel_checkout");
    }
  }, []);

  const plan = data ? getPlan(data.planId) : null;

  return (
    <main>
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "4rem clamp(1.25rem, 5vw, 2rem)",
          textAlign: "center",
        }}
      >
        <FadeIn>
          <SectionLabel>Payment</SectionLabel>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "0.03em",
              color: "var(--color-text)",
              margin: "0 0 1rem 0",
              lineHeight: 1,
            }}
          >
            PAYMENT INITIATED
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
              marginBottom: "2rem",
            }}
          >
            Your payment is being processed. Once confirmed, your license will
            be generated and linked to your account.
          </p>
        </FadeIn>

        {/* Info card */}
        {(plan || data) && (
          <FadeIn delay={0.1}>
            <div
              style={{
                background: "var(--glass-bg-strong)",
                backdropFilter: "blur(var(--glass-blur))",
                WebkitBackdropFilter: "blur(var(--glass-blur))",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                boxShadow: "var(--shadow-glass)",
                marginBottom: "2rem",
                textAlign: "left",
              }}
            >
              {plan && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: data?.email ? 12 : 0,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-text-muted)",
                        marginBottom: 4,
                      }}
                    >
                      Plan
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--color-text)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {plan.label}
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                    }}
                  >
                    {plan.price}
                  </div>
                </div>
              )}
              {data?.email && (
                <div
                  style={{
                    borderTop: plan
                      ? "1px solid var(--glass-border)"
                      : "none",
                    paddingTop: plan ? 12 : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                      marginBottom: 4,
                    }}
                  >
                    Email
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {data.email}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.15}>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--color-text-muted)",
              marginBottom: "2rem",
              lineHeight: 1.5,
            }}
          >
            This usually takes a few minutes. You&apos;ll receive a
            confirmation email.
          </p>
          <Link
            href="/pricing"
            className="btn-primary"
            style={{
              display: "inline-block",
              background: "var(--color-accent)",
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.85rem 2rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              boxShadow:
                "0 4px 16px rgba(190, 27, 42, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            Back to Pricing
          </Link>
        </FadeIn>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/checkout/success/page.tsx
git commit -m "feat: add checkout success page"
```

---

### Task 10: Create cancel page

**Files:**
- Create: `src/app/checkout/cancel/page.tsx`

- [ ] **Step 1: Create the cancel page**

```tsx
// src/app/checkout/cancel/page.tsx
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

export default function CheckoutCancelPage() {
  return (
    <main>
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "4rem clamp(1.25rem, 5vw, 2rem)",
          textAlign: "center",
        }}
      >
        <FadeIn>
          <SectionLabel>Checkout</SectionLabel>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "0.03em",
              color: "var(--color-text)",
              margin: "0 0 1rem 0",
              lineHeight: 1,
            }}
          >
            CHECKOUT CANCELED
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
            }}
          >
            No payment was processed. You can try again anytime.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Link
            href="/pricing"
            className="btn-primary"
            style={{
              display: "inline-block",
              background: "var(--color-accent)",
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.85rem 2rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              boxShadow:
                "0 4px 16px rgba(190, 27, 42, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            Back to Pricing
          </Link>
        </FadeIn>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build 2>&1 | tail -20`
Expected: Build succeeds, all routes compile

- [ ] **Step 3: Commit**

```bash
git add src/app/checkout/cancel/page.tsx
git commit -m "feat: add checkout cancel page"
```

---

## Chunk 5: Final Verification

### Task 11: Full build and smoke test

- [ ] **Step 1: Full build**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run build 2>&1 | tail -30`
Expected: Build succeeds with all routes:
- `/pricing` (existing)
- `/checkout` (new)
- `/checkout/success` (new)
- `/checkout/cancel` (new)

- [ ] **Step 2: Smoke test all routes**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npm run dev`

Test the following:

1. **`/pricing`** — page renders normally, "Apply for Access" buttons still link to `/waitlist`, tiny gear icon visible in bottom-right
2. **Dev trigger flow** — click gear → enter `1234` → see plan selector → click "Quarterly" → navigates to `/checkout?plan=quarterly`
3. **`/checkout?plan=quarterly`** — shows checkout form with plan summary, email input, CTA button
4. **`/checkout`** (no plan param) — redirects to `/pricing`
5. **`/checkout?plan=invalid`** — redirects to `/pricing`
6. **`/checkout/success`** — shows "PAYMENT INITIATED" message
7. **`/checkout/cancel`** — shows "CHECKOUT CANCELED" message
8. **Feature flag off** — temporarily remove `NEXT_PUBLIC_CHECKOUT_ENABLED` from `.env.local`, restart dev server, verify gear icon does not appear on `/pricing`

- [ ] **Step 3: Verify no TypeScript errors**

Run: `cd "/Users/leoneandreis/claude/website 2.0" && npx tsc --noEmit --pretty`
Expected: No errors
