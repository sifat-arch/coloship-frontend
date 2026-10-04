/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TablePagination from "@/components/ui/table-pagination";
import ShipmentStatusBadge from "./shipment-status-badge";
import CancelShipmentDialog from "./cancel-shipment-dialog";
import { CustomerShipmentItem } from "@/types/customer.type";
import {
  Package,
  Eye,
  XCircle,
  Copy,
  Check,
  Truck,
  ArrowRight,
  PackageOpen,
  Calendar,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/toast";
import { useGetMe } from "@/hooks/auth.hook";

interface ShipmentTableProps {
  shipments: CustomerShipmentItem[];
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  onSelectShipment: (id: string) => void;
}

export default function ShipmentTable({
  shipments,
  isLoading,
  totalPages,
  currentPage,
  onPageChange,
  onSelectShipment,
}: ShipmentTableProps) {
  const { data: userData } = useGetMe();
  const isSuspended =
    userData?.data?.status === "SUSPENDED" || userData?.data?.status === "BLOCKED";

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [cancelTarget, setCancelTarget] = useState<CustomerShipmentItem | null>(
    null,
  );

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    toast.add({
      title: "Copied!",
      description: "Tracking number copied.",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <div className="border rounded-xl bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="font-semibold text-xs">
                  Tracking ID
                </TableHead>
                <TableHead className="font-semibold text-xs">
                  Recipient & Route
                </TableHead>
                <TableHead className="font-semibold text-xs">
                  Speed & Weight
                </TableHead>
                <TableHead className="font-semibold text-xs">
                  Charge & COD
                </TableHead>
                <TableHead className="font-semibold text-xs">Status</TableHead>
                <TableHead className="font-semibold text-xs">Date</TableHead>
                <TableHead className="font-semibold text-xs text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Skeleton loading state
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell colSpan={7} className="py-6">
                      <div className="h-4 bg-muted/60 rounded-md animate-pulse w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : shipments.length === 0 ? (
                // Empty state
                <TableRow>
                  <TableCell colSpan={7} className="py-16 text-center">
                    <div className="max-w-xs mx-auto flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <PackageOpen className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-sm">
                          No shipments found
                        </p>
                        <p className="text-xs text-muted-foreground">
                          You haven't booked any shipments matching this filter
                          yet.
                        </p>
                      </div>
                      <Link href="/customer/book-parcel">
                        <Button size="sm" className="gap-1.5 text-xs">
                          <Package className="w-3.5 h-3.5" /> Book a Parcel Now
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                shipments.map((item) => {
                  const isCancellable = item.status === "CREATED";

                  return (
                    <TableRow
                      key={item.id}
                      className="cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => onSelectShipment(item.id)}
                    >
                      {/* Tracking ID */}
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-semibold text-primary">
                            {item.trackingNumber}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleCopy(e, item.trackingNumber)}
                            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
                            title="Copy tracking ID"
                          >
                            {copiedId === item.trackingNumber ? (
                              <Check className="w-3 h-3 text-green-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </TableCell>

                      {/* Recipient & Route */}
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-foreground">
                            {item.deliveryAddress?.recipientName}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                            {item.pickupAddress?.city} ➔{" "}
                            {item.deliveryAddress?.city}
                          </p>
                        </div>
                      </TableCell>

                      {/* Speed & Weight */}
                      <TableCell>
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-medium inline-flex items-center gap-1">
                            {item.deliveryType === "EXPRESS"
                              ? "⚡ Express"
                              : "Standard"}
                          </span>
                          <p className="text-[11px] text-muted-foreground">
                            {item.weight} KG
                          </p>
                        </div>
                      </TableCell>

                      {/* Charges & COD */}
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="text-xs font-semibold text-foreground">
                            ৳{item.deliveryFee}
                          </p>
                          {Number(item.codAmount) > 0 ? (
                            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                              COD: ৳{item.codAmount}
                            </p>
                          ) : (
                            <p className="text-[11px] text-muted-foreground">
                              Prepaid / No COD
                            </p>
                          )}
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <div className="flex flex-col gap-1 items-start">
                          <ShipmentStatusBadge status={item.status} />
                          {item.payment?.status === "REFUNDED" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              <RotateCcw className="w-2.5 h-2.5" />
                              Refunded (৳{item.payment.refundAmount || item.payment.amount})
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* Created Date */}
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </TableCell>

                      {/* Actions */}
                      <TableCell
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7.5 px-2.5 text-xs gap-1"
                            onClick={() => onSelectShipment(item.id)}
                          >
                            <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                            View
                          </Button>

                          {isCancellable && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7.5 px-2 text-xs ${
                                isSuspended
                                  ? "text-muted-foreground opacity-50 cursor-not-allowed"
                                  : "text-rose-600 hover:text-rose-700 hover:bg-rose-500/10"
                              }`}
                              disabled={isSuspended}
                              title={
                                isSuspended
                                  ? "Account suspended: Cannot cancel shipments"
                                  : undefined
                              }
                              onClick={() => !isSuspended && setCancelTarget(item)}
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="p-4 border-t bg-muted/10 flex items-center justify-center">
            <TablePagination
              totalPages={totalPages}
              page={currentPage}
              handlePageChange={onPageChange}
            />
          </div>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      {cancelTarget && (
        <CancelShipmentDialog
          open={Boolean(cancelTarget)}
          onOpenChange={(open) => !open && setCancelTarget(null)}
          shipment={cancelTarget}
        />
      )}
    </>
  );
}
