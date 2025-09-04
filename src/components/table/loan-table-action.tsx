import { useTransition } from "react";
import {
  Edit,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
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
import { deleteLoan } from "@/app/actions/loan-action";
import { LoanDashboard } from "@/app/(dashboard)/(routes)/pinjaman/columns";
import { useLoanModal } from "@/hooks/use-modal";
import { useConfirm } from "@/hooks/use-confirm";

export const LoanTableAction = ({ loan }: { loan: LoanDashboard }) => {
  const [isPending, startTransition] = useTransition();
  const { onOpenEdit } = useLoanModal();
  const [ConfirmDialog, confirm] = useConfirm(
    "Apa kamu yakin?",
    "Pinjaman ini akan dihapus."
  );

  // handle delete loan
  const handleDeleteLoan = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      startTransition(async () => {
        try {
          const promise = deleteLoan(id);
          toast.promise(promise, {
            loading: "Menghapus pinjaman...",
            success: () => "Pinjaman berhasil dihapus",
            error: "Gagal menghapus pinjaman",
          });
        } catch (error: unknown) {
          toast.error(`Gagal menghapus pinjaman ${error}`);
        }
      });
    }
  };

  // cek apakah pinjaman bisa dihapus (hanya yang pending)
  const canDelete = loan.status === "PENDING";

  return (
    <>
      {/* confirm dialog */}
      <ConfirmDialog />
      {/* dropdown */}
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

          {/* edit button - hanya untuk pending */}
          {loan.status === "PENDING" && (
            <DropdownMenuItem
              disabled={isPending}
              onClick={() => onOpenEdit(loan)}
            >
              <Edit className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
          )}

          {/* delete button - hanya untuk pending dan tanpa transaksi */}
          {canDelete && loan._count.transactions === 0 && (
            <DropdownMenuItem
              disabled={isPending}
              onClick={async () => await handleDeleteLoan(loan.id)}
            >
              <Trash2 className="mr-2 size-4" />
              Hapus
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
