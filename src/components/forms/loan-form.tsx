"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { loanSchema } from "@/lib/zod-schema";
import { Member, Loan } from "@/generated/prisma";
import { formatRupiah, parseRupiah } from "@/lib/utils";

export const LoanForm = ({
  onSubmit,
  loan,
  members = [],
}: {
  onSubmit: (data: z.infer<typeof loanSchema>) => void;
  loan?: Loan;
  members?: Member[];
}) => {
  const form = useForm<z.infer<typeof loanSchema>>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      loanNo: loan?.loanNo || "",
      principalAmount: loan?.principalAmount || 0,
      interestRate: loan?.interestRate ? Number(loan.interestRate) : 0,
      loanTerm: loan?.loanTerm || 12,
      monthlyPayment: loan?.monthlyPayment || 0,
      outstandingBalance: loan?.outstandingBalance || 0,
      totalPaid: loan?.totalPaid || 0,
      purpose: loan?.purpose || "",
      memberId: loan?.memberId || "",
    },
  });

  // state untuk format tampilan currency
  const [displayValues, setDisplayValues] = useState({
    principalAmount: loan?.principalAmount
      ? formatRupiah(loan.principalAmount)
      : "",
    monthlyPayment: loan?.monthlyPayment
      ? formatRupiah(loan.monthlyPayment)
      : "",
    outstandingBalance: loan?.outstandingBalance
      ? formatRupiah(loan.outstandingBalance)
      : "",
    totalPaid: loan?.totalPaid ? formatRupiah(loan.totalPaid) : "",
    interestRate: loan?.interestRate ? String(loan.interestRate) : "",
  });

  // pantau perubahan jumlah pinjaman, suku bunga, dan jangka waktu untuk hitung otomatis angsuran bulanan
  const principalAmount = form.watch("principalAmount");
  const interestRate = form.watch("interestRate");
  const loanTerm = form.watch("loanTerm");

  useEffect(() => {
    if (principalAmount > 0 && interestRate >= 0 && loanTerm > 0) {
      // hitung angsuran bulanan menggunakan rumus pinjaman
      // p = pokok pinjaman, r = suku bunga bulanan, n = jumlah pembayaran
      const monthlyRate = interestRate / 100 / 12;
      let monthlyPayment: number;

      if (monthlyRate === 0) {
        // jika tidak ada bunga, bagi rata saja
        monthlyPayment = principalAmount / loanTerm;
      } else {
        // rumus standar angsuran pinjaman: p * [r(1+r)^n] / [(1+r)^n - 1]
        const factor = Math.pow(1 + monthlyRate, loanTerm);
        monthlyPayment =
          (principalAmount * (monthlyRate * factor)) / (factor - 1);
      }

      const roundedPayment = Math.round(monthlyPayment);
      form.setValue("monthlyPayment", roundedPayment);
      setDisplayValues((prev) => ({
        ...prev,
        monthlyPayment: formatRupiah(roundedPayment),
      }));

      // set sisa pinjaman sama dengan jumlah pinjaman (untuk pinjaman baru)
      if (!loan) {
        form.setValue("outstandingBalance", principalAmount);
        setDisplayValues((prev) => ({
          ...prev,
          outstandingBalance: formatRupiah(principalAmount),
        }));
      }
    }
  }, [principalAmount, interestRate, loanTerm, form, loan]);

  return (
    <Form {...form}>
      <form
        id="loan-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-4"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* nomer pinjaman */}
          <FormField
            control={form.control}
            name="loanNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nomor Pinjaman <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="PJ-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* anggota */}
          <FormField
            control={form.control}
            name="memberId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Anggota <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih anggota" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.memberNo} - {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* jumlah pinjaman */}
          <FormField
            control={form.control}
            name="principalAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Jumlah Pinjaman (Rp) <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Rp 5.000.000"
                    value={displayValues.principalAmount}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      const numericValue = parseRupiah(rawValue);
                      field.onChange(numericValue);
                      setDisplayValues((prev) => ({
                        ...prev,
                        principalAmount: formatRupiah(numericValue),
                      }));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* suku bunga */}
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Suku Bunga (% per tahun){" "}
                  <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="12.00"
                    value={displayValues.interestRate}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numericValue = parseFloat(value);
                      if (!isNaN(numericValue)) {
                        field.onChange(numericValue);
                      } else {
                        field.onChange(0);
                      }
                      setDisplayValues((prev) => ({
                        ...prev,
                        interestRate: value,
                      }));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* jangka waktu */}
          <FormField
            control={form.control}
            name="loanTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Jangka Waktu (bulan) <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="12"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* angsuran bulanan */}
          <FormField
            control={form.control}
            name="monthlyPayment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Angsuran Bulanan (Rp) <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Rp 500.000"
                    value={displayValues.monthlyPayment}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      const numericValue = parseRupiah(rawValue);
                      field.onChange(numericValue);
                      setDisplayValues((prev) => ({
                        ...prev,
                        monthlyPayment: formatRupiah(numericValue),
                      }));
                    }}
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormDescription>
                  Otomatis dihitung berdasarkan jumlah pinjaman, suku bunga, dan
                  jangka waktu
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* sisa pinjaman */}
          <FormField
            control={form.control}
            name="outstandingBalance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Sisa Pinjaman (Rp) <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Rp 5.000.000"
                    value={displayValues.outstandingBalance}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      const numericValue = parseRupiah(rawValue);
                      field.onChange(numericValue);
                      setDisplayValues((prev) => ({
                        ...prev,
                        outstandingBalance: formatRupiah(numericValue),
                      }));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* total dibayar */}
          <FormField
            control={form.control}
            name="totalPaid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Total Sudah Dibayar (Rp){" "}
                  <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Rp 0"
                    value={displayValues.totalPaid}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      const numericValue = parseRupiah(rawValue);
                      field.onChange(numericValue);
                      setDisplayValues((prev) => ({
                        ...prev,
                        totalPaid: formatRupiah(numericValue),
                      }));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* tujuan pinjaman */}
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tujuan Pinjaman</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Modal usaha, renovasi rumah, pendidikan, dll..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
