"use client";

import React from "react";
import { CustomerShipmentItem } from "@/types/customer.type";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Truck, CheckCircle2, DollarSign } from "lucide-react";

interface ShipmentsStatsCardsProps {
  shipments: CustomerShipmentItem[];
  totalCount?: number;
  isLoading?: boolean;
}

export default function ShipmentsStatsCards({
  shipments,
  totalCount = 0,
  isLoading = false,
}: ShipmentsStatsCardsProps) {
  // কাউন্ট হিসাব করা
  const activeCount = shipments.filter((s) =>
    ["PICKUP_REQUESTED", "COURIER_ASSIGNED", "PICKED_UP", "AT_ORIGIN_HUB", "IN_TRANSIT", "AT_DESTINATION_HUB", "OUT_FOR_DELIVERY"].includes(
      s.status
    )
  ).length;

  const deliveredCount = shipments.filter((s) => s.status === "DELIVERED").length;

  const totalCod = shipments.reduce((sum, s) => sum + (Number(s.codAmount) || 0), 0);

  const stats = [
    {
      title: "Total Bookings",
      value: totalCount || shipments.length,
      icon: Package,
      description: "Total parcels recorded",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Active In-Transit",
      value: activeCount,
      icon: Truck,
      description: "Currently on the move",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      title: "Delivered",
      value: deliveredCount,
      icon: CheckCircle2,
      description: "Successfully handed over",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Total COD (Page)",
      value: `৳${totalCod.toLocaleString()}`,
      icon: DollarSign,
      description: "Cash on delivery volume",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <Card key={idx} className="border shadow-xs hover:shadow-sm transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold tracking-tight">
                  {isLoading ? "..." : stat.value}
                </p>
                <p className="text-[11px] text-muted-foreground">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <IconComponent className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
