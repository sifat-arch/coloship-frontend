import CourierApprovalTabs from "@/components/modules/courier-approval/courier-approval-tabs";
import React from "react";

const ApproveCourier = () => {
  return (
    <section className="p-5">
      <div>
        <h1>Courier approve</h1>
        <p>Please review and make sure the given data is real</p>
      </div>
      <CourierApprovalTabs />
    </section>
  );
};

export default ApproveCourier;
