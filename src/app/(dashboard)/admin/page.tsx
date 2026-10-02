import React from "react";
import OverviewStats from "@/components/modules/admin-overview/overview-stats";
import OverviewCharts from "@/components/modules/admin-overview/overview-charts";
import RecentShipments from "@/components/modules/admin-overview/overview-recent-shipments";
import { Button } from "@/components/ui/button";
import { ArrowRight, PackagePlus, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <section className="p-6 md:p-8 space-y-8">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Admin Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Platform performance, shipment dispatch metrics, and quick operational shortcuts.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/admin/approve-courier">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Approve Couriers
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              Manage Users
            </Button>
          </Link>
          <Link href="/admin/shipments">
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground">
              <PackagePlus className="w-4 h-4" />
              Shipments Control
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. Live KPI Summary Cards */}
      <OverviewStats />

      {/* 2. Interactive Shadcn Charts */}
      <OverviewCharts />

      {/* 3. Recent Shipments Table */}
      <RecentShipments />
    </section>
  );
};

export default AdminDashboard;
