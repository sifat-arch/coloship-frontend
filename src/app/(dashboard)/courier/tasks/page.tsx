import React from "react";
import { Truck } from "lucide-react";
import CourierTasksTabs from "@/components/modules/courier-tasks/courier-tasks-tabs";

const CourierTasksPage = () => {
  return (
    <section className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Truck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Delivery Tasks
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your assigned parcels, accept requests, and update delivery
            progress.
          </p>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm p-4 md:p-6">
        <CourierTasksTabs />
      </div>
    </section>
  );
};

export default CourierTasksPage;
