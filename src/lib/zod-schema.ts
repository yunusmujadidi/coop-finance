import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, "Email harus diisi!"),
  password: z.string().min(1, "Password harus diisi!"),
});

export const registerSchema = z
  .object({
    email: z.email().min(1, "Email harus diisi!"),
    password: z.string().min(8, "Password harus diisi!"),
    name: z.string().min(1, "Nama harus diisi!"),
    confirmPassword: z
      .string()
      .min(1, "Konfirmasi password yang telah dibuat!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["Confirm Password"],
  });
