import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

const CourierApprovalSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>review</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you sure?</SheetTitle>
          <SheetDescription>This action cannot be undone</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CourierApprovalSheet;
