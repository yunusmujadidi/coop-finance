"use client";

import { MemberTableAction } from "@/components/table/member-table-action";
import { Badge } from "@/components/ui/badge";
import { Prisma } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { memberActiveToggle } from "@/app/actions/member-actions";
import { toast } from "sonner";

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
      <span className="font-bold">{row.original.memberNo}</span>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="font-semibold w-full text-left">Nama</div>,
  },
  {
    accessorKey: "memberType.name",
    header: () => (
      <div className="font-semibold w-full text-left">Jenis Anggota</div>
    ),
  },
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
      return new Date(date).toLocaleDateString("id-ID");
    },
  },
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

        <Badge
          variant={row.original.isActive ? "default" : "secondary"}
          className="w-[50px] justify-center"
        >
          {row.original.isActive ? "Ya" : "Tidak"}
        </Badge>
      </div>
    ),
  },

  {
    id: "actions",
    header: () => <div className="font-semibold w-full text-left">Aksi</div>,
    cell: ({ row }) => {
      const member = row.original;

      return <MemberTableAction member={member} />;
    },
  },
];
