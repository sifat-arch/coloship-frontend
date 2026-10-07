export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const isAcceptedFileSize = (fileSize: number) => {
  return fileSize <= MAX_FILE_SIZE_BYTES;
};

export const ACCEPTED_FILE_TYPE = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

export const isAcceptedFileType = (fileType: string) => {
  return ACCEPTED_FILE_TYPE.includes(fileType);
};

import { z } from "zod";

export const getCustomFileSchema = <T>(message: string) => {
  return z.custom<File | null>(
    (value) =>
      value === null ||
      (value instanceof File &&
        isAcceptedFileSize(value.size) &&
        isAcceptedFileType(value.type)),
    {
      message: message,
    },
  );
};

import { VehicleType } from "@/types";

export const courierApplicationSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^01[3-9]\d{8}$/,
      "Please enter a valid Bangladeshi phone number (e.g., 01712345678)",
    ),

  vehicleType: z.nativeEnum(VehicleType, {
    message: "Vehicle type is required",
  }),

  nidNumber: z
    .string()
    .min(10, "NID number must be at least 10 digits")
    .max(17, "NID number cannot exceed 17 digits"),

  vehicleNumber: z.string().min(1, "Vehicle number is required"),

  licenseNumber: z.string().min(1, "License number is required"),

  resume: getCustomFileSchema<File | null>(
    `Resume must be a PDF, DOC, DOCX or image file under ${MAX_FILE_SIZE}MB`,
  ).refine((value) => value instanceof File, {
    message: "Resume file is required",
  }),

  profileImage: getCustomFileSchema<File | null>(
    `Profile image must be a PDF, DOC, DOCX or image file under ${MAX_FILE_SIZE}MB`,
  ).refine((value) => value instanceof File, {
    message: "ProfileImage file is required",
  }),
});

export type CourierApplicationFormValues = z.infer<
  typeof courierApplicationSchema
>;
