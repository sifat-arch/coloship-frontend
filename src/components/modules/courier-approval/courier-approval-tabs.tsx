"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourierApprovalTable from "./courier-approval-table";
import { ChangeEvent, Suspense, useState } from "react";
import CourierApprovalTableSkeleton from "./courier-approval-tabil-skaliton";

import { Input } from "@/components/ui/input";
import {
  CourierParams,
  CourierVerificationStatus,
} from "@/types/courier.status";
import CourierApprovalSheet from "./courier-approval-sheet";
import { useDebounce } from "@/hooks/debounce.hook";

import { Search } from "lucide-react";

const CourierApprovalTabs = () => {
  const verificationStatus: ["ALL" | CourierVerificationStatus, string][] = [
    ["ALL", "All"],
    ["PENDING", "Pending"],
    ["APPROVED", "Approved"],
    ["REJECTED", "Rejected"],
  ];
  const [tab, setTeb] = useState<"ALL" | CourierVerificationStatus>("ALL");
  const [selectedId, setSelectedId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };
  const debounceSearch = useDebounce(searchInput);

  const queryParams: CourierParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    ...(debounceSearch ? { searchTerm: debounceSearch } : {}),
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="search"
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={(e) => handleSearch(e)}
            className="w-full pl-9"
          />
        </div>

        <Tabs value={tab} onValueChange={(value) => setTeb(value as "ALL" | CourierVerificationStatus)} className="w-full sm:w-auto">
          <TabsList className="w-full grid grid-cols-4 sm:flex sm:w-auto">
            {verificationStatus.map(([value, level]) => (
              <TabsTrigger value={value} key={level} className="text-xs sm:text-sm">
                {level}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Suspense fallback={<CourierApprovalTableSkeleton />}>
        <CourierApprovalTable
          {...queryParams}
          handleReview={setSelectedId}
          handlePageChange={setPage}
        />
      </Suspense>

      <CourierApprovalSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        {...queryParams}
      />
    </>
  );
};

export default CourierApprovalTabs;
