import { type CSSProperties } from "react";

interface SectionDividerProps {
  /** Gradient tint direction: warm (red), cool (blue-gray), neutral */
  tint?: "warm" | "cool" | "neutral";
  /** Flip the curve direction */
  flip?: boolean;
  style?: CSSProperties;
}

export function SectionDivider({
  tint = "neutral",
  flip = false,
  style,
}: SectionDividerProps) {
  const tintMap = {
    warm: "rgba(190, 27, 42, 0.04)",
    cool: "rgba(100, 116, 139, 0.04)",
    neutral: "rgba(0, 0, 0, 0.015)",
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(60px, 8vw, 120px)",
        overflow: "hidden",
        transform: flip ? "scaleY(-1)" : undefined,
        ...style,
      }}
    >
      {/* Soft radial gradient bridge */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${tintMap[tint]} 0%, transparent 70%)`,
        }}
      />
      {/* Curved SVG edge */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <path
          d="M0,120 C360,20 1080,20 1440,120 L1440,120 L0,120 Z"
          fill="var(--color-bg)"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );
}
