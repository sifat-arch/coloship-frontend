"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed, Lock, Mail, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useRegister } from "@/hooks";
import { registerCustomerSchema } from "@/validation";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: register, isPending: registerPending } = useRegister();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerCustomerSchema,
    },
    onSubmit: ({ value }) => {
      const registrationData = {
        name: value.name,
        email: value.email,
        password: value.password,
      };

      register(registrationData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server Failed",
              description: "Registration Failure Because server failed",
              type: "error",
            });
            return;
          }
          toast.add({
            title: "Register Successful",
            description:
              "Please verify your account with the code sent to your email.",
            type: "success",
          });
          const params = new URLSearchParams({ email: registrationData.email });
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: (error) => {
          toast.add({
            title: "Registration Failure",
            description:
              error.message || "Registration Failed, Something went wrong",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-7">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Join Coloship
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Create an account
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Sign up to start sending, managing, and tracking your parcels.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-4 sm:gap-5">
          {/* Full Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold text-foreground/90"
                  >
                    Full Name
                  </FieldLabel>

                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                      <User className="size-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="John Doe"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="name"
                      aria-invalid={isInvalid}
                      className="h-11 rounded-xl bg-muted/20 pl-10 pr-4 text-sm transition-all focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold text-foreground/90"
                  >
                    Email address
                  </FieldLabel>

                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                      <Mail className="size-4" />
                    </div>
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
                      className="h-11 rounded-xl bg-muted/20 pl-10 pr-4 text-sm transition-all focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold text-foreground/90"
                  >
                    Password
                  </FieldLabel>

                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                      <Lock className="size-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="new-password"
                      aria-invalid={isInvalid}
                      className="h-11 rounded-xl bg-muted/20 pl-10 pr-11 text-sm transition-all focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold text-foreground/90"
                  >
                    Confirm Password
                  </FieldLabel>

                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                      <Lock className="size-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="new-password"
                      aria-invalid={isInvalid}
                      className="h-11 rounded-xl bg-muted/20 pl-10 pr-11 text-sm transition-all focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-2 h-11 w-full rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/90 active:scale-[0.99] transition-all duration-200 cursor-pointer"
            disabled={registerPending}
          >
            {registerPending ? (
              <span className="flex items-center gap-2">
                <Spinner /> Creating account...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <UserPlus className="size-4" />
                Create account
              </span>
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* Separator */}
      <div className="my-6">
        <FieldSeparator className="my-0">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Or continue with
          </span>
        </FieldSeparator>
      </div>

      {/* Google Login */}
      <GoogleLoginComponent />

      {/* Sign In Link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
