"use client";

import { type CSSProperties, type ReactNode, useState } from "react";

interface GlassCardProps {
  children: ReactNode;
  style?: CSSProperties;
  hoverLift?: boolean;
  hoverGlow?: boolean;
  accentBorder?: boolean;
  padding?: string;
  className?: string;
}

export function GlassCard({
  children,
  style,
  hoverLift = true,
  hoverGlow = false,
  accentBorder = false,
  padding = "1.5rem",
  className,
}: GlassCardProps) {
  const [hovered, setHovered] = useState(false);

  const baseStyle: CSSProperties = {
    background: "var(--glass-bg-strong)",
    backdropFilter: `blur(var(--glass-blur))`,
    WebkitBackdropFilter: `blur(var(--glass-blur))`,
    border: `1px solid ${
      hovered && accentBorder
        ? "var(--color-accent)"
        : "var(--glass-border)"
    }`,
    borderRadius: "var(--radius-md)",
    padding,
    boxShadow: hovered
      ? `var(--shadow-glass-hover)${hoverGlow ? ", var(--shadow-glow-accent)" : ""}`
      : "var(--shadow-glass)",
    transform: hoverLift && hovered ? "translateY(-4px)" : "translateY(0)",
    transition: `transform var(--motion-fast) var(--motion-ease-out),
                 box-shadow var(--motion-fast) ease,
                 border-color var(--motion-fast) ease`,
    ...style,
  };

  return (
    <div
      className={className}
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}
