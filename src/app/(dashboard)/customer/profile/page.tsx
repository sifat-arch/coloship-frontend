import React from "react";
import CustomerProfileView from "@/components/modules/profile/customer-profile-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | ColoShip",
  description: "Manage your personal profile, credentials, and account settings.",
};

export default function CustomerProfilePage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <CustomerProfileView />
    </div>
  );
}
