import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeliveryAnimation from "./delivery-animation";

const trustHighlights = [
  {
    icon: ShieldCheck,
    label: "100% Verified Couriers",
  },
  {
    icon: Navigation,
    label: "Real-time GPS Tracking",
  },
  {
    icon: Zap,
    label: "Fastest COD & bKash Settlement",
  },
];

const routeStops = [
  { label: "Booked", done: true },
  { label: "Picked up", done: true },
  { label: "In transit", done: true, current: true },
  { label: "Delivered", done: false },
];

const ratingStars = [1, 2, 3, 4, 5];

const customerAvatars = [
  {
    initials: "TA",
    bg: "from-blue-600 to-indigo-600",
  },
  {
    initials: "SR",
    bg: "from-emerald-600 to-teal-600",
  },
  {
    initials: "MK",
    bg: "from-amber-500 to-orange-600",
  },
  {
    initials: "NH",
    bg: "from-purple-600 to-pink-600",
  },
];

const HeroSection = () => {
  return (
    <section className="relative isolate min-h-[90vh] overflow-hidden border-b border-border/60 bg-background py-14 sm:py-20 lg:py-24">
      {/* =========================================================================
          1. CLEAN MOVING BACKGROUND: Animated Smooth Moving Gradient + Grid Matrix
      ========================================================================== */}
      {/* Dynamic Animated Moving Gradient Canvas (Slow Smooth Color Shift) */}
      <div
        aria-hidden="true"
        className="animate-moving-gradient pointer-events-none absolute inset-0 -z-20 bg-gradient-to-br from-primary/10 via-sky-400/10 via-background to-primary/5 opacity-90"
      />

      {/* Subtle Grid Pattern with Radial Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_30%,#000_20%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(100, 116, 139, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 116, 139, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Smooth Floating Glow Orb 1 (Top Center to Right) */}
      <div
        aria-hidden="true"
        className="animate-orb-1 pointer-events-none absolute -top-24 left-1/2 -z-10 h-[480px] w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/15 via-sky-400/15 to-transparent blur-3xl"
      />

      {/* Smooth Floating Glow Orb 2 (Left Bottom) */}
      <div
        aria-hidden="true"
        className="animate-orb-2 pointer-events-none absolute top-1/3 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8">
        {/* =========================================================================
            2. COPY & TYPOGRAPHY: Pill Badge, Gradient Headline, CTAs, Social Proof
        ========================================================================== */}
        <div className="flex flex-col items-start text-left">
          {/* Pill Badge (Announcement Pill with shimmer effect) */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md transition-all hover:border-primary/40 hover:bg-primary/10">
            <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Sparkles className="size-3" />
            </span>
            <span className="text-muted-foreground">ColoShip 2.0 Live:</span>
            <span className="font-semibold text-primary">
              Next-Gen Logistics Across Bangladesh
            </span>
            <ArrowRight className="size-3 text-primary/70" />
          </div>

          {/* Main Headline with High-contrast Modern Gradient */}
          <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.85rem]">
            Lightning-Fast,
            <span className="block bg-gradient-to-r from-primary via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Reliable Parcel Delivery
            </span>
            You Can Trust.
          </h1>

          {/* Subheading */}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Experience next-level parcel logistics across all 64 districts.
            Doorstep pickup, live GPS milestone tracking, instant bKash COD
            settlements, and zero hassle.
          </p>

          {/* Action Buttons (Dual Modern Pill Combo) */}
          <div className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center">
            {/* Primary Button: Solid Blue, rounded-full with glowing shadow & sliding arrow on hover */}
            <div className="relative group w-full sm:w-auto">
              {/* Soft Ambient Glow Layer */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-0.5 rounded-full bg-blue-600/40 opacity-70 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg"
              />
              <Button
                size="lg"
                className="relative h-12 w-full gap-2.5 rounded-full bg-blue-600 hover:bg-blue-700 px-7 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-[0.98] border border-blue-400/30 sm:w-auto"
                nativeButton={false}
                render={
                  <Link
                    href="/customer/book-parcel"
                    className="flex items-center gap-2"
                  >
                    <span>Book a Parcel</span>
                    <ArrowRight className="size-4.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                  </Link>
                }
              />
            </div>

            {/* Secondary Button: Pill rounded-full with border-blue-500/40, backdrop blur & hover glow fill */}
            <Button
              size="lg"
              variant="outline"
              className="h-12 w-full gap-2.5 rounded-full border border-blue-500/40 bg-background/60 hover:bg-blue-600/10 hover:border-blue-500 px-7 text-base font-semibold text-foreground backdrop-blur-md transition-all duration-200 hover:shadow-md hover:shadow-blue-500/10 active:scale-[0.98] sm:w-auto"
              nativeButton={false}
              render={
                <Link
                  href="/customer/track"
                  className="flex items-center gap-2"
                >
                  <Play className="size-4 fill-blue-600 text-blue-600" />
                  <span>Track Parcel</span>
                </Link>
              }
            />
          </div>

          {/* Trust Highlights Checklist */}
          <div className="mt-8 grid w-full grid-cols-1 gap-2.5 border-t border-border/70 pt-6 sm:grid-cols-3 sm:gap-4">
            {trustHighlights.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="size-3.5" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Social Proof Rating Card */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2.5 overflow-hidden">
              {customerAvatars.map((customer) => (
                <div
                  key={customer.initials}
                  className={`flex size-8.5 items-center justify-center rounded-full bg-gradient-to-br ${customer.bg} text-[11px] font-bold text-white ring-2 ring-background`}
                >
                  {customer.initials}
                </div>
              ))}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-amber-500">
                {ratingStars.map((star) => (
                  <Star key={star} className="size-3.5 fill-current" />
                ))}
                <span className="ml-1 text-xs font-bold text-foreground">
                  4.9 / 5.0
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Trusted by <strong className="text-foreground">15,000+</strong>{" "}
                merchants &amp; active shippers
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. RIGHT SIDE: LOTTIE ANIMATION BANNER + INTERACTIVE TRACKING CARD
        ========================================================================== */}
        <div className="relative mx-auto flex w-full max-w-lg flex-col gap-5 lg:max-w-none">
          {/* Backlight Glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-primary/25 via-sky-400/20 to-purple-500/20 opacity-70 blur-2xl -z-10"
          />

          {/* LOTTIE ANIMATION CARD (Delivery Service Animation) */}
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card/95 via-card/85 to-primary/5 p-3.5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:border-primary/40">
            <div className="flex items-center justify-between px-3 pt-1 pb-1">
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Live Logistics Fleet
                </span>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                Express Courier Active
              </span>
            </div>

            <div className="relative h-44 sm:h-52 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-muted/20">
              <DeliveryAnimation
                animationData={"/animation/delevery-service-lotty.json"}
                className="w-full h-full max-h-52"
              />
            </div>
          </div>

          {/* LIVE TRACKING CARD CONTAINER */}
          <div className="relative rounded-3xl border border-border/80 bg-card/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6 transition-all duration-300 hover:border-primary/30">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Truck className="size-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    Live Tracking ID
                  </span>
                  <p className="font-mono text-sm font-bold text-foreground">
                    CS-892410-BD
                  </p>
                </div>
              </div>

              {/* Pulsing Live Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Live on Route
              </div>
            </div>

            {/* Route Timeline Visualizer */}
            <div className="relative mt-4 rounded-2xl border border-border/60 bg-muted/30 p-3.5">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                {/* Pickup Origin */}
                <div className="space-y-0.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                    <MapPin className="size-3 text-primary" /> Origin
                  </span>
                  <p className="text-xs font-bold text-foreground">Dhaka Hub</p>
                  <p className="text-[11px] text-muted-foreground">
                    Mirpur-10 Sector
                  </p>
                </div>

                {/* Waypoint Center */}
                <div className="relative flex flex-col items-center px-1">
                  <div className="flex size-8 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary shadow-xs">
                    <Navigation className="size-3.5 animate-pulse" />
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-primary">
                    Express 24h
                  </span>
                </div>

                {/* Destination */}
                <div className="space-y-0.5 text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                    <MapPin className="size-3 text-sky-500" /> Destination
                  </span>
                  <p className="text-xs font-bold text-foreground">
                    Chattogram
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Agrabad C/A
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3.5 space-y-1.5">
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-primary via-indigo-600 to-sky-500 transition-all duration-1000" />
                </div>
                <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground">
                  {routeStops.map((stop) => (
                    <span
                      key={stop.label}
                      className={
                        stop.current
                          ? "font-bold text-primary"
                          : stop.done
                            ? "text-foreground"
                            : "text-muted-foreground/70"
                      }
                    >
                      {stop.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Courier Rider Status Box */}
            <div className="mt-3.5 flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/80 p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="relative flex size-9 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-sky-500 text-xs font-bold text-white shadow-xs">
                  AR
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-foreground">
                      Asif Rahman
                    </p>
                    <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[9px] font-semibold text-primary">
                      Verified Rider
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Estimated Delivery: Today by 4:30 PM
                  </p>
                </div>
              </div>

              <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600">
                COD ৳ 1,450
              </span>
            </div>
          </div>

          {/* Floating Pill Badge 1: Top-Left outside the Lottie card header */}
          <div className="animate-hero-float-reverse absolute -left-6 -top-4 z-20 hidden items-center gap-2 rounded-2xl border border-border/80 bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-xl backdrop-blur-md sm:flex">
            <span className="flex size-6 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600">
              <CheckCircle2 className="size-3.5" />
            </span>
            <div>
              <p className="text-[10px] font-bold leading-none">
                Doorstep Pickup
              </p>
              <p className="text-[9px] font-normal text-muted-foreground">
                In 15 mins
              </p>
            </div>
          </div>

          {/* Floating Pill Badge 2: Bottom Right */}
          <div className="animate-hero-float absolute -right-4 -bottom-3 z-20 hidden items-center gap-2 rounded-2xl border border-border/80 bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-xl backdrop-blur-md sm:flex">
            <span className="flex size-6 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600">
              <Clock className="size-3.5" />
            </span>
            <div>
              <p className="text-[10px] font-bold leading-none">
                99.4% On-Time
              </p>
              <p className="text-[9px] font-normal text-muted-foreground">
                Express SLA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
