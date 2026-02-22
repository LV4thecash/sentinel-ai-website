interface ChatBubbleProps {
  lines: string[];
  highlight?: string;
  blocked?: boolean;
}

export function ChatBubble({ lines, highlight, blocked = false }: ChatBubbleProps) {
  return (
    <div
      style={{
        background: "var(--color-bg-alt)",
        border: `1px solid ${blocked ? "rgba(190,27,42,0.35)" : "var(--color-border)"}`,
        borderRadius: 8,
        padding: "0.75rem 1rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        lineHeight: 1.65,
        color: "var(--color-text-secondary)",
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
                  background: "var(--color-accent-lo)",
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
