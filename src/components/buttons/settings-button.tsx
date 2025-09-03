"use client";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMemberTypeModal, useSavingTypeModal } from "@/hooks/use-modal";

export const SettingButton = () => {
  const { onOpen: onOpenMember } = useMemberTypeModal();
  const { onOpen: onOpenSaving } = useSavingTypeModal();
  return (
    <div className="flex items-center justify-between gap-2">
      <Button onClick={() => onOpenMember()}>
        <PlusCircle />
        Tambah Jenis Anggota
      </Button>
      <Button onClick={() => onOpenSaving()}>
        <PlusCircle />
        Tambah Jenis Simpanan
      </Button>
    </div>
  );
};
