"use client";

import { Lottie } from "lottie-react";
import { useEffect, useState } from "react";

interface AboutAnimationProps {
  className?: string;
  src?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function AboutAnimation({
  className = "",
  src = "/animation/hero-about.json",
  loop = true,
  autoplay = true,
}: AboutAnimationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-primary/5 ${className}`}
      >
        <span className="size-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Lottie
        src={src}
        loop={loop}
        autoplay={autoplay}
        className="h-full w-full object-contain drop-shadow-xs"
      />
    </div>
  );
}
