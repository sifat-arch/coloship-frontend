"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";

interface StatItem {
  end: number;
  label: string;
}

const stats: StatItem[] = [
  { end: 300000, label: "registered merchants" },
  { end: 7500, label: "delivery personnel" },
  { end: 1000, label: "delivery points" },
];

function CountUpNumber({ end, duration = 1.8 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const durationMs = duration * 1000;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Fast-rising ease-out cubic curve (starts rapid, smoothly settles at destination)
      const ease = 1 - Math.pow(1 - progress, 3.5);
      const current = Math.floor(ease * end);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums inline-block">
      {count.toLocaleString("en-US")}
    </span>
  );
}

const AboutStatsAndMission = () => {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top 3 Counters */}
        <div className="grid grid-cols-1 gap-8 border-b border-border pb-12 sm:grid-cols-3 sm:pb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-1"
            >
              <p className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                <CountUpNumber end={stat.end} duration={1.8} />
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission and Vision Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2">
          {/* Mission */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-sm sm:p-8">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-foreground">
              Our mission
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              To put a smile on your face with fast, secure and hassle-free
              deliveries.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-sm sm:p-8">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Globe className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-foreground">
              Our vision
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              To reimagine e-commerce logistics in Bangladesh through
              technology-driven solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStatsAndMission;
