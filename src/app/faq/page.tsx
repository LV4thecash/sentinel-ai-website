import { FadeIn } from "@/components/ui/FadeIn";
import { CtaBand } from "@/components/ui/CtaBand";

interface FaqCluster {
  cluster: string;
  items: [string, string][];
}

const faqs: FaqCluster[] = [
  {
    cluster: "Security",
    items: [
      [
        "Is my Telegram session safe?",
        "Yes. Your credentials authenticate a local MTProto session inside the extension. They are never transmitted to any Sentinel server.",
      ],
      [
        "Can Sentinel access my wallet?",
        "No. Sentinel has no wallet integration. It cannot access your Solana wallet or private keys.",
      ],
      [
        "What happens if the extension is updated?",
        "Extension updates do not affect your credentials. They are stored locally in your browser's extension storage, not on any server.",
      ],
    ],
  },
  {
    cluster: "Reconstruction Accuracy",
    items: [
      [
        "How short a fragment can Sentinel reconstruct?",
        "Reconstruction is most reliable at 12+ characters. From 6–11 characters, Sentinel attempts a database lookup with a confidence gate. Fragments below 6 characters are too ambiguous to reconstruct reliably.",
      ],
      [
        "What is the false positive rate on CA extraction?",
        "Extraction precision targets ≥97%. Any Base58-shaped string that is not a valid Solana CA is discarded before forwarding.",
      ],
      [
        "What is the false block rate on warning filtering?",
        "The false block rate target is <3%. You can customize warning keywords in advanced settings if needed.",
      ],
      [
        "Can I customize warning keywords?",
        "Yes. The default list covers 'DO NOT BUY', 'honeypot', 'scam', 'rug', and 'caution'. Add or remove keywords in the extension's advanced settings.",
      ],
    ],
  },
  {
    cluster: "Setup",
    items: [
      [
        "Where do I get my Telegram API ID and Hash?",
        "Go to my.telegram.org, log in with your phone number, navigate to 'App configuration', and create an app. Your API ID and API Hash will be shown there.",
      ],
      [
        "Do I need to keep the browser open?",
        "Yes. Sentinel runs as a Chrome extension and requires Chrome to be open and the extension to be active.",
      ],
      [
        "Can I monitor multiple chats?",
        "Yes, add as many source chats as you want.",
      ],
      [
        "What forwarding destinations are supported?",
        "Any Telegram group, bot, or DM. Set it in the extension's forwarding settings.",
      ],
    ],
  },
  {
    cluster: "Pricing",
    items: [
      [
        "Can I cancel my subscription?",
        "Monthly subscriptions can be cancelled before the next billing cycle. Quarterly and annual plans remain active for the full paid period.",
      ],
      [
        "Can I upgrade from monthly to annual?",
        "Yes, upgrade at any time from within the extension. The remaining monthly period is prorated.",
      ],
      [
        "What wallets are supported for payment?",
        "Phantom and Solflare. Payment is processed via NowPayments.",
      ],
    ],
  },
  {
    cluster: "Compatibility",
    items: [
      [
        "Which execution bots does Sentinel work with?",
        "Any bot that accepts a Telegram message containing a contract address: BonkBot, Trojan, custom bots, and more. Sentinel forwards a clean CA to the destination you define. The bot does the rest.",
      ],
      [
        "What Telegram chat types are supported?",
        "Groups, channels, and direct messages. Bot-to-user messages are also supported.",
      ],
    ],
  },
];

export default function FaqPage() {
  return (
    <main>
      <section style={{ padding: "5rem clamp(1.5rem, 5vw, 4rem)", textAlign: "center" }}>
        <FadeIn>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "0.03em",
              lineHeight: 0.95,
              marginBottom: "1rem",
              color: "var(--color-text)",
            }}
          >
            COMMON QUESTIONS
          </h1>
          <p style={{ color: "var(--color-text-secondary)", marginTop: "0.75rem" }}>
            Not answered here?{" "}
            <a
              href="https://discord.gg/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-accent)", textDecoration: "none" }}
            >
              Join our Discord.
            </a>
          </p>
        </FadeIn>
      </section>

      <section style={{ padding: "2rem clamp(1.5rem, 5vw, 4rem) 6rem" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          {faqs.map((faqCluster, clusterIndex) => (
            <FadeIn key={faqCluster.cluster} delay={clusterIndex * 0.06}>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "var(--color-accent)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  {faqCluster.cluster}
                </p>
                {faqCluster.items.map(([q, a]) => (
                  <details
                    key={q}
                    style={{
                      borderBottom: "1px solid var(--glass-border)",
                      padding: "1rem 0",
                    }}
                  >
                    <summary
                      style={{
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                        listStyle: "none",
                        color: "var(--color-text)",
                      }}
                    >
                      {q}
                    </summary>
                    <p
                      style={{
                        marginTop: "0.75rem",
                        fontSize: "0.82rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.7,
                      }}
                    >
                      {a}
                    </p>
                  </details>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <CtaBand headline="Still have questions? Ask in Discord." />
    </main>
  );
}
