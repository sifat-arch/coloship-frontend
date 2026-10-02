"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ShipmentParams } from "@/types/shipment.type";
import { Dispatch, SetStateAction } from "react";
import TablePagination from "@/components/ui/table-pagination";
import { FolderSearch } from "lucide-react";
import { useSuspenseAllShipments } from "@/hooks/admin.hook";

interface Props extends ShipmentParams {
  handleReview: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

const ShipmentTable = ({
  handleReview,
  handlePageChange,
  ...params
}: Props) => {
  const { data } = useSuspenseAllShipments(params);
  const shipments = data?.data || [];

  return (
    <>
      <div className="border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking No</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Assigned Courier</TableHead>
              <TableHead>Status </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.length > 0 ? (
              shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">
                    {" "}
                    {shipment.trackingNumber}{" "}
                  </TableCell>
                  <TableCell> {shipment.customer.name} </TableCell>
                  <TableCell>{shipment.pickupAddress.addressLine} </TableCell>
                  <TableCell> {shipment.courier?.user.name} </TableCell>
                  <TableCell> {shipment.status} </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReview(shipment.id)}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 py-8">
                    <div className="p-3 bg-muted rounded-full text-muted-foreground">
                      <FolderSearch className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-semibold">
                        No shipments found
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        There are no shipments available for the selected filter.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {shipments.length > 0 && (
        <div className="my-5">
          <TablePagination
            page={params.page ?? 1}
            totalPages={data?.meta.totalPages ?? 0}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default ShipmentTable;
