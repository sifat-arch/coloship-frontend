import type { Metadata } from "next";
import ResetPasswordForm from "@/components/from/reset-password-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new secure password for your Coloship account.",
  openGraph: {
    title: "Reset Password | Coloship",
    description: "Set a new secure password for your Coloship account.",
    url: "/login/reset-password",
    siteName: "Coloship",
  },
};

const ResetPassword = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<p>Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
};

export default ResetPassword;
