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
            "radial-gradient(circle, rgba(190, 27, 42, 0.18) 0%, rgba(225, 70, 90, 0.12) 40%, transparent 70%)",
          filter: "blur(120px)",
          animation: "orb-drift-1 40s ease-in-out infinite",
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
            "radial-gradient(circle, rgba(217, 119, 57, 0.12) 0%, rgba(217, 119, 57, 0.025) 50%, transparent 70%)",
          filter: "blur(130px)",
          animation: "orb-drift-2 52s ease-in-out infinite",
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
            "radial-gradient(circle, rgba(100, 116, 139, 0.10) 0%, rgba(100, 116, 139, 0.015) 50%, transparent 70%)",
          filter: "blur(110px)",
          animation: "orb-drift-3 36s ease-in-out infinite",
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
            "radial-gradient(circle, rgba(225, 70, 90, 0.13) 0%, transparent 65%)",
          filter: "blur(100px)",
          animation: "orb-drift-4 58s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Ambient wash 1 — Warm undertone, upper-left area */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: "clamp(500px, 60vw, 900px)",
          height: "clamp(400px, 50vw, 700px)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(225, 70, 90, 0.04) 0%, transparent 60%)",
          filter: "blur(140px)",
          animation: "wash-drift-1 45s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Ambient wash 2 — Cool undertone, lower-right area */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          width: "clamp(450px, 55vw, 850px)",
          height: "clamp(350px, 45vw, 650px)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(100, 116, 139, 0.035) 0%, transparent 60%)",
          filter: "blur(140px)",
          animation: "wash-drift-2 55s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
