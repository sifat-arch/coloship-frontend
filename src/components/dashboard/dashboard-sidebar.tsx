"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/svg/logo";
import { UserRole } from "@/types";
import { adminRoutes, courierRoutes, customerRoutes } from "@/rouutes";
import { sidebarItems } from "@/types/sidebar.types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { useLogout } from "@/hooks/auth.hook";
import { toast } from "@/components/ui/toast";

const sidebarRoutes: Record<UserRole, sidebarItems> = {
  ADMIN: adminRoutes,
  COURIER: courierRoutes,
  CUSTOMER: customerRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const routes = sidebarRoutes[role] || [];
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logged out successfully",
          description: "See you again soon!",
          type: "success",
        });
        router.push("/login");
      },
      onError: (err) => {
        toast.add({
          title: "Logout failed",
          description: err.message || "Something went wrong while logging out",
          type: "error",
        });
      },
    });
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-3 border-b">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer w-full transition-colors font-medium"
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin text-red-500" />
              ) : (
                <LogOut className="w-4 h-4 text-red-500" />
              )}
              <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
