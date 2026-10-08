import React from "react";
import { Metadata } from "next";
import { PackagePlus } from "lucide-react";
import BookParcelForm from "@/components/modules/book-parcel/book-parcel-form";

export const metadata: Metadata = {
  title: "Book a Parcel | ColoShip",
  description: "Book a new parcel delivery with instant fee calculation.",
};

const BookParcelPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      {/* Page Header */}
      <div className="border-b pb-5">
        <div className="flex items-center gap-2 text-primary mb-1">
          <PackagePlus className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Shipment Booking
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Book a Parcel
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Select pickup & delivery addresses, specify parcel weight, and choose your preferred delivery speed.
        </p>
      </div>

      {/* Main Booking Form */}
      <BookParcelForm />
    </div>
  );
};

export default BookParcelPage;