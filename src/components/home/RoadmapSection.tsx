import Link from "next/link";

const phase1Features = [
  "CA reconstruction from fragments",
  "Multi-CA + ordinal parsing",
  "Warning keyword filtering",
  "Website link scraping",
  "Telegram link auto-join",
];

export function RoadmapSection() {
  return (
    <section style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Phase 1 */}
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              padding: "1.75rem",
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
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                letterSpacing: "0.05em",
                marginBottom: "1rem",
              }}
            >
              INTELLIGENCE LAYER
            </h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {phase1Features.map((f) => (
                <li key={f} style={{ fontSize: "0.82rem", color: "#8888a0" }}>
                  <span style={{ color: "var(--color-pass)", marginRight: "0.5rem" }}>✓</span>
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
              padding: "1.75rem",
              opacity: 0.65,
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
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                letterSpacing: "0.05em",
                marginBottom: "1rem",
              }}
            >
              EXECUTION LAYER
            </h3>
            <p style={{ fontSize: "0.82rem", color: "#8888a0", lineHeight: 1.7 }}>
              Optional bot integration. Sentinel will execute directly from the
              intelligence layer. 1% per trade side, industry standard. No
              timeline commitment.
            </p>
          </div>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <Link
            href="/roadmap"
            style={{
              color: "var(--color-accent)",
              fontSize: "0.82rem",
              fontFamily: "var(--font-mono)",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            Follow the roadmap →
          </Link>
        </div>
      </div>
    </section>
  );
}
