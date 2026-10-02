import React from "react";
import { Users } from "lucide-react";
import UserTabs from "@/components/modules/user-management/user-tabs";

const UsersPage = () => {
  return (
    <section className="p-6 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Users className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              User Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            View registered customers, couriers, and administrators, and manage their account status.
          </p>
        </div>
      </div>

      {/* Main Tabs / Table Content */}
      <div className="bg-card rounded-xl border shadow-sm p-4 md:p-6">
        <UserTabs />
      </div>
    </section>
  );
};

export default UsersPage;
