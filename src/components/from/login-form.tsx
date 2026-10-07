"use client";

import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeClosed, Lock, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "@/hooks";
import { loginCustomerSchema } from "@/validation";
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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: loginPending } = useLogin();

  const executeLogin = (email: string, password: string) => {
    login(
      { email, password },
      {
        onSuccess: (res: any) => {
          queryClient.clear();
          toast.add({
            title: "Login Successful",
            description: "Welcome Back",
            type: "success",
          });
          const userRole = res?.data?.user?.role;
          if (userRole === "ADMIN") {
            router.push("/admin");
          } else if (userRole === "COURIER") {
            router.push("/courier");
          } else if (userRole === "CUSTOMER") {
            router.push("/customer");
          } else {
            router.push("/");
          }
        },
        onError: (error) => {
          toast.add({
            title: "Authorization Failure",
            description: error.message || "Login Failed, Something went wrong",
            type: "error",
          });
        },
      }
    );
  };

  const handleQuickLogin = (email: string, password: string) => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", password);
    executeLogin(email, password);
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginCustomerSchema,
    },
    onSubmit: ({ value }) => {
      executeLogin(value.email, value.password);
    },
  });

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-7">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Coloship Account
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Enter your email and password to access your dashboard.
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
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-semibold text-foreground/90"
                    >
                      Password
                    </FieldLabel>

                    <Link
                      href="/login/forgot-password"
                      className="text-xs font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                      <Lock className="size-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="current-password"
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

          {/* Submit */}
          <Button
            type="submit"
            className="mt-2 h-11 w-full rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/90 active:scale-[0.99] transition-all duration-200 cursor-pointer"
            disabled={loginPending}
          >
            {loginPending ? (
              <span className="flex items-center gap-2">
                <Spinner /> Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="size-4" />
                Sign in
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

      {/* Quick Login / Demo Credentials */}
      <div className="mt-6 border-t border-border/40 pt-4">
        <p className="mb-2 text-center text-xs font-medium text-muted-foreground">
          Quick Demo Login
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loginPending}
            onClick={() => handleQuickLogin("admin1@gmail.com", "12345678")}
            className="flex-1 text-xs"
          >
            Admin
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loginPending}
            onClick={() => handleQuickLogin("maruf@gmail.com", "12345678")}
            className="flex-1 text-xs"
          >
            Courier
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loginPending}
            onClick={() => handleQuickLogin("sifatullah1004@gmail.com", "12345678")}
            className="flex-1 text-xs"
          >
            Customer
          </Button>
        </div>
      </div>

      {/* Register */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
        >
          Create account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
