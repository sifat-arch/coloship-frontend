"use client";

import React from "react";
import { ShipmentStatus } from "@/types/shipment.type";
import { cn } from "cn";
import {
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Navigation,
} from "lucide-react";

interface ShipmentStatusBadgeProps {
  status: ShipmentStatus | string;
  className?: string;
  showIcon?: boolean;
}

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; border: string; icon: React.ElementType }
> = {
  CREATED: {
    label: "Created",
    bg: "bg-blue-500/10 dark:bg-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
    icon: Clock,
  },
  PAYMENT_PENDING: {
    label: "Payment Pending",
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/30",
    icon: Clock,
  },
  PAID: {
    label: "Paid",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
    icon: CheckCircle2,
  },
  PICKUP_REQUESTED: {
    label: "Pickup Requested",
    bg: "bg-sky-500/10 dark:bg-sky-500/20",
    text: "text-sky-600 dark:text-sky-400",
    border: "border-sky-500/30",
    icon: Package,
  },
  COURIER_ASSIGNED: {
    label: "Courier Assigned",
    bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500/30",
    icon: Truck,
  },
  PICKED_UP: {
    label: "Picked Up",
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/30",
    icon: Package,
  },
  AT_ORIGIN_HUB: {
    label: "At Hub",
    bg: "bg-purple-500/10 dark:bg-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/30",
    icon: Package,
  },
  IN_TRANSIT: {
    label: "In Transit",
    bg: "bg-blue-500/10 dark:bg-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
    icon: Navigation,
  },
  AT_DESTINATION_HUB: {
    label: "At Destination Hub",
    bg: "bg-purple-500/10 dark:bg-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/30",
    icon: Package,
  },
  OUT_FOR_DELIVERY: {
    label: "Out For Delivery",
    bg: "bg-teal-500/10 dark:bg-teal-500/20",
    text: "text-teal-600 dark:text-teal-400",
    border: "border-teal-500/30",
    icon: Truck,
  },
  DELIVERED: {
    label: "Delivered",
    bg: "bg-green-500/10 dark:bg-green-500/20",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-500/30",
    icon: CheckCircle2,
  },
  DELIVERY_FAILED: {
    label: "Delivery Failed",
    bg: "bg-rose-500/10 dark:bg-rose-500/20",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500/30",
    icon: AlertTriangle,
  },
  CANCELLED: {
    label: "Cancelled",
    bg: "bg-zinc-500/10 dark:bg-zinc-500/20",
    text: "text-zinc-600 dark:text-zinc-400",
    border: "border-zinc-500/30",
    icon: XCircle,
  },
  RETURNED: {
    label: "Returned",
    bg: "bg-red-500/10 dark:bg-red-500/20",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-500/30",
    icon: RotateCcw,
  },
};

export default function ShipmentStatusBadge({
  status,
  className,
  showIcon = true,
}: ShipmentStatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status.replace(/_/g, " "),
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-border",
    icon: Package,
  };

  const IconComponent = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {showIcon && <IconComponent className="w-3.5 h-3.5 shrink-0" />}
      <span>{config.label}</span>
    </span>
  );
}
