"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
