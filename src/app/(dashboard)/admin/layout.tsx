import RoleGuard from "@/components/auth/role-guard";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <RoleGuard roles={["CUSTOMER"]}>admin{children}</RoleGuard>;
};

export default layout;
