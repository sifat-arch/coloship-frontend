"use client";
import React, { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProvider from "./google-auth.provider";
import SmoothScrollProvider from "./smooth-scroll.provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleAuthProvider>
      <QueryProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </QueryProvider>
    </GoogleAuthProvider>
  );
};

export default Providers;
