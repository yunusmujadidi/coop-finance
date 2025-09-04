"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { MemberType as PrismaMemberType } from "@/generated/prisma";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MemberTypeTableAction } from "@/components/table/member-type-table-action";

export type MemberTypeWithCount = PrismaMemberType & {
  _count: {
    members: number;
  };
};

export const MemberTypeColumns: ColumnDef<MemberTypeWithCount>[] = [
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
  // member type name
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="font-semibold">Nama Jenis Anggota</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "_count.members",
    header: () => <div className="text-center">Jumlah Anggota</div>,
    cell: ({ row }) => (
      <span className="flex items-center justify-center">
        <p className="text-center">{row.original._count.members}</p>
      </span>
    ),
  },
  // created date
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="font-semibold">Tanggal Dibuat</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return format(new Date(date), "d MMMM yyyy", { locale: id });
    },
  },
  // actions
  {
    id: "actions",
    header: () => <div className="font-semibold w-full text-left">Aksi</div>,
    cell: ({ row }) => {
      const memberType = row.original;
      return <MemberTypeTableAction memberType={memberType} />;
    },
  },
];
