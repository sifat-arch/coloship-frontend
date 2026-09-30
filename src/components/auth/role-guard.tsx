"use client";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import { UserRole } from "@/types";
import AccessDenied from "./access-denied";

interface Iprops {
  children: ReactNode;
  roles: UserRole[];
}
const RoleGuard = ({ children, roles }: Iprops) => {
  const { data, isPending, isError } = useGetMe();
  const router = useRouter();

  const user = data?.data;

  const isAuthorized = !!user && roles.includes(user.role);

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/login");
    }
  }, [user, router, isError, isPending]);

  if (isPending) {
    return <AuthLoading />;
  }
  if (isError || !user) {
    return <AuthLoading />;
  }
  if (isAuthorized) {
    return <>{children}</>;
  }
  return <AccessDenied />;
};

export default RoleGuard;
