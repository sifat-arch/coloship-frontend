"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export interface FadeInWhenVisibleProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function FadeInWhenVisible({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 30,
  className = "",
  viewport = { once: true, margin: "-100px" },
  ...props
}: FadeInWhenVisibleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default FadeInWhenVisible;
