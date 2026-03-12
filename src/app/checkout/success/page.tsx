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
