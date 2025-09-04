"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { transactionSchema } from "@/lib/zod-schema";
import { requireAuth } from "@/lib/auth-server";

const revalidateTransaction = () => {
  revalidatePath("/transaksi");
};

export const getTransactions = async () => {
  try {
    const result = await prisma.transaction.findMany({
      include: {
        Member: {
          select: {
            name: true,
          },
        },
      },
    });
    return { success: true, message: "Data transaksi berhasil dimuat", result: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengambil transaksi",
      error,
      result: [],
    };
  }
};

export const createTransaction = async (data: z.infer<typeof transactionSchema>) => {
  try {
    await requireAuth();
    const validatedData = transactionSchema.parse(data);
    const result = await prisma.transaction.create({
      data: validatedData,
    });
    revalidateTransaction();
    return { success: true, message: "Transaksi baru berhasil dibuat", result };
  } catch (error) {
    return { success: false, message: "Gagal membuat transaksi baru", error };
  }
};
