"use client";

import React from "react";
import { CustomerShipmentItem } from "@/types/customer.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, User, FileText, CheckCircle2 } from "lucide-react";

interface TrackingRouteCardProps {
  shipment: CustomerShipmentItem;
}

export default function TrackingRouteCard({
  shipment,
}: TrackingRouteCardProps) {
  return (
    <Card className="border shadow-xs">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" /> Route & Addresses
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Pickup Location */}
        <div className="p-4 rounded-xl border bg-card space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Pickup Origin
            </span>
            {shipment.pickupAddress?.phone && (
              <span className="text-muted-foreground font-mono flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {shipment.pickupAddress.phone}
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-foreground">
            {shipment.pickupAddress?.recipientName}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {shipment.pickupAddress?.addressLine}, {shipment.pickupAddress?.area},{" "}
            {shipment.pickupAddress?.city}
          </p>
        </div>

        {/* Delivery Destination */}
        <div className="p-4 rounded-xl border bg-card space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Delivery Destination
            </span>
            {shipment.deliveryAddress?.phone && (
              <span className="text-muted-foreground font-mono flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {shipment.deliveryAddress.phone}
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-foreground">
            {shipment.deliveryAddress?.recipientName}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {shipment.deliveryAddress?.addressLine}, {shipment.deliveryAddress?.area},{" "}
            {shipment.deliveryAddress?.city}
          </p>
        </div>

        {/* Package Description Note */}
        {shipment.parcelDescription && (
          <div className="p-3 bg-muted/40 rounded-xl border text-xs space-y-1">
            <span className="font-semibold text-muted-foreground flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> Instructions / Description
            </span>
            <p className="text-foreground leading-relaxed">
              {shipment.parcelDescription}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
