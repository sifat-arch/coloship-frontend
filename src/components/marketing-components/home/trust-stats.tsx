// export default TrustStats;

import { Box, ScanLine, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

const serviceItems = [
  {
    icon: Box,
    title: "Send a parcel",
    description: "Person to person or shop to buyer, anywhere in the country.",
    href: "/customer/book-parcel",
  },
  {
    icon: ScanLine,
    title: "Track a parcel",
    description: "Open the link from your SMS. No account needed.",
    href: "/customer/track",
  },
  {
    icon: BarChart3,
    title: "For business",
    description: "Pickup, cash on delivery, next-day payout and one dashboard.",
    href: "/services",
  },
];

const TrustStats = () => {
  return (
    <section
      aria-label="Three jobs, one network"
      className="border-b bg-background py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="flex flex-col justify-between gap-4 pb-17 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Three jobs, one network
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="text-sm text-muted-foreground sm:text-base">
              One letter or ten thousand parcels a month — the same riders, the
              same tracking.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 divide-y divide-border/60 border-y border-border/60 md:grid-cols-3 md:divide-y-0 md:divide-x">
          {serviceItems.map((card) => (
            <div
              key={card.title}
              className="group flex flex-col justify-between p-5 transition-colors hover:bg-muted/30 sm:p-6 lg:p-8"
            >
              <div>
                <div className="flex size-10 items-center justify-center text-primary">
                  <card.icon className="size-6 stroke-[1.8]" />
                </div>

                <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-1">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3 hover:underline"
                >
                  <span>See how</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
