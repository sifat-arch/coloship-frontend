"use client";

import { useState } from "react";
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
  useGetMyAssignments,
  useRespondAssignment,
  useUpdateTaskStatus,
} from "@/hooks/courier.hook";
import {
  Package,
  MapPin,
  User,
  Phone,
  DollarSign,
  Weight,
  CheckCircle,
  XCircle,
  Truck,
  AlertTriangle,
  Navigation,
} from "lucide-react";

interface Props {
  selectedId: string | null;
  onClose: () => void;
  status?: string;
}

const CourierTaskSheet = ({ selectedId, onClose, status }: Props) => {
  const { data } = useGetMyAssignments(status);
  const selectedTask = data?.data?.find((task) => task.id === selectedId);

  const { mutate: respondTask, isPending: respondPending } =
    useRespondAssignment();
  const { mutate: updateStatus, isPending: updatePending } =
    useUpdateTaskStatus();

  // Rejection reason state
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Delivery progress location and note state
  const [currentLocation, setCurrentLocation] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

  if (!selectedTask) {
    return null;
  }

  // ১. কাজ গ্রহণ (ACCEPT)
  const handleAccept = () => {
    if (!selectedId) return;

    respondTask(
      { taskId: selectedId, payload: { action: "ACCEPT" } },
      {
        onSuccess: (res) => {
          if (res?.success) {
            toast.add({
              title: "Task Accepted",
              description: "You have successfully accepted this delivery task.",
            });
            onClose();
          }
        },
        onError: (err: any) => {
          toast.add({
            title: "Action Failed",
            description: err?.message || "Failed to accept task.",
          });
        },
      },
    );
  };

  // ২. কাজ প্রত্যাখ্যান (REJECT)
  const handleReject = () => {
    if (!selectedId) return;

    respondTask(
      {
        taskId: selectedId,
        payload: { action: "REJECT", reason: rejectReason || "Courier unavailable" },
      },
      {
        onSuccess: (res) => {
          if (res?.success) {
            toast.add({
              title: "Task Rejected",
              description: "Task returned to system for reassignment.",
            });
            setShowRejectInput(false);
            setRejectReason("");
            onClose();
          }
        },
        onError: (err: any) => {
          toast.add({
            title: "Action Failed",
            description: err?.message || "Failed to reject task.",
          });
        },
      },
    );
  };

  // ৩. ডেলিভারি স্ট্যাটাস আপডেট (PICKED_UP / OUT_FOR_DELIVERY / DELIVERED ইত্যাদি)
  const handleStatusUpdate = (
    nextStatus: "PICKED_UP" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "DELIVERY_FAILED",
  ) => {
    if (!selectedId) return;

    updateStatus(
      {
        taskId: selectedId,
        payload: {
          status: nextStatus,
          location: currentLocation || undefined,
          note: deliveryNote || undefined,
        },
      },
      {
        onSuccess: (res) => {
          if (res?.success) {
            toast.add({
              title: "Status Updated",
              description: `Shipment marked as ${nextStatus.replace(/_/g, " ")}.`,
            });
            setCurrentLocation("");
            setDeliveryNote("");
            onClose();
          }
        },
        onError: (err: any) => {
          toast.add({
            title: "Update Failed",
            description: err?.message || "Failed to update delivery status.",
          });
        },
      },
    );
  };

  const isPendingAction = selectedTask.status === "COURIER_ASSIGNED";
  const isDelivered = selectedTask.status === "DELIVERED";
  const isCancelled =
    selectedTask.status === "CANCELLED" ||
    selectedTask.status === "DELIVERY_FAILED";

  return (
    <Sheet open={!!selectedId} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto flex flex-col justify-between p-6">
        <div className="space-y-6">
          <SheetHeader className="p-0 pb-4 border-b">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <SheetTitle className="text-xl font-bold">
                Delivery Task
              </SheetTitle>
            </div>
            <SheetDescription>
              Tracking ID:{" "}
              <span className="font-semibold text-foreground">
                #{selectedTask.trackingNumber}
              </span>
            </SheetDescription>
          </SheetHeader>

          {/* Status & Service Badge */}
          <div className="flex items-center justify-between p-3.5 bg-muted/40 rounded-lg border">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Status</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                {selectedTask.status.replace(/_/g, " ")}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-medium">Delivery Type</p>
              <span className="text-sm font-semibold capitalize">
                {selectedTask.deliveryType.toLowerCase()}
              </span>
            </div>
          </div>

          {/* COD Cash Alert */}
          {Number(selectedTask.codAmount) > 0 && (
            <div className="p-3.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <DollarSign className="w-5 h-5 text-amber-700" />
                <div>
                  <p className="text-xs font-semibold">Collect Cash On Delivery</p>
                  <p className="text-sm font-bold">৳{selectedTask.codAmount}</p>
                </div>
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-amber-200 rounded">
                Cash Collection
              </span>
            </div>
          )}

          {/* Customer Contact */}
          <div className="p-4 rounded-xl border bg-card space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <User className="w-4 h-4" /> Customer Contact
              </div>
              {selectedTask.customer?.name && (
                <span className="text-xs font-medium text-foreground">
                  {selectedTask.customer.name}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Email: {selectedTask.customer?.email}
            </p>
          </div>

          {/* Pickup & Delivery Route */}
          <div className="p-4 rounded-xl border bg-card space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground border-b pb-2">
              <MapPin className="w-4 h-4" /> Route Details
            </div>
            {/* Pickup Location */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                  ● Pickup: {selectedTask.pickupAddress?.recipientName}
                </p>
                {selectedTask.pickupAddress?.phone && (
                  <a
                    href={`tel:${selectedTask.pickupAddress.phone}`}
                    className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                  >
                    <Phone className="w-3 h-3" /> {selectedTask.pickupAddress.phone}
                  </a>
                )}
              </div>
              <p className="text-sm text-muted-foreground pl-3 border-l-2 border-blue-200">
                {selectedTask.pickupAddress?.addressLine},{" "}
                {selectedTask.pickupAddress?.area},{" "}
                {selectedTask.pickupAddress?.city}
              </p>
            </div>

            {/* Delivery Destination */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-green-600 flex items-center gap-1">
                  ● Destination: {selectedTask.deliveryAddress?.recipientName}
                </p>
                {selectedTask.deliveryAddress?.phone && (
                  <a
                    href={`tel:${selectedTask.deliveryAddress.phone}`}
                    className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                  >
                    <Phone className="w-3 h-3" /> {selectedTask.deliveryAddress.phone}
                  </a>
                )}
              </div>
              <p className="text-sm text-muted-foreground pl-3 border-l-2 border-green-200">
                {selectedTask.deliveryAddress?.addressLine},{" "}
                {selectedTask.deliveryAddress?.area},{" "}
                {selectedTask.deliveryAddress?.city}
              </p>
            </div>
          </div>

          {/* Parcel Specifics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg bg-card">
              <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                <Weight className="w-3.5 h-3.5" /> Weight
              </p>
              <p className="text-sm font-semibold mt-1">
                {selectedTask.weight} kg
              </p>
            </div>
            <div className="p-3 border rounded-lg bg-card">
              <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                <DollarSign className="w-3.5 h-3.5" /> Delivery Fee
              </p>
              <p className="text-sm font-semibold mt-1">
                ৳{selectedTask.deliveryFee}
              </p>
            </div>
          </div>

          {/* Interactive Progress Updating Controls */}
          {!isDelivered && !isCancelled && !isPendingAction && (
            <div className="p-4 rounded-xl border bg-muted/20 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Navigation className="w-4 h-4 text-primary" /> Delivery Progress Note
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Current Location (e.g. Mohakhali / Hub)"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  className="w-full text-xs border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Progress Note (e.g. Approaching delivery location)"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  className="w-full text-xs border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Rejection Reason Input when rejecting */}
          {showRejectInput && (
            <div className="p-3 rounded-lg border border-red-200 bg-red-50 space-y-2">
              <p className="text-xs font-semibold text-red-800">
                Reason for rejection:
              </p>
              <input
                type="text"
                placeholder="Why are you unable to take this task?"
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
                  {respondPending ? "Rejecting..." : "Confirm Reject"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowRejectInput(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions Based on Current Status */}
        <SheetFooter className="p-0 pt-4 border-t mt-6">
          {/* Scenario 1: New Task Pending Response */}
          {isPendingAction && !showRejectInput && (
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button
                variant="outline"
                className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => setShowRejectInput(true)}
                disabled={respondPending}
              >
                <XCircle className="w-4 h-4 mr-1.5" /> Reject Task
              </Button>
              <Button
                variant="default"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleAccept}
                disabled={respondPending}
              >
                <CheckCircle className="w-4 h-4 mr-1.5" />
                {respondPending ? "Accepting..." : "Accept Task"}
              </Button>
            </div>
          )}

          {/* Scenario 2: Active Task Progression */}
          {!isPendingAction && !isDelivered && !isCancelled && (
            <div className="flex flex-col gap-2 w-full">
              {selectedTask.status === "COURIER_ASSIGNED" ||
              selectedTask.status === "PICKUP_REQUESTED" ? (
                <Button
                  variant="default"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => handleStatusUpdate("PICKED_UP")}
                  disabled={updatePending}
                >
                  <Truck className="w-4 h-4 mr-1.5" />
                  {updatePending ? "Updating..." : "Mark as Picked Up"}
                </Button>
              ) : selectedTask.status === "PICKED_UP" ||
                selectedTask.status === "IN_TRANSIT" ? (
                <Button
                  variant="default"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => handleStatusUpdate("OUT_FOR_DELIVERY")}
                  disabled={updatePending}
                >
                  <Navigation className="w-4 h-4 mr-1.5" />
                  {updatePending ? "Updating..." : "Out for Delivery"}
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleStatusUpdate("DELIVERED")}
                  disabled={updatePending}
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  {updatePending ? "Completing..." : "Mark as Delivered"}
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground hover:text-red-600"
                onClick={() => handleStatusUpdate("DELIVERY_FAILED")}
                disabled={updatePending}
              >
                <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Mark Delivery Attempt Failed
              </Button>
            </div>
          )}

          {/* Scenario 3: Completed or Cancelled */}
          {(isDelivered || isCancelled) && (
            <Button variant="outline" className="w-full" onClick={onClose}>
              Close
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CourierTaskSheet;
