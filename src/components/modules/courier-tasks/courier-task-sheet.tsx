"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";
import {
  useGetCourierAssignment,
  useGetMyAssignments,
  useRespondAssignment,
  useUpdateTaskStatus,
} from "@/hooks/courier.hook";
import { useGetMe } from "@/hooks/auth.hook";
import {
  Package,
  MapPin,
  User,
  Phone,
  DollarSign,
  Weight,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Truck,
  AlertTriangle,
  Navigation,
  Loader2,
  Clock,
  History,
  FileText,
} from "lucide-react";
import { TrackingEventItem } from "@/types/courier-task.type";

interface Props {
  selectedId: string | null;
  onClose: () => void;
  status?: string;
}

const CourierTaskSheet = ({ selectedId, onClose, status }: Props) => {
  const { data: userData } = useGetMe();
  const isSuspended =
    userData?.data?.status === "SUSPENDED" || userData?.data?.status === "BLOCKED";

  // 1. Fetch targeted single assignment data (fallback to list query)
  const { data: singleData, isLoading: singleLoading } = useGetCourierAssignment(selectedId);
  const { data: listData } = useGetMyAssignments(status);

  const selectedTask = singleData?.data || listData?.data?.find((t) => t.id === selectedId);

  const [cachedTask, setCachedTask] = useState(selectedTask);

  useEffect(() => {
    if (selectedTask) {
      setCachedTask(selectedTask);
    }
  }, [selectedTask]);

  const activeTask = selectedTask || cachedTask;

  // 2. Mutation hooks
  const { mutate: respondTask, isPending: respondPending } = useRespondAssignment();
  const { mutate: updateStatus, isPending: updatePending } = useUpdateTaskStatus();

  // 3. Local interaction states
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [showFailureInput, setShowFailureInput] = useState(false);
  const [failureReason, setFailureReason] = useState("");

  const [currentLocation, setCurrentLocation] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [showTrackingHistory, setShowTrackingHistory] = useState(false);

  if (!selectedId && !cachedTask) {
    return null;
  }

  // 1. কাজ গ্রহণ (ACCEPT)
  const handleAccept = () => {
    if (!selectedId) return;

    respondTask(
      { taskId: selectedId, payload: { action: "ACCEPT" } },
      {
        onSuccess: (res) => {
          if (res?.success) {
            toast.add({
              title: "Task Accepted",
              description: "You have accepted this delivery task. Please proceed to parcel pickup.",
              type: "success",
            });
            onClose();
          }
        },
        onError: (err: any) => {
          toast.add({
            title: "Action Failed",
            description: err?.data?.message || err?.message || "Failed to accept task.",
            type: "error",
          });
        },
      },
    );
  };

  // ২. কাজ প্রত্যাখ্যান (REJECT)
  const handleReject = () => {
    if (!selectedId) return;

    const reasonToSend = rejectReason.trim() || "Courier unavailable for route";

    respondTask(
      {
        taskId: selectedId,
        payload: { action: "REJECT", reason: reasonToSend },
      },
      {
        onSuccess: (res) => {
          if (res?.success) {
            toast.add({
              title: "Task Rejected",
              description: "Task returned to system for administrative reassignment.",
              type: "success",
            });
            setShowRejectInput(false);
            setRejectReason("");
            onClose();
          }
        },
        onError: (err: any) => {
          toast.add({
            title: "Rejection Failed",
            description: err?.data?.message || err?.message || "Failed to reject task.",
            type: "error",
          });
        },
      },
    );
  };

  // ৩. ডেলিভারি প্রগ্রেস ও স্ট্যাটাস আপডেট
  const handleStatusUpdate = (
    nextStatus: "PICKED_UP" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "DELIVERY_FAILED",
    customNote?: string,
  ) => {
    if (!selectedId) return;

    const noteToSend = customNote || deliveryNote.trim() || undefined;
    const locationToSend = currentLocation.trim() || undefined;

    updateStatus(
      {
        taskId: selectedId,
        payload: {
          status: nextStatus,
          location: locationToSend,
          note: noteToSend,
        },
      },
      {
        onSuccess: (res) => {
          if (res?.success) {
            const statusLabel = nextStatus.replace(/_/g, " ");
            toast.add({
              title: "Status Updated",
              description: `Shipment is now marked as ${statusLabel}.`,
              type: "success",
            });
            setCurrentLocation("");
            setDeliveryNote("");
            setShowFailureInput(false);
            setFailureReason("");
            onClose();
          }
        },
        onError: (err: any) => {
          toast.add({
            title: "Update Failed",
            description: err?.data?.message || err?.message || "Failed to update delivery status.",
            type: "error",
          });
        },
      },
    );
  };

  // Check if accepted previously based on tracking events
  const isAccepted = Boolean(
    activeTask?.trackingEvents?.some(
      (e) =>
        e.description?.toLowerCase().includes("task accepted") ||
        e.description?.toLowerCase().includes("accepted by courier"),
    ),
  );

  const isDelivered = activeTask?.status === "DELIVERED";
  const isDeliveryFailed = activeTask?.status === "DELIVERY_FAILED";
  const isCancelled = activeTask?.status === "CANCELLED" || activeTask?.status === "RETURNED";
  const isTerminal = isDelivered || isDeliveryFailed || isCancelled;

  // Failure event if any
  const latestFailureEvent = activeTask?.trackingEvents?.find(
    (e) => e.status === "DELIVERY_FAILED",
  );

  return (
    <Sheet open={Boolean(selectedId)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto flex flex-col justify-between p-6">
        {singleLoading && !activeTask ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading task details...</p>
          </div>
        ) : !activeTask ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-3">
            <Package className="w-10 h-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Task not found or no longer assigned.</p>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <SheetHeader className="p-0 pb-4 border-b">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <SheetTitle className="text-xl font-bold">
                  Delivery Task Details
                </SheetTitle>
              </div>
              <SheetDescription>
                Tracking ID:{" "}
                <span className="font-mono font-bold text-foreground">
                  #{activeTask.trackingNumber}
                </span>
              </SheetDescription>
            </SheetHeader>

            {/* Status & Priority Badge */}
            <div className="flex items-center justify-between p-3.5 bg-muted/40 rounded-xl border">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Current Status</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                      activeTask.status === "DELIVERED"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : activeTask.status === "DELIVERY_FAILED"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : activeTask.status === "OUT_FOR_DELIVERY"
                            ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                            : activeTask.status === "IN_TRANSIT"
                              ? "bg-purple-100 text-purple-700 border-purple-200"
                              : activeTask.status === "PICKED_UP"
                                ? "bg-blue-100 text-blue-700 border-blue-200"
                                : "bg-amber-100 text-amber-700 border-amber-200"
                    }`}
                  >
                    {activeTask.status.replace(/_/g, " ")}
                  </span>
                  {activeTask.status === "COURIER_ASSIGNED" && isAccepted && (
                    <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      Accepted
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground font-medium">Delivery Service</p>
                <span className="text-sm font-semibold capitalize flex items-center justify-end gap-1 mt-0.5">
                  {activeTask.deliveryType === "EXPRESS" ? (
                    <span className="text-amber-600 font-bold">⚡ Express</span>
                  ) : (
                    "Standard"
                  )}
                </span>
              </div>
            </div>

            {/* Status Specific Operational Banners */}
            {activeTask.status === "COURIER_ASSIGNED" && !isAccepted && (
              <div className="p-3.5 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Action Required: New Delivery Request</p>
                  <p className="mt-0.5 text-amber-700 dark:text-amber-300">
                    Review the route and parcel specifications below. Accept to commit or reject to return to admin dispatcher.
                  </p>
                </div>
              </div>
            )}

            {activeTask.status === "COURIER_ASSIGNED" && isAccepted && (
              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Task Accepted</p>
                  <p className="mt-0.5 text-blue-700 dark:text-blue-300">
                    You have accepted this delivery task. Proceed to pickup location and mark as picked up when parcel is received.
                  </p>
                </div>
              </div>
            )}

            {activeTask.status === "PICKED_UP" && (
              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/70 text-blue-900 dark:text-blue-200 text-xs flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Parcel Collected from Sender</p>
                  <p className="mt-0.5 text-blue-700 dark:text-blue-300">
                    {activeTask.pickedUpAt
                      ? `Collected at ${new Date(activeTask.pickedUpAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. `
                      : ""}
                    Start transit when ready to move towards destination.
                  </p>
                </div>
              </div>
            )}

            {activeTask.status === "IN_TRANSIT" && (
              <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/70 text-purple-900 dark:text-purple-200 text-xs flex items-start gap-2.5">
                <Navigation className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Parcel In Transit</p>
                  <p className="mt-0.5 text-purple-700 dark:text-purple-300">
                    Parcel is moving along the delivery corridor. Mark Out for Delivery when starting last-mile doorstep dispatch.
                  </p>
                </div>
              </div>
            )}

            {activeTask.status === "OUT_FOR_DELIVERY" && (
              <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/70 text-indigo-900 dark:text-indigo-200 text-xs flex items-start gap-2.5">
                <Navigation className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Out for Final Delivery</p>
                  <p className="mt-0.5 text-indigo-700 dark:text-indigo-300">
                    Recipient is expecting delivery. Contact recipient before arrival and collect cash if COD applies.
                  </p>
                </div>
              </div>
            )}

            {isDelivered && (
              <div className="p-3.5 rounded-xl border border-green-200 bg-green-50 text-green-900 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Delivery Successfully Completed</p>
                  <p className="mt-0.5 text-green-700">
                    Delivered on{" "}
                    {activeTask.deliveredAt
                      ? new Date(activeTask.deliveredAt).toLocaleString()
                      : new Date(activeTask.updatedAt).toLocaleString()}
                    .
                  </p>
                </div>
              </div>
            )}

            {isDeliveryFailed && (
              <div className="p-3.5 rounded-xl border border-red-200 bg-red-50 text-red-900 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Delivery Attempt Failed</p>
                  <p className="mt-0.5 text-red-700">
                    {latestFailureEvent?.description || "Recipient was unavailable or delivery could not be completed."}
                  </p>
                </div>
              </div>
            )}

            {isCancelled && (
              <div className="p-3.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 text-xs flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Shipment Cancelled</p>
                  <p className="mt-0.5 text-gray-600">
                    This shipment was cancelled by the customer or dispatcher. No further delivery actions required.
                  </p>
                </div>
              </div>
            )}

            {/* COD Cash Collection Alert */}
            {Number(activeTask.codAmount) > 0 && (
              <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/90 text-amber-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-200 rounded-lg text-amber-900">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
                      Collect Cash On Delivery (COD)
                    </p>
                    <p className="text-lg font-black text-amber-950">৳{activeTask.codAmount}</p>
                    <p className="text-[11px] text-amber-700">
                      Payment Status:{" "}
                      <span className="font-semibold uppercase">
                        {activeTask.payment?.status || "PENDING"}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-amber-200/80 rounded-md">
                  Collect Cash
                </span>
              </div>
            )}

            {/* Customer & Route Details */}
            <div className="space-y-4">
              {/* Pickup & Delivery Route Card */}
              <div className="p-4 rounded-xl border bg-card space-y-4 shadow-2xs">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground border-b pb-2">
                  <MapPin className="w-4 h-4 text-primary" /> Delivery Route
                </div>

                {/* Pickup Location */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      Pickup Origin: {activeTask.pickupAddress?.recipientName}
                    </p>
                    {activeTask.pickupAddress?.phone && (
                      <a
                        href={`tel:${activeTask.pickupAddress.phone}`}
                        className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline bg-primary/5 px-2 py-0.5 rounded border border-primary/20"
                      >
                        <Phone className="w-3 h-3" /> Call {activeTask.pickupAddress.phone}
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground pl-3.5 border-l-2 border-blue-200">
                    {activeTask.pickupAddress?.addressLine}, {activeTask.pickupAddress?.area},{" "}
                    {activeTask.pickupAddress?.city}
                  </p>
                </div>

                {/* Delivery Destination */}
                <div className="space-y-1.5 pt-2 border-t border-dashed">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-green-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-600" />
                      Delivery Destination: {activeTask.deliveryAddress?.recipientName}
                    </p>
                    {activeTask.deliveryAddress?.phone && (
                      <a
                        href={`tel:${activeTask.deliveryAddress.phone}`}
                        className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline bg-primary/5 px-2 py-0.5 rounded border border-primary/20"
                      >
                        <Phone className="w-3 h-3" /> Call {activeTask.deliveryAddress.phone}
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground pl-3.5 border-l-2 border-green-200">
                    {activeTask.deliveryAddress?.addressLine}, {activeTask.deliveryAddress?.area},{" "}
                    {activeTask.deliveryAddress?.city}
                  </p>
                </div>
              </div>

              {/* Customer Contact & Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 border rounded-xl bg-card space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <User className="w-3.5 h-3.5 text-primary" /> Customer Account
                  </div>
                  <p className="text-xs font-semibold text-foreground truncate">
                    {activeTask.customer?.name || "Customer"}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {activeTask.customer?.email}
                  </p>
                </div>

                <div className="p-3 border rounded-xl bg-card flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                      <Weight className="w-3.5 h-3.5" /> Weight
                    </div>
                    <p className="text-sm font-bold mt-0.5">{activeTask.weight} kg</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground font-medium">
                      <DollarSign className="w-3.5 h-3.5" /> Delivery Fee
                    </div>
                    <p className="text-sm font-bold mt-0.5 text-primary">৳{activeTask.deliveryFee}</p>
                  </div>
                </div>
              </div>

              {activeTask.parcelDescription && (
                <div className="p-3 border rounded-xl bg-muted/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-muted-foreground">
                    <FileText className="w-3.5 h-3.5" /> Parcel Description
                  </div>
                  <p className="text-foreground">{activeTask.parcelDescription}</p>
                </div>
              )}
            </div>

            {/* Progress Input Controls for Active States */}
            {!isTerminal && (activeTask.status !== "COURIER_ASSIGNED" || isAccepted) && (
              <div className="p-3.5 rounded-xl border bg-muted/20 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Navigation className="w-3.5 h-3.5 text-primary" /> Optional Progress Update Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Current Location (e.g. Mohakhali Hub)"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    className="w-full text-xs border rounded-lg px-2.5 py-1.5 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Status Note (e.g. Traffic delay, with courier)"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    className="w-full text-xs border rounded-lg px-2.5 py-1.5 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            {/* Delivery Failure Reason Input Dialog / Drawer Box */}
            {showFailureInput && (
              <div className="p-4 rounded-xl border border-red-300 bg-red-50/80 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-900">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> Specify Reason for Failed Delivery Attempt:
                </div>

                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  {[
                    "Recipient phone switched off / unreachable",
                    "Recipient requested delivery reschedule",
                    "Incorrect destination address / location not found",
                    "Recipient refused to accept parcel",
                    "Recipient refused COD payment",
                  ].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setFailureReason(preset)}
                      className={`text-left px-2.5 py-1.5 rounded-md border text-xs transition-colors ${
                        failureReason === preset
                          ? "bg-red-200 border-red-400 font-medium text-red-950"
                          : "bg-white border-red-200 hover:bg-red-100/50 text-red-900"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Or enter custom failure reason..."
                  value={failureReason}
                  onChange={(e) => setFailureReason(e.target.value)}
                  className="w-full text-xs border border-red-300 rounded-lg p-2 bg-white"
                />

                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full"
                    onClick={() =>
                      handleStatusUpdate("DELIVERY_FAILED", failureReason || "Delivery attempt failed")
                    }
                    disabled={updatePending || !failureReason.trim()}
                  >
                    {updatePending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Recording...
                      </>
                    ) : (
                      "Confirm Failed Delivery"
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowFailureInput(false);
                      setFailureReason("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Rejection Reason Input when rejecting */}
            {showRejectInput && (
              <div className="p-4 rounded-xl border border-red-300 bg-red-50/80 space-y-3">
                <p className="text-xs font-semibold text-red-900">
                  Reason for rejecting this task:
                </p>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {[
                    "Courier unavailable / off-duty",
                    "Route outside current operational zone",
                    "Vehicle breakdown / technical issue",
                    "Over capacity for current trip",
                  ].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setRejectReason(preset)}
                      className={`text-left px-2 py-1 rounded border text-xs transition-colors ${
                        rejectReason === preset
                          ? "bg-red-200 border-red-400 font-medium text-red-950"
                          : "bg-white border-red-200 hover:bg-red-100/50 text-red-900"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Enter custom rejection reason..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full text-xs border border-red-300 rounded-lg p-2 bg-white"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full"
                    onClick={handleReject}
                    disabled={respondPending}
                  >
                    {respondPending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Rejecting...
                      </>
                    ) : (
                      "Confirm Rejection"
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowRejectInput(false);
                      setRejectReason("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Tracking Events Timeline Accordion */}
            {activeTask.trackingEvents && activeTask.trackingEvents.length > 0 && (
              <div className="pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowTrackingHistory(!showTrackingHistory)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground hover:text-foreground py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-primary" />
                    Tracking Journey ({activeTask.trackingEvents.length} events)
                  </span>
                  <span>{showTrackingHistory ? "Hide ▲" : "View ▼"}</span>
                </button>

                {showTrackingHistory && (
                  <div className="mt-2.5 space-y-2 border rounded-xl p-3 bg-muted/10 max-h-48 overflow-y-auto">
                    {activeTask.trackingEvents.map((event: TrackingEventItem, idx: number) => (
                      <div key={event.id || idx} className="text-xs space-y-0.5 border-b last:border-b-0 pb-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">
                            {event.status.replace(/_/g, " ")}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(event.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-[11px]">{event.description}</p>
                        {event.location && (
                          <p className="text-[10px] text-primary/80">📍 {event.location}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer Actions Based on Current Status */}
        <SheetFooter className="p-0 pt-4 border-t mt-6 flex flex-col gap-2">
          {isSuspended && (
            <div className="w-full p-2.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 text-[11px] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Account Suspended:</strong> Accepting tasks or picking up parcels is disabled. Only in-progress deliveries can be completed.
              </span>
            </div>
          )}

          {selectedTask && (
            <>
              {/* 1. COURIER_ASSIGNED (Pending Courier Decision) */}
              {selectedTask.status === "COURIER_ASSIGNED" && !isAccepted && !showRejectInput && (
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                    onClick={() => setShowRejectInput(true)}
                    disabled={respondPending}
                  >
                    <XCircle className="w-4 h-4 mr-1.5" /> Reject Task
                  </Button>
                  <Button
                    variant="default"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleAccept}
                    disabled={respondPending || isSuspended}
                    title={isSuspended ? "Account suspended: Cannot accept new delivery tasks" : undefined}
                  >
                    {respondPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Accepting...
                      </>
                    ) : isSuspended ? (
                      <>
                        <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-400" /> Accept (Suspended)
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1.5" /> Accept Task
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* 2. Ready for Pickup: COURIER_ASSIGNED (Accepted) OR PICKUP_REQUESTED */}
              {((selectedTask.status === "COURIER_ASSIGNED" && isAccepted) ||
                selectedTask.status === "PICKUP_REQUESTED") && (
                <div className="w-full">
                  <Button
                    variant="default"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    onClick={() => handleStatusUpdate("PICKED_UP")}
                    disabled={updatePending || isSuspended}
                    title={isSuspended ? "Account suspended: Cannot pick up parcels" : undefined}
                  >
                    {updatePending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating Status...
                      </>
                    ) : isSuspended ? (
                      <>
                        <AlertTriangle className="w-4 h-4 mr-2 text-amber-400" /> Pickup Disabled (Suspended)
                      </>
                    ) : (
                      <>
                        <Truck className="w-4 h-4 mr-2" /> Mark as Picked Up
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* 3. PICKED_UP: Start Transit */}
              {selectedTask.status === "PICKED_UP" && (
                <div className="w-full">
                  <Button
                    variant="default"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                    onClick={() => handleStatusUpdate("IN_TRANSIT")}
                    disabled={updatePending}
                  >
                    {updatePending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating Status...
                      </>
                    ) : (
                      <>
                        <Truck className="w-4 h-4 mr-2" /> Start Transit
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* 4. IN_TRANSIT: Move to OUT_FOR_DELIVERY */}
              {selectedTask.status === "IN_TRANSIT" && (
                <div className="w-full">
                  <Button
                    variant="default"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                    onClick={() => handleStatusUpdate("OUT_FOR_DELIVERY")}
                    disabled={updatePending}
                  >
                    {updatePending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating Status...
                      </>
                    ) : (
                      <>
                        <Navigation className="w-4 h-4 mr-2" /> Mark Out for Delivery
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* 5. OUT_FOR_DELIVERY: Complete Delivery or Record Failure */}
              {selectedTask.status === "OUT_FOR_DELIVERY" && !showFailureInput && (
                <div className="flex flex-col gap-2 w-full">
                  <Button
                    variant="default"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                    onClick={() => handleStatusUpdate("DELIVERED")}
                    disabled={updatePending}
                  >
                    {updatePending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Completing Delivery...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" /> Mark as Delivered
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                    onClick={() => setShowFailureInput(true)}
                    disabled={updatePending}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 mr-1 text-red-500" />
                    Report Delivery Attempt Failed
                  </Button>
                </div>
              )}

              {/* 6. Terminal States (DELIVERED, DELIVERY_FAILED, CANCELLED, RETURNED) */}
              {isTerminal && (
                <Button variant="outline" className="w-full font-medium" onClick={onClose}>
                  Close Task Sheet
                </Button>
              )}
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CourierTaskSheet;
