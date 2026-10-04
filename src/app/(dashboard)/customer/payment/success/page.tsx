"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useGetPaymentDetails } from "@/hooks/customer.hook";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Package,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Printer,
  Calendar,
  CreditCard,
  Hash,
  MapPin,
  Loader2,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";
import ShipmentStatusBadge from "@/components/modules/customer-shipments/shipment-status-badge";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId") || "";

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { data, isLoading } = useGetPaymentDetails(paymentId);
  const payment = data?.data;
  const shipment = payment?.shipment;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const formattedDate = payment?.paidAt
    ? new Date(payment.paidAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Success Hero Header */}
      <div className="bg-card border rounded-2xl p-6 sm:p-8 text-center shadow-sm relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50 dark:ring-emerald-950/30">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" /> Payment Verified
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Payment Successful!
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mt-2">
          Thank you! Your transaction has been completed and your parcel delivery order is confirmed.
        </p>

        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            Loading transaction details...
          </div>
        )}
      </div>

      {/* Main Grid: Payment Details & Associated Shipment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Summary Card */}
        <div className="bg-card border rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                Payment Summary
              </h2>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#D12053]/10 text-[#D12053] font-mono font-bold">
              bKash
            </span>
          </div>

          <div className="space-y-3 text-sm">
            {/* Amount */}
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="text-xl font-bold text-foreground">
                ৳{payment ? Number(payment.amount).toFixed(2) : "—"}
              </span>
            </div>

            {/* bKash TrxID */}
            {payment?.bkashTrxId && (
              <div className="flex justify-between items-center py-1 border-t pt-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" /> TrxID
                </span>
                <div className="flex items-center gap-1.5 font-mono font-medium">
                  <span>{payment.bkashTrxId}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(payment.bkashTrxId!, "trxId")}
                    className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"
                    title="Copy TrxID"
                  >
                    {copiedKey === "trxId" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* bKash Payment ID */}
            {(payment?.bkashPaymentId || paymentId) && (
              <div className="flex justify-between items-center py-1 border-t pt-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" /> Payment ID
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs max-w-[200px] truncate">
                  <span className="truncate" title={payment?.bkashPaymentId || paymentId}>
                    {payment?.bkashPaymentId || paymentId}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(payment?.bkashPaymentId || paymentId, "payId")}
                    className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors shrink-0"
                    title="Copy Payment ID"
                  >
                    {copiedKey === "payId" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="flex justify-between items-center py-1 border-t pt-2">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium text-foreground">
                {payment?.method === "BKASH" ? "bKash Online Gateway" : payment?.method || "Online Payment"}
              </span>
            </div>

            {/* Payment Date */}
            <div className="flex justify-between items-center py-1 border-t pt-2">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Date & Time
              </span>
              <span className="text-xs text-foreground font-medium">
                {formattedDate}
              </span>
            </div>

            {/* Payment Status */}
            <div className="flex justify-between items-center py-1 border-t pt-2">
              <span className="text-muted-foreground">Payment Status</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <Check className="w-3 h-3" /> PAID
              </span>
            </div>
          </div>
        </div>

        {/* Associated Shipment Card */}
        <div className="bg-card border rounded-xl p-5 sm:p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                  Shipment Information
                </h2>
              </div>
              {shipment && <ShipmentStatusBadge status={shipment.status} />}
            </div>

            {shipment ? (
              <div className="space-y-3 text-sm mt-3">
                {/* Tracking Number */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Tracking ID</span>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-primary">
                    <span>{shipment.trackingNumber}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(shipment.trackingNumber, "track")}
                      className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"
                      title="Copy Tracking ID"
                    >
                      {copiedKey === "track" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Delivery Type */}
                <div className="flex justify-between items-center py-1 border-t pt-2">
                  <span className="text-muted-foreground">Delivery Speed</span>
                  <span className="font-medium">
                    {shipment.deliveryType === "EXPRESS" ? "⚡ Express (24h)" : "Standard (2-3 Days)"}
                  </span>
                </div>

                {/* Pickup Address */}
                {shipment.pickupAddress && (
                  <div className="border-t pt-2 space-y-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-500" /> Pickup Location
                    </span>
                    <p className="text-xs font-medium text-foreground truncate">
                      {shipment.pickupAddress.area}, {shipment.pickupAddress.city}
                    </p>
                  </div>
                )}

                {/* Delivery Address */}
                {shipment.deliveryAddress && (
                  <div className="border-t pt-2 space-y-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-500" /> Delivery Location
                    </span>
                    <p className="text-xs font-medium text-foreground truncate">
                      {shipment.deliveryAddress.recipientName} ({shipment.deliveryAddress.area}, {shipment.deliveryAddress.city})
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground py-6 text-center space-y-2">
                <Package className="w-8 h-8 text-muted-foreground/50 mx-auto" />
                <p>Your delivery request has been registered and scheduled for pickup.</p>
              </div>
            )}
          </div>

          {/* Quick Tracking Button if shipment exists */}
          {shipment?.trackingNumber && (
            <Link
              href={`/customer/track?trackingNumber=${encodeURIComponent(shipment.trackingNumber)}`}
              className="mt-4"
            >
              <Button variant="outline" className="w-full gap-2 text-xs">
                <span>Track This Parcel Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-muted/40 border rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrint}
            className="text-xs text-muted-foreground hover:text-foreground gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print Receipt
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
          <Link href="/customer/book-parcel" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto gap-1.5">
              <PlusCircle className="w-4 h-4" /> Book Another
            </Button>
          </Link>

          <Link href="/customer/shipments" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto gap-2">
              <span>View My Shipments</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
