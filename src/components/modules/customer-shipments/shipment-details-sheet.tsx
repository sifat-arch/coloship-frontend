"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { useGetShipmentDetails } from "@/hooks/customer.hook";
import ShipmentStatusBadge from "./shipment-status-badge";
import CancelShipmentDialog from "./cancel-shipment-dialog";
import {
  Package,
  MapPin,
  Calendar,
  DollarSign,
  Copy,
  Check,
  Truck,
  User,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  FileText,
} from "lucide-react";

interface ShipmentDetailsSheetProps {
  selectedId: string | null;
  onClose: () => void;
}

export default function ShipmentDetailsSheet({
  selectedId,
  onClose,
}: ShipmentDetailsSheetProps) {
  const [copied, setCopied] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Fetch single shipment details with tracking events
  const { data, isLoading } = useGetShipmentDetails(selectedId);
  const shipment = data?.data;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.add({
      title: "Copied!",
      description: "Tracking number copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const isCancellable = shipment?.status === "CREATED";

  return (
    <>
      <Sheet open={Boolean(selectedId)} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto p-0 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b bg-muted/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4" />
                Shipment Details
              </span>
              {shipment && <ShipmentStatusBadge status={shipment.status} />}
            </div>

            {shipment && (
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Tracking Number</p>
                  <p className="text-xl font-bold font-mono tracking-tight text-foreground">
                    {shipment.trackingNumber}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(shipment.trackingNumber)}
                  className="gap-1.5 h-8 text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 flex-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
                <Loader2 className="w-7 h-7 animate-spin text-primary" />
                <p className="text-sm">Loading parcel journey...</p>
              </div>
            ) : !shipment ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                Shipment not found or failed to load.
              </div>
            ) : (
              <>
                {/* Cancel Banner if newly created */}
                {isCancellable && (
                  <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between gap-3">
                    <div className="text-xs text-blue-700 dark:text-blue-300">
                      <p className="font-semibold">Parcel is awaiting courier pickup</p>
                      <p className="text-[11px] opacity-80">You can cancel this booking if you made a mistake.</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setIsCancelDialogOpen(true)}
                      className="text-xs h-7.5 px-3 shrink-0"
                    >
                      Cancel Booking
                    </Button>
                  </div>
                )}

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-lg border bg-card space-y-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Delivery Speed
                    </span>
                    <p className="font-semibold text-foreground">
                      {shipment.deliveryType === "EXPRESS" ? "⚡ Express (24h)" : "Standard (2-3 Days)"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border bg-card space-y-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Package className="w-3.5 h-3.5" /> Weight
                    </span>
                    <p className="font-semibold text-foreground">{shipment.weight} KG</p>
                  </div>
                  <div className="p-3 rounded-lg border bg-card space-y-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" /> Delivery Fee
                    </span>
                    <p className="font-semibold text-foreground">৳{shipment.deliveryFee}</p>
                  </div>
                  <div className="p-3 rounded-lg border bg-card space-y-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" /> COD Collection
                    </span>
                    <p className="font-semibold text-foreground">৳{shipment.codAmount || 0}</p>
                  </div>
                </div>

                {shipment.parcelDescription && (
                  <div className="p-3.5 bg-muted/40 rounded-lg border text-xs space-y-1">
                    <span className="font-medium text-muted-foreground flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Description & Instructions
                    </span>
                    <p className="text-foreground">{shipment.parcelDescription}</p>
                  </div>
                )}

                <Separator />

                {/* Addresses Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" /> Route & Contact Details
                  </h4>

                  <div className="space-y-3">
                    {/* Pickup Address */}
                    <div className="p-3 rounded-xl border bg-card space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400">
                        <span>Pickup Location</span>
                        <span className="text-[11px] text-muted-foreground font-normal">
                          {shipment.pickupAddress?.phone}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-foreground">
                        {shipment.pickupAddress?.recipientName}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {shipment.pickupAddress?.addressLine}, {shipment.pickupAddress?.area}, {shipment.pickupAddress?.city}
                      </p>
                    </div>

                    {/* Delivery Address */}
                    <div className="p-3 rounded-xl border bg-card space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <span>Delivery Destination</span>
                        <span className="text-[11px] text-muted-foreground font-normal">
                          {shipment.deliveryAddress?.phone}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-foreground">
                        {shipment.deliveryAddress?.recipientName}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {shipment.deliveryAddress?.addressLine}, {shipment.deliveryAddress?.area}, {shipment.deliveryAddress?.city}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Tracking Timeline */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-primary" /> Journey Timeline
                  </h4>

                  {shipment.trackingEvents && shipment.trackingEvents.length > 0 ? (
                    <div className="relative pl-6 space-y-4 border-l-2 border-primary/20 ml-2">
                      {shipment.trackingEvents.map((evt, idx) => (
                        <div key={evt.id || idx} className="relative group">
                          {/* Circle marker */}
                          <div
                            className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center ${
                              idx === 0 ? "border-primary bg-primary/20 ring-4 ring-primary/10" : "border-muted-foreground/40"
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-primary" : "bg-muted-foreground/40"}`} />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-foreground">
                                {evt.status.replace(/_/g, " ")}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                {new Date(evt.createdAt).toLocaleString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">{evt.description}</p>
                            {evt.location && (
                              <p className="text-[11px] text-muted-foreground/75 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-primary/70" /> {evt.location}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">
                      Tracking updates will appear once courier is assigned and moving.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Cancel Dialog */}
      {shipment && (
        <CancelShipmentDialog
          open={isCancelDialogOpen}
          onOpenChange={setIsCancelDialogOpen}
          shipment={shipment}
          onSuccess={() => {
            onClose();
          }}
        />
      )}
    </>
  );
}
