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
import { savingType } from "@/lib/zod-schema";
import { useSavingTypeModal } from "@/hooks/use-modal";
import {
  createSavingType,
  updateSavingType,
} from "@/app/actions/saving-actions";
import { SavingTypeForm } from "@/components/forms/saving-type-form";

export const SavingTypeModal = () => {
  const [isPending, startTransition] = useTransition();
  const {
    onClose,
    isOpen,
    isEdit,
    savingType: savingTypeData,
  } = useSavingTypeModal();

  const onSubmit = (data: z.infer<typeof savingType>) => {
    startTransition(async () => {
      let result;

      if (isEdit && savingTypeData) {
        result = await updateSavingType(savingTypeData.id, data);
        if (result.success) {
          toast.success(
            `Jenis simpanan ${result.result?.name} berhasil diupdate`
          );
          onClose();
        } else {
          toast.error(result.message);
        }
      } else {
        result = await createSavingType(data);
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
            {isEdit ? "Edit Jenis Simpanan" : "Tambahkan Jenis Simpanan Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Ubah informasi jenis simpanan yang sudah ada"
              : "Isi form berikut untuk menambahkan jenis simpanan baru"}
          </DialogDescription>
        </DialogHeader>
        <SavingTypeForm
          onSubmit={onSubmit}
          savingType={isEdit ? savingTypeData : undefined}
        />
        <DialogFooter>
          <Button disabled={isPending} variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button disabled={isPending} form="saving-type-form">
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                {isEdit ? "Sedang Mengupdate" : "Sedang Membuat"}
              </>
            ) : isEdit ? (
              "Update Jenis Simpanan"
            ) : (
              "Tambah"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
