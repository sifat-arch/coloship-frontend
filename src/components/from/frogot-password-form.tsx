"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { forgotPasswordSchema, loginCustomerSchema } from "@/validation";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useForgotPassword } from "@/hooks";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const { mutate: ForgotPassword, isPending: forgotLoading } =
    useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: ({ value }) => {
      const payload = {
        email: value.email,
      };
      ForgotPassword(payload, {
        onSuccess: (res) => {
          toast.add({
            title: "OTP send Successful",
            description: "Please Reset Your password",
            type: "success",
          });

          const params = new URLSearchParams({ email: payload.email });
          router.push(`/login/reset-password?${params.toString()}`);
        },
        onError: (error) => {
          toast.add({
            title: "Email Verification Failure",
            description:
              error.message || "Password Reset Failed,Something went wrong",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Forgot Your Password
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter your email to send an OTP.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-medium"
                  >
                    Email address
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="email"
                    aria-invalid={isInvalid}
                    className="h-11"
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-1 h-11 w-full font-medium"
            disabled={forgotLoading}
          >
            {forgotLoading ? (
              <>
                <Spinner /> Submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
