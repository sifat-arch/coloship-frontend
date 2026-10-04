"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import {
  useGetCourierProfile,
  useUpdateCourierProfile,
} from "@/hooks/courier.hook";
import {
  User,
  Mail,
  Phone,
  Truck,
  ShieldCheck,
  CreditCard,
  FileText,
  Calendar,
  ExternalLink,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import ProfileImageUploader from "@/components/modules/profile/profile-image-uploader";

const CourierProfileView = () => {
  const { data, isLoading } = useGetCourierProfile();
  const profile = data?.data;

  const { mutate: updateProfile, isPending: updatePending } =
    useUpdateCourierProfile();

  // Local state for editable fields
  const [phone, setPhone] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Sync initial values when profile loads
  const handleStartEdit = () => {
    if (profile) {
      setPhone(profile.phone || "");
      setVehicleType(profile.vehicleType || "BIKE");
      setVehicleNumber(profile.vehicleNumber || "");
      setLicenseNumber(profile.licenseNumber || "");
      setIsEditing(true);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile(
      {
        phone: phone || undefined,
        vehicleType: vehicleType as any,
        vehicleNumber: vehicleNumber || undefined,
        licenseNumber: licenseNumber || undefined,
      },
      {
        onSuccess: (res) => {
          if (res?.success) {
            toast.add({
              title: "Profile Updated",
              description: "Your courier details have been saved successfully.",
            });
            setIsEditing(false);
          }
        },
        onError: (err: any) => {
          toast.add({
            title: "Update Failed",
            description: err?.message || "Failed to update profile.",
          });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        Loading profile details...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-xl bg-card">
        Courier profile not found.
      </div>
    );
  }

  const isApproved =
    profile.isApproved || profile.VerificationStatus === "APPROVED";
  const isSuspended =
    profile.user?.status === "SUSPENDED" || profile.user?.status === "BLOCKED";

  return (
    <div className="space-y-6">
      {/* 1. Hero Profile Banner */}
      <div className="p-6 md:p-8 rounded-2xl border bg-card shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <ProfileImageUploader
            currentImageUrl={profile.user?.imageUrl || profile.profileImageUrl}
            fallbackName={profile.user?.name}
            size="md"
            editable={!isSuspended}
          />
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight capitalize">
                {profile.user?.name}
              </h2>
              <span
                className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                  isApproved
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-amber-100 text-amber-700 border-amber-200"
                }`}
              >
                {isApproved ? (
                  <ShieldCheck className="w-3.5 h-3.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
                {profile.VerificationStatus || (isApproved ? "APPROVED" : "PENDING")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> {profile.user?.email}
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Member since{" "}
                {new Date(profile.createdAt || Date.now()).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              {isSuspended ? (
                <span className="font-semibold text-amber-600">● Suspended</span>
              ) : (
                <span
                  className={`font-semibold ${
                    profile.isAvailable ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {profile.isAvailable ? "● Online (Available)" : "○ Offline"}
                </span>
              )}
            </div>
          </div>
        </div>

        {!isEditing && (
          <Button
            onClick={handleStartEdit}
            variant="outline"
            size="sm"
            disabled={isSuspended}
            title={isSuspended ? "Account suspended: Profile details cannot be edited" : undefined}
          >
            {isSuspended ? "Edit Disabled (Suspended)" : "Edit Information"}
          </Button>
        )}
      </div>

      {/* 2. Organized Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A: Vehicle & Transit Details */}
        <Card className="border">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" /> Vehicle & Transit Details
            </CardTitle>
            <CardDescription>
              Your registered delivery transportation specifications
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex justify-between items-center py-1 border-b pb-2">
              <span className="text-xs text-muted-foreground">Vehicle Type</span>
              <span className="text-sm font-semibold px-2.5 py-0.5 bg-muted rounded-md uppercase">
                {profile.vehicleType || "Not Specified"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b pb-2">
              <span className="text-xs text-muted-foreground">Registration Number</span>
              <span className="text-sm font-mono font-medium">
                {profile.vehicleNumber || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b pb-2">
              <span className="text-xs text-muted-foreground">Driving License</span>
              <span className="text-sm font-mono font-medium">
                {profile.licenseNumber || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-xs text-muted-foreground">Contact Phone</span>
              <span className="text-sm font-medium text-foreground">
                {profile.phone}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card B: Legal & Identity Verification */}
        <Card className="border">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" /> Verification & Documents
            </CardTitle>
            <CardDescription>
              Official verification status and uploaded credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex justify-between items-center py-1 border-b pb-2">
              <span className="text-xs text-muted-foreground">National ID (NID)</span>
              <span className="text-sm font-mono font-medium">
                {profile.nidNumber || "Verified"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b pb-2">
              <span className="text-xs text-muted-foreground">Approval Status</span>
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                Verified Courier Partner
              </span>
            </div>

            {/* Document preview link if available */}
            {profile.resume ? (
              <div className="p-3 rounded-lg border bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs font-semibold">Uploaded Resume / Document</p>
                    <p className="text-[11px] text-muted-foreground">Official verification file</p>
                  </div>
                </div>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                >
                  View File <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className="py-2 text-xs text-muted-foreground italic">
                All verification documents are on file with admin.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 3. Editable Information Section (When Edit Mode is active) */}
      {isEditing && (
        <Card className="border border-primary/20 shadow-sm animate-in fade-in duration-200">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-base flex items-center gap-2 text-primary">
              <Save className="w-4 h-4" /> Edit Profile & Vehicle Details
            </CardTitle>
            <CardDescription>
              Keep your contact and vehicle specifications up to date
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-sm border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 01700000000"
                    required
                  />
                </div>

                {/* Vehicle Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Vehicle Type
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full text-sm border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="BIKE">Motorcycle / Bike</option>
                    <option value="BICYCLE">Bicycle</option>
                    <option value="VAN">Van</option>
                    <option value="TRUCK">Truck</option>
                  </select>
                </div>

                {/* Vehicle Registration Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Vehicle Registration Number
                  </label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full text-sm border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Dhaka Metro-Ha-1234"
                  />
                </div>

                {/* License Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Driving License Number
                  </label>
                  <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full text-sm border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. DL-12345678"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={updatePending}
                  className="bg-primary text-primary-foreground gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  {updatePending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourierProfileView;
