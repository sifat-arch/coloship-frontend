"use client";

import Logo from "@/assets/svg/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { UserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const routes = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About Us",
      url: "/about-us",
    },
    {
      name: "Services",
      url: "/services",
    },
    {
      name: "Contact",
      url: "/contact",
    },
    {
      name: "Track",
      url: "/track",
    },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin",
    COURIER: "/courier",
    CUSTOMER: "/customer",
  };

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: logoutLoading } = useLogout();
  const role: UserRole = !!data?.data && data?.data.role;
  const queryClient = useQueryClient();

  // Scroll visibility states
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide on scroll down, show on scroll up with smooth transition
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Don't hide near the top of page
    if (latest > previous && latest > 120) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logged out",
          description: "Logged out successfully",
        });
        queryClient.clear();
      },
      onError: () => {
        toast.add({
          title: "Logout Failed",
          description: "Something went wrong",
        });
      },
    });
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-110%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 inset-x-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-background/60 shadow-xs"
    >
      <div className="flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/50 bg-muted/40 px-3 py-1.5 shadow-xs">
          {routes.map((route) => {
            const isActive = pathname === route.url;
            return (
              <Link
                key={route.url}
                href={route.url}
                className={`relative px-3.5 py-1 text-sm font-medium transition-all rounded-full ${
                  isActive
                    ? "text-primary font-semibold bg-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                {route.name}
              </Link>
            );
          })}

          {role && (
            <Link
              href={dashboardRoute[role]}
              className={`px-3.5 py-1 text-sm font-medium transition-all rounded-full ${
                pathname.startsWith(dashboardRoute[role])
                  ? "text-primary font-semibold bg-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {logoutLoading ? (
            <span className="text-xs text-muted-foreground font-medium animate-pulse px-3">
              Logging out...
            </span>
          ) : (
            <>
              {!isLoading && !data && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-border/80 bg-background/80 px-4 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-muted/70 hover:border-primary/40"
                  render={
                    <Link href="/login" className="flex items-center gap-1.5">
                      <User className="size-3.5 text-primary" />
                      <span>Login</span>
                    </Link>
                  }
                  nativeButton={false}
                />
              )}

              {!isLoading && data && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-xl gap-1.5 px-3.5 text-xs font-semibold shadow-xs"
                  onClick={handleLogout}
                >
                  <LogOut className="size-3.5" />
                  <span>Logout</span>
                </Button>
              )}
            </>
          )}

          {!isLoading && role === "CUSTOMER" && (
            <Button
              size="sm"
              className="rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-xs shadow-primary/20 transition-all hover:bg-primary/90"
              render={<Link href="/courier-apply">Become a Courier</Link>}
              nativeButton={false}
            />
          )}
        </div>

        {/* Mobile Menu Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-9 items-center justify-center rounded-xl border border-border/70 bg-background/80 text-foreground shadow-xs"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="size-4.5" />
            ) : (
              <Menu className="size-4.5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="sm:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-5 py-4 space-y-4 shadow-lg"
          >
            <nav className="flex flex-col gap-1.5">
              {routes.map((route) => (
                <Link
                  key={route.url}
                  href={route.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === route.url
                      ? "bg-primary/10 font-bold text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {route.name}
                </Link>
              ))}

              {role && (
                <Link
                  href={dashboardRoute[role]}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
                >
                  Dashboard
                </Link>
              )}
            </nav>

            <div className="pt-2 border-t border-border/40 flex flex-col gap-2">
              {!isLoading && !data && (
                <Button
                  variant="outline"
                  className="w-full justify-center rounded-xl"
                  render={<Link href="/login">Login</Link>}
                  nativeButton={false}
                />
              )}

              {!isLoading && data && (
                <Button
                  variant="destructive"
                  className="w-full justify-center rounded-xl"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}

              {!isLoading && role === "CUSTOMER" && (
                <Button
                  className="w-full justify-center rounded-xl"
                  render={<Link href="/courier-apply">Become a Courier</Link>}
                  nativeButton={false}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
