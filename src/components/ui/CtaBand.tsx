import { WaitlistForm } from "@/components/WaitlistForm";
import { Counter } from "@/components/ui/Counter";

interface CtaBandProps {
  headline?: string;
}

export function CtaBand({
  headline = "Ready to stop missing launches?",
}: CtaBandProps) {
  return (
    <section
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        padding: "5rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            letterSpacing: "0.05em",
            marginBottom: "2rem",
            lineHeight: 1.1,
          }}
        >
          {headline}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WaitlistForm size="lg" />
        </div>
        <Counter />
      </div>
    </section>
  );
}
