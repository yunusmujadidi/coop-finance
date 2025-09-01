"use client";

import { useTransition } from "react";
import z from "zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MemberTypeForm } from "@/components/forms/member-type-form";
import { memberTypeSchema } from "@/lib/zod-schema";
import { createMemberType } from "@/app/actions/member-actions";
import { useMemberTypeModal } from "@/hooks/use-modal";
import { Loader2 } from "lucide-react";

export const MemberTypeModal = () => {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen } = useMemberTypeModal();

  const onSubmit = (data: z.infer<typeof memberTypeSchema>) => {
    startTransition(async () => {
      const result = await createMemberType(data);
      if (result?.error) {
        toast.error(result.message);
      } else {
        onClose();
        toast.success(result?.message);
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-7xl">
        <DialogHeader>
          <DialogTitle>Tambahkan jenis anggota baru</DialogTitle>
          <DialogDescription>
            Isi form berikut untuk menambahkan jenis anggota baru
          </DialogDescription>
        </DialogHeader>
        <MemberTypeForm onSubmit={onSubmit} />
        <DialogFooter>
          <Button disabled={isPending} variant="outline">
            Batal
          </Button>
          <Button disabled={isPending} form="member-type-form">
            {isPending && <Loader2 className="animate-spin" />} Tambah
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
