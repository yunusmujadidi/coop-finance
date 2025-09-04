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
  alamat: z.string().optional(),
  nationalId: z.string().optional(),
  birthPlace: z.string().optional(),
  birthDate: z
    .date({
      message: "Tanggal lahir harus diisi!",
    })
    .optional(),
  phone: z.string().optional(),
  job: z.string().optional(),
  memberTypeId: z.string().min(1, "Tipe anggota harus dipilih!"),
  isActive: z.boolean(),
});

export const memberTypeSchema = z.object({
  name: z.string().min(1, "Nama harus diisi!"),
});

export const savingType = z.object({
  name: z.string().min(1, "Nama tabungan harus diisi!"),
});

export const savingsAccountSchema = z.object({
  accountNo: z.string().min(1, "Nomor rekening harus diisi!"),
  balance: z.number().int().min(0, "Saldo tidak boleh kosong!"),
  memberId: z.string().min(1, "Format ID anggota tidak valid!"),
  savingTypeId: z.string().min(1, "Format ID jenis tabungan tidak valid!"),
  isActive: z.boolean(),
});

export const loanSchema = z.object({
  loanNo: z.string().min(1, "Nomor pinjaman harus diisi!"),
  principalAmount: z.number().int().min(1, "Jumlah pinjaman harus diisi!"),
  interestRate: z.number().min(0).max(100, "Suku bunga tidak valid!"),
  loanTerm: z.number().int().min(1, "Jangka waktu harus diisi!"),
  monthlyPayment: z.number().int().min(1, "Angsuran bulanan harus diisi!"),
  outstandingBalance: z.number().int().min(0, "Sisa pinjaman tidak valid!"),
  totalPaid: z.number().int().min(0, "Total pembayaran tidak valid!"),
  purpose: z.string().optional(),
  memberId: z.string().min(1, "Format ID anggota tidak valid!"),
});

export const transactionSchema = z.object({
  transactionNo: z.string().min(1, "Nomor transaksi harus diisi!"),
  type: z.enum(
    ["DEPOSIT", "WITHDRAWAL", "LOAN_DISBURSEMENT", "LOAN_PAYMENT", "TRANSFER"],
    {
      message: "Jenis transaksi harus dipilih!",
    }
  ),
  amount: z.number().int().min(1, "Jumlah transaksi harus diisi!"),
  balanceBefore: z.number().int().optional(),
  balanceAfter: z.number().int().optional(),
  description: z.string().optional(),
  memberId: z.string().min(1, "Format ID anggota tidak valid!"),
  savingsAccountId: z.string().optional(),
  loanId: z.string().optional(),
});
