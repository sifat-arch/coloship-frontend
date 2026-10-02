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
import { useGetMyAssignments } from "@/hooks/courier.hook";
import { ArrowUpRight, MapPin, Truck, AlertCircle } from "lucide-react";
import Link from "next/link";

const CourierUrgentTasks = () => {
  const { data, isLoading } = useGetMyAssignments();
  const allTasks = data?.data || [];

  // Filter tasks that need immediate courier action (COURIER_ASSIGNED or OUT_FOR_DELIVERY or PICKED_UP)
  const urgentTasks = allTasks
    .filter(
      (task) =>
        task.status === "COURIER_ASSIGNED" ||
        task.status === "PICKED_UP" ||
        task.status === "OUT_FOR_DELIVERY",
    )
    .slice(0, 5);

  return (
    <Card className="border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            Active & Pending Deliveries
            {urgentTasks.length > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {urgentTasks.length} Ongoing
              </span>
            )}
          </CardTitle>
          <CardDescription>
            Deliveries requiring action, pickup or fulfillment
          </CardDescription>
        </div>
        <Link href="/courier/tasks">
          <Button variant="outline" size="sm" className="gap-1.5">
            View All Tasks <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking No</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Delivery City</TableHead>
                <TableHead>COD Cash</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    Loading active tasks...
                  </TableCell>
                </TableRow>
              ) : urgentTasks.length > 0 ? (
                urgentTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-semibold text-primary">
                      #{task.trackingNumber}
                    </TableCell>
                    <TableCell>{task.deliveryAddress?.recipientName}</TableCell>
                    <TableCell className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      {task.deliveryAddress?.city}
                    </TableCell>
                    <TableCell>
                      {Number(task.codAmount) > 0 ? (
                        <span className="font-semibold text-amber-700">
                          ৳{task.codAmount}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Prepaid</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                          task.status === "COURIER_ASSIGNED"
                            ? "bg-amber-100 text-amber-700 border-amber-200 animate-pulse"
                            : "bg-blue-100 text-blue-700 border-blue-200"
                        }`}
                      >
                        {task.status.replace(/_/g, " ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href="/courier/tasks">
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <p className="font-medium text-sm">No pending tasks right now.</p>
                      <p className="text-xs text-muted-foreground">
                        Keep duty status online to receive new parcel assignments.
                      </p>
                    </div>
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

export default CourierUrgentTasks;
