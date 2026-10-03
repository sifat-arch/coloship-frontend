"use client";

import React, { useState } from "react";
import { Package, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetMyShipments } from "@/hooks/customer.hook";
import { useDebounce } from "@/hooks/debounce.hook";
import ShipmentsStatsCards from "@/components/modules/customer-shipments/shipments-stats-cards";
import ShipmentsFilterBar from "@/components/modules/customer-shipments/shipments-filter-bar";
import ShipmentTable from "@/components/modules/customer-shipments/shipment-table";
import ShipmentDetailsSheet from "@/components/modules/customer-shipments/shipment-details-sheet";

export default function CustomerShipmentsPage() {
  // Filters & Pagination State
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("ALL");
  const [deliveryType, setDeliveryType] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);

  // Debounced Search (350ms delay)
  const debouncedSearch = useDebounce(searchTerm, 350);

  // Fetch Shipments with TanStack Query
  const { data, isLoading } = useGetMyShipments({
    page,
    limit: 10,
    searchTerm: debouncedSearch,
    status: status === "ALL" ? undefined : status,
    deliveryType: deliveryType === "ALL" ? undefined : deliveryType,
  });

  const shipments = data?.data || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

  // Filter change handlers
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setPage(1);
  };

  const handleDeliveryTypeChange = (newType: string) => {
    setDeliveryType(newType);
    setPage(1);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleResetFilters = () => {
    setStatus("ALL");
    setDeliveryType("ALL");
    setSearchTerm("");
    setPage(1);
  };

  const isFiltered =
    status !== "ALL" || deliveryType !== "ALL" || searchTerm.trim().length > 0;

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Package className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Deliveries Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Shipments
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your parcel deliveries, check live milestones, and manage booked orders.
          </p>
        </div>

        <Link href="/customer/book-parcel">
          <Button className="gap-2 shadow-xs">
            <Plus className="w-4 h-4" /> Book a Parcel
          </Button>
        </Link>
      </div>

      {/* Stats Summary Cards */}
      <ShipmentsStatsCards
        shipments={shipments}
        totalCount={meta.total}
        isLoading={isLoading}
      />

      {/* Filter and Search Bar */}
      <ShipmentsFilterBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        deliveryType={deliveryType}
        onDeliveryTypeChange={handleDeliveryTypeChange}
        onReset={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* Shipments Data Table */}
      <ShipmentTable
        shipments={shipments}
        isLoading={isLoading}
        totalPages={meta.totalPages}
        currentPage={page}
        onPageChange={setPage}
        onSelectShipment={(id) => setSelectedShipmentId(id)}
      />

      {/* Live Journey & Tracking Details Sheet */}
      <ShipmentDetailsSheet
        selectedId={selectedShipmentId}
        onClose={() => setSelectedShipmentId(null)}
      />
    </div>
  );
}
