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
import { MemberType } from "@/generated/prisma";
import { useMemberTypeModal } from "@/hooks/use-modal";
import { deleteMembersType } from "@/app/actions/member-actions";

export const MemberTypeTableAction = ({
  memberType,
}: {
  memberType: MemberType;
}) => {
  const [isPending, startTransition] = useTransition();
  const { onOpenEdit } = useMemberTypeModal();
  const [ConfirmDialog, confirm] = useConfirm(
    "Apa kamu yakin?",
    "Jenis anggota ini akan dihapus."
  );

  // handle delete memberType
  const handleDeletememberType = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      startTransition(async () => {
        try {
          const promise = deleteMembersType(id);
          toast.promise(promise, {
            loading: "Menghapus jenis anggota...",
            success: () => "Jenis anggota berhasil dihapus",
            error: "Gagal menghapus jenis anggota",
          });
        } catch (error: unknown) {
          toast.error(`Gagal menghapus jenis anggota ${error}`);
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
            onClick={() => onOpenEdit(memberType)}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          {/* delete button */}
          <DropdownMenuItem
            disabled={isPending}
            onClick={async () => await handleDeletememberType(memberType.id)}
          >
            <Trash2 className="mr-2 size-4" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
