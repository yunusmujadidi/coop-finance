"use client";

import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";
import { Member, SavingType } from "@/generated/prisma";
import { useSavingSheet } from "@/hooks/use-sheet";
import { savingsAccountSchema } from "@/lib/zod-schema";
import { createSaving, updateSaving } from "@/app/actions/saving-actions";
import { Button } from "@/components/ui/button";
import { SavingsAccountForm } from "@/components/forms/saving-account-form";

export const SavingSheet = ({
  savingTypes,
  members,
}: {
  savingTypes: SavingType[];
  members: Member[];
}) => {
  const { isOpen, onClose, isEdit, saving } = useSavingSheet();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof savingsAccountSchema>) => {
    startTransition(async () => {
      let result;

      if (isEdit && saving) {
        result = await updateSaving(saving.id, data);
        if (result.success) {
          toast.success(`Simpanan berhasil diupdate`);
          onClose();
        } else {
          toast.error(result.message);
        }
      } else {
        result = await createSaving(data);
        if (result.success) {
          toast.success(`Simpanan berhasil dibuat`);
          onClose();
        } else {
          toast.error(result.message);
        }
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <div className="text-2xl">
              {isEdit ? "Edit Simpanan" : "Buat Simpanan Baru"}
            </div>
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Ubah informasi simpanan yang sudah ada"
              : "Isi form berikut untuk menambahkan simpanan baru"}
          </SheetDescription>
          <Separator />
        </SheetHeader>
        {/* saving form */}
        <div className="flex-1 overflow-y-auto">
          <SavingsAccountForm
            onSubmit={onSubmit}
            savingTypes={savingTypes}
            saving={isEdit ? saving : undefined}
            members={members}
          />
        </div>
        <Separator />
        <SheetFooter>
          <Button
            disabled={isPending}
            type="submit"
            form="savings-account-form"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                {isEdit ? "Sedang Mengupdate" : "Sedang Membuat"}
              </>
            ) : isEdit ? (
              "Update Simpanan"
            ) : (
              "Buat Simpanan"
            )}
          </Button>
          <SheetClose asChild>
            <Button disabled={isPending} type="button" variant="outline">
              Tutup
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
