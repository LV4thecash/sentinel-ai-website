"use client";
import { useState } from "react";

interface WaitlistFormProps {
  size?: "sm" | "lg";
}

export function WaitlistForm({ size = "lg" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, telegram: telegram || undefined }),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <p
        style={{
          color: "var(--color-pass)",
          fontWeight: 600,
          fontSize: size === "lg" ? "1.05rem" : "0.88rem",
        }}
      >
        ✓ You&apos;re on the list. We&apos;ll reach out before launch.
      </p>
    );
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border-hi)",
    color: "#e8e8ea",
    padding: size === "lg" ? "0.85rem 1rem" : "0.6rem 0.85rem",
    borderRadius: "var(--radius-sm)",
    fontSize: size === "lg" ? "1rem" : "0.875rem",
    outline: "none",
    width: "100%",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        width: "100%",
        maxWidth: size === "lg" ? 440 : 320,
      }}
    >
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Telegram handle (optional)"
        value={telegram}
        onChange={(e) => setTelegram(e.target.value)}
        style={inputStyle}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        style={{
          background: "var(--color-accent)",
          color: "#000",
          fontWeight: 700,
          fontSize: size === "lg" ? "0.92rem" : "0.78rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: size === "lg" ? "0.9rem 2rem" : "0.65rem 1.2rem",
          border: "none",
          borderRadius: "var(--radius-sm)",
          cursor: state === "loading" ? "wait" : "pointer",
          width: "100%",
          opacity: state === "loading" ? 0.7 : 1,
          transition: "opacity var(--motion-fast) ease",
        }}
      >
        {state === "loading" ? "Joining…" : "Join Waitlist"}
      </button>
      {state === "error" && (
        <p style={{ color: "var(--color-block)", fontSize: "0.78rem", margin: 0 }}>
          Something went wrong. Try again or DM us on Discord.
        </p>
      )}
    </form>
  );
}
