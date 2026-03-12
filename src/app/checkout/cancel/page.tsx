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
