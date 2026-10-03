"use client";

import React from "react";
import { ShipmentStatus } from "@/types/shipment.type";
import {
  Package,
  Truck,
  Navigation,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { cn } from "cn";

interface TrackingTimelineStepperProps {
  status: ShipmentStatus;
  pickedUpAt?: string | null;
  deliveredAt?: string | null;
  cancelledAt?: string | null;
}

interface StepItem {
  key: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const steps: StepItem[] = [
  {
    key: "CREATED",
    label: "Order Placed",
    sublabel: "Parcel booked & registered",
    icon: Package,
  },
  {
    key: "PICKED_UP",
    label: "Picked Up",
    sublabel: "Collected by courier rider",
    icon: Truck,
  },
  {
    key: "IN_TRANSIT",
    label: "In Transit",
    sublabel: "Processing through delivery hubs",
    icon: Navigation,
  },
  {
    key: "OUT_FOR_DELIVERY",
    label: "Out For Delivery",
    sublabel: "Courier is heading to destination",
    icon: Clock,
  },
  {
    key: "DELIVERED",
    label: "Delivered",
    sublabel: "Handed over to recipient",
    icon: CheckCircle2,
  },
];

// Determine step index based on ShipmentStatus
const getStepIndex = (status: ShipmentStatus): number => {
  switch (status) {
    case "CREATED":
    case "PAYMENT_PENDING":
    case "PAID":
    case "PICKUP_REQUESTED":
      return 0;
    case "COURIER_ASSIGNED":
    case "PICKED_UP":
      return 1;
    case "AT_ORIGIN_HUB":
    case "IN_TRANSIT":
    case "AT_DESTINATION_HUB":
      return 2;
    case "OUT_FOR_DELIVERY":
      return 3;
    case "DELIVERED":
      return 4;
    case "DELIVERY_FAILED":
    case "CANCELLED":
    case "RETURNED":
      return -1; // special handling
    default:
      return 0;
  }
};

export default function TrackingTimelineStepper({
  status,
  pickedUpAt,
  deliveredAt,
  cancelledAt,
}: TrackingTimelineStepperProps) {
  const currentIndex = getStepIndex(status);
  const isCancelled = status === "CANCELLED";
  const isFailed = status === "DELIVERY_FAILED";

  return (
    <div className="bg-card p-6 rounded-xl border shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Navigation className="w-4 h-4 text-primary" /> Delivery Progress
        </h3>
        {isCancelled && (
          <span className="text-xs font-semibold text-rose-600 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Order Cancelled
          </span>
        )}
        {isFailed && (
          <span className="text-xs font-semibold text-amber-600 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Delivery Attempt Failed
          </span>
        )}
      </div>

      {/* Progress Steps */}
      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
        {steps.map((step, index) => {
          const StepIcon = step.icon;

          let isDone = !isCancelled && !isFailed && index <= currentIndex;
          let isCurrent = !isCancelled && !isFailed && index === currentIndex;

          if (isCancelled && index === 0) {
            isDone = true;
          }

          return (
            <div
              key={step.key}
              className={cn(
                "relative flex flex-row md:flex-col items-center md:items-start gap-3 p-3 rounded-xl border transition-all",
                isCurrent
                  ? "bg-primary/5 border-primary/40 ring-1 ring-primary/20"
                  : isDone
                  ? "bg-card border-border/80"
                  : "bg-muted/30 border-dashed border-muted text-muted-foreground"
              )}
            >
              {/* Icon Bubble */}
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-2xs",
                  isCurrent
                    ? "bg-primary text-primary-foreground"
                    : isDone
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <StepIcon className="w-5 h-5" />
              </div>

              {/* Text Info */}
              <div className="space-y-0.5 min-w-0">
                <p
                  className={cn(
                    "text-xs font-bold leading-tight truncate",
                    isCurrent ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                  {step.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
