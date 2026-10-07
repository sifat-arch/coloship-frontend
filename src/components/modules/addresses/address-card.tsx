"use client";

import React from "react";
import { CustomerAddress } from "@/types/customer.type";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Building2, Warehouse, MapPin, Phone, User, CheckCircle2 } from "lucide-react";

interface AddressCardProps {
  address: CustomerAddress;
}

const getLabelIcon = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes("home")) return Home;
  if (lower.includes("office") || lower.includes("work")) return Building2;
  return Warehouse;
};

export default function AddressCard({ address }: AddressCardProps) {
  const IconComponent = getLabelIcon(address.label || "");

  return (
    <Card className="border border-border/70 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 bg-card overflow-hidden group">
      <CardContent className="p-5 space-y-4">
        {/* Header with Label and Default Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <IconComponent className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-foreground capitalize">
                {address.label || "Address"}
              </span>
            </div>
          </div>

          {address.isDefault && (
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Default
            </span>
          )}
        </div>

        {/* Contact info */}
        <div className="space-y-1.5 pt-1 border-t">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span>{address.recipientName}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span>{address.phone}</span>
          </div>
        </div>

        {/* Physical Address */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed pt-1">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
          <span>
            {address.addressLine}, {address.area}, {address.city}
            {address.postalCode ? ` - ${address.postalCode}` : ""}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
