"use client";
import { motion, useReducedMotion } from "motion/react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Enable blur-to-sharp entrance (cinematic) */
  blur?: boolean;
  /** Distance to travel on Y axis (default 16) */
  distance?: number;
}

export function FadeIn({
  children,
  delay = 0,
  className,
  style,
  blur = false,
  distance = 16,
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: distance,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
