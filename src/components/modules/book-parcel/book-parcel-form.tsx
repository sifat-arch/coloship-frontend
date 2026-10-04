"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Package,
  MapPin,
  Truck,
  CreditCard,
  Plus,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { useGetMe } from "@/hooks/auth.hook";
import {
  useGetAddresses,
  useCreateShipment,
  useInitiatePayment,
} from "@/hooks/customer.hook";
import { AddAddressModal } from "./add-address-modal";
import { BookingSuccessModal } from "./booking-success-modal";
import { CreatedShipmentResponse } from "@/types/customer.type";

export type CreateShipmentFormValues = {
  pickupAddressId: string;
  deliveryAddressId: string;
  deliveryType: "STANDARD" | "EXPRESS";
  weight: number | "";
  codAmount: number | "";
  parcelDescription: string;
  paymentMethod: "BKASH" | "COD";
};

export default function BookParcelForm() {
  // Current User status
  const { data: userData } = useGetMe();
  const isSuspended =
    userData?.data?.status === "SUSPENDED" || userData?.data?.status === "BLOCKED";

  // 1. Fetch Saved Addresses from Backend
  const { data: addressData, isLoading: addressLoading } = useGetAddresses();
  const savedAddresses = addressData?.data || [];

  // 2. Mutations
  const { mutate: bookShipment, isPending: bookingPending } = useCreateShipment();
  const { mutate: initiatePay, isPending: paymentPending } = useInitiatePayment();

  // 3. Modals state
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [addressTarget, setAddressTarget] = useState<"pickup" | "delivery">("pickup");

  const [createdShipment, setCreatedShipment] = useState<CreatedShipmentResponse | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<"BKASH" | "COD">("BKASH");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // 4. TanStack Form Setup
  const form = useForm({
    defaultValues: {
      pickupAddressId: "",
      deliveryAddressId: "",
      deliveryType: "STANDARD",
      weight: "" as unknown as number,
      codAmount: "" as unknown as number,
      parcelDescription: "",
      paymentMethod: "BKASH",
    } as CreateShipmentFormValues,

    onSubmit: async ({ value }) => {
      // Basic Frontend Validation
      if (!value.deliveryAddressId) {
        toast.add({
          title: "Delivery Address Required",
          description: "Please select or add a destination delivery address.",
        });
        return;
      }

      const parsedWeight = Number(value.weight);
      if (!value.weight || isNaN(parsedWeight) || parsedWeight <= 0) {
        toast.add({
          title: "Invalid Weight",
          description: "Parcel weight must be greater than 0 kg.",
        });
        return;
      }

      setSelectedMethod(value.paymentMethod);

      // Book Shipment Payload
      bookShipment(
        {
          pickupAddressId: value.pickupAddressId || undefined,
          deliveryAddressId: value.deliveryAddressId,
          deliveryType: value.deliveryType,
          weight: parsedWeight,
          codAmount: value.codAmount ? Number(value.codAmount) : 0,
          parcelDescription: value.parcelDescription.trim() || undefined,
        },
        {
          onSuccess: (shipmentRes) => {
            const shipment = shipmentRes.data;
            setCreatedShipment(shipment);

            toast.add({
              title: "Booking Confirmed",
              description: `Tracking ID: ${shipment.trackingNumber}`,
            });

            // If bKash selected, initiate payment gateway
            if (value.paymentMethod === "BKASH") {
              initiatePay(
                {
                  shipmentId: shipment.id,
                  method: "BKASH",
                },
                {
                  onSuccess: (payRes) => {
                    if (payRes.data?.paymentUrl) {
                      setPaymentUrl(payRes.data.paymentUrl);
                    }
                    setIsSuccessModalOpen(true);
                  },
                  onError: () => {
                    setIsSuccessModalOpen(true);
                  },
                }
              );
            } else {
              // Cash on Delivery
              initiatePay(
                {
                  shipmentId: shipment.id,
                  method: "COD",
                },
                {
                  onSettled: () => {
                    setIsSuccessModalOpen(true);
                  },
                }
              );
            }
          },
          onError: (err: any) => {
            toast.add({
              title: "Booking Failed",
              description: err?.data?.message || err?.message || "Could not book parcel.",
            });
          },
        }
      );
    },
  });

  const isSubmitting = bookingPending || paymentPending;

  return (
    <div className="space-y-6">
      {/* Account Suspended Alert Banner */}
      {isSuspended && (
        <div className="p-4 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold">Parcel Booking is Temporarily Disabled</h4>
            <p className="text-xs">
              Your customer account is currently suspended. You cannot place new parcel bookings or add new delivery addresses until the suspension is resolved.
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isSuspended) return;
          form.handleSubmit();
        }}
      >
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {/* Main Form (2 cols on large screen) */}
          <div className="space-y-6 lg:col-span-2">
            {/* 1. Address Information */}
            <Card className="border shadow-xs">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Address Information
                </CardTitle>
                <CardDescription>
                  Choose pickup location and recipient destination from your saved addresses
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-5 space-y-5">
                {/* Pickup Address */}
                <form.Field name="pickupAddressId">
                  {(field) => (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="pickupAddress" className="font-medium">
                          Pickup Address
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1.5 text-xs text-primary border-primary/30 hover:bg-primary/5"
                          disabled={isSuspended}
                          title={isSuspended ? "Account suspended" : undefined}
                          onClick={() => {
                            setAddressTarget("pickup");
                            setIsAddAddressOpen(true);
                          }}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add New
                        </Button>
                      </div>

                      <select
                        id="pickupAddress"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-10 px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-50 transition-colors"
                        disabled={addressLoading || isSuspended}
                      >
                        <option value="">
                          {addressLoading ? "Loading addresses..." : "-- Select Pickup Address (Optional) --"}
                        </option>
                        {savedAddresses.map((addr) => (
                          <option key={addr.id} value={addr.id}>
                            {addr.label}: {addr.recipientName} - {addr.area}, {addr.city} ({addr.phone})
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground">
                        If left blank, the delivery address will be used as the collection origin.
                      </p>
                    </div>
                  )}
                </form.Field>

                {/* Delivery Address */}
                <form.Field name="deliveryAddressId">
                  {(field) => (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="deliveryAddress" className="font-medium">
                          Delivery Address *
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1.5 text-xs text-primary border-primary/30 hover:bg-primary/5"
                          disabled={isSuspended}
                          title={isSuspended ? "Account suspended" : undefined}
                          onClick={() => {
                            setAddressTarget("delivery");
                            setIsAddAddressOpen(true);
                          }}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add New
                        </Button>
                      </div>

                      <select
                        id="deliveryAddress"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-10 px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-50 transition-colors"
                        required
                        disabled={addressLoading}
                      >
                        <option value="">
                          {addressLoading ? "Loading addresses..." : "-- Select Recipient Delivery Address * --"}
                        </option>
                        {savedAddresses.map((addr) => (
                          <option key={addr.id} value={addr.id}>
                            {addr.label}: {addr.recipientName} - {addr.addressLine}, {addr.area}, {addr.city}
                          </option>
                        ))}
                      </select>
                      {savedAddresses.length === 0 && !addressLoading && (
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                          You haven't saved any addresses yet. Click "+ Add New" to create one.
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </CardContent>
            </Card>

            {/* 2. Parcel Details */}
            <Card className="border shadow-xs">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Parcel Specifications
                </CardTitle>
                <CardDescription>
                  Enter accurate weight and optional cash collection amount
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-5 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Weight */}
                  <form.Field name="weight">
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name} className="font-medium">
                          Parcel Weight (kg) *
                        </Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="number"
                          min="0.1"
                          step="0.1"
                          placeholder="e.g. 1"
                          value={field.state.value === "" || field.state.value === undefined ? "" : field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.handleChange(val === "" ? ("" as any) : Number(val));
                          }}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Base rate includes up to 1 kg. +৳20 for each additional kg.
                        </p>
                      </div>
                    )}
                  </form.Field>

                  {/* COD Amount */}
                  <form.Field name="codAmount">
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name} className="font-medium">
                          Cash on Delivery (COD) Amount (৳)
                        </Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="number"
                          min="0"
                          step="10"
                          placeholder="0"
                          value={field.state.value === "" || field.state.value === undefined ? "" : field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.handleChange(val === "" ? ("" as any) : Number(val));
                          }}
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter 0 if payment is already collected from recipient.
                        </p>
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Parcel Description */}
                <form.Field name="parcelDescription">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name} className="font-medium">
                        Parcel Description (Optional)
                      </Label>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        placeholder="e.g. Documents, Electronics, Clothing, Fragile Items..."
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="resize-none h-20"
                      />
                    </div>
                  )}
                </form.Field>
              </CardContent>
            </Card>

            {/* 3. Delivery Speed */}
            <Card className="border shadow-xs">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Delivery Speed
                </CardTitle>
                <CardDescription>
                  Select your preferred delivery priority and transit timeline
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-5">
                <form.Field name="deliveryType">
                  {(field) => (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Standard Option */}
                      <button
                        type="button"
                        onClick={() => field.handleChange("STANDARD")}
                        className={`text-left w-full cursor-pointer rounded-xl border p-4 transition-all relative flex flex-col justify-between ${
                          field.state.value === "STANDARD"
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start justify-between w-full">
                          <div>
                            <p className="font-semibold text-foreground">Standard Delivery</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Regular transit, 2–3 business days
                            </p>
                          </div>
                          {field.state.value === "STANDARD" && (
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          )}
                        </div>
                        <div className="mt-4 pt-3 border-t w-full flex justify-between items-center text-sm">
                          <span className="text-xs text-muted-foreground">Base Charge</span>
                          <span className="font-bold text-foreground">৳70</span>
                        </div>
                      </button>

                      {/* Express Option */}
                      <button
                        type="button"
                        onClick={() => field.handleChange("EXPRESS")}
                        className={`text-left w-full cursor-pointer rounded-xl border p-4 transition-all relative flex flex-col justify-between ${
                          field.state.value === "EXPRESS"
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start justify-between w-full">
                          <div>
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded mb-1">
                              ⚡ Fastest
                            </span>
                            <p className="font-semibold text-foreground">Express Priority</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Guaranteed delivery within 24 hours
                            </p>
                          </div>
                          {field.state.value === "EXPRESS" && (
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          )}
                        </div>
                        <div className="mt-4 pt-3 border-t w-full flex justify-between items-center text-sm">
                          <span className="text-xs text-muted-foreground">Base Charge</span>
                          <span className="font-bold text-foreground">৳120</span>
                        </div>
                      </button>
                    </div>
                  )}
                </form.Field>
              </CardContent>
            </Card>

            {/* 4. Payment Method */}
            <Card className="border shadow-xs">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Method
                </CardTitle>
                <CardDescription>
                  Select how delivery charges will be settled
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-5">
                <form.Field name="paymentMethod">
                  {(field) => (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* bKash Online */}
                      <button
                        type="button"
                        onClick={() => field.handleChange("BKASH")}
                        className={`text-left w-full cursor-pointer rounded-xl border p-4 transition-all relative flex flex-col justify-between ${
                          field.state.value === "BKASH"
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start justify-between w-full">
                          <div>
                            <p className="font-semibold text-foreground">bKash Online Payment</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Instant checkout via bKash payment gateway
                            </p>
                          </div>
                          {field.state.value === "BKASH" && (
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          )}
                        </div>
                        <span className="mt-3 text-xs font-semibold text-[#D12053]">
                          Seamless & Automated
                        </span>
                      </button>

                      {/* Cash on Delivery */}
                      <button
                        type="button"
                        onClick={() => field.handleChange("COD")}
                        className={`text-left w-full cursor-pointer rounded-xl border p-4 transition-all relative flex flex-col justify-between ${
                          field.state.value === "COD"
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start justify-between w-full">
                          <div>
                            <p className="font-semibold text-foreground">Cash on Delivery (COD)</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Pay delivery charge in cash when parcel is collected/delivered
                            </p>
                          </div>
                          {field.state.value === "COD" && (
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          )}
                        </div>
                        <span className="mt-3 text-xs font-semibold text-emerald-600">
                          Cash Settlement
                        </span>
                      </button>
                    </div>
                  )}
                </form.Field>
              </CardContent>
            </Card>
          </div>

          {/* Sticky Order Summary (1 col on right) */}
          <aside className="lg:sticky lg:top-6">
            <Card className="border shadow-sm">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base">Delivery Fare Summary</CardTitle>
                <CardDescription>Real-time automated billing calculation</CardDescription>
              </CardHeader>

              <CardContent className="pt-4 space-y-4">
                <form.Subscribe
                  selector={(state) => [
                    state.values.deliveryType,
                    state.values.weight,
                    state.values.codAmount,
                  ]}
                >
                  {([deliveryType, weight, codAmount]) => {
                    const numWeight = Number(weight) || 1;
                    const baseFare = deliveryType === "EXPRESS" ? 120 : 70;
                    const extraWeightCharge =
                      numWeight > 1 ? Math.ceil(numWeight - 1) * 20 : 0;
                    const totalDeliveryFee = baseFare + extraWeightCharge;

                    return (
                      <>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Base Rate ({deliveryType === "EXPRESS" ? "Express" : "Standard"})
                            </span>
                            <span className="font-medium text-foreground">৳{baseFare}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Weight Charge ({numWeight} kg)
                            </span>
                            <span className="font-medium text-foreground">
                              {extraWeightCharge > 0 ? `+৳${extraWeightCharge}` : "৳0"}
                            </span>
                          </div>

                          {Number(codAmount) > 0 && (
                            <div className="flex justify-between pt-1 border-t border-dashed">
                              <span className="text-muted-foreground text-xs">
                                COD To Collect From Recipient
                              </span>
                              <span className="font-mono font-semibold text-xs text-primary">
                                ৳{codAmount}
                              </span>
                            </div>
                          )}
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center py-1">
                          <span className="font-bold text-foreground">Total Delivery Fee</span>
                          <span className="text-2xl font-black text-primary">
                            ৳{totalDeliveryFee}
                          </span>
                        </div>

                        <div className="rounded-xl bg-muted/60 p-3 text-xs space-y-1 border">
                          <div className="flex items-center gap-1.5 font-semibold text-foreground">
                            <Truck className="w-3.5 h-3.5 text-primary" />
                            Estimated Delivery Timeline
                          </div>
                          <p className="text-muted-foreground">
                            {deliveryType === "EXPRESS"
                              ? "⚡ Delivery within 24 hours of pickup"
                              : "📦 Delivery within 2 to 3 working business days"}
                          </p>
                        </div>
                      </>
                    );
                  }}
                </form.Subscribe>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-semibold gap-2 mt-2"
                  disabled={isSubmitting || isSuspended}
                >
                  {isSuspended ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Account Suspended (Booking Disabled)
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Booking Parcel...
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4" />
                      Confirm & Book Parcel
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </form>

      {/* Add Address Modal (Shadcn Dialog) */}
      <AddAddressModal
        open={isAddAddressOpen}
        onOpenChange={setIsAddAddressOpen}
        defaultLabel={addressTarget === "pickup" ? "Warehouse" : "Home"}
        onSuccessCreated={(newAddressId) => {
          if (addressTarget === "pickup") {
            form.setFieldValue("pickupAddressId", newAddressId);
          } else {
            form.setFieldValue("deliveryAddressId", newAddressId);
          }
        }}
      />

      {/* Booking Success Modal (Shadcn Dialog) */}
      <BookingSuccessModal
        open={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
        shipment={createdShipment}
        paymentUrl={paymentUrl}
        paymentMethod={selectedMethod}
      />
    </div>
  );
}
