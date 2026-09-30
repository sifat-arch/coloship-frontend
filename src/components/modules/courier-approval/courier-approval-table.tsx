"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CourierApprovalSheet from "./courier-approval-sheet";
import { useGetAllCouriers, useSuspenseAllCouriers } from "@/hooks/admin.hook";

const CourierApprovalTable = () => {
  const { data } = useSuspenseAllCouriers();
  const couriers = data?.data || [];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead>Vehicle Type</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {couriers.map((courier) => (
            <TableRow key={courier.id}>
              <TableCell> {courier.user.name} </TableCell>
              <TableCell> {courier.licenseNumber} </TableCell>
              <TableCell>{courier.user.email} </TableCell>
              <TableCell> {courier.phone} </TableCell>
              <TableCell> {courier.vehicleType} </TableCell>

              <TableCell className="text-right">
                <CourierApprovalSheet />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourierApprovalTable;
