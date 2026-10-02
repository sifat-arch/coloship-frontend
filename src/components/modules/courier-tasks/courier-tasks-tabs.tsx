"use client";

import { ChangeEvent, Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDebounce } from "@/hooks/debounce.hook";
import CourierTasksTable from "./courier-tasks-table";
import CourierTaskSheet from "./courier-task-sheet";
import CourierTasksSkeleton from "./courier-tasks-skeleton";

const CourierTasksTabs = () => {
  const taskStatuses = [
    ["ALL", "All Tasks"],
    ["COURIER_ASSIGNED", "New Requests"],
    ["PICKED_UP", "Picked Up"],
    ["OUT_FOR_DELIVERY", "Out for Delivery"],
    ["DELIVERED", "Delivered"],
  ];

  const [tab, setTab] = useState<string>("ALL");
  const [selectedId, setSelectedId] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const debounceSearch = useDebounce(searchInput);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div>
          <Input
            type="search"
            placeholder="Search tracking, customer, city..."
            value={searchInput}
            onChange={handleSearch}
            className="w-full sm:w-72"
          />
        </div>

        <Tabs value={tab} onValueChange={(val) => setTab(val)} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-2 sm:flex w-full">
            {taskStatuses.map(([value, label]) => (
              <TabsTrigger value={value} key={value} className="text-xs sm:text-sm">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<CourierTasksSkeleton />}>
        <CourierTasksTable
          status={tab}
          searchTerm={debounceSearch}
          handleReview={setSelectedId}
        />
      </Suspense>

      <CourierTaskSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        status={tab}
      />
    </>
  );
};

export default CourierTasksTabs;
