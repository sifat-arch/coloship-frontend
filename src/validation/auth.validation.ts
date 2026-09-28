import z from "zod";

export const loginCustomerSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .transform((value) => value.trim().toLowerCase()),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerCustomerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),

    email: z
      .string()
      .email("Invalid email address")
      .transform((value) => value.trim().toLowerCase()),

    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
