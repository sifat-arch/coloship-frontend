"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourierApprovalTable from "./courier-approval-table";
import { Suspense } from "react";
import CourierApprovalTableSkeleton from "./courier-approval-tabil-skaliton";

const CourierApprovalTabs = () => {
  return (
    <>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">active</TabsTrigger>
          <TabsTrigger value="suspended">suspended</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>
      <Suspense fallback={<CourierApprovalTableSkeleton />}>
        <CourierApprovalTable />
      </Suspense>
    </>
  );
};

export default CourierApprovalTabs;
