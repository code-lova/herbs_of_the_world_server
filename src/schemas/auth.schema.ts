import { z } from "zod";

export const emailSchema = z.string().email().min(1).max(100).trim();
const passwordSchema = z
  .string()
  .min(6)
  .max(100)
  .regex(/[@$!%*?&]/) //Password must contain at least one special character
  .regex(/\d/); // Password must contain at least one number

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

//extending the loginschem and passing it to registerschema
export const registerSchema = loginSchema
  .extend({
    firstname: z.string().min(1).max(50).trim(),
    lastname: z.string().min(1).max(50).trim(),
    confirmPassword: z.string().min(6).max(100),
    role: z.enum(["admin", "user"]).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const verificationCodeSchema = z.string().min(1).max(24).trim();

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  resetVerificationCode: verificationCodeSchema,
});
