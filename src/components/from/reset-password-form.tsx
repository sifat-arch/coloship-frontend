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
import { resetPasswordValidationSchema } from "@/validation";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useResetPassword } from "@/hooks";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { mutate: resetPass, isPending: resetPassLoading } = useResetPassword();

  const form = useForm({
    defaultValues: {
      email: email,
      otp: "",
      newPassword: "",
    },
    validators: {
      onSubmit: resetPasswordValidationSchema,
    },
    onSubmit: ({ value }) => {
      const payload = {
        email: value.email,
        otp: value.otp,
        newPassword: value.newPassword,
      };
      resetPass(payload, {
        onSuccess: (res) => {
          toast.add({
            title: "OTP send Successful",
            description: "Please Reset Your password",
            type: "success",
          });
          router.push("/login");
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
          Reset Your Password
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter OTP and set your new password.
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

          {/* otp */}

          <form.Field name="otp">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-medium"
                  >
                    Six Digit OTP
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    placeholder="123456"
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

          {/* new password */}

          <form.Field name="newPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium"
                    >
                      New Password
                    </FieldLabel>
                  </div>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Enter your new password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="current-password"
                      aria-invalid={isInvalid}
                      className="h-11"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-1 h-11 w-full font-medium"
            disabled={resetPassLoading}
          >
            {resetPassLoading ? (
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

export default ResetPasswordForm;
