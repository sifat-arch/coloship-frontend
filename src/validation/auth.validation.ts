import z from "zod";

export const loginCustomerSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .transform((value) => value.trim().toLowerCase()),

  password: z.string().min(8, "Password must be at least 8 characters"),
});
