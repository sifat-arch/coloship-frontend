import React from "react";
import CourierOverviewStats from "@/components/modules/courier-overview/courier-overview-stats";
import CourierOverviewCharts from "@/components/modules/courier-overview/courier-overview-charts";
import CourierUrgentTasks from "@/components/modules/courier-overview/courier-urgent-tasks";
import { Button } from "@/components/ui/button";
import { Truck, UserCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const CourierDashboard = () => {
  return (
    <section className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
      {/* Header with Quick Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Courier Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your delivery performance, active shipments, and manage duty availability.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/courier/profile">
            <Button variant="outline" size="sm" className="gap-1.5">
              <UserCheck className="w-4 h-4 text-primary" />
              My Profile
            </Button>
          </Link>
          <Link href="/courier/tasks">
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground">
              <Truck className="w-4 h-4" />
              My Deliveries
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. Availability Status Banner & KPI Cards */}
      <CourierOverviewStats />

      {/* 2. Interactive Charts (Shadcn Charts) */}
      <CourierOverviewCharts />

      {/* 3. Urgent & Active Tasks Table */}
      <CourierUrgentTasks />
    </section>
  );
};

export default CourierDashboard;
