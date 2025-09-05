"use client";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSavingTypeModal } from "@/hooks/use-modal";

export const SavingTypeButton = () => {
  const { onOpen } = useSavingTypeModal();
  return (
    <Button onClick={() => onOpen()}>
      <PlusCircle />
      Tambah Jenis Simpanan
    </Button>
  );
};
