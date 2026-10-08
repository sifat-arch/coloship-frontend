import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account Verification",
  description: "Complete your account verification on Coloship.",
  openGraph: {
    title: "Account Verification | Coloship",
    description: "Complete your account verification on Coloship.",
    url: "/account-verify",
    siteName: "Coloship",
  },
};

const AccountVerify = () => {
  return <div>Account verify</div>;
};

export default AccountVerify;
