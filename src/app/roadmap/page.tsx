import { CtaBand } from "@/components/ui/CtaBand";

const phase1Features = [
  "CA reconstruction from fragments",
  "Multi-CA + ordinal parsing",
  "Warning keyword filtering",
  "Website link scraping",
  "Telegram link auto-join + scrape",
  "Client-side, non-custodial",
];

export default function RoadmapPage() {
  return (
    <main>
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "0.03em",
            lineHeight: 0.95,
          }}
        >
          ROADMAP
        </h1>
      </section>

      <section style={{ padding: "2rem 1.5rem 6rem" }}>
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Phase 1 */}
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 8,
              padding: "2rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--color-pass)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              PHASE 1 — LIVE ✓
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.8rem",
                letterSpacing: "0.05em",
                marginBottom: "1.25rem",
              }}
            >
              INTELLIGENCE LAYER
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              {phase1Features.map((f) => (
                <li key={f} style={{ fontSize: "0.82rem", color: "#8888a0" }}>
                  <span style={{ color: "var(--color-pass)", marginRight: "0.5rem" }}>
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Phase 2 */}
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px dashed var(--color-border)",
              borderRadius: 8,
              padding: "2rem",
              opacity: 0.6,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--color-neutral)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              PHASE 2 — COMING
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.8rem",
                letterSpacing: "0.05em",
                marginBottom: "1.25rem",
              }}
            >
              EXECUTION LAYER
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#8888a0", lineHeight: 1.7 }}>
              Optional direct bot integration. When Phase 2 ships, Sentinel will
              execute trades directly from the intelligence layer at 1% per trade
              side — industry standard. Community feedback shapes the priority.
              No timeline commitments.
            </p>
          </div>
        </div>
      </section>

      <CtaBand headline="Follow Phase 2 in our Discord." />
    </main>
  );
}
