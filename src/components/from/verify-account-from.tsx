"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useVerifyAccount } from "@/hooks";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

const VerifyAccountFrom = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const router = useRouter();

  const { mutate: verifyAccount, isPending: verifyPending } =
    useVerifyAccount();

  useEffect(() => {
    if (!email) {
      router.push("/register");
    }
  }, [email, router]);

  const handleOPT = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verifyAccount(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failed",
            description: "Verification Failure Because server failed",
            type: "error",
          });
          return;
        }
        toast.add({
          title: "Verification Successful",
          description: "Welcome to Coloship",
          type: "success",
        });

        router.push("/");
      },
      onError: (error) => {
        toast.add({
          title: "Verification Failure",
          description:
            error.message || "Verification Failed, Something went wrong",
          type: "error",
        });
      },
    });
  };

  return (
    <div className="w-full">
      {/* Header with Icon */}
      <div className="mb-7">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 shadow-xs">
          <ShieldCheck className="size-6" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
          Two-Step Verification
        </span>

        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Verify your account
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Enter the 6-digit verification code sent to{" "}
          {email ? (
            <span className="font-semibold text-foreground">{email}</span>
          ) : (
            "your email address"
          )}
          .
        </p>
      </div>

      {/* Form */}
      <form
        id="otp-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleOPT();
        }}
        className="space-y-6"
      >
        <Field data-invalid={isInvalid} className="flex flex-col items-center">
          <FieldLabel htmlFor="otp" className="sr-only">
            Verification Code
          </FieldLabel>

          <div className="flex justify-center w-full py-2">
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              autoComplete="off"
              name="otp"
              value={otp}
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
              containerClassName="justify-center gap-1.5 sm:gap-2.5"
            >
              <InputOTPGroup className="gap-1.5 sm:gap-2">
                <InputOTPSlot
                  index={0}
                  className="size-11 sm:size-13 rounded-xl border border-input bg-muted/20 text-base sm:text-lg font-bold shadow-xs transition-all focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <InputOTPSlot
                  index={1}
                  className="size-11 sm:size-13 rounded-xl border border-input bg-muted/20 text-base sm:text-lg font-bold shadow-xs transition-all focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <InputOTPSlot
                  index={2}
                  className="size-11 sm:size-13 rounded-xl border border-input bg-muted/20 text-base sm:text-lg font-bold shadow-xs transition-all focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <InputOTPSlot
                  index={3}
                  className="size-11 sm:size-13 rounded-xl border border-input bg-muted/20 text-base sm:text-lg font-bold shadow-xs transition-all focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <InputOTPSlot
                  index={4}
                  className="size-11 sm:size-13 rounded-xl border border-input bg-muted/20 text-base sm:text-lg font-bold shadow-xs transition-all focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <InputOTPSlot
                  index={5}
                  className="size-11 sm:size-13 rounded-xl border border-input bg-muted/20 text-base sm:text-lg font-bold shadow-xs transition-all focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {isInvalid && (
            <div className="mt-2 text-center">
              <FieldError
                errors={[
                  {
                    message:
                      "Please enter all 6 digits of the verification code.",
                  },
                ]}
              />
            </div>
          )}
        </Field>

        {/* Submit Button */}
        <Button
          type="submit"
          form="otp-form"
          disabled={verifyPending || otp.length !== 6}
          className="h-11 w-full rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/90 active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          {verifyPending ? (
            <span className="flex items-center gap-2">
              <Spinner /> Verifying code...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Verify &amp; Continue
            </span>
          )}
        </Button>
      </form>

      {/* Footer Helper Links */}
      <div className="mt-8 flex flex-col items-center gap-3 text-center text-sm text-muted-foreground">
        <p>
          Didn&apos;t receive the code?{" "}
          <span className="font-medium text-foreground">
            Please check your spam folder
          </span>
        </p>

        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          Back to registration
        </Link>
      </div>
    </div>
  );
};

export default VerifyAccountFrom;
