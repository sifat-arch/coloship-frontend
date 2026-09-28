"use client";
import { useForm } from "@tanstack/react-form";
import React, { useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "../ui/button";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import { registerCustomerSchema } from "@/validation";
import { useRegister } from "@/hooks";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(true);

  const { mutate: register, isPending: registerPending } = useRegister();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "Sifat",
      email: "sifatnix@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
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
          }
          toast.add({
            title: "Register Successful",
            description: "Please verify Your Account",
            type: "success",
          });
          const params = new URLSearchParams({ email: registrationData.email });
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: (error) => {
          toast.add({
            title: "Registration Failure",
            description:
              error.message || "Registration Failed,Something went wrong",
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
          {/* name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-medium"
                  >
                    Your Name
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
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

          {/* confirm password */}

          <form.Field name="confirmPassword">
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
                      Confirm Password
                    </FieldLabel>
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
            disabled={registerPending}
          >
            {registerPending ? (
              <>
                <Spinner /> Submitting
              </>
            ) : (
              "Submit"
            )}
            Register
          </Button>
        </FieldGroup>
      </form>

      {/* Separator */}
      <div className="my-4">
        <FieldSeparator className="my-0">Or</FieldSeparator>
      </div>

      {/* Google Login */}
      <GoogleLoginComponent />

      {/* Register */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-primary hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
