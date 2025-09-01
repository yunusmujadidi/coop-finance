"use client";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMemberTypeModal } from "@/hooks/use-modal";

export const SettingButton = () => {
  const { onOpen } = useMemberTypeModal();
  return (
    <Button onClick={() => onOpen()}>
      <PlusCircle />
      Tambah Jenis
    </Button>
  );
};
