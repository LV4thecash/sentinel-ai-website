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
          CLIENT-SIDE.<br />NON-CUSTODIAL.<br />NO HIDDEN REACH.
        </h1>
        <p
          style={{
            color: "#8888a0",
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.65,
          }}
        >
          This page explains exactly what Sentinel can and cannot do. No vague
          claims.
        </p>
      </section>

      {/* Do / Don't table */}
      <section
        style={{
          padding: "4rem 1.5rem",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
                    color: "#c0c0c8",
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
                    color: "#c0c0c8",
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

      {/* Architecture */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.8rem",
              letterSpacing: "0.05em",
              marginBottom: "1rem",
            }}
          >
            YOUR SESSION LIVES IN YOUR BROWSER
          </h2>
          <p style={{ color: "#8888a0", lineHeight: 1.7, fontSize: "0.88rem" }}>
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
              color: "#9090a0",
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

      {/* Permissions table */}
      <section
        style={{
          padding: "4rem 1.5rem",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              letterSpacing: "0.05em",
              marginBottom: "1.5rem",
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
                  style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", color: "#8888a0" }}
                >
                  {reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wallet isolation callout */}
      <section style={{ padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div
            style={{
              padding: "1.5rem",
              background: "rgba(190,27,42,0.07)",
              border: "1px solid rgba(190,27,42,0.25)",
              borderRadius: 8,
            }}
          >
            <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>
              Sentinel has zero connection to your Solana wallet or private keys.
            </p>
            <p
              style={{
                color: "#8888a0",
                fontSize: "0.82rem",
                marginTop: "0.5rem",
                lineHeight: 1.65,
              }}
            >
              It does not request wallet access. It does not sign transactions. It
              never could — there is no wallet integration in the codebase.
            </p>
          </div>
        </div>
      </section>

      {/* Data policy */}
      <section
        style={{
          padding: "3rem 1.5rem",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              letterSpacing: "0.05em",
              marginBottom: "1rem",
            }}
          >
            DATA POLICY
          </h2>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {dataPolicy.map((item) => (
              <li key={item} style={{ fontSize: "0.82rem", color: "#8888a0", lineHeight: 1.6 }}>
                · {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand headline="Satisfied with the security model?" />
    </main>
  );
}
