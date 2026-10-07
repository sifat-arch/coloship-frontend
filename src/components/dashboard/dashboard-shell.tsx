"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { ReactNode } from "react";
import { UserRole } from "@/types";
import { useGetMe } from "@/hooks/auth.hook";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import NotificationBell from "./notification-bell";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {
  const { data: userData } = useGetMe();
  const user = userData?.data;
  const isSuspended = user?.status === "SUSPENDED";
  const isBlocked = user?.status === "BLOCKED";

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset className="bg-background min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border/70 bg-background/80 backdrop-blur-md px-4 sm:px-6 transition-all">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 hover:bg-primary/10 hover:text-primary transition-colors" />
          </div>

          <div className="flex items-center gap-3">
            {isSuspended && (
              <div className="flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                <AlertTriangle className="w-3.5 h-3.5" />
                Account Suspended
              </div>
            )}
            {isBlocked && (
              <div className="flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 border border-red-500/20">
                <ShieldAlert className="w-3.5 h-3.5" />
                Account Blocked
              </div>
            )}
            <NotificationBell />
          </div>
        </header>

        {/* Global Warning Banner for Suspended Account */}
        {isSuspended && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800/60 px-4 py-3 text-amber-900 dark:text-amber-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-7xl mx-auto">
              <div className="flex items-start sm:items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
                <p className="text-xs sm:text-sm">
                  <span className="font-bold">Notice:</span> Your account is currently <strong>suspended</strong>. Action buttons (such as booking parcels, accepting tasks, toggling duty status, or updating details) are disabled.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-900/60 px-2 py-0.5 rounded self-start sm:self-auto">
                Read-Only Access
              </span>
            </div>
          </div>
        )}

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
