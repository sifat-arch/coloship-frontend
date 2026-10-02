"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/debounce.hook";
import { ShipmentParams, ShipmentStatus } from "@/types/shipment.type";
import { ChangeEvent, Suspense, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShipmentTable from "./shipment-table";
import ShipmentSheet from "./shipment-sheet";
import ShipmentTableSkeleton from "./shipment-table-skalition";

const ShipmentTabs = () => {
  const shipmentStatuses: ["ALL" | ShipmentStatus, string][] = [
    ["ALL", "All"],
    ["PICKUP_REQUESTED", "Pending Assignment"],
    ["COURIER_ASSIGNED", "Assigned"],
    ["IN_TRANSIT", "In Transit"],
    ["DELIVERED", "Delivered"],
  ];
  const [tab, setTab] = useState<"ALL" | ShipmentStatus>("ALL");
  const [selectedId, setSelectedId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };
  const debounceSearch = useDebounce(searchInput);

  const queryParams: ShipmentParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { status: tab }),
    ...(debounceSearch ? { searchTerm: debounceSearch } : {}),
  };

  const handleTabChange = (value: string) => {
    setTab(value as "ALL" | ShipmentStatus);
    setPage(1);
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          <Input
            type="search"
            placeholder="Search by tracking, name or email"
            value={searchInput}
            onChange={(e) => handleSearch(e)}
          />
        </div>

        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList>
            {shipmentStatuses.map(([value, label]) => (
              <TabsTrigger value={value} key={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Suspense fallback={<ShipmentTableSkeleton />}>
        <ShipmentTable
          {...queryParams}
          handleReview={setSelectedId}
          handlePageChange={setPage}
        />
      </Suspense>

      <ShipmentSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        {...queryParams}
      />
    </>
  );
};

export default ShipmentTabs;
