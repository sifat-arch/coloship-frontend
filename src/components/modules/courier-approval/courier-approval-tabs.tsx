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

const CourierApprovalTabs = () => {
  const verificationStatus: ["ALL" | CourierVerificationStatus, string][] = [
    ["APPROVED", "Approved"],
    ["PENDING", "Pending"],
    ["REJECTED", "Rejected"],
    ["ALL", "All"],
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
      <div className="flex justify-between mb-4">
        <div>
          <Input
            type="search"
            placeholder="Search by name or email"
            value={searchInput}
            onChange={(e) => handleSearch(e)}
          />
        </div>

        <Tabs value={tab} onValueChange={(value) => setTeb(value)}>
          <TabsList>
            {verificationStatus.map(([value, level]) => (
              <TabsTrigger value={value} key={level}>
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
