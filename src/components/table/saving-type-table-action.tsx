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
import { SavingType } from "@/generated/prisma";
import { useSavingTypeModal } from "@/hooks/use-modal";
import { deleteSavingTypes } from "@/app/actions/saving-actions";

export const SavingTypeTableAction = ({
  savingType,
}: {
  savingType: SavingType;
}) => {
  const [isPending, startTransition] = useTransition();
  const { onOpenEdit } = useSavingTypeModal();
  const [ConfirmDialog, confirm] = useConfirm(
    "Apa kamu yakin?",
    "Jenis Simpanan ini akan dihapus."
  );

  // handle delete savingType
  const handleDeletesavingType = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      startTransition(async () => {
        try {
          const promise = deleteSavingTypes(id);
          toast.promise(promise, {
            loading: "Menghapus jenis simpanan...",
            success: () => "Jenis simpanan berhasil dihapus",
            error: "Gagal menghapus jenis simpanan",
          });
        } catch (error: unknown) {
          toast.error(`Gagal menghapus jenis simpanan ${error}`);
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
            onClick={() => onOpenEdit(savingType)}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          {/* delete button */}
          <DropdownMenuItem
            disabled={isPending}
            onClick={async () => await handleDeletesavingType(savingType.id)}
          >
            <Trash2 className="mr-2 size-4" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
