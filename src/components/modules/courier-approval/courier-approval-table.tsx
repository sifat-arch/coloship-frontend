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
import { useSuspenseAllCouriers } from "@/hooks/admin.hook";
import { CourierParams } from "@/types/courier.status";
import { Dispatch, SetStateAction } from "react";
import TablePagination from "@/components/ui/table-pagination";

interface Props extends CourierParams {
  handleReview: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

const CourierApprovalTable = ({
  handleReview,
  handlePageChange,
  ...params
}: Props) => {
  const { data } = useSuspenseAllCouriers(params);
  const couriers = data?.data || [];

  return (
    <>
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
                  <Button
                    variant="outline"
                    onClick={() => handleReview(courier.id)}
                  >
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="my-5">
        <TablePagination
          page={params.page ?? 0}
          totalPages={data?.meta.totalPages ?? 0}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CourierApprovalTable;
