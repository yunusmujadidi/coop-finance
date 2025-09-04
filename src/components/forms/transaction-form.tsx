"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

import {
  Form,
  FormControl,
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
import { transactionSchema } from "@/lib/zod-schema";
import { Member, Transaction, Loan, SavingsAccount } from "@/generated/prisma";
import { TransactionType } from "@/generated/prisma";
import { formatRupiah, parseRupiah } from "@/lib/utils";

export const TransactionForm = ({
  onSubmit,
  transaction,
  members = [],
  loans = [],
  savings = [],
}: {
  onSubmit: (data: z.infer<typeof transactionSchema>) => void;
  transaction?: Transaction;
  members?: Member[];
  loans?: Loan[];
  savings?: SavingsAccount[];
}) => {
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionNo: transaction?.transactionNo ?? "",
      type: transaction?.type ?? undefined,
      amount: transaction?.amount ?? 0,
      description: transaction?.description ?? "",
      memberId: transaction?.memberId ?? "",
      savingsAccountId: transaction?.savingsAccountId ?? undefined,
      loanId: transaction?.loanId ?? undefined,
    },
  });

  const [displayAmount, setDisplayAmount] = useState(
    transaction?.amount ? formatRupiah(transaction.amount) : ""
  );
  const [filteredSavings, setFilteredSavings] = useState<SavingsAccount[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);

  const transactionType = form.watch("type");
  const watchedMemberId = form.watch("memberId");

  useEffect(() => {
    if (watchedMemberId) {
      const memberSavings = savings.filter(
        (s) => s.memberId === watchedMemberId
      );
      setFilteredSavings(memberSavings);

      const memberLoans = loans.filter((l) => l.memberId === watchedMemberId);
      setFilteredLoans(memberLoans);

      form.resetField("savingsAccountId");
      form.resetField("loanId");
    } else {
      setFilteredSavings([]);
      setFilteredLoans([]);
    }
  }, [watchedMemberId, savings, loans, form]);

  return (
    <Form {...form}>
      <form
        id="transaction-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-4"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* nomer transaksi */}
          <FormField
            control={form.control}
            name="transactionNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nomor Transaksi <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="TRX-001" {...field} />
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

          {/* tipe transaksi */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tipe Transaksi <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe transaksi" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(TransactionType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* jumlah */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Jumlah (Rp) <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Rp 50.000"
                    value={displayAmount}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      const numericValue = parseRupiah(rawValue);
                      field.onChange(numericValue);
                      setDisplayAmount(formatRupiah(numericValue));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(transactionType === "DEPOSIT" ||
            transactionType === "WITHDRAWAL") && (
            <FormField
              control={form.control}
              name="savingsAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Rekening Simpanan <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      disabled={!watchedMemberId}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            !watchedMemberId
                              ? "Pilih anggota dulu"
                              : "Pilih rekening simpanan"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredSavings.map((saving) => (
                          <SelectItem key={saving.id} value={saving.id}>
                            {saving.accountNo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(transactionType === "LOAN_DISBURSEMENT" ||
            transactionType === "LOAN_PAYMENT") && (
            <FormField
              control={form.control}
              name="loanId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pinjaman <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      disabled={!watchedMemberId}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            !watchedMemberId
                              ? "Pilih anggota dulu"
                              : "Pilih pinjaman"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredLoans.map((loan) => (
                          <SelectItem key={loan.id} value={loan.id}>
                            {loan.loanNo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* deskripsi */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Bayar iuran pokok..."
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
