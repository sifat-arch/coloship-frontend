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
  useGetAllShipments,
  useGetAvailableCouriers,
  useAssignCourier,
  useUnassignCourier,
} from "@/hooks/admin.hook";
import { ShipmentParams } from "@/types/shipment.type";
import {
  Package,
  MapPin,
  Truck,
  User,
  CreditCard,
  DollarSign,
  Weight,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

interface Props extends ShipmentParams {
  selectedId: string | null;
  onClose: () => void;
}

const ShipmentSheet = ({ selectedId, onClose, ...params }: Props) => {
  // ১. শিপমেন্ট ডাটা ফেচ
  const { data } = useGetAllShipments(params);
  const selectedShipment = data?.data?.find(
    (shipment) => shipment.id === selectedId,
  );

  // ২. ড্রপডাউনের জন্য অ্যাভেইলেবল কুরিয়ার ফেচ
  const { data: availableCouriersData, isLoading: couriersLoading } =
    useGetAvailableCouriers();
  const availableCouriers = availableCouriersData?.data || [];

  // ৩. অ্যাসাইন করার জন্য সিলেক্টেড কুরিয়ার আইডি স্টেট
  const [selectedCourierId, setSelectedCourierId] = useState<string>("");

  // ৪. মিউটেশন হুক
  const { mutate: assignCourier, isPending: assignPending } =
    useAssignCourier();
  const { mutate: unassignCourier, isPending: unassignPending } =
    useUnassignCourier();

  if (!selectedShipment) {
    return null;
  }

  // কুরিয়ার অ্যাসাইন হ্যান্ডলার
  const handleAssign = () => {
    if (!selectedId || !selectedCourierId) {
      toast.add({
        title: "Please select a courier",
        description: "You must choose a courier before assigning.",
      });
      return;
    }

    assignCourier(
      { shipmentId: selectedId, courierProfileId: selectedCourierId },
      {
        onSuccess: (res) => {
          if (res?.success) {
            toast.add({
              title: "Courier Assigned",
              description: "Courier assigned to shipment successfully.",
            });
            setSelectedCourierId("");
            onClose();
          }
        },
        onError: (error: any) => {
          toast.add({
            title: "Assignment Failed",
            description: error?.message || "Something went wrong!",
          });
        },
      },
    );
  };

  // কুরিয়ার আন-অ্যাসাইন হ্যান্ডলার
  const handleUnassign = () => {
    if (!selectedId) return;

    unassignCourier(selectedId, {
      onSuccess: (res) => {
        if (res?.success) {
          toast.add({
            title: "Courier Unassigned",
            description: "Courier unassigned from shipment successfully.",
          });
          onClose();
        }
      },
      onError: (error: any) => {
        toast.add({
          title: "Action Failed",
          description: error?.message || "Something went wrong!",
        });
      },
    });
  };

  const isAssigned = !!selectedShipment.courier;

  return (
    <Sheet open={!!selectedId} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto flex flex-col justify-between p-6">
        <div className="space-y-6">
          <SheetHeader className="p-0 pb-4 border-b">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <SheetTitle className="text-xl font-bold">
                Shipment Details
              </SheetTitle>
            </div>
            <SheetDescription>
              Tracking ID:{" "}
              <span className="font-semibold text-foreground">
                #{selectedShipment.trackingNumber}
              </span>
            </SheetDescription>
          </SheetHeader>

          {/* Status & Type Bar */}
          <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border">
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Current Status
              </p>
              <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                {selectedShipment.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-medium">
                Delivery Type
              </p>
              <span className="text-sm font-semibold capitalize">
                {selectedShipment.deliveryType.toLowerCase()}
              </span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="p-4 rounded-xl border bg-card space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground border-b pb-2">
              <User className="w-4 h-4" /> Customer Information
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-medium">{selectedShipment.customer.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium truncate">
                  {selectedShipment.customer.email}
                </p>
              </div>
            </div>
          </div>

          {/* Pickup & Delivery Addresses */}
          <div className="p-4 rounded-xl border bg-card space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground border-b pb-2">
              <MapPin className="w-4 h-4" /> Route Details
            </div>
            {/* Pickup */}
            <div className="space-y-1">
              <p className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                ● Pickup Address (
                {selectedShipment.pickupAddress?.recipientName} -{" "}
                {selectedShipment.pickupAddress?.phone})
              </p>
              <p className="text-sm text-muted-foreground pl-3 border-l-2 border-blue-200">
                {selectedShipment.pickupAddress?.addressLine},{" "}
                {selectedShipment.pickupAddress?.area},{" "}
                {selectedShipment.pickupAddress?.city}
              </p>
            </div>
            {/* Delivery */}
            <div className="space-y-1">
              <p className="text-xs font-semibold text-green-600 flex items-center gap-1">
                ● Delivery Address (
                {selectedShipment.deliveryAddress?.recipientName} -{" "}
                {selectedShipment.deliveryAddress?.phone})
              </p>
              <p className="text-sm text-muted-foreground pl-3 border-l-2 border-green-200">
                {selectedShipment.deliveryAddress?.addressLine},{" "}
                {selectedShipment.deliveryAddress?.area},{" "}
                {selectedShipment.deliveryAddress?.city}
              </p>
            </div>
          </div>

          {/* Parcel & Payment Details */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 border rounded-lg bg-card">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Weight className="w-3.5 h-3.5" /> Weight
              </p>
              <p className="text-sm font-semibold mt-1">
                {selectedShipment.weight} kg
              </p>
            </div>
            <div className="p-3 border rounded-lg bg-card">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Delivery Fee
              </p>
              <p className="text-sm font-semibold mt-1">
                ৳{selectedShipment.deliveryFee}
              </p>
            </div>
            <div className="p-3 border rounded-lg bg-card">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5" /> COD Amount
              </p>
              <p className="text-sm font-semibold mt-1">
                ৳{selectedShipment.codAmount}
              </p>
            </div>
          </div>

          {/* Assigned Courier Section */}
          <div className="p-4 rounded-xl border bg-muted/20 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Truck className="w-4 h-4 text-primary" /> Assigned Courier
            </div>
            {isAssigned ? (
              <div className="flex items-center justify-between bg-card p-3 rounded-lg border">
                <div>
                  <h4 className="text-sm font-semibold">
                    {selectedShipment.courier?.user.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {selectedShipment.courier?.phone}
                  </p>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded mt-1 inline-block">
                    {selectedShipment.courier?.vehicleType}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                  ⚠️ No courier assigned yet. Select an available courier below:
                </p>
                <select
                  value={selectedCourierId}
                  onChange={(e) => setSelectedCourierId(e.target.value)}
                  className="w-full text-sm border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">-- Choose Available Courier --</option>
                  {availableCouriers.map((courier) => (
                    <option key={courier.id} value={courier.id}>
                      {courier.user.name} ({courier.vehicleType} -{" "}
                      {courier.phone})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <SheetFooter className="p-0 pt-4 border-t mt-6">
          {isAssigned ? (
            <Button
              variant="destructive"
              size="lg"
              className="w-full"
              onClick={handleUnassign}
              disabled={unassignPending}
            >
              {unassignPending ? "Unassigning..." : "Unassign Courier"}
            </Button>
          ) : (
            <Button
              variant="default"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleAssign}
              disabled={assignPending || !selectedCourierId}
            >
              {assignPending ? "Assigning..." : "Assign Courier"}
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ShipmentSheet;
