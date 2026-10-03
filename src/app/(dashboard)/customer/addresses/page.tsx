import React from "react";
import AddressList from "@/components/modules/addresses/address-list";
import { Metadata } from "next";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Saved Addresses | ColoShip",
  description: "Manage your saved pickup locations and delivery destinations.",
};

export default function CustomerAddressesPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Page Header */}
      <div className="border-b pb-5">
        <div className="flex items-center gap-2 text-primary mb-1">
          <MapPin className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Address Book
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Saved Addresses
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Easily manage frequently used pickup and drop-off addresses for quick parcel booking.
        </p>
      </div>

      <AddressList />
    </div>
  );
}
