import AuthGuard from "@/components/auth/auth-guard";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard>
      <div>generic dashboard layout{children}</div>;
    </AuthGuard>
  );
};

export default DashboardLayout;
