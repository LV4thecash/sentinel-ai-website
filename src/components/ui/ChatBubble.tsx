interface ChatBubbleProps {
  lines: string[];
  highlight?: string;
  blocked?: boolean;
  dark?: boolean;
}

export function ChatBubble({ lines, highlight, blocked = false, dark = false }: ChatBubbleProps) {
  return (
    <div
      style={{
        background: dark ? "rgba(255, 255, 255, 0.04)" : "rgba(244, 243, 245, 0.55)",
        border: `1px solid ${
          blocked
            ? "rgba(190,27,42,0.35)"
            : dark
              ? "var(--glass-dark-border)"
              : "var(--glass-border)"
        }`,
        borderRadius: "var(--radius-sm)",
        padding: "0.75rem 1rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        lineHeight: 1.65,
        color: dark ? "var(--zone-dark-text-secondary)" : "var(--color-text-secondary)",
      }}
    >
      {lines.map((line, i) => {
        if (highlight && line.includes(highlight)) {
          const idx = line.indexOf(highlight);
          const before = line.slice(0, idx);
          const after = line.slice(idx + highlight.length);
          return (
            <div key={i}>
              {before}
              <span
                style={{
                  color: "var(--color-accent)",
                  background: dark ? "rgba(190, 27, 42, 0.2)" : "var(--color-accent-lo)",
                  borderRadius: 2,
                  padding: "0 2px",
                }}
              >
                {highlight}
              </span>
              {after}
            </div>
          );
        }
        return <div key={i}>{line}</div>;
      })}
    </div>
  );
}
