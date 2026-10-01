import CourierApprovalTabs from "@/components/modules/courier-approval/courier-approval-tabs";
import { ShieldCheck } from "lucide-react";
import React from "react";

const ApproveCourier = () => {
  return (
    <section className="p-6 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Courier Approval Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Review applicant documents, verify credentials, and approve or
            reject courier requests.
          </p>
        </div>

        {/* Quick Stats or Action Badge (Optional) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-muted/50 border rounded-lg text-xs font-medium text-muted-foreground">
          <span>Admin Security Panel</span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
      </div>

      {/* Main Tabs / Table Content */}
      <div className="bg-card rounded-xl border shadow-sm p-4 md:p-6">
        <CourierApprovalTabs />
      </div>
    </section>
  );
};

export default ApproveCourier;
