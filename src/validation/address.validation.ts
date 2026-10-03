import z from "zod";

export const createAddressValidationSchema = z.object({
  label: z
    .string({ message: "Label is required" })
    .trim()
    .min(1, "Label cannot be empty"),
  recipientName: z
    .string({ message: "Recipient name is required" })
    .trim()
    .min(2, "Recipient name must be at least 2 characters"),
  phone: z
    .string({ message: "Phone number is required" })
    .trim()
    .min(11, "Phone number must be at least 11 digits"),
  addressLine: z
    .string({ message: "Address line is required" })
    .trim()
    .min(5, "Address line must be at least 5 characters"),
  area: z
    .string({ message: "Area is required" })
    .trim()
    .min(2, "Area is required"),
  city: z
    .string({ message: "City is required" })
    .trim()
    .min(2, "City is required"),
  postalCode: z.string().optional(),
  isDefault: z.boolean(),
});

export type CreateAddressValidationFormValues = z.infer<
  typeof createAddressValidationSchema
>;
