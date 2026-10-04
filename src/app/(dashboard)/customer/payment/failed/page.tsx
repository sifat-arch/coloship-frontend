"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useGetPaymentDetails, useInitiatePayment } from "@/hooks/customer.hook";
import { Button } from "@/components/ui/button";
import {
  XCircle,
  AlertTriangle,
  RotateCcw,
  Package,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  CreditCard,
  Hash,
  Loader2,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import ShipmentStatusBadge from "@/components/modules/customer-shipments/shipment-status-badge";

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get("paymentId") || "";

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { data, isLoading } = useGetPaymentDetails(paymentId);
  const payment = data?.data;
  const shipment = payment?.shipment;

  const { mutate: retryPayment, isPending: isRetrying } = useInitiatePayment();

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRetryPayment = () => {
    if (!payment?.shipmentId) {
      router.push("/customer/shipments");
      return;
    }

    retryPayment(
      {
        shipmentId: payment.shipmentId,
        method: "BKASH",
      },
      {
        onSuccess: (res) => {
          if (res.data?.paymentUrl) {
            window.location.href = res.data.paymentUrl;
          } else {
            toast.add({
              title: "Payment Error",
              description: "Could not retrieve checkout URL. Please try from your shipments page.",
            });
            router.push("/customer/shipments");
          }
        },
        onError: (err: any) => {
          toast.add({
            title: "Retry Failed",
            description: err?.message || "Could not re-initiate payment. Please try again later.",
          });
        },
      }
    );
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Failed Hero Header */}
      <div className="bg-card border rounded-2xl p-6 sm:p-8 text-center shadow-sm relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-rose-50 dark:ring-rose-950/30">
          <XCircle className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 mb-2">
          <ShieldAlert className="w-3.5 h-3.5" /> Transaction Incomplete
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Payment Failed or Cancelled
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mt-2">
          Your payment could not be processed. If any amount was deducted, bKash will refund it within 24–72 hours.
        </p>

        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            Loading transaction status...
          </div>
        )}
      </div>

      {/* Main Grid: Transaction Details & Troubleshooting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction Summary Card */}
        <div className="bg-card border rounded-xl p-5 sm:p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                  Transaction Summary
                </h2>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#D12053]/10 text-[#D12053] font-mono font-bold">
                bKash
              </span>
            </div>

            <div className="space-y-3 text-sm">
              {/* Payment ID */}
              {(payment?.bkashPaymentId || paymentId) && (
                <div className="flex justify-between items-center py-1">
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

              {/* Amount */}
              {payment?.amount && (
                <div className="flex justify-between items-center py-1 border-t pt-2">
                  <span className="text-muted-foreground">Order Amount</span>
                  <span className="text-lg font-bold text-foreground">
                    ৳{Number(payment.amount).toFixed(2)}
                  </span>
                </div>
              )}

              {/* Status */}
              <div className="flex justify-between items-center py-1 border-t pt-2">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                  <XCircle className="w-3 h-3" /> FAILED / UNPAID
                </span>
              </div>

              {/* Associated Shipment */}
              {shipment && (
                <div className="flex justify-between items-center py-1 border-t pt-2">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Package className="w-3.5 h-3.5" /> Tracking ID
                  </span>
                  <div className="flex items-center gap-1.5 font-mono font-medium text-primary">
                    <span>{shipment.trackingNumber}</span>
                    <ShipmentStatusBadge status={shipment.status} className="scale-90" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Retry Button if shipment is known */}
          {payment?.shipmentId && (
            <div className="pt-4 border-t mt-2">
              <Button
                className="w-full bg-[#D12053] hover:bg-[#B01A45] text-white gap-2 font-semibold"
                onClick={handleRetryPayment}
                disabled={isRetrying}
              >
                {isRetrying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting to bKash...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    Retry Payment with bKash
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Possible Causes Card */}
        <div className="bg-card border rounded-xl p-5 sm:p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b pb-3">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <h2 className="text-base font-semibold text-foreground">
                Why Did It Fail?
              </h2>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground mt-4">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>
                  <strong>Cancelled by User:</strong> You may have clicked cancel or closed the bKash payment window before completing the PIN step.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>
                  <strong>Insufficient Balance:</strong> Your bKash account might not have sufficient available funds.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>
                  <strong>OTP or PIN Timeout:</strong> The session expired before the one-time verification code was entered.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>
                  <strong>Gateway Issue:</strong> bKash payment servers experienced a temporary connection interruption.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs text-amber-700 dark:text-amber-400 mt-4 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Your parcel booking is preserved in your shipments list. You can retry paying for it at any time.
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="bg-muted/40 border rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Link href="/customer" className="w-full sm:w-auto">
          <Button variant="ghost" size="sm" className="w-full sm:w-auto text-xs text-muted-foreground hover:text-foreground">
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
          <Link href="/customer/book-parcel" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto gap-1.5">
              Book New Parcel
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

export default function PaymentFailedPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      }
    >
      <PaymentFailedContent />
    </Suspense>
  );
}
