"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourierApprovalTable from "./courier-approval-table";
import { Suspense, useState } from "react";
import CourierApprovalTableSkeleton from "./courier-approval-tabil-skaliton";

import { Input } from "@/components/ui/input";
import {
  CourierParams,
  CourierVerificationStatus,
} from "@/types/courier.status";

const CourierApprovalTabs = () => {
  const verificationStatus: ["ALL" | CourierVerificationStatus, string][] = [
    ["APPROVED", "Approved"],
    ["PENDING", "Pending"],
    ["REJECTED", "Rejected"],
    ["ALL", "All"],
  ];
  const [tab, setTeb] = useState<"ALL" | CourierVerificationStatus>("ALL");

  const queryParams: CourierParams = {
    page: 1,
    limit: 10,
    ...(tab === "ALL" ? {} : {verificationStatus:tab}),
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          <Input type="search" placeholder="Search by name or email" />
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
        <CourierApprovalTable {...queryParams} />
      </Suspense>
    </>
  );
};

export default CourierApprovalTabs;
