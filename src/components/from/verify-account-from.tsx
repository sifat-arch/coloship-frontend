"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyAccount } from "@/hooks";
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
      router.push("/");
    }
  }, [email, router]);

  const handleOPT = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
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
            error.message || "Verification Failed,Something went wrong",
          type: "error",
        });
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please provide the OTP we send in your email
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOPT();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
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
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Field>
          {isInvalid && (
            <FieldError
              errors={[{ message: "Invalid code.please try again" }]}
            />
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="otp-form">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyAccountFrom;
