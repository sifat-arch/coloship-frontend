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
        allowNestedScroll: true,
        prevent: (node) => {
          return (
            node.hasAttribute?.("data-lenis-prevent") ||
            Boolean(node.closest?.("[data-lenis-prevent]")) ||
            Boolean(node.closest?.('[data-slot="sheet-content"]')) ||
            Boolean(node.closest?.('[data-slot="sheet-portal"]')) ||
            Boolean(node.closest?.('[data-slot="dialog-content"]')) ||
            Boolean(node.closest?.('[role="dialog"]'))
          );
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}
