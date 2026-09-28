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
import { loginCustomerSchema } from "@/validation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useGoogleOAuth, useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();

  const { mutate: login, isPending: loginPending } = useLogin();
  const { mutate: googleLogin } = useGoogleOAuth();
  const form = useForm({
    defaultValues: {
      email: "admin1@gmail.com",
      password: "12345678",
    },
    validators: {
      onSubmit: loginCustomerSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: (res) => {
          toast.add({
            title: "Login Successful",
            description: "Welcome Back",
            type: "success",
          });
          router.push("/");
        },
        onError: (error) => {
          toast.add({
            title: "Authorization Failure",
            description: error.message || "Login Failed,Something went wrong",
            type: "error",
          });
        },
      });
    },
  });

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong,please try again",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Logged in with google successfully",
            description: "Welcome Back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: err.message || "Google OAuth Failed",
            description: "Something went wrong,please try again",
            type: "error",
          });
        },
      },
    );
  };
  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong,please try again",
    });
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter your email and password to access your Coloship account.
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
                      className="text-sm font-medium"
                    >
                      Password
                    </FieldLabel>

                    <a
                      href="/forgot-password"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
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
                      className="h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeClosed size={15} />
                      ) : (
                        <Eye size={15} />
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
            className="mt-1 h-11 w-full font-medium"
            disabled={loginPending}
          >
            {loginPending ? (
              <>
                <Spinner /> Submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* Separator */}
      <div className="my-4">
        <FieldSeparator className="my-0">Or</FieldSeparator>
      </div>

      {/* Google Login */}
      <div className="flex w-full justify-center">
        <GoogleLogin
          text="signin_with"
          shape="pill"
          theme="outline"
          size="large"
          width="323"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>

      {/* Register */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Create account
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
