"use client";

import { usePathname } from "next/navigation";
import { PlusCircle } from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { navigation } from "@/lib/consts";
import { Button } from "@/components/ui/button";
import { useMemberSheet, useSavingSheet } from "@/hooks/use-sheet";
import { useLoanModal, useTransactionModal } from "@/hooks/use-modal";

export const Title = () => {
  const { onOpen: onOpenMember } = useMemberSheet();
  const { onOpen: onOpenSavings } = useSavingSheet();
  const { onOpen: onOpenLoan } = useLoanModal();
  const { onOpen: onOpenTransaction } = useTransactionModal();
  const pathname = usePathname();
  const { data } = useSession();
  const current = navigation.find((item) => item.url === pathname);

  return (
    <div className="m-6 hidden md:flex flex-col md:flex-row text-center md:text-start gap-4 items-center justify-between">
      <div>
        <h1 className="text-4xl font-extrabold">{current!.title}</h1>
        <p className="text-lg text-muted-foreground">
          {current!.description}
          {pathname === "/" && data && ` ${data?.user.name}`}
        </p>
      </div>
      {pathname !== "/" && pathname !== "/pengaturan" && (
        <Button
          onClick={() =>
            pathname === "/simpanan"
              ? onOpenSavings()
              : pathname === "/pinjaman"
              ? onOpenLoan()
              : pathname === "/transaksi"
              ? onOpenTransaction()
              : onOpenMember()
          }
        >
          <PlusCircle />
          {`Buat ${current?.title} Baru`}
        </Button>
      )}
    </div>
  );
};
