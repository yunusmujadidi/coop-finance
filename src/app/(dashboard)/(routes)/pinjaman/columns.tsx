"use client";

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Prisma } from "@/generated/prisma";
import { formatRupiah, getStatusColor } from "@/lib/utils";
import { LoanTableAction } from "@/components/table/loan-table-action";

export type LoanDashboard = Prisma.LoanGetPayload<{
  include: {
    member: {
      include: {
        memberType: {
          select: {
            name: true;
          };
        };
      };
    };
    _count: {
      select: {
        transactions: true;
      };
    };
  };
}>;

export const columns: ColumnDef<LoanDashboard>[] = [
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
    accessorKey: "loanNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nomor Pinjaman
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("loanNo")}</div>
    ),
  },
  {
    id: "member.name",
    accessorKey: "member.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Anggota
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const member = row.original.member;
      if (!member) {
        return <span>-</span>;
      }
      return (
        <div>
          <div className="font-medium">{member.name}</div>
          <div className="text-sm text-muted-foreground">
            {member.memberNo} • {member.memberType.name}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "principalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jumlah Pinjaman
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("principalAmount") as number;
      const formatted = formatRupiah(amount);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "interestRate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Suku Bunga
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rate = row.getValue("interestRate") as number;
      return <div className="text-center">{rate}% / tahun</div>;
    },
  },
  {
    accessorKey: "loanTerm",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jangka Waktu
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const term = row.getValue("loanTerm") as number;
      return <div className="text-center">{term} bulan</div>;
    },
  },
  {
    accessorKey: "monthlyPayment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Angsuran Bulanan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("monthlyPayment") as number;
      const formatted = formatRupiah(amount);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "outstandingBalance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sisa Pinjaman
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("outstandingBalance") as number;
      const formatted = formatRupiah(amount);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const { label, variant } = getStatusColor(status);
      return <Badge variant={variant}>{label}</Badge>;
    },
  },
  {
    accessorKey: "applicationDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Pengajuan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("applicationDate") as string;
      return new Date(date).toLocaleDateString("id-ID");
    },
  },
  {
    accessorKey: "_count",
    header: "Transaksi",
    cell: ({ row }) => {
      const count = row.getValue("_count") as { transactions: number };
      return (
        <div className="text-center">
          <Badge variant="outline">{count.transactions}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const loan = row.original;
      return (
        <div className="text-right">
          <LoanTableAction loan={loan} />
        </div>
      );
    },
  },
];


