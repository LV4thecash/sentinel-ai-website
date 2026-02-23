import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";

const valueProps = [
  {
    label: "Referral Credits",
    desc: "Earn subscription credits for every trader you refer who subscribes.",
  },
  {
    label: "Proof Assets",
    desc: "Get access to GIF demos, fragment reconstruction demos, and product walkthroughs to share with your audience.",
  },
  {
    label: "Priority Access",
    desc: "Early feature access, direct team channel, and a feedback loop that shapes the roadmap.",
  },
];

export default function PartnersPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ padding: "5rem var(--gutter)", textAlign: "center" }}>
        <FadeIn>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.01em",
              lineHeight: 0.95,
              marginBottom: "1.25rem",
              color: "var(--color-text)",
            }}
          >
            Partner with<br />Sentinel AI
          </h1>
          <p
            style={{
              color: "var(--color-text-secondary)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Referral program, proof assets, and priority access for KOLs, group
            admins, and trading communities.
          </p>
        </FadeIn>
      </section>

      {/* Value props */}
      <section style={{ padding: "3rem var(--gutter)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
              marginBottom: "4rem",
            }}
          >
            {valueProps.map((vp, i) => (
              <FadeIn key={vp.label} delay={i * 0.07}>
                <div
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    padding: "1.5rem",
                    height: "100%",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--color-accent)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {vp.label}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                    {vp.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Inquiry form */}
          <FadeIn delay={0.2}>
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              <SectionLabel>Partnership Inquiry</SectionLabel>
              <form
                action="/api/partners"
                method="POST"
                style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                {(
                  [
                    { name: "handle", placeholder: "Name / Handle", type: "text" },
                    { name: "telegram", placeholder: "Telegram handle", type: "text" },
                    { name: "email", placeholder: "Email address", type: "email" },
                  ] as const
                ).map((f) => (
                  <input
                    key={f.name}
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border-hi)",
                      color: "var(--color-text)",
                      padding: "0.85rem 1rem",
                      borderRadius: 4,
                      fontSize: "0.9rem",
                      outline: "none",
                      width: "100%",
                      transition: "border-color var(--motion-fast) ease",
                    }}
                  />
                ))}

                <select
                  name="type"
                  required
                  defaultValue=""
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border-hi)",
                    color: "var(--color-text-muted)",
                    padding: "0.85rem 1rem",
                    borderRadius: 4,
                    fontSize: "0.9rem",
                    width: "100%",
                  }}
                >
                  <option value="" disabled>
                    Community type
                  </option>
                  <option value="kol">KOL</option>
                  <option value="group">Trading group</option>
                  <option value="developer">Developer</option>
                  <option value="other">Other</option>
                </select>

                <select
                  name="size"
                  required
                  defaultValue=""
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border-hi)",
                    color: "var(--color-text-muted)",
                    padding: "0.85rem 1rem",
                    borderRadius: 4,
                    fontSize: "0.9rem",
                    width: "100%",
                  }}
                >
                  <option value="" disabled>
                    Community size
                  </option>
                  <option value="lt500">&lt;500</option>
                  <option value="500-5k">500–5K</option>
                  <option value="5k-50k">5K–50K</option>
                  <option value="50k+">50K+</option>
                </select>

                <textarea
                  name="message"
                  placeholder="What interests you about partnering with Sentinel?"
                  rows={4}
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border-hi)",
                    color: "var(--color-text)",
                    padding: "0.85rem 1rem",
                    borderRadius: 4,
                    fontSize: "0.9rem",
                    resize: "vertical",
                    outline: "none",
                    width: "100%",
                    transition: "border-color var(--motion-fast) ease",
                  }}
                />

                <button
                  type="submit"
                  style={{
                    background: "var(--color-accent)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.9rem",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    width: "100%",
                    transition: `background var(--motion-fast) ease, transform var(--motion-fast) var(--motion-ease-out), box-shadow var(--motion-fast) ease`,
                  }}
                >
                  Submit Inquiry
                </button>
              </form>

              <div
                style={{
                  marginTop: "2rem",
                  padding: "1rem",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 6,
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                }}
              >
                Sentinel is non-custodial and client-side. Review our{" "}
                <Link href="/security" style={{ color: "var(--color-accent)", textDecoration: "none" }}>
                  Security page
                </Link>{" "}
                before reaching out.
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
