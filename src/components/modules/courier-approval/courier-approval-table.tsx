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

import { useSuspenseAllCouriers } from "@/hooks/admin.hook";
import { CourierParams } from "@/types/courier.status";
import { Dispatch, SetStateAction } from "react";
import TablePagination from "@/components/ui/table-pagination";
import { FolderSearch } from "lucide-react";

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
      <div className="border rounded-lg overflow-hidden bg-card">
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
            {couriers.length > 0 ? (
              couriers.map((courier, idx) => (
                <TableRow
                  key={courier.id}
                  className="animate-table-row transition-colors hover:bg-primary/[0.04]"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <TableCell className="font-semibold text-foreground">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs ring-1 ring-primary/20">
                        {courier.user?.name?.charAt(0) || "C"}
                      </div>
                      <span>{courier.user?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {courier.licenseNumber}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {courier.user?.email}
                  </TableCell>
                  <TableCell className="text-xs">
                    {courier.phone}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border">
                      {courier.vehicleType}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:border-primary/50 hover:text-primary transition-all text-xs h-8"
                      onClick={() => handleReview(courier.id)}
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
                        No couriers found
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        There are no courier requests available at the moment.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {couriers.length > 0 && (
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

export default CourierApprovalTable;
