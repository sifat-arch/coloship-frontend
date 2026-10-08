import React from "react";
import { Package } from "lucide-react";
import ShipmentTabs from "@/components/modules/shipment/shipment-tabs";

const ShipmentsPage = () => {
  return (
    <section className="p-4 sm:p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Package className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Shipment Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Track parcels, manage shipment statuses, and assign couriers to
            deliveries.
          </p>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm p-4 md:p-6">
        <ShipmentTabs />
      </div>
    </section>
  );
};

export default ShipmentsPage;
