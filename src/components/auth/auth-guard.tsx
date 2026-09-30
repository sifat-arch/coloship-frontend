"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { data, isPending, isError } = useGetMe();
  const router = useRouter();

  const user = data?.data;

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
  return <div>{children}</div>;
};

export default AuthGuard;
