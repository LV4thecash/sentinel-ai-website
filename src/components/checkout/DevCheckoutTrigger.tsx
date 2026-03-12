"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { PLANS } from "@/lib/checkout";

const DEV_PASSWORD = "1234";

export function DevCheckoutTrigger() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Portal needs client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Don't render if feature flag is off or not yet mounted (SSR)
  if (process.env.NEXT_PUBLIC_CHECKOUT_ENABLED !== "true" || !mounted) {
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

  return createPortal(
    <div
      ref={popoverRef}
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
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
    </div>,
    document.body
  );
}
