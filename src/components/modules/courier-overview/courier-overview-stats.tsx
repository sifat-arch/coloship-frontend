"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  useGetCourierDashboardStats,
  useToggleAvailability,
} from "@/hooks/courier.hook";
import {
  Truck,
  CheckCircle2,
  DollarSign,
  PackageCheck,
  Radio,
  Power,
} from "lucide-react";
import Link from "next/link";

const CourierOverviewStats = () => {
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
      color: "text-blue-600 bg-blue-100",
      link: "/courier/tasks",
    },
    {
      title: "Completed Today",
      value: isLoading ? "..." : (stats?.completedToday ?? 0),
      description: "Parcels delivered today",
      icon: CheckCircle2,
      color: "text-green-600 bg-green-100",
      link: "/courier/tasks",
    },
    {
      title: "Today's COD Collected",
      value: isLoading ? "..." : `৳${Number(stats?.todayCodCollected ?? 0).toLocaleString()}`,
      description: "Cash collected today",
      icon: DollarSign,
      color: "text-amber-600 bg-amber-100",
      link: "/courier/tasks",
    },
    {
      title: "Total Completed",
      value: isLoading ? "..." : (stats?.totalCompleted ?? 0),
      description: "Lifetime successful deliveries",
      icon: PackageCheck,
      color: "text-purple-600 bg-purple-100",
      link: "/courier/tasks",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Availability Status Banner Card */}
      <div className="p-4 md:p-5 rounded-2xl border bg-card shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-3.5 h-3.5 rounded-full ${
              isOnline ? "bg-green-500 animate-pulse ring-4 ring-green-100" : "bg-gray-400"
            }`}
          />
          <div>
            <h3 className="text-base font-semibold flex items-center gap-2">
              Duty Status:{" "}
              <span className={isOnline ? "text-green-600" : "text-muted-foreground"}>
                {isOnline ? "Online (Available for tasks)" : "Offline (Not taking tasks)"}
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              {isOnline
                ? "You can receive parcel assignments from the central admin hub."
                : "Toggle duty ON to start receiving new delivery tasks."}
            </p>
          </div>
        </div>

        <Button
          onClick={handleToggle}
          disabled={togglePending}
          variant={isOnline ? "outline" : "default"}
          size="sm"
          className={`gap-2 ${
            !isOnline
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          }`}
        >
          <Power className="w-4 h-4" />
          {togglePending
            ? "Updating..."
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
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.title}
                    </p>
                    <div className={`p-2.5 rounded-lg ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <h3 className="text-2xl font-bold tracking-tight">
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
