"use client";

import { CircleCheckBig, MapPinned, ScanLine } from "lucide-react";
import { useRouter } from "next/navigation";
import TrackingSearchBar from "@/components/modules/track-parcel/tracking-search-bar";

const trackingHighlights = [
  { icon: ScanLine, label: "Live milestone updates" },
  { icon: MapPinned, label: "Pickup to doorstep" },
  { icon: CircleCheckBig, label: "COD status included" },
];

const ParcelTracking = () => {
  const router = useRouter();

  // Reuses the existing tracking route + tracking page logic as-is.
  const handleSearch = (trackingNumber: string) => {
    router.push(
      `/customer/track?trackingNumber=${encodeURIComponent(trackingNumber)}`,
    );
  };

  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background p-4 shadow-xs sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-1 text-xs font-semibold tracking-widest text-primary uppercase">
              Parcel tracking
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Track your parcel, every step of the way
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              Enter the tracking number from your booking receipt to see the
              latest milestone, courier status and delivery route of your
              shipment.
            </p>

            <TrackingSearchBar onSearch={handleSearch} />

            <p className="text-xs text-muted-foreground">
              Enter your 8-digit tracking number (e.g.{" "}
              <span className="font-mono font-medium text-foreground">
                CS-829104
              </span>
              )
            </p>

            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
              {trackingHighlights.map((item) => (
                <li key={item.label} className="flex items-center gap-1.5">
                  <item.icon className="size-3.5 shrink-0 text-primary" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParcelTracking;
