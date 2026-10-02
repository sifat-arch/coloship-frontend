"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  useGetAllCouriers,
  useGetAllShipments,
  useGetAllUsers,
} from "@/hooks/admin.hook";
import { Package, Truck, Users, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

const OverviewStats = () => {
  const { data: shipmentsData, isLoading: shipmentsLoading } =
    useGetAllShipments({ limit: 1 });
  const { data: pendingCouriersData, isLoading: couriersLoading } =
    useGetAllCouriers({ verificationStatus: "PENDING", limit: 1 });
  const { data: usersData, isLoading: usersLoading } = useGetAllUsers({
    limit: 1,
  });
  const { data: activeDeliveriesData, isLoading: activeLoading } =
    useGetAllShipments({ status: "IN_TRANSIT", limit: 1 });

  const totalShipments = shipmentsData?.meta?.total ?? 0;
  const pendingCouriers = pendingCouriersData?.meta?.total ?? 0;
  const totalUsers = usersData?.meta?.total ?? 0;
  const activeDeliveries = activeDeliveriesData?.meta?.total ?? 0;

  const stats = [
    {
      title: "Total Shipments",
      value: shipmentsLoading ? "..." : totalShipments.toLocaleString(),
      description: "Lifetime parcels tracked",
      icon: Package,
      color: "text-blue-600 bg-blue-100",
      link: "/admin/shipments",
    },
    {
      title: "Pending Approvals",
      value: couriersLoading ? "..." : pendingCouriers.toLocaleString(),
      description: "Couriers awaiting review",
      icon: Truck,
      color: "text-amber-600 bg-amber-100",
      alert: pendingCouriers > 0,
      link: "/admin/approve-courier",
    },
    {
      title: "Active Users",
      value: usersLoading ? "..." : totalUsers.toLocaleString(),
      description: "Customers, couriers & staff",
      icon: Users,
      color: "text-green-600 bg-green-100",
      link: "/admin/users",
    },
    {
      title: "In Transit Parcels",
      value: activeLoading ? "..." : activeDeliveries.toLocaleString(),
      description: "On-the-road deliveries",
      icon: Clock,
      color: "text-purple-600 bg-purple-100",
      link: "/admin/shipments",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
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
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {item.value}
                    </h3>
                    {item.alert && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        <AlertCircle className="w-3 h-3" /> Action needed
                      </span>
                    )}
                  </div>
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
  );
};

export default OverviewStats;
