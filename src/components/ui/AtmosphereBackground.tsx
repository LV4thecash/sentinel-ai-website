"use client";

import { useEffect, useRef } from "react";

export function AtmosphereBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const scrollY = window.scrollY;
            containerRef.current.style.setProperty(
              "--scroll-y",
              `${scrollY}px`
            );
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Orb 1 — Warm red-rose, upper right */}
      <div
        style={{
          position: "absolute",
          top: "calc(-5% + calc(var(--scroll-y, 0px) * 0.08))",
          right: "-8%",
          width: "clamp(350px, 45vw, 600px)",
          height: "clamp(350px, 45vw, 600px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--orb-warm) 0%, var(--orb-rose) 40%, transparent 70%)",
          filter: "blur(100px)",
          animation: "orb-drift-1 24s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Orb 2 — Amber-peach, lower left */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(10% + calc(var(--scroll-y, 0px) * -0.05))",
          left: "-12%",
          width: "clamp(300px, 40vw, 520px)",
          height: "clamp(300px, 40vw, 520px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--orb-amber) 0%, rgba(217, 119, 57, 0.03) 50%, transparent 70%)",
          filter: "blur(110px)",
          animation: "orb-drift-2 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Orb 3 — Cool blue-slate, center bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(-10% + calc(var(--scroll-y, 0px) * -0.04))",
          left: "30%",
          width: "clamp(280px, 35vw, 480px)",
          height: "clamp(280px, 35vw, 480px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--orb-cool) 0%, rgba(100, 116, 139, 0.02) 50%, transparent 70%)",
          filter: "blur(90px)",
          animation: "orb-drift-3 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Orb 4 — Subtle rose accent, mid-page left */}
      <div
        style={{
          position: "absolute",
          top: "calc(40% + calc(var(--scroll-y, 0px) * 0.06))",
          left: "5%",
          width: "clamp(200px, 25vw, 380px)",
          height: "clamp(200px, 25vw, 380px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--orb-rose) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "orb-drift-1 30s ease-in-out infinite reverse",
          willChange: "transform",
        }}
      />
    </div>
  );
}
