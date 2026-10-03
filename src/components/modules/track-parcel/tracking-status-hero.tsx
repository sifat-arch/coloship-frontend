"use client";

import React, { useState } from "react";
import { CustomerShipmentItem } from "@/types/customer.type";
import ShipmentStatusBadge from "@/components/modules/customer-shipments/shipment-status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  Copy,
  Check,
  Package,
  Calendar,
  Clock,
  Truck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface TrackingStatusHeroProps {
  shipment: CustomerShipmentItem;
}

export default function TrackingStatusHero({
  shipment,
}: TrackingStatusHeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shipment.trackingNumber);
    setCopied(true);
    toast.add({
      title: "Copied!",
      description: "Tracking number copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const isCompleted = shipment.status === "DELIVERED";
  const isFailed = shipment.status === "DELIVERY_FAILED";
  const isCancelled = shipment.status === "CANCELLED";

  return (
    <Card className="border shadow-xs overflow-hidden bg-card">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Shipment Tracking
              </span>
              <ShipmentStatusBadge status={shipment.status} />
            </div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-foreground">
                {shipment.trackingNumber}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-2.5 text-xs gap-1.5 shadow-2xs"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>
          </div>

          {/* Route Pills */}
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-xs px-4 py-2.5 rounded-xl border self-start sm:self-auto shadow-2xs">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">
                From
              </span>
              <p className="text-xs font-semibold text-foreground">
                {shipment.pickupAddress?.city || "Origin"}
              </p>
            </div>
            <div className="px-1 text-primary">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground">
                To
              </span>
              <p className="text-xs font-semibold text-foreground">
                {shipment.deliveryAddress?.city || "Destination"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Specs Grid */}
      <CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" /> Booked On
            </span>
            <p className="text-sm font-semibold">
              {new Date(shipment.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-primary" /> Service Speed
            </span>
            <p className="text-sm font-semibold">
              {shipment.deliveryType === "EXPRESS"
                ? "⚡ Express (24 Hours)"
                : "Standard (2-3 Days)"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-primary" /> Parcel Weight
            </span>
            <p className="text-sm font-semibold">{shipment.weight} KG</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Payment Method
            </span>
            <p className="text-sm font-semibold">
              {Number(shipment.codAmount) > 0
                ? `COD: ৳${shipment.codAmount}`
                : "Paid Online"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
