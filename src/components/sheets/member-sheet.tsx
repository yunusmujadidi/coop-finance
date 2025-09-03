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
import { MemberForm } from "@/components/forms/member-form";
import { Button } from "@/components/ui/button";
import { useMemberSheet } from "@/hooks/use-sheet";
import { createMember, updateMember } from "@/app/actions/member-actions";
import { memberSchema } from "@/lib/zod-schema";
import { MemberType } from "@/generated/prisma";
import { Separator } from "../ui/separator";

export const MemberSheet = ({ memberTypes }: { memberTypes: MemberType[] }) => {
  const { isOpen, onClose, isEdit, member } = useMemberSheet();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof memberSchema>) => {
    startTransition(async () => {
      let result;

      if (isEdit && member) {
        result = await updateMember(member.id, data);
        if (result.success) {
          toast.success(`Anggota ${result.result?.memberNo} berhasil diupdate`);
          onClose();
        } else {
          toast.error(result.message);
        }
      } else {
        result = await createMember(data);
        if (result.success) {
          toast.success(`Anggota ${result.result?.memberNo} berhasil dibuat`);
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
              {isEdit ? "Edit Anggota" : "Buat Anggota Baru"}
            </div>
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Ubah informasi anggota yang sudah ada"
              : "Isi form berikut untuk menambahkan anggota baru"}
          </SheetDescription>
          <Separator />
        </SheetHeader>
        {/* member form */}
        <div className="flex-1 overflow-y-auto">
          <MemberForm
            onSubmit={onSubmit}
            memberTypes={memberTypes}
            member={isEdit ? member : undefined}
          />
        </div>
        <Separator />
        <SheetFooter>
          <Button disabled={isPending} type="submit" form="member-form">
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                {isEdit ? "Sedang Mengupdate" : "Sedang Membuat"}
              </>
            ) : isEdit ? (
              "Update Anggota"
            ) : (
              "Buat Anggota"
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
