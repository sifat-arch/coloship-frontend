"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, Suspense, useEffect, useRef, useState } from "react";
import AuthLoading from "@/components/auth/auth-loading";
import Footer from "@/components/layout/public/footer";
import Header from "@/components/layout/public/header";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (isLoading) {
    return <AuthLoading />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Suspense fallback={<AuthLoading />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
