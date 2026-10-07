"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Package,
  ArrowRight,
  Search,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DeliveryAnimation from "./delivery-animation";

export default function HeroSection() {
  const router = useRouter();
  const [trackingCode, setTrackingCode] = useState("");

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      router.push(`/track?code=${encodeURIComponent(trackingCode.trim())}`);
    } else {
      router.push("/track");
    }
  };

  return (
    <section className="relative isolate flex flex-col justify-between overflow-hidden border-b border-border/60 bg-background pt-2 sm:pt-4 md:pt-5 lg:pt-6 pb-0 xl:min-h-[calc(100vh-4rem)]">
      {/* =========================================================================
          1. BACKGROUND IMAGE: public/hero-section-background.png
      ========================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-section-background.png')",
        }}
      />

      {/* Subtle Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-primary/10 via-sky-400/5 to-transparent blur-3xl"
      />

      {/* Main Content Container (Compact Vertical Rhythm for 1-Page Fit) */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          {/* =========================================================================
              2. LEFT COLUMN: Badge, Typography, Actions, Stats
          ========================================================================== */}
          <div className="flex flex-col items-start text-left lg:col-span-7">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200/90 bg-white/95 px-3 py-1 text-[11px] sm:text-xs font-medium text-slate-700 shadow-2xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200"
            >
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                99.8% On-Time Guarantee
              </span>
              <span className="text-slate-300 dark:text-slate-700 font-light">|</span>
              <span className="text-primary font-medium">Nationwide Coverage</span>
            </motion.div>

            {/* Main Headline (Compact Scale to prevent vertical blowout) */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mt-3 sm:mt-3.5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-[44px] lg:text-[48px] xl:text-[52px] leading-[1.12]"
            >
              Anywhere in the
              <br />
              country,
              <br />
              <span className="relative inline-block text-primary">
                on time.
                {/* Subtle curved / wavy accent underline SVG */}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5 text-primary/45 -z-10"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C35 2 68 12 101 6C134 0 167 10 198 4"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300"
            >
              Four hundred and ninety-five upazilas, a thousand delivery points,
              seventy-five hundred people on the road — one reliable logistics network.
            </motion.p>

            {/* Action Bar: Send a Parcel + Inline Track Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="mt-4 sm:mt-5 flex w-full flex-col gap-2.5 sm:flex-row sm:items-center"
            >
              {/* Send a Parcel Button */}
              <Link href="/customer/book-parcel" className="shrink-0">
                <Button
                  size="default"
                  className="h-10 sm:h-11 w-full sm:w-auto gap-2 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold px-5 text-xs sm:text-sm shadow-md shadow-primary/25 transition-all duration-200 active:scale-[0.98]"
                >
                  <Package className="size-4" />
                  <span>Send a Parcel</span>
                  <ArrowRight className="size-3.5 ml-0.5" />
                </Button>
              </Link>

              {/* Inline Tracking Form */}
              <form
                onSubmit={handleTrackSubmit}
                className="relative flex w-full sm:w-auto flex-1 max-w-sm items-center rounded-full border border-slate-200/90 bg-white/95 p-1 pl-3 shadow-2xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
              >
                <Search className="size-3.5 text-slate-400 shrink-0 mr-1.5" />
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="Track shipment link or code"
                  className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary/90"
                >
                  Track
                </button>
              </form>
            </motion.div>

            {/* Micro-features Checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="mt-3 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <Check className="size-3.5 stroke-[3]" />
                No account required
              </span>
              <span className="text-slate-400">•</span>
              <span>Doorstep pickup across all 64 districts</span>
              <span className="text-slate-400">•</span>
              <span>Real-time SMS</span>
            </motion.div>

            {/* Stat Pills Row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5"
            >
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1 text-[11px] sm:text-xs text-slate-700 shadow-2xs dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300">
                <span className="size-2 rounded-full bg-blue-600" />
                <strong className="font-bold text-slate-900 dark:text-white">495</strong>
                <span className="text-slate-500">upazilas</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1 text-[11px] sm:text-xs text-slate-700 shadow-2xs dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300">
                <span className="size-2 rounded-full bg-blue-600" />
                <strong className="font-bold text-slate-900 dark:text-white">1,000</strong>
                <span className="text-slate-500">delivery hubs</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1 text-[11px] sm:text-xs text-slate-700 shadow-2xs dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300">
                <span className="size-2 rounded-full bg-blue-600" />
                <strong className="font-bold text-slate-900 dark:text-white">7,500</strong>
                <span className="text-slate-500">delivery personnel</span>
              </div>
            </motion.div>
          </div>

          {/* =========================================================================
              3. RIGHT COLUMN: Scooter Animation (BORDERLESS - NO BOX) + Floating Badges
          ========================================================================== */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            {/* Soft Pastel Circular Backdrop (replaces harsh square box) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute size-[260px] sm:size-[320px] rounded-full bg-gradient-to-tr from-sky-200/35 via-emerald-100/25 to-primary/15 blur-2xl -z-10"
            />

            {/* Scooter Lottie Animation Container (Completely Borderless) */}
            <div className="relative flex w-full items-center justify-center">
              {/* Floating Pill Badge 1 (Top-Right): Direct Doorstep Hub */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 right-1 sm:right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-3 py-1 text-[11px] sm:text-xs font-semibold text-slate-800 shadow-md backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100"
              >
                <span className="size-1.5 rounded-full bg-blue-600" />
                <span>Direct Doorstep Hub</span>
              </motion.div>

              {/* Floating Pill Badge 2 (Middle-Left): Parcel Delivered • Just now */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-1/3 -left-1 sm:left-0 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-3 py-1 text-[11px] sm:text-xs font-semibold text-slate-800 shadow-md backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100"
              >
                <div className="flex size-4.5 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-2.5 stroke-[3]" />
                </div>
                <span>Parcel Delivered</span>
                <span className="text-[10px] font-normal text-slate-400">• Just now</span>
              </motion.div>

              {/* Pure Scooter Animation: NO BOX, NO BORDER, COMPACT HEIGHT */}
              <DeliveryAnimation
                animationData="/animation/delevery-service-lotty.json"
                className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] h-[210px] sm:h-[250px] md:h-[280px]"
                lottieClassName="w-full h-full object-contain pointer-events-none drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. BOTTOM SECTION: 100% Full-Width Window Truck Animation (hero-truck.json)
      ========================================================================== */}
      <div className="mt-auto w-full overflow-hidden border-t border-slate-200/70 bg-gradient-to-b from-transparent to-slate-50/80 dark:border-slate-800/80 dark:to-slate-950/40 pt-1 pb-0 px-0">
        <DeliveryAnimation
          animationData="/animation/hero-truck.json"
          className="w-full h-16 sm:h-20 md:h-24 lg:h-28 p-0 m-0"
          lottieClassName="w-full h-full pointer-events-none block"
          rendererSettings={{ preserveAspectRatio: "none" }}
        />
      </div>
    </section>
  );
}
