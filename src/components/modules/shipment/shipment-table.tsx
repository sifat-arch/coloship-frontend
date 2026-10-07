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
              shipments.map((shipment, idx) => (
                <TableRow
                  key={shipment.id}
                  className="animate-table-row transition-colors hover:bg-primary/[0.04]"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <TableCell className="font-mono font-bold text-xs text-primary">
                    {shipment.trackingNumber}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {shipment.customer?.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs max-w-[200px] truncate">
                    {shipment.pickupAddress?.city || shipment.pickupAddress?.addressLine}
                  </TableCell>
                  <TableCell className="text-xs">
                    {shipment.courier?.user?.name ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium">
                        {shipment.courier.user.name}
                      </span>
                    ) : (
                      <span className="text-muted-foreground italic text-xs">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {shipment.status.replace(/_/g, " ")}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:border-primary/50 hover:text-primary transition-all text-xs h-8"
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
