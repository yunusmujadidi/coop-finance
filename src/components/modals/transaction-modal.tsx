"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/forms/transaction-form";
import { transactionSchema } from "@/lib/zod-schema";
import {
  createTransaction,
  updateTransaction,
} from "@/app/actions/transaction-actions";
import { Member, Loan, SavingsAccount } from "@/generated/prisma";
import { useTransactionModal } from "@/hooks/use-modal";

export const TransactionModal = ({
  members,
  loans,
  savings,
}: {
  members: Member[];
  loans: Loan[];
  savings: SavingsAccount[];
}) => {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, isEdit, transaction } = useTransactionModal();

  const onSubmit = (data: z.infer<typeof transactionSchema>) => {
    startTransition(async () => {
      const action = isEdit
        ? updateTransaction(transaction!.id, data)
        : createTransaction(data);
      const result = await action;
      if (result.success) {
        toast.success(result.message);
        onClose();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-7xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Transaksi" : "Tambahkan Transaksi Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Isi form berikut untuk mengedit transaksi"
              : "Isi form berikut untuk menambahkan transaksi baru"}
          </DialogDescription>
        </DialogHeader>
        {/* form transaksi */}
        <TransactionForm
          onSubmit={onSubmit}
          members={members}
          loans={loans}
          savings={savings}
          transaction={transaction}
        />
        <DialogFooter>
          <Button disabled={isPending} variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button disabled={isPending} form="transaction-form">
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                {isEdit ? "Sedang Mengupdate" : "Sedang Membuat"}
              </>
            ) : isEdit ? (
              "Update"
            ) : (
              "Tambah"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
