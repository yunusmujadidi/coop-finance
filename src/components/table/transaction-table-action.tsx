"use client";

import { useTransition } from "react";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { TransactionDashboard } from "@/app/(dashboard)/(routes)/transaksi/columns";
import { deleteTransaction } from "@/app/actions/transaction-actions";
import { useTransactionModal } from "@/hooks/use-modal";

export const TransactionTableAction = ({
  transaction,
}: {
  transaction: TransactionDashboard;
}) => {
  const [isPending, startTransition] = useTransition();
  const { onOpenEdit } = useTransactionModal();
  const [ConfirmDialog, confirm] = useConfirm(
    "Apa kamu yakin?",
    "Transaksi ini akan dihapus secara permanen."
  );

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      startTransition(() => {
        toast.promise(deleteTransaction(transaction.id), {
          loading: "Menghapus transaksi...",
          success: "Transaksi berhasil dihapus",
          error: "Gagal menghapus transaksi",
        });
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => onOpenEdit(transaction)}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
            <Trash2 className="mr-2 size-4" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
