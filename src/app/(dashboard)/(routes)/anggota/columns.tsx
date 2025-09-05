"use client";

import { toast } from "sonner";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { MemberTableAction } from "@/components/table/member-table-action";
import { Prisma } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { memberActiveToggle } from "@/app/actions/member-actions";

export type MemberDashboard = Prisma.MemberGetPayload<{
  include: {
    memberType: {
      select: {
        name: true;
      };
    };
  };
}>;

export const columns: ColumnDef<MemberDashboard>[] = [
  // checkbox
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // member number
  {
    accessorKey: "memberNo",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="font-semibold"> No Member</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <span className="font-semibold">{row.original.memberNo}</span>
    ),
  },
  // member name
  {
    accessorKey: "name",
    header: () => <div className="font-semibold w-full text-left">Nama</div>,
  },
  // member type
  {
    accessorKey: "memberType.name",
    header: () => (
      <div className="font-semibold w-full text-left">Jenis Anggota</div>
    ),
  },
  // member address
  {
    accessorKey: "address",
    header: () => <div className="font-semibold w-full text-left">Alamat</div>,
    cell: ({ row }) => {
      const address = row.getValue("address") as string;
      return address ? (
        <span className="max-w-[200px] truncate" title={address}>
          {address}
        </span>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  // member gender
  {
    accessorKey: "gender",
    header: () => (
      <div className="font-semibold w-full text-left">Jenis Kelamin</div>
    ),
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string;
      return gender === "MALE" ? "Laki-laki" : "Perempuan";
    },
  },
  // member phone number
  {
    accessorKey: "phone",
    header: () => (
      <div className="font-semibold w-full text-left">No. Handphone</div>
    ),
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string;
      return phone ? phone : <span className="text-muted-foreground">-</span>;
    },
  },
  // created at
  {
    accessorKey: "registerDate",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="font-semibold w-full text-left">
              Tanggal Daftar
            </span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("registerDate") as Date;
      return format(new Date(date), "d MMMM yyyy", { locale: id });
    },
  },
  // member status
  {
    accessorKey: "isActive",
    header: () => <div className="font-semibold w-full text-left">Status</div>,
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Switch
          checked={row.original.isActive}
          onCheckedChange={async () => {
            const result = await memberActiveToggle({
              id: row.original.id,
              isActive: row.original.isActive,
            });
            if (result.error) {
              toast.error(result.message);
            } else {
              toast.success(result.message);
            }
          }}
        />
      </div>
    ),
  },
  // table action
  {
    id: "actions",
    header: () => <div className="font-semibold w-full text-left">Aksi</div>,
    cell: ({ row }) => {
      const member = row.original;

      return <MemberTableAction member={member} />;
    },
  },
];
