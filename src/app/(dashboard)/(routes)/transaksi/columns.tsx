"use client";

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Prisma } from "@/generated/prisma";

import { TransactionTableAction } from "@/components/table/transaction-table-action";

export type TransactionDashboard = Prisma.TransactionGetPayload<{
  include: {
    Member: {
      select: {
        name: true;
      };
    };
    savingsAccount: {
      select: {
        accountNo: true;
        SavingType: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export const columns: ColumnDef<TransactionDashboard>[] = [
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
  // transaction number
  {
    accessorKey: "transactionNo",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="font-semibold"> No Transaksi</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <span className="font-semibold">{row.original.transactionNo}</span>
    ),
  },
  // member name
  {
    accessorKey: "Member.name",
    header: () => (
      <div className="font-semibold w-full text-left">Nama Anggota</div>
    ),
    cell: ({ row }) =>
      row.original.Member?.name || (
        <span className="text-muted-foreground">-</span>
      ),
  },
  // savings account number
  {
    accessorKey: "savingsAccount.accountNo",
    header: () => (
      <div className="font-semibold w-full text-left">No. Rekening</div>
    ),
    cell: ({ row }) =>
      row.original.savingsAccount?.accountNo || (
        <span className="text-muted-foreground">-</span>
      ),
  },
  // saving type name
  {
    id: "savingType",
    header: () => (
      <div className="font-semibold w-full text-left">Jenis Rekening</div>
    ),
    cell: ({ row }) =>
      row.original.savingsAccount?.SavingType?.name || (
        <span className="text-muted-foreground">-</span>
      ),
  },
  // transaction type
  {
    accessorKey: "type",
    header: () => (
      <div className="font-semibold w-full text-left">Tipe Transaksi</div>
    ),
    cell: ({ row }) => {
      const type = row.original.type;
      return <Badge>{type}</Badge>;
    },
  },
  // amount
  {
    accessorKey: "amount",
    header: () => <div className="font-semibold w-full text-left">Jumlah</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  // transaction date
  {
    accessorKey: "transactionDate",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="font-semibold w-full text-left">
              Tanggal Transaksi
            </span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("transactionDate") as Date;
      return format(new Date(date), "d MMMM yyyy", { locale: id });
    },
  },
  // description
  {
    accessorKey: "description",
    header: () => (
      <div className="font-semibold w-full text-left">Deskripsi</div>
    ),
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return description ? (
        <span className="max-w-[200px] truncate" title={description}>
          {description}
        </span>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  // actions
  {
    id: "actions",
    cell: ({ row }) => <TransactionTableAction transaction={row.original} />,
  },
];
