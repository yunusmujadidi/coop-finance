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
import { createTransaction } from "@/app/actions/transaction-actions";
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
  const { onClose, isOpen } = useTransactionModal();

  const onSubmit = (data: z.infer<typeof transactionSchema>) => {
    startTransition(async () => {
      const result = await createTransaction(data);
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
          <DialogTitle>Tambahkan Transaksi Baru</DialogTitle>
          <DialogDescription>
            Isi form berikut untuk menambahkan transaksi baru
          </DialogDescription>
        </DialogHeader>
        {/* form transaksi */}
        <TransactionForm
          onSubmit={onSubmit}
          members={members}
          loans={loans}
          savings={savings}
        />
        <DialogFooter>
          <Button disabled={isPending} variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button disabled={isPending} form="transaction-form">
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Sedang Membuat
              </>
            ) : (
              "Tambah"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
