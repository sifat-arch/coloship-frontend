"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTrackShipment } from "@/hooks/customer.hook";
import TrackingSearchBar from "@/components/modules/track-parcel/tracking-search-bar";
import TrackingStatusHero from "@/components/modules/track-parcel/tracking-status-hero";
import TrackingTimelineStepper from "@/components/modules/track-parcel/tracking-timeline-stepper";
import TrackingEventsHistory from "@/components/modules/track-parcel/tracking-events-history";
import TrackingRouteCard from "@/components/modules/track-parcel/tracking-route-card";
import { Button } from "@/components/ui/button";
import {
  Package,
  Navigation,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  Search,
  Loader2,
  PackageCheck,
} from "lucide-react";
import Link from "next/link";

function TrackParcelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL query parameter if present
  const initialNumber =
    searchParams.get("trackingNumber") || searchParams.get("id") || "";

  const [searchedNumber, setSearchedNumber] = useState<string>(initialNumber);

  useEffect(() => {
    if (initialNumber && initialNumber !== searchedNumber) {
      setSearchedNumber(initialNumber);
    }
  }, [initialNumber]);

  // Query Hook
  const { data, isLoading, isError } = useTrackShipment(searchedNumber);

  const shipment = data?.data;

  const handleSearch = (trackingNumber: string) => {
    const trimmed = trackingNumber.trim();
    setSearchedNumber(trimmed);
    router.replace(
      `/customer/track?trackingNumber=${encodeURIComponent(trimmed)}`,
    );
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Navigation className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Live Logistics Tracker
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Track Your Parcel
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor real-time progress, dispatch status, and milestone updates.
          </p>
        </div>

        <Link href="/customer/shipments">
          <Button variant="outline" size="sm" className="gap-2">
            <PackageCheck className="w-4 h-4" /> My Shipments
          </Button>
        </Link>
      </div>

      {/* Prominent Search Bar */}
      <div className="space-y-2">
        <TrackingSearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
          initialValue={searchedNumber}
        />
        <p className="text-center text-xs text-muted-foreground">
          Enter your 8-digit tracking number (e.g.{" "}
          <span className="font-mono font-medium">CS-829104</span>)
        </p>
      </div>

      {/* Content Area */}
      {isLoading ? (
        // Loading State
        <div className="flex flex-col items-center justify-center py-20 space-y-3 bg-card border rounded-2xl shadow-xs">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-foreground">
            Locating your shipment...
          </p>
          <p className="text-xs text-muted-foreground">
            Fetching the latest journey updates from Coloship hubs.
          </p>
        </div>
      ) : isError || (searchedNumber && !shipment && !isLoading) ? (
        // Error / Not Found State
        <div className="py-12 px-6 max-w-md mx-auto text-center space-y-4 bg-card border rounded-2xl shadow-xs">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-600 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground">
              Shipment Not Found
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We couldn't find any shipment matching tracking number{" "}
              <span className="font-mono font-bold text-foreground">
                "{searchedNumber}"
              </span>
              . Please check the spelling or confirm with your booking receipt.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchedNumber("")}
            >
              Try Another Number
            </Button>
            <Link href="/customer/shipments">
              <Button size="sm">Go to My Shipments</Button>
            </Link>
          </div>
        </div>
      ) : shipment ? (
        // Successful Data View
        <div className="space-y-6">
          {/* 1. Hero Overview */}
          <TrackingStatusHero shipment={shipment} />

          {/* 2. Visual Milestones Stepper */}
          <TrackingTimelineStepper
            status={shipment.status}
            pickedUpAt={shipment.pickedUpAt}
            deliveredAt={shipment.deliveredAt}
            cancelledAt={shipment.cancelledAt}
          />

          {/* 3. Details Grid: Live Events & Route Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TrackingEventsHistory events={shipment.trackingEvents || []} />
            <TrackingRouteCard shipment={shipment} />
          </div>
        </div>
      ) : (
        // Initial Empty State
        <div className="py-16 px-6 text-center space-y-4 bg-card/60 border border-dashed rounded-2xl max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center shadow-2xs">
            <Search className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-foreground">
              Ready to Track a Shipment?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Paste or type your tracking number in the search bar above to see
              its exact real-time milestone and location.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/customer/shipments">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <Package className="w-3.5 h-3.5" /> View My Shipments to Copy
                Tracking ID
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackParcelPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      }
    >
      <TrackParcelContent />
    </Suspense>
  );
}
