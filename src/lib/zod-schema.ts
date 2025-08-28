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

export const memberSchema = z.object({
  memberNo: z.string().min(1, "Nomor anggota harus diisi!"),
  name: z.string().min(1, "Nama harus diisi!"),
  address: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"], {
    message: "Jenis kelamin harus dipilih!",
  }),
  nationalId: z.string().optional(),
  birthPlace: z.string().optional(),
  birthDate: z.date({
    message: "Tanggal lahir harus diisi!",
  }),
  phone: z.string().optional(),
  job: z.string().optional(),
  memberTypeId: z.string().min(1, "Tipe anggota harus dipilih!"),
  isActive: z.boolean(),
});
