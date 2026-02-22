"use client";
import { useState } from "react";
import Link from "next/link";

type FormState = "idle" | "loading" | "success" | "error";

export default function WaitlistPage() {
  const [email, setEmail]       = useState("");
  const [telegram, setTelegram] = useState("");
  const [state, setState]       = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, telegram: telegram || undefined }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#fff",
    border: "1px solid var(--color-border-hi)",
    borderRadius: 4,
    padding: "0.85rem 1rem",
    fontSize: "0.9rem",
    fontFamily: "var(--font-body)",
    color: "var(--color-text)",
    outline: "none",
    transition: "border-color 0.15s ease",
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--nav-height))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "clamp(4rem, 10vh, 6rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 8vh, 5rem)",
        background: "var(--color-bg)",
        position: "relative",
      }}
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 460,
        }}
      >
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.06em",
            color: "var(--color-text-muted)",
            textDecoration: "none",
            marginBottom: "3rem",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          ← sentinelai.bot
        </Link>

        {/* Status badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: "2rem",
            border: "1px solid var(--color-border)",
            borderRadius: 100,
            padding: "5px 14px 5px 10px",
            background: "var(--color-surface)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#16a34a",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
            }}
          >
            Private Beta · Evaluation Phase
          </span>
        </div>

        {/* Headlines */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.8rem, 8vw, 4.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            color: "var(--color-text)",
            marginBottom: "0.75rem",
          }}
        >
          Launching Soon.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
            color: "var(--color-text-secondary)",
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          Stay Connected.
        </p>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          Sentinel is in private evaluation with 20 selected traders. We&apos;re
          expanding access carefully, quality over speed. Apply below and
          we&apos;ll reach out if you&apos;re selected.
        </p>

        {/* Form or success state */}
        {state === "success" ? (
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              padding: "2rem",
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--color-text)",
                marginBottom: "0.5rem",
              }}
            >
              Application received.
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.65,
              }}
            >
              If you&apos;re selected, you&apos;ll hear from us before public launch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border-hi)")}
            />

            <div>
              <input
                type="text"
                placeholder="Telegram handle (optional)"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                style={{ ...inputStyle, color: telegram ? "var(--color-text)" : undefined }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-border-hi)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border-hi)")}
              />
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-text-muted)",
                  marginTop: "0.35rem",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                }}
              >
                Helps us reach you directly
              </p>
            </div>

            <button
              type="submit"
              disabled={state === "loading"}
              style={{
                background: state === "loading" ? "rgba(190,27,42,0.6)" : "var(--color-accent)",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.9rem",
                border: "none",
                borderRadius: 4,
                cursor: state === "loading" ? "not-allowed" : "pointer",
                width: "100%",
                transition: "background 0.15s ease, transform 0.15s ease",
              }}
            >
              {state === "loading" ? "Sending…" : "Send Application"}
            </button>

            {state === "error" && (
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "var(--color-accent)",
                  textAlign: "center",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Something went wrong. Try again or DM us on Telegram.
              </p>
            )}
          </form>
        )}

        {/* Sub-copy */}
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.6,
            marginTop: "1.5rem",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
          }}
        >
          Applications are reviewed manually. We&apos;ll contact you before access is granted.
        </p>

        {/* Social proof — manual constant, no live counter */}
        <p
          style={{
            fontSize: "0.68rem",
            color: "var(--color-text-muted)",
            marginTop: "2.5rem",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.06em",
            opacity: 0.7,
          }}
        >
          2,000+ applications received
        </p>
      </div>
    </div>
  );
}
