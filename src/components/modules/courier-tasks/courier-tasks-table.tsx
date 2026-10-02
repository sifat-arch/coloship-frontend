"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseMyAssignments } from "@/hooks/courier.hook";
import { PackageX, Phone } from "lucide-react";

interface Props {
  status?: string;
  searchTerm?: string;
  handleReview: Dispatch<SetStateAction<string>>;
}

const CourierTasksTable = ({
  status,
  searchTerm = "",
  handleReview,
}: Props) => {
  const { data } = useSuspenseMyAssignments(status);
  const allTasks = data?.data || [];

  // Filter tasks by searchTerm (trackingNumber, customer name, or cities)
  const filteredTasks = allTasks.filter((task) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      task.trackingNumber.toLowerCase().includes(term) ||
      task.customer?.name?.toLowerCase().includes(term) ||
      task.pickupAddress?.city?.toLowerCase().includes(term) ||
      task.deliveryAddress?.city?.toLowerCase().includes(term)
    );
  });

  const getStatusBadge = (taskStatus: string) => {
    switch (taskStatus) {
      case "COURIER_ASSIGNED":
        return "bg-amber-100 text-amber-700 border-amber-200 animate-pulse";
      case "PICKED_UP":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "IN_TRANSIT":
      case "OUT_FOR_DELIVERY":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "DELIVERED":
        return "bg-green-100 text-green-700 border-green-200";
      case "DELIVERY_FAILED":
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tracking No</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Pickup Route</TableHead>
            <TableHead>Delivery Route</TableHead>
            <TableHead>COD Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-semibold text-primary">
                  #{task.trackingNumber}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{task.customer?.name}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                      {task.customer?.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs space-y-0.5">
                    <p className="font-medium text-foreground">
                      {task.pickupAddress?.recipientName}
                    </p>
                    <p className="text-muted-foreground truncate max-w-[140px]">
                      {task.pickupAddress?.area}, {task.pickupAddress?.city}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs space-y-0.5">
                    <p className="font-medium text-foreground">
                      {task.deliveryAddress?.recipientName}
                    </p>
                    <p className="text-muted-foreground truncate max-w-[140px]">
                      {task.deliveryAddress?.area}, {task.deliveryAddress?.city}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {Number(task.codAmount) > 0 ? (
                    <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs border border-amber-200">
                      ৳{task.codAmount}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Prepaid</span>
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getStatusBadge(
                      task.status,
                    )}`}
                  >
                    {task.status.replace(/_/g, " ")}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReview(task.id)}
                  >
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center space-y-3 py-8">
                  <div className="p-3 bg-muted rounded-full text-muted-foreground">
                    <PackageX className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-semibold">No delivery tasks</h4>
                    <p className="text-sm text-muted-foreground">
                      There are no delivery tasks matching your current filter.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourierTasksTable;
