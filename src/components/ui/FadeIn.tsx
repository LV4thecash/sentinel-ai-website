"use client";
import { motion, useReducedMotion } from "motion/react";
import React from "react";

type Direction = "up" | "down" | "left" | "right";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Enable blur-to-sharp entrance (cinematic) — default true */
  blur?: boolean;
  /** Distance to travel in px (default 40) */
  distance?: number;
  /** Entrance direction (default "up") */
  direction?: Direction;
  /** Stagger delay between children (wraps each child in its own animation) */
  stagger?: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

function getInitialTransform(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
  }
}

export function FadeIn({
  children,
  delay = 0,
  className,
  style,
  blur = true,
  distance = 40,
  direction = "up",
  stagger,
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Stagger mode: wrap each child individually
  if (stagger != null) {
    const items = React.Children.toArray(children);
    return (
      <div className={className} style={style}>
        {items.map((child, i) => {
          const initial = getInitialTransform(direction, distance);
          return (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                ...initial,
                filter: blur ? "blur(6px)" : "blur(0px)",
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: delay + i * stagger,
                ease,
              }}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Single element mode
  const initial = getInitialTransform(direction, distance);

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initial,
        filter: blur ? "blur(6px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease,
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
