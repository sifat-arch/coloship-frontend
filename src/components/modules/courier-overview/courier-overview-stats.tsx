"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  useGetCourierDashboardStats,
  useToggleAvailability,
} from "@/hooks/courier.hook";
import { useGetMe } from "@/hooks/auth.hook";
import {
  Truck,
  CheckCircle2,
  DollarSign,
  PackageCheck,
  Radio,
  Power,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const CourierOverviewStats = () => {
  const { data: userData } = useGetMe();
  const isSuspended =
    userData?.data?.status === "SUSPENDED" || userData?.data?.status === "BLOCKED";

  const { data, isLoading } = useGetCourierDashboardStats();
  const stats = data?.data;

  const { mutate: toggleDuty, isPending: togglePending } =
    useToggleAvailability();

  const handleToggle = () => {
    toggleDuty(undefined, {
      onSuccess: (res) => {
        if (res?.success) {
          const statusText = res.data.isAvailable ? "Online (On Duty)" : "Offline (Off Duty)";
          toast.add({
            title: "Duty Status Updated",
            description: `You are now ${statusText}.`,
          });
        }
      },
      onError: (err: any) => {
        toast.add({
          title: "Update Failed",
          description: err?.message || "Failed to toggle availability.",
        });
      },
    });
  };

  const isOnline = stats?.isAvailable ?? false;

  const cardItems = [
    {
      title: "Active Tasks",
      value: isLoading ? "..." : (stats?.activeTasks ?? 0),
      description: "Deliveries in progress",
      icon: Truck,
      color: "text-primary bg-primary/10 border border-primary/20",
      link: "/courier/tasks",
    },
    {
      title: "Completed Today",
      value: isLoading ? "..." : (stats?.completedToday ?? 0),
      description: "Parcels delivered today",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-500/10 border border-emerald-500/20",
      link: "/courier/tasks",
    },
    {
      title: "Today's COD Collected",
      value: isLoading ? "..." : `৳${Number(stats?.todayCodCollected ?? 0).toLocaleString()}`,
      description: "Cash collected today",
      icon: DollarSign,
      color: "text-amber-600 bg-amber-500/10 border border-amber-500/20",
      link: "/courier/tasks",
    },
    {
      title: "Total Completed",
      value: isLoading ? "..." : (stats?.totalCompleted ?? 0),
      description: "Lifetime successful deliveries",
      icon: PackageCheck,
      color: "text-purple-600 bg-purple-500/10 border border-purple-500/20",
      link: "/courier/tasks",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Availability Status Banner Card */}
      <div className="p-4 md:p-5 rounded-2xl border bg-card shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-3.5 h-3.5 rounded-full ${
              isSuspended
                ? "bg-amber-500 ring-4 ring-amber-100 dark:ring-amber-950"
                : isOnline
                  ? "bg-emerald-500 animate-pulse ring-4 ring-emerald-100 dark:ring-emerald-950"
                  : "bg-gray-400"
            }`}
          />
          <div>
            <h3 className="text-base font-semibold flex items-center gap-2">
              Duty Status:{" "}
              <span
                className={
                  isSuspended
                    ? "text-amber-600"
                    : isOnline
                      ? "text-emerald-600"
                      : "text-muted-foreground"
                }
              >
                {isSuspended
                  ? "Suspended (Restricted)"
                  : isOnline
                    ? "Online (Available for tasks)"
                    : "Offline (Not taking tasks)"}
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              {isSuspended
                ? "Your courier account is suspended. You cannot switch to Online mode or take new delivery tasks."
                : isOnline
                  ? "You can receive parcel assignments from the central admin hub."
                  : "Toggle duty ON to start receiving new delivery tasks."}
            </p>
          </div>
        </div>

        <Button
          onClick={handleToggle}
          disabled={togglePending || isSuspended}
          variant={isOnline ? "outline" : "default"}
          size="sm"
          title={isSuspended ? "Account suspended: Cannot change duty status" : undefined}
          className={`gap-2 ${
            isSuspended
              ? "opacity-60 cursor-not-allowed bg-muted text-muted-foreground"
              : !isOnline
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20"
                : "border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-700"
          }`}
        >
          <Power className="w-4 h-4" />
          {togglePending
            ? "Updating..."
            : isSuspended
              ? "Duty Disabled"
              : isOnline
                ? "Go Offline"
                : "Go Online"}
        </Button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} href={item.link}>
              <Card className="hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 cursor-pointer h-full border">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.title}
                    </p>
                    <div className={`p-2.5 rounded-xl ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      {item.value}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CourierOverviewStats;
