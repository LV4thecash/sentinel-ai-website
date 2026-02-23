import { FadeIn } from "@/components/ui/FadeIn";
import { CtaBand } from "@/components/ui/CtaBand";
import Link from "next/link";

const doTable: [string, string][] = [
  [
    "Reads Telegram messages from chats you select",
    "Store credentials on any server",
  ],
  [
    "Extracts + reconstructs Solana contract addresses",
    "Access your Solana wallet",
  ],
  [
    "Forwards clean CAs to a target you define",
    "Execute trades",
  ],
  [
    "Runs in your browser, locally",
    "Have custody of any assets",
  ],
  [
    "Uses Telegram's official MTProto API",
    "Send your data to external servers",
  ],
];

const permissions: [string, string][] = [
  ["tabs", "Open and read extension UI tabs"],
  ["storage", "Save your local configuration (stored in browser, not on a server)"],
  ["activeTab", "Interact with the current tab when the extension popup is open"],
  ["host_permissions: api.telegram.org", "Connect to Telegram's official MTProto API"],
];

const dataPolicy = [
  "Logged locally: session activity, forwarded CAs, configuration settings",
  "NOT transmitted: credentials, message content, CA history",
  "To wipe local data: Chrome Settings → Extensions → Sentinel AI → Clear storage",
];

export default function SecurityPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ padding: "var(--section-gap-sm) var(--gutter)", textAlign: "center" }}>
        <FadeIn>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              letterSpacing: "-0.01em",
              lineHeight: 0.95,
              marginBottom: "1.25rem",
              color: "var(--color-text)",
            }}
          >
            Client-side.<br />Non-custodial.<br />No hidden reach.
          </h1>
          <p
            style={{
              color: "var(--color-text-secondary)",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            This page explains exactly what Sentinel can and cannot do. No vague
            claims.
          </p>
        </FadeIn>
      </section>

      {/* Do / Don't table */}
      <FadeIn>
        <section
          style={{
            padding: "var(--section-gap-inner) var(--gutter)",
            background: "var(--color-surface)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div style={{ maxWidth: "var(--content-width-mid)", margin: "0 auto" }}>
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {/* Header row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div
                  style={{
                    padding: "1rem 1.5rem",
                    background: "rgba(34,197,94,0.06)",
                    borderBottom: "1px solid var(--color-border)",
                    borderRight: "1px solid var(--color-border)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--color-pass)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    WHAT SENTINEL DOES
                  </p>
                </div>
                <div
                  style={{
                    padding: "1rem 1.5rem",
                    background: "rgba(239,68,68,0.06)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--color-block)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    WHAT SENTINEL DOES NOT DO
                  </p>
                </div>
              </div>

              {/* Data rows */}
              {doTable.map(([does, doesnt], i) => (
                <div
                  key={does}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    borderBottom:
                      i < doTable.length - 1 ? "1px solid var(--color-border)" : "none",
                  }}
                >
                  <div
                    style={{
                      padding: "0.85rem 1.5rem",
                      borderRight: "1px solid var(--color-border)",
                      fontSize: "0.82rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <span style={{ color: "var(--color-pass)", marginRight: "0.5rem" }}>
                      ✓
                    </span>
                    {does}
                  </div>
                  <div
                    style={{
                      padding: "0.85rem 1.5rem",
                      fontSize: "0.82rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <span style={{ color: "var(--color-block)", marginRight: "0.5rem" }}>
                      ×
                    </span>
                    {doesnt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Architecture */}
      <FadeIn delay={0.07}>
        <section style={{ padding: "var(--section-gap-inner) var(--gutter)" }}>
          <div style={{ maxWidth: "var(--content-width-narrow)", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "1.8rem",
                letterSpacing: "-0.01em",
                marginBottom: "1rem",
                color: "var(--color-text)",
              }}
            >
              YOUR SESSION LIVES IN YOUR BROWSER
            </h2>
            <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: "0.88rem" }}>
              Sentinel uses Telegram&apos;s official MTProto protocol. When you
              enter your API credentials, they authenticate a local session inside
              your Chrome extension. Your API keys never leave your machine. There
              is no Sentinel server in the authentication path.
            </p>
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1.25rem",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 6,
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
              }}
            >
              Your machine → Telegram MTProto API
              <br />
              <span style={{ color: "var(--color-block)" }}>
                No Sentinel server in this chain.
              </span>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Permissions table */}
      <FadeIn delay={0.07}>
        <section
          style={{
            padding: "var(--section-gap-inner) var(--gutter)",
            background: "var(--color-surface)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div style={{ maxWidth: "var(--content-width-narrow)", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "1.5rem",
                letterSpacing: "-0.01em",
                marginBottom: "1.5rem",
                color: "var(--color-text)",
              }}
            >
              CHROME PERMISSIONS
            </h2>
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {permissions.map(([perm, reason], i) => (
                <div
                  key={perm}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "220px 1fr",
                    borderBottom:
                      i < permissions.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      padding: "0.85rem 1rem",
                      background: "var(--color-bg)",
                      borderRight: "1px solid var(--color-border)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "var(--color-accent)",
                    }}
                  >
                    {perm}
                  </div>
                  <div
                    style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", color: "var(--color-text-secondary)" }}
                  >
                    {reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Wallet isolation callout */}
      <FadeIn delay={0.07}>
        <section style={{ padding: "var(--section-gap-inner) var(--gutter)" }}>
          <div style={{ maxWidth: "var(--content-width-narrow)", margin: "0 auto" }}>
            <div
              style={{
                padding: "1.5rem",
                background: "rgba(190,27,42,0.07)",
                border: "1px solid rgba(190,27,42,0.25)",
                borderRadius: 8,
              }}
            >
              <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--color-text)" }}>
                Sentinel has zero connection to your Solana wallet or private keys.
              </p>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.82rem",
                  marginTop: "0.5rem",
                  lineHeight: 1.65,
                }}
              >
                It does not request wallet access. It does not sign transactions. It
                never could. There is no wallet integration in the codebase.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Data policy */}
      <FadeIn delay={0.07}>
        <section
          style={{
            padding: "var(--section-gap-inner) var(--gutter)",
            background: "var(--color-surface)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div style={{ maxWidth: "var(--content-width-narrow)", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                marginBottom: "1rem",
                color: "var(--color-text)",
              }}
            >
              DATA POLICY
            </h2>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {dataPolicy.map((item) => (
                <li key={item} style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeIn>

      <CtaBand headline="Satisfied with the security model?" />
    </main>
  );
}
