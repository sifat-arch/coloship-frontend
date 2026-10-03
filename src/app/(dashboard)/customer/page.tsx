"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetMe } from "@/hooks/auth.hook";
import { useGetMyShipments, useGetAddresses } from "@/hooks/customer.hook";
import ShipmentStatusBadge from "@/components/modules/customer-shipments/shipment-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Truck,
  CheckCircle2,
  MapPin,
  Plus,
  Navigation,
  ArrowRight,
  ExternalLink,
  Search,
  Loader2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function CustomerDashboardOverview() {
  const router = useRouter();
  const [quickTrackNumber, setQuickTrackNumber] = useState("");

  // Current User
  const { data: userData } = useGetMe();
  const user = userData?.data;

  // Shipments (Latest 5)
  const { data: shipmentsData, isLoading: shipmentsLoading } = useGetMyShipments({
    limit: 5,
    page: 1,
  });
  const recentShipments = shipmentsData?.data || [];
  const meta = shipmentsData?.meta;

  // Addresses
  const { data: addressesData } = useGetAddresses();
  const addressCount = addressesData?.data?.length || 0;

  // Metric counts
  const totalShipments = meta?.total || 0;
  const inTransitCount = recentShipments.filter((s) =>
    ["PICKUP_REQUESTED", "COURIER_ASSIGNED", "PICKED_UP", "AT_ORIGIN_HUB", "IN_TRANSIT", "AT_DESTINATION_HUB", "OUT_FOR_DELIVERY"].includes(
      s.status
    )
  ).length;
  const deliveredCount = recentShipments.filter((s) => s.status === "DELIVERED").length;

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackNumber.trim()) {
      router.push(`/customer/track?trackingNumber=${encodeURIComponent(quickTrackNumber.trim())}`);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* 1. Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-card border p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Customer Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Welcome back, {user?.name ? user.name.split(" ")[0] : "Customer"}! 👋
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Book fast intra-city deliveries, track packages live with GPS milestone updates, and manage your shipments effortlessly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/customer/book-parcel">
              <Button size="lg" className="gap-2 shadow-xs font-semibold">
                <Plus className="w-4 h-4" /> Book a Parcel
              </Button>
            </Link>
            <Link href="/customer/shipments">
              <Button size="lg" variant="outline" className="gap-2">
                <Package className="w-4 h-4" /> My Shipments
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Total Bookings</p>
              <p className="text-2xl font-bold">{totalShipments}</p>
              <p className="text-[11px] text-muted-foreground">Lifetime parcels</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Active In-Transit</p>
              <p className="text-2xl font-bold">{inTransitCount}</p>
              <p className="text-[11px] text-muted-foreground">On the move</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Delivered</p>
              <p className="text-2xl font-bold">{deliveredCount}</p>
              <p className="text-[11px] text-muted-foreground">Completed orders</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Saved Addresses</p>
              <p className="text-2xl font-bold">{addressCount}</p>
              <Link
                href="/customer/addresses"
                className="text-[11px] text-primary hover:underline font-medium"
              >
                Manage address book
              </Link>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Quick Track Bar Widget */}
      <div className="p-5 rounded-2xl border bg-card shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Navigation className="w-4 h-4 text-primary" /> Instant Parcel Tracking
        </div>
        <form onSubmit={handleQuickTrackSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter tracking number (e.g. CS-982341) to check live status..."
              value={quickTrackNumber}
              onChange={(e) => setQuickTrackNumber(e.target.value)}
              className="pl-9 font-mono"
            />
          </div>
          <Button type="submit" disabled={!quickTrackNumber.trim()} className="gap-2 shrink-0">
            Track Now <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </div>

      {/* 4. Recent Shipments Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Recent Shipments
            </h2>
            <p className="text-xs text-muted-foreground">
              Your most recently placed delivery orders.
            </p>
          </div>

          <Link href="/customer/shipments">
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary hover:underline">
              View All ({totalShipments}) <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {shipmentsLoading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3 bg-card border rounded-xl">
            <Loader2 className="w-7 h-7 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">Loading recent shipments...</p>
          </div>
        ) : recentShipments.length === 0 ? (
          <div className="py-14 px-6 text-center space-y-3 bg-card border border-dashed rounded-xl">
            <div className="w-12 h-12 rounded-full bg-muted text-muted-foreground mx-auto flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold">No Shipments Booked Yet</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Start by booking your first parcel delivery with fast courier dispatch.
            </p>
            <Link href="/customer/book-parcel">
              <Button size="sm" className="gap-1.5 mt-2">
                <Plus className="w-4 h-4" /> Book a Parcel
              </Button>
            </Link>
          </div>
        ) : (
          <div className="border rounded-xl bg-card overflow-hidden shadow-xs divide-y">
            {recentShipments.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-xs text-primary">
                      {item.trackingNumber}
                    </span>
                    <ShipmentStatusBadge status={item.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    To:{" "}
                    <span className="font-medium text-foreground">
                      {item.deliveryAddress?.recipientName}
                    </span>{" "}
                    ({item.deliveryAddress?.city}) • {item.weight} KG •{" "}
                    {item.deliveryType === "EXPRESS" ? "⚡ Express" : "Standard"}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto pt-2 sm:pt-0 border-t sm:border-0">
                  <span className="text-xs font-semibold text-foreground">
                    ৳{item.deliveryFee}
                  </span>

                  <Link href={`/customer/track?trackingNumber=${item.trackingNumber}`}>
                    <Button variant="outline" size="sm" className="h-7.5 px-3 text-xs gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-primary" /> Track
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
