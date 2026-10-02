import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";
import {
  useAcceptCourier,
  useGetAllCouriers,
  useRejectCourier,
} from "@/hooks/admin.hook";
import { CourierParams } from "@/types/courier.status";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  Truck,
  CreditCard,
  ExternalLink,
} from "lucide-react";

interface Props extends CourierParams {
  selectedId: string | null;
  onClose: () => void;
}

const CourierApprovalSheet = ({ selectedId, onClose, ...params }: Props) => {
  const { data } = useGetAllCouriers(params);

  const selectedCourier = data?.data?.find(
    (courier) => courier.id === selectedId,
  );

  const { mutate: approveCourier, isPending: approvePending } =
    useAcceptCourier();
  const { mutate: rejectCourier, isPending: rejectPending } =
    useRejectCourier();

  if (!selectedCourier) {
    return null;
  }

  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    if (!selectedId) return;

    if (status === "APPROVED") {
      approveCourier(selectedId, {
        onSuccess: (res) => {
          if (res?.success) {
            toast.add({
              title: "Courier Accepted",
              description: "Courier request has been accepted successfully.",
            });
            onClose();
          }
        },
        onError: (error: any) => {
          toast.add({
            title: "Action Failed",
            description: error?.message || "Something went wrong!",
          });
        },
      });
    } else if (status === "REJECTED") {
      rejectCourier(selectedId, {
        onSuccess: (res) => {
          if (res?.success) {
            toast.add({
              title: "Courier Rejected",
              description: "Courier request has been rejected.",
            });
            onClose();
          }
        },
        onError: (error: any) => {
          toast.add({
            title: "Action Failed",
            description: error?.message || "Something went wrong!",
          });
        },
      });
    }
  };

  return (
    <Sheet open={!!selectedId} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto flex flex-col justify-between p-6">
        <div>
          <SheetHeader className="p-0 pb-4 border-b">
            <SheetTitle className="text-xl font-bold">
              Courier Profile Review
            </SheetTitle>
            <SheetDescription>
              Review courier details and documents before taking an action.
            </SheetDescription>
          </SheetHeader>

          {/* Courier Details Content */}
          <div className="py-6 space-y-6">
            {/* Top Profile Card */}
            <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-xl border">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 border">
                {selectedCourier.profileImageUrl ? (
                  <img
                    src={selectedCourier.profileImageUrl}
                    alt={selectedCourier.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                    {selectedCourier.user.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold capitalize">
                  {selectedCourier.user.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedCourier.user.email}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      selectedCourier.VerificationStatus === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : selectedCourier.VerificationStatus === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selectedCourier.VerificationStatus}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • Role: {selectedCourier.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg border bg-card text-card-foreground shadow-sm flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Phone Number
                  </p>
                  <p className="text-sm font-semibold">
                    {selectedCourier.phone}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg border bg-card text-card-foreground shadow-sm flex items-start gap-3">
                <Truck className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Vehicle Type
                  </p>
                  <p className="text-sm font-semibold">
                    {selectedCourier.vehicleType}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg border bg-card text-card-foreground shadow-sm flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    NID Number
                  </p>
                  <p className="text-sm font-semibold">
                    {selectedCourier.nidNumber || "N/A"}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg border bg-card text-card-foreground shadow-sm flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    License Number
                  </p>
                  <p className="text-sm font-semibold">
                    {selectedCourier.licenseNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle Number Section */}
            <div className="p-3 rounded-lg border bg-muted/20 flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Vehicle Registration No:
              </span>
              <span className="text-sm font-bold bg-background px-3 py-1 rounded border shadow-sm">
                {selectedCourier.vehicleNumber || "Not Provided"}
              </span>
            </div>

            {/* Resume / Document Link */}
            {selectedCourier.resume && (
              <div className="p-4 rounded-xl border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="text-sm font-semibold">
                      Courier Resume / CV
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      View uploaded document
                    </p>
                  </div>
                </div>
                <a
                  href={selectedCourier.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
                >
                  Open File <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer Action Buttons */}
        <SheetFooter className="p-0 pt-4 border-t mt-auto">
          <div className="flex gap-3 w-full">
            <Button
              variant="default"
              size="lg"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleReviewAction("APPROVED")}
              disabled={selectedCourier.VerificationStatus !== "PENDING"}
            >
              {approvePending ? "Approving..." : "Approve"}
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="flex-1"
              onClick={() => handleReviewAction("REJECTED")}
              disabled={selectedCourier.VerificationStatus !== "PENDING"}
            >
              {rejectPending ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CourierApprovalSheet;
