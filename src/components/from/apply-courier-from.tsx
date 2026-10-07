"use client";
import { useForm } from "@tanstack/react-form";
import {
  BadgeCheck,
  ChevronDown,
  FileText,
  FileUp,
  MapPin,
  Phone,
  Truck,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useApplyAsCourier } from "@/hooks";
import { VehicleType, type courierApplicationPayload } from "@/types";
import { formatFileSize } from "@/utils";
import {
  courierApplicationSchema,
  isAcceptedFileSize,
  isAcceptedFileType,
  MAX_FILE_SIZE,
} from "@/validation";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

// আপনার ডিফাইন করা টাইপ
export type courierApplicationData = {
  phone: string;
  vehicleType: VehicleType | string;
  nidNumber: string;
  vehicleNumber: string;
  licenseNumber: string;
};

const ApplyCourierForm = () => {
  const { mutate: applyCourier, isPending } = useApplyAsCourier();

  const form = useForm({
    defaultValues: {
      phone: "",
      vehicleType: "",
      nidNumber: "",
      vehicleNumber: "",
      licenseNumber: "",
      resume: null as File | null,
      profileImage: null as File | null,
    },

    validators: {
      onSubmit: courierApplicationSchema,
    },

    onSubmit: ({ value }) => {
      const courierData: courierApplicationData = {
        phone: value.phone.trim(),
        vehicleType: value.vehicleType.trim(),
        nidNumber: value.nidNumber.trim(),
        vehicleNumber: value.vehicleNumber.trim(),
        licenseNumber: value.licenseNumber.trim(),
      };

      if (!value.resume || !value.profileImage) {
        console.error("Resume and Profile Image are required");
        return;
      }

      const payload: courierApplicationPayload = {
        data: courierData,
        resume: value.resume,
        profileImage: value.profileImage,
      };

      applyCourier(payload, {
        onSuccess: (res) => {
          if (res.success) {
            toast.add({
              title: "Application submitted successfully",
              description: "Please wait for the admin approval.",
              type: "success",
            });
          }
        },
        onError: (error) => {
          toast.add({
            title: "Submission failed",
            description: error.message || "Something went wrong",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Apply to join as a Courier Partner
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        noValidate
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Phone Number */}
            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        placeholder="01712345678"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="pl-9"
                        autoComplete="tel"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Vehicle Type */}
            <form.Field name="vehicleType">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Vehicle type</FieldLabel>
                    <div className="relative">
                      <Truck className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground z-10" />
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className={`h-8 w-full appearance-none rounded-lg border border-input bg-transparent pl-9 pr-8 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 cursor-pointer ${
                          !field.state.value
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        <option value="" disabled className="bg-background text-muted-foreground">
                          Select vehicle type
                        </option>
                        {Object.values(VehicleType).map((type) => (
                          <option
                            key={type}
                            value={type}
                            className="bg-background text-foreground"
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* NID Number */}
            <form.Field name="nidNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>NID number</FieldLabel>
                    <div className="relative">
                      <BadgeCheck className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="19901234567890123"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="pl-9"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Vehicle Number */}
            <form.Field name="vehicleNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Vehicle number</FieldLabel>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="DHAKA-METRO-LA-1234"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="pl-9"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* License Number */}
          <form.Field name="licenseNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>License number</FieldLabel>
                  <div className="relative">
                    <BadgeCheck className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="DL-123456789"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="pl-9"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Resume Upload */}
          <form.Field name="resume">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const file = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="resume-field">Resume</FieldLabel>
                  <div className="flex flex-wrap items-center gap-3">
                    <label
                      htmlFor="resume-field"
                      className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                    >
                      <FileUp size={16} />
                      Upload resume
                    </label>
                    <input
                      id="resume-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />
                    {file ? (
                      <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm">
                        <FileText className="size-4 shrink-0 text-primary" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        <button
                          type="button"
                          aria-label="Remove resume"
                          onClick={() => {
                            field.handleChange(null);
                            field.handleBlur();
                          }}
                          className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                        >
                          <X className="size-4" />
                        </button>
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        PDF, DOC, DOCX or image up to {MAX_FILE_SIZE} MB
                      </span>
                    )}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Profile Image Upload */}
          <form.Field name="profileImage">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const file = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="profile-image-field">
                    Profile Image
                  </FieldLabel>
                  <div className="flex flex-wrap items-center gap-3">
                    <label
                      htmlFor="profile-image-field"
                      className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                    >
                      <FileUp size={16} />
                      Upload profile image
                    </label>
                    <input
                      id="profile-image-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />
                    {file ? (
                      <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm">
                        <FileText className="size-4 shrink-0 text-primary" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        <button
                          type="button"
                          aria-label="Remove profile image"
                          onClick={() => {
                            field.handleChange(null);
                            field.handleBlur();
                          }}
                          className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                        >
                          <X className="size-4" />
                        </button>
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        PDF, DOC, DOCX or image up to {MAX_FILE_SIZE} MB
                      </span>
                    )}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <div className="flex justify-end w-full mt-5">
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner /> "Submitting"
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Already an approved courier?{" "}
        <Link
          href="/login"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Sign in to the Courier Portal
        </Link>
      </p>
    </div>
  );
};

export default ApplyCourierForm;
