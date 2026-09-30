import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["COURIER"]}>
      <DashboardShell role="COURIER"> {children}</DashboardShell>
    </RoleGuard>
  );
};

export default layout;
