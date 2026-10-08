import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/from/frogot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Coloship account password securely via email verification.",
  openGraph: {
    title: "Forgot Password | Coloship",
    description: "Reset your Coloship account password securely.",
    url: "/login/forgot-password",
    siteName: "Coloship",
  },
};

const ForgotPassword = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
