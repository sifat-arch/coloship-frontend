"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useCancelShipment } from "@/hooks/customer.hook";
import { CustomerShipmentItem } from "@/types/customer.type";
import { AlertTriangle, Loader2 } from "lucide-react";

interface CancelShipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipment: CustomerShipmentItem | null;
  onSuccess?: () => void;
}

export default function CancelShipmentDialog({
  open,
  onOpenChange,
  shipment,
  onSuccess,
}: CancelShipmentDialogProps) {
  const [reason, setReason] = useState("");
  const { mutate: cancelMutation, isPending } = useCancelShipment();

  if (!shipment) return null;

  const isBkashPaid =
    shipment.payment?.method === "BKASH" && shipment.payment?.status === "PAID";

  const handleConfirmCancel = () => {
    cancelMutation(
      {
        id: shipment.id,
        payload: {
          reason: reason.trim() || "Cancelled by customer request",
        },
      },
      {
        onSuccess: () => {
          toast.add({
            title: "Shipment Cancelled",
            description: `Shipment ${shipment.trackingNumber} has been successfully cancelled.${
              isBkashPaid ? " bKash refund process has been initiated." : ""
            }`,
          });
          setReason("");
          onOpenChange(false);
          onSuccess?.();
        },
        onError: (err: any) => {
          toast.add({
            title: "Cancellation Failed",
            description:
              err?.data?.message || err?.message || "Could not cancel shipment.",
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isPending && onOpenChange(val)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="gap-2">
          <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <DialogTitle className="text-lg">Cancel Shipment?</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel shipment{" "}
            <span className="font-semibold text-foreground font-mono">
              {shipment.trackingNumber}
            </span>
            ? This action cannot be reversed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {isBkashPaid && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-700 dark:text-amber-400 space-y-1">
              <p className="font-semibold">Refund Policy Note:</p>
              <p>
                Since you already paid via bKash, a refund of ৳{shipment.deliveryFee}{" "}
                will be initiated automatically if cancelled within the 2-hour window.
              </p>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="cancel-reason" className="text-xs">
              Cancellation Reason (Optional)
            </Label>
            <Textarea
              id="cancel-reason"
              placeholder="e.g., Customer cancelled the order, incorrect address..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              disabled={isPending}
              className="resize-none text-sm"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Keep Shipment
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirmCancel}
            disabled={isPending}
            className="gap-2"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Confirm Cancellation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
