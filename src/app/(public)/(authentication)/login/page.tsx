import type { Metadata } from "next";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/svg/logo";
import LoginForm from "@/components/from/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Coloship account to manage parcels, track bookings, and access customer, courier, or admin dashboards.",
  openGraph: {
    title: "Sign In | Coloship",
    description: "Access your Coloship account to manage parcels and track deliveries.",
    url: "/login",
    siteName: "Coloship",
  },
};

const Login = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm sm:max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/login1.jpg"
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
