"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, ArrowRight, ExternalLink, PackageCheck } from "lucide-react";
import Link from "next/link";
import { CreatedShipmentResponse } from "@/types/customer.type";

interface BookingSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipment: CreatedShipmentResponse | null;
  paymentUrl?: string | null;
  paymentMethod: "BKASH" | "COD";
}

export function BookingSuccessModal({
  open,
  onOpenChange,
  shipment,
  paymentUrl,
  paymentMethod,
}: BookingSuccessModalProps) {
  if (!shipment) return null;

  const totalAmount = Number(shipment.deliveryFee) + Number(shipment.codAmount || 0);

  const handlePayNow = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center p-6 sm:p-7">
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 ring-8 ring-emerald-500/10 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Parcel Booked Successfully!
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground mt-1">
            Your delivery request has been registered in the system.
          </DialogDescription>
        </DialogHeader>

        {/* Tracking & Amount Details */}
        <div className="bg-muted/30 rounded-2xl p-4.5 my-3 border border-border/80 space-y-3 text-left">
          <div className="flex justify-between items-center text-sm border-b pb-2.5">
            <span className="text-muted-foreground text-xs uppercase font-medium">Tracking ID</span>
            <span className="font-mono font-bold text-sm text-primary">
              {shipment.trackingNumber}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm border-b pb-2">
            <span className="text-muted-foreground">Delivery Speed</span>
            <span className="font-medium">
              {shipment.deliveryType === "EXPRESS" ? "⚡ Express (24 Hours)" : "Standard (2-3 Days)"}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm border-b pb-2">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-medium uppercase">
              {paymentMethod === "BKASH" ? "bKash Online" : "Cash on Delivery (COD)"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">Payable Delivery Charge</span>
            <span className="text-lg font-bold text-foreground">
              ৳{shipment.deliveryFee}
            </span>
          </div>
        </div>

        <DialogFooter className="sm:flex-col gap-2 mt-4">
          {paymentMethod === "BKASH" && paymentUrl ? (
            <Button
              size="lg"
              className="w-full bg-[#D12053] hover:bg-[#B01A45] text-white gap-2 font-semibold"
              onClick={handlePayNow}
            >
              Pay with bKash
              <ExternalLink className="w-4 h-4" />
            </Button>
          ) : null}

          <Link href="/customer/shipments" className="w-full">
            <Button variant={paymentMethod === "BKASH" && paymentUrl ? "outline" : "default"} className="w-full gap-2">
              <PackageCheck className="w-4 h-4" />
              View My Shipments
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
