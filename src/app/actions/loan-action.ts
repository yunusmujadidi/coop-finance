"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { loanSchema } from "@/lib/zod-schema";
import { requireAuth } from "@/lib/auth-server";

const revalidateLoan = () => {
  revalidatePath("/pinjaman");
  revalidatePath("/");
};

export const createLoan = async (data: z.infer<typeof loanSchema>) => {
  try {
    await requireAuth();
    const validatedData = loanSchema.parse(data);

    const result = await prisma.loan.create({
      data: validatedData,
    });

    // serialize result dengan konversi decimal ke number
    const serializedResult = {
      ...result,
      interestRate: Number(result.interestRate),
    };

    revalidateLoan();
    return {
      success: true,
      message: "Pinjaman baru berhasil dibuat",
      result: JSON.parse(JSON.stringify(serializedResult)),
    };
  } catch (error) {
    return { success: false, message: "Gagal membuat pinjaman baru", error };
  }
};

export const updateLoan = async (
  id: string,
  data: z.infer<typeof loanSchema>
) => {
  try {
    await requireAuth();
    const validatedData = loanSchema.parse(data);

    const result = await prisma.loan.update({
      where: { id },
      data: validatedData,
    });

    // serialize result dengan konversi decimal ke number
    const serializedResult = {
      ...result,
      interestRate: Number(result.interestRate),
    };

    revalidateLoan();
    return {
      success: true,
      message: "Pinjaman berhasil diupdate",
      result: JSON.parse(JSON.stringify(serializedResult)),
    };
  } catch (error) {
    return { success: false, message: "Gagal mengupdate pinjaman", error };
  }
};

export const getLoans = async () => {
  try {
    await requireAuth();

    const result = await prisma.loan.findMany({
      include: {
        member: {
          include: {
            memberType: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            transactions: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // serialize hasil dengan konversi decimal ke number
    const serializedResult = result.map((loan) => ({
      ...loan,
      interestRate: Number(loan.interestRate),
    }));

    return {
      success: true,
      message: "Data pinjaman berhasil dimuat",
      result: JSON.parse(JSON.stringify(serializedResult)),
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengambil data pinjaman",
      error,
      result: [],
    };
  }
};

export const deleteLoan = async (id: string) => {
  try {
    await requireAuth();

    // check if loan transaction
    const loanWithTransactions = await prisma.loan.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    if (loanWithTransactions && loanWithTransactions._count.transactions > 0) {
      return {
        success: false,
        message: "Tidak dapat menghapus pinjaman yang sudah memiliki transaksi",
      };
    }

    const result = await prisma.loan.delete({
      where: { id },
    });

    revalidateLoan();
    return {
      success: true,
      message: "Berhasil menghapus pinjaman!",
      result: JSON.parse(JSON.stringify(result)),
    };
  } catch (error) {
    return { success: false, message: "Gagal menghapus pinjaman", error };
  }
};
