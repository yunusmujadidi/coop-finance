import { useTransition } from "react";
import { toast } from "sonner";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteSavings } from "@/app/actions/saving-actions";
import { SavingDashboard } from "@/app/(dashboard)/(routes)/simpanan/columns";
import { useSavingSheet } from "@/hooks/use-sheet";
import { useConfirm } from "@/hooks/use-confirm";

export const SavingTableAction = ({ saving }: { saving: SavingDashboard }) => {
  const [isPending, startTransition] = useTransition();
  const { onOpenEdit } = useSavingSheet();
  const [ConfirmDialog, confirm] = useConfirm(
    "Apa kamu yakin?",
    "Simpanan ini akan dihapus."
  );

  // handle delete saving
  const handleDeleteSaving = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      startTransition(async () => {
        try {
          const promise = deleteSavings(id);
          toast.promise(promise, {
            loading: "Menghapus simpanan...",
            success: () => "Simpanan berhasil dihapus",
            error: "Gagal menghapus simpanan",
          });
        } catch (error: unknown) {
          toast.error(`Gagal menghapus simpanan ${error}`);
        }
      });
    }
  };
  return (
    <>
      {/* confirm dialog */}
      <ConfirmDialog />
      {/* dropwdown */}
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
          {/* edit button */}
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => onOpenEdit(saving)}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          {/* delete button */}
          <DropdownMenuItem
            disabled={isPending}
            onClick={async () => await handleDeleteSaving(saving.id)}
          >
            <Trash2 className="mr-2 size-4" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
