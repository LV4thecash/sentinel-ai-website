interface SectionDividerProps {
  /** Which zone color the gradient starts from */
  from?: "light" | "dark";
  /** Which zone color the gradient ends at */
  to?: "light" | "dark";
}

const zones: Record<string, string> = {
  light: "#F5F0F1",
  dark: "#252022",
};

export function SectionDivider({
  from = "light",
  to = "dark",
}: SectionDividerProps) {
  const isZoneChange = from !== to;

  if (!isZoneChange) return null;

  const fromColor = zones[from];
  const toColor = zones[to];

  /* Build a multi-stop gradient for an organic ease-in-out feel
     rather than a simple linear 2-stop interpolation */
  const gradient =
    from === "light"
      ? /* Light → Dark: slow departure from light, accelerate into dark */
        `linear-gradient(180deg, ${fromColor} 0%, #E2DBDD 18%, #A89A9E 42%, #5C5054 66%, #332D2F 82%, ${toColor} 100%)`
      : /* Dark → Light: quick departure from dark, ease into light */
        `linear-gradient(180deg, ${fromColor} 0%, #332D2F 18%, #5C5054 34%, #A89A9E 58%, #E2DBDD 82%, ${toColor} 100%)`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(80px, 12vw, 150px)",
        background: gradient,
        overflow: "hidden",
      }}
    >
      {/* Warm accent radial glow at the transition midpoint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 80% at 50% 50%, rgba(190, 27, 42, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle horizon line — glass edge catching light */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "8%",
          right: "8%",
          height: "1px",
          background:
            from === "light"
              ? "linear-gradient(90deg, transparent 0%, rgba(190, 27, 42, 0.10) 25%, rgba(190, 27, 42, 0.14) 50%, rgba(190, 27, 42, 0.10) 75%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.06) 25%, rgba(255, 255, 255, 0.10) 50%, rgba(255, 255, 255, 0.06) 75%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
