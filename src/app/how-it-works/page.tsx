import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBand } from "@/components/ui/CtaBand";
import Link from "next/link";
import React from "react";

const steps = [
  {
    n: "01",
    label: "Install",
    desc: "Install Sentinel AI from the Chrome Web Store. Takes under 30 seconds.",
    note: null,
  },
  {
    n: "02",
    label: "Connect Telegram",
    desc: "Enter your Telegram API ID, API Hash, and phone number in the extension UI.",
    note: "To get your API credentials: visit my.telegram.org → Log in → App configuration → copy your API ID and App hash.",
  },
  {
    n: "03",
    label: "Enter Auth Code",
    desc: "Telegram sends a one-time auth code to your account. Enter it in the extension. This authenticates your local session — no server ever receives your credentials.",
    note: null,
  },
  {
    n: "04",
    label: "Select Sources + Forwarding Target",
    desc: "Browse your Telegram chats and channels. Select which ones Sentinel should monitor. Define where clean CAs should be forwarded: a Telegram group, bot, or DM.",
    note: null,
  },
  {
    n: "05",
    label: "Activate",
    desc: "Sentinel is live. The extension popup shows your active source count and forwarding target. CAs arrive automatically.",
    note: null,
  },
];

const workflow = [
  "Launch message in monitored chat",
  "Sentinel detects CA shape",
  "Reconstruction pipeline runs",
  "Filter check: pass or block",
  "Clean CA forwarded",
  "Your bot executes",
];

const miniQA: [string, string][] = [
  [
    "How do I change my forwarding target?",
    "Open the extension → Settings → Forwarding. Update the destination and save.",
  ],
  [
    "Can I monitor multiple chats?",
    "Yes — add as many source chats as you need. Sentinel listens to all simultaneously.",
  ],
  [
    "What happens if the extension loses connection?",
    "Sentinel will attempt to reconnect automatically. You will see a disconnected state indicator in the popup.",
  ],
  [
    "Do I need to keep the browser open?",
    "Yes — Sentinel runs inside Chrome. The browser must be open and the extension must be active.",
  ],
];

export default function HowItWorksPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            letterSpacing: "0.03em",
            lineHeight: 0.95,
            marginBottom: "1.25rem",
          }}
        >
          SETUP IN<br />~10 MINUTES
        </h1>
        <p
          style={{
            color: "#8888a0",
            maxWidth: 480,
            margin: "0 auto 2.5rem",
            lineHeight: 1.65,
          }}
        >
          Step by step. Then it runs itself.
        </p>
        <Link
          href="/#waitlist"
          style={{
            background: "var(--color-accent)",
            color: "#000",
            fontWeight: 700,
            padding: "0.85rem 2rem",
            borderRadius: 4,
            textDecoration: "none",
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Join Waitlist
        </Link>
      </section>

      {/* Steps */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.n}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "1.5rem",
                paddingBottom: "2.5rem",
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "var(--color-surface)",
                  border: `1px solid ${i === 0 ? "var(--color-accent)" : "var(--color-border-hi)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: i === 0 ? "var(--color-accent)" : "var(--color-neutral)",
                  flexShrink: 0,
                }}
              >
                {step.n}
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: "0.98rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {step.label}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#8888a0",
                    lineHeight: 1.65,
                    marginBottom: step.note ? "0.75rem" : 0,
                  }}
                >
                  {step.desc}
                </p>
                {step.note && (
                  <div
                    style={{
                      padding: "0.6rem 0.85rem",
                      background: "var(--color-accent-lo)",
                      border: "1px solid rgba(245,166,35,0.2)",
                      borderRadius: 4,
                      fontSize: "0.75rem",
                      color: "#c0c0a8",
                      fontFamily: "var(--font-mono)",
                      lineHeight: 1.6,
                      marginBottom: "0.75rem",
                    }}
                  >
                    ↳ {step.note}
                  </div>
                )}
                {/* Screenshot placeholder */}
                <div
                  style={{
                    marginTop: "0.75rem",
                    height: 72,
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--color-neutral)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    [screenshot placeholder — step {step.n}]
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily workflow */}
      <section
        style={{
          padding: "4rem 1.5rem",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionLabel>Daily Workflow</SectionLabel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "1.5rem",
            }}
          >
            {workflow.map((w, i) => (
              <React.Fragment key={w}>
                <div
                  style={{
                    padding: "0.45rem 0.8rem",
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                    fontSize: "0.75rem",
                    color: "#b0b0c0",
                  }}
                >
                  {w}
                </div>
                {i < workflow.length - 1 && (
                  <span
                    style={{ color: "var(--color-border-hi)", fontSize: "0.9rem" }}
                  >
                    →
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <SectionLabel>Common Questions</SectionLabel>
          <div style={{ marginTop: "0.5rem" }}>
            {miniQA.map(([q, a]) => (
              <details
                key={q}
                style={{
                  borderBottom: "1px solid var(--color-border)",
                  padding: "1rem 0",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    listStyle: "none",
                  }}
                >
                  {q}
                </summary>
                <p
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "0.82rem",
                    color: "#8888a0",
                    lineHeight: 1.7,
                  }}
                >
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
