"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllShipments } from "@/hooks/admin.hook";
import { ArrowUpRight, Package, Truck } from "lucide-react";
import Link from "next/link";

const RecentShipments = () => {
  const { data, isLoading } = useGetAllShipments({ limit: 5, page: 1 });
  const shipments = data?.data || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700 border-green-200";
      case "IN_TRANSIT":
      case "OUT_FOR_DELIVERY":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "COURIER_ASSIGNED":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "PICKUP_REQUESTED":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <Card className="border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Recent Shipments</CardTitle>
          <CardDescription>
            The latest orders processed across the network
          </CardDescription>
        </div>
        <Link href="/admin/shipments">
          <Button variant="outline" size="sm" className="gap-1.5">
            View All <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    Loading recent orders...
                  </TableCell>
                </TableRow>
              ) : shipments.length > 0 ? (
                shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">
                      #{shipment.trackingNumber}
                    </TableCell>
                    <TableCell>{shipment.customer.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {shipment.deliveryAddress?.city || "N/A"}
                    </TableCell>
                    <TableCell>
                      {shipment.courier?.user?.name ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium">
                          <Truck className="w-3.5 h-3.5 text-muted-foreground" />
                          {shipment.courier.user.name}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">
                          Unassigned
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getStatusBadge(
                          shipment.status,
                        )}`}
                      >
                        {shipment.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ৳{shipment.deliveryFee}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No shipments found in database.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentShipments;
