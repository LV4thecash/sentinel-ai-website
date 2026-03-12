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
        <SectionLabel>CHECKOUT</SectionLabel>
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
