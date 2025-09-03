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
import { deleteMembers } from "@/app/actions/member-actions";
import { MemberDashboard } from "@/app/(dashboard)/(routes)/anggota/columns";
import { useMemberSheet } from "@/hooks/use-sheet";
import { useConfirm } from "@/hooks/use-confirm";

export const MemberTableAction = ({ member }: { member: MemberDashboard }) => {
  const [isPending, startTransition] = useTransition();
  const { onOpenEdit } = useMemberSheet();
  const [ConfirmDialog, confirm] = useConfirm(
    "Apa kamu yakin?",
    "Anggota ini akan dihapus."
  );

  // handle delete member
  const handleDeleteMember = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      startTransition(async () => {
        try {
          const promise = deleteMembers(id);
          toast.promise(promise, {
            loading: "Menghapus member...",
            success: () => "Member berhasil dihapus",
            error: "Gagal menghapus member",
          });
        } catch (error: unknown) {
          toast.error(`Gagal menghapus member ${error}`);
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
            onClick={() => onOpenEdit(member)}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          {/* delete button */}
          <DropdownMenuItem
            disabled={isPending}
            onClick={async () => await handleDeleteMember(member.id)}
          >
            <Trash2 className="mr-2 size-4" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
