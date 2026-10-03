"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X, RotateCcw } from "lucide-react";
import { ShipmentStatus } from "@/types/shipment.type";

interface ShipmentsFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
  deliveryType: string;
  onDeliveryTypeChange: (type: string) => void;
  onReset: () => void;
  isFiltered: boolean;
}

const statusTabs: { value: string; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "CREATED", label: "Created" },
  { value: "PICKUP_REQUESTED", label: "Pickup Req" },
  { value: "IN_TRANSIT", label: "In Transit" },
  { value: "OUT_FOR_DELIVERY", label: "Out For Delivery" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function ShipmentsFilterBar({
  searchTerm,
  onSearchChange,
  status,
  onStatusChange,
  deliveryType,
  onDeliveryTypeChange,
  onReset,
  isFiltered,
}: ShipmentsFilterBarProps) {
  return (
    <div className="space-y-3 bg-card p-4 rounded-xl border">
      {/* Upper Row: Search & Delivery Speed & Reset */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by tracking ID or description..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-8"
          />
          {searchTerm && (
            <Button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>

        {/* Delivery Type Quick Buttons */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border bg-muted/40 p-1 text-xs">
            <button
              type="button"
              onClick={() => onDeliveryTypeChange("ALL")}
              className={`px-3 py-1 rounded-md transition-colors font-medium ${
                deliveryType === "ALL"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Speed
            </button>
            <button
              type="button"
              onClick={() => onDeliveryTypeChange("STANDARD")}
              className={`px-3 py-1 rounded-md transition-colors font-medium ${
                deliveryType === "STANDARD"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => onDeliveryTypeChange("EXPRESS")}
              className={`px-3 py-1 rounded-md transition-colors font-medium ${
                deliveryType === "EXPRESS"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ⚡ Express
            </button>
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-xs h-8 gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Lower Row: Status Tabs */}
      <div className="overflow-x-auto pb-1">
        <Tabs value={status} onValueChange={onStatusChange}>
          <TabsList className="h-8 bg-muted/60 p-0.5">
            {statusTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-xs px-3 h-7 data-[state=active]:bg-background data-[state=active]:shadow-xs"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
