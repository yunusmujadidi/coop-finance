"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MemberType } from "@/generated/prisma";

export const columns: ColumnDef<MemberType>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
