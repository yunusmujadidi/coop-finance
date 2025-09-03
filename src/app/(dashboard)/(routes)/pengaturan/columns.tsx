"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MemberType } from "@/generated/prisma";

export const columns: ColumnDef<MemberType>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal dibuat",
  },
  {
    accessorKey: "updatedAt",
    header: "Tanggal diubah",
  },
];
