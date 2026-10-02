import React from "react";
import CourierProfileView from "@/components/modules/courier-profile/courier-profile-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courier Profile | ColoShip",
  description: "Manage your courier account, credentials, and vehicle information.",
};

const CourierProfilePage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <CourierProfileView />
    </div>
  );
};

export default CourierProfilePage;
