"use client";

import { useState, useEffect } from "react";
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
import { useGetAllUsers, useUpdateUserStatus } from "@/hooks/admin.hook";
import { UserParams, UserStatus } from "@/types/user.type";
import {
  User,
  Mail,
  Shield,
  Calendar,
  CheckCircle,
  Ban,
  AlertTriangle,
} from "lucide-react";

interface Props extends UserParams {
  selectedId: string | null;
  onClose: () => void;
}

const UserSheet = ({ selectedId, onClose, ...params }: Props) => {
  const { data } = useGetAllUsers(params);
  const selectedUser = data?.data?.find((user) => user.id === selectedId);

  const [cachedUser, setCachedUser] = useState(selectedUser);

  useEffect(() => {
    if (selectedUser) {
      setCachedUser(selectedUser);
    }
  }, [selectedUser]);

  const activeUser = selectedUser || cachedUser;

  const { mutate: updateStatus, isPending } = useUpdateUserStatus();

  if (!activeUser) {
    return null;
  }

  const handleStatusChange = (newStatus: UserStatus) => {
    if (!selectedId) return;

    if (activeUser.status === newStatus) {
      toast.add({
        title: "Already in status",
        description: `This user account is already ${newStatus}.`,
      });
      return;
    }

    updateStatus(
      { userId: selectedId, status: newStatus },
      {
        onSuccess: (res) => {
          if (res?.success) {
            toast.add({
              title: "Status Updated",
              description: `User status changed to ${newStatus} successfully.`,
            });
            onClose();
          }
        },
        onError: (error: any) => {
          toast.add({
            title: "Update Failed",
            description: error?.message || "Failed to update user status.",
          });
        },
      },
    );
  };

  const isAdmin = activeUser.role === "ADMIN";

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700 border-green-200";
      case "BLOCKED":
        return "bg-red-100 text-red-700 border-red-200";
      case "SUSPENDED":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <Sheet open={Boolean(selectedId)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto flex flex-col justify-between p-6">
        <div className="space-y-6">
          <SheetHeader className="p-0 pb-4 border-b">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <SheetTitle className="text-xl font-bold">
                User Details & Management
              </SheetTitle>
            </div>
            <SheetDescription>
              Manage account status and review user activity credentials.
            </SheetDescription>
          </SheetHeader>

          {/* User Profile Card */}
          <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-xl border">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary/10 border flex items-center justify-center text-primary font-bold text-2xl">
              {activeUser.imageUrl ? (
                <img
                  src={activeUser.imageUrl}
                  alt={activeUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                activeUser.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold capitalize">
                {activeUser.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {activeUser.email}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-secondary text-secondary-foreground border">
                  {activeUser.role}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getStatusBadge(
                    activeUser.status,
                  )}`}
                >
                  {activeUser.status}
                </span>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg border bg-card shadow-sm space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                <Shield className="w-4 h-4 text-primary" /> User ID
              </p>
              <p className="text-xs font-mono font-medium truncate">
                {activeUser.id}
              </p>
            </div>

            <div className="p-3.5 rounded-lg border bg-card shadow-sm space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-primary" /> Member Since
              </p>
              <p className="text-sm font-medium">
                {new Date(activeUser.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Account Status Control Section */}
          <div className="p-4 rounded-xl border bg-muted/20 space-y-3">
            <h4 className="text-sm font-semibold">Change Account Status</h4>
            {isAdmin ? (
              <p className="text-xs text-muted-foreground bg-muted p-2.5 rounded-lg border">
                🔒 Admin accounts cannot be blocked or suspended from this panel.
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Select a status to immediately update this user account access:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center justify-center gap-1.5 transition-all font-semibold ${
                      activeUser.status === "ACTIVE"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20"
                        : "border-border hover:border-emerald-500/50 hover:text-emerald-600"
                    }`}
                    disabled={isPending || activeUser.status === "ACTIVE"}
                    onClick={() => handleStatusChange("ACTIVE")}
                  >
                    <CheckCircle className="w-4 h-4" /> Activate
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center justify-center gap-1.5 transition-all font-semibold ${
                      activeUser.status === "SUSPENDED"
                        ? "bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-600/20"
                        : "border-border hover:border-amber-500/50 hover:text-amber-600"
                    }`}
                    disabled={isPending || activeUser.status === "SUSPENDED"}
                    onClick={() => handleStatusChange("SUSPENDED")}
                  >
                    <AlertTriangle className="w-4 h-4" /> Suspend
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center justify-center gap-1.5 transition-all font-semibold ${
                      activeUser.status === "BLOCKED"
                        ? "bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-600/20"
                        : "border-border hover:border-rose-500/50 hover:text-rose-600"
                    }`}
                    disabled={isPending || activeUser.status === "BLOCKED"}
                    onClick={() => handleStatusChange("BLOCKED")}
                  >
                    <Ban className="w-4 h-4" /> Block
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <SheetFooter className="p-0 pt-4 border-t mt-6">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserSheet;
