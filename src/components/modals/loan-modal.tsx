"use client";

import z from "zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLoanModal } from "@/hooks/use-modal";
import { loanSchema } from "@/lib/zod-schema";
import { createLoan, updateLoan } from "@/app/actions/loan-action";
import { LoanForm } from "@/components/forms/loan-form";
import { Member } from "@/generated/prisma";

export const LoanModal = ({ member }: { member: Member[] }) => {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, isEdit, loan } = useLoanModal();

  const onSubmit = (data: z.infer<typeof loanSchema>) => {
    startTransition(async () => {
      let result;

      if (isEdit && loan) {
        result = await updateLoan(loan.id, data);
        if (result.success) {
          toast.success(`Pinjaman ${result.result?.loanNo} berhasil diupdate`);
          onClose();
        } else {
          toast.error(result.message);
        }
      } else {
        result = await createLoan(data);
        if (result?.error) {
          toast.error(result.message);
        } else {
          onClose();
          toast.success(result?.message);
        }
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-7xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Pinjaman" : "Tambahkan Pinjaman Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Ubah informasi pinjaman yang sudah ada"
              : "Isi form berikut untuk menambahkan pinjaman baru"}
          </DialogDescription>
        </DialogHeader>
        {/* form pinjaman */}
        <LoanForm
          loan={isEdit ? loan : undefined}
          members={member}
          onSubmit={onSubmit}
        />
        <DialogFooter>
          <Button disabled={isPending} variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button disabled={isPending} form="loan-form">
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                {isEdit ? "Sedang Mengupdate" : "Sedang Membuat"}
              </>
            ) : isEdit ? (
              "Update Pinjaman"
            ) : (
              "Tambah"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
