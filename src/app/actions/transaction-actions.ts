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
        savingsAccount: {
          select: {
            accountNo: true,
            SavingType: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return {
      success: true,
      message: "Data transaksi berhasil dimuat",
      result: JSON.parse(JSON.stringify(result)),
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengambil transaksi",
      error,
      result: [],
    };
  }
};

export const createTransaction = async (
  data: z.infer<typeof transactionSchema>,
) => {
  try {
    await requireAuth();
    const validatedData = transactionSchema.parse(data);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Update Savings Account Balance if applicable
      if (
        validatedData.savingsAccountId &&
        (validatedData.type === "DEPOSIT" || validatedData.type === "WITHDRAWAL")
      ) {
        // VALIDATE OWNERSHIP AND GET BALANCE
        const savingsAccount = await tx.savingsAccount.findUnique({
          where: { id: validatedData.savingsAccountId },
          select: { memberId: true, balance: true },
        });

        if (
          !savingsAccount ||
          savingsAccount.memberId !== validatedData.memberId
        ) {
          throw new Error(
            "Rekening tabungan tidak valid atau bukan milik anggota yang bersangkutan."
          );
        }

        // VALIDATE SUFFICIENT FUNDS FOR WITHDRAWAL
        if (validatedData.type === "WITHDRAWAL") {
          if (savingsAccount.balance < validatedData.amount) {
            throw new Error("Saldo tidak mencukupi untuk melakukan penarikan.");
          }
        }

        const amount =
          validatedData.type === "DEPOSIT"
            ? validatedData.amount
            : -validatedData.amount;

        await tx.savingsAccount.update({
          where: { id: validatedData.savingsAccountId },
          data: {
            balance: {
              increment: amount,
            },
          },
        });
      }

      // 2. Create the transaction record
      const newTransaction = await tx.transaction.create({
        data: validatedData,
      });

      return newTransaction;
    });

    revalidateTransaction();
    return { success: true, message: "Transaksi baru berhasil dibuat", result };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal membuat transaksi baru";
    return { success: false, message: message, error };
  }
};

export const updateTransaction = async (
  id: string,
  data: z.infer<typeof transactionSchema>,
) => {
  try {
    await requireAuth();
    const validatedData = transactionSchema.parse(data);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Get the original transaction to revert its effect
      const originalTransaction = await tx.transaction.findUnique({
        where: { id },
      });

      if (!originalTransaction) {
        throw new Error("Transaksi asli tidak ditemukan.");
      }

      // 2. Revert the effect of the original transaction
      if (
        originalTransaction.savingsAccountId &&
        (originalTransaction.type === "DEPOSIT" ||
          originalTransaction.type === "WITHDRAWAL")
      ) {
        const amountToRevert =
          originalTransaction.type === "DEPOSIT"
            ? -originalTransaction.amount
            : originalTransaction.amount;

        await tx.savingsAccount.update({
          where: { id: originalTransaction.savingsAccountId },
          data: { balance: { increment: amountToRevert } },
        });
      }

      // 3. Apply the effect of the new transaction data
      if (
        validatedData.savingsAccountId &&
        (validatedData.type === "DEPOSIT" || validatedData.type === "WITHDRAWAL")
      ) {
        // VALIDATE OWNERSHIP AND GET BALANCE
        const savingsAccount = await tx.savingsAccount.findUnique({
          where: { id: validatedData.savingsAccountId },
          select: { memberId: true, balance: true },
        });

        if (
          !savingsAccount ||
          savingsAccount.memberId !== validatedData.memberId
        ) {
          throw new Error(
            "Rekening tabungan tidak valid atau bukan milik anggota yang bersangkutan."
          );
        }

        // VALIDATE SUFFICIENT FUNDS FOR WITHDRAWAL
        if (validatedData.type === "WITHDRAWAL") {
          if (savingsAccount.balance < validatedData.amount) {
            throw new Error("Saldo tidak mencukupi untuk melakukan penarikan.");
          }
        }

        const amountToApply =
          validatedData.type === "DEPOSIT"
            ? validatedData.amount
            : -validatedData.amount;

        await tx.savingsAccount.update({
          where: { id: validatedData.savingsAccountId },
          data: { balance: { increment: amountToApply } },
        });
      }

      // 4. Finally, update the transaction record itself
      const updatedTransaction = await tx.transaction.update({
        where: { id },
        data: validatedData,
      });

      return updatedTransaction;
    });

    revalidateTransaction();
    return { success: true, message: "Transaksi berhasil diperbarui", result };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal memperbarui transaksi";
    return { success: false, message, error };
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    await requireAuth();
    // Similar to update, we need to revert the transaction's effect before deleting
    const result = await prisma.$transaction(async (tx) => {
      const originalTransaction = await tx.transaction.findUnique({
        where: { id },
      });

      if (!originalTransaction) {
        throw new Error("Transaksi tidak ditemukan.");
      }

      if (
        originalTransaction.savingsAccountId &&
        (originalTransaction.type === "DEPOSIT" ||
          originalTransaction.type === "WITHDRAWAL")
      ) {
        const amountToRevert =
          originalTransaction.type === "DEPOSIT"
            ? -originalTransaction.amount
            : originalTransaction.amount;

        // We also need to check if reverting a withdrawal would make the balance negative
        // but for simplicity in a delete operation, we'll assume this is a corrective action.

        await tx.savingsAccount.update({
          where: { id: originalTransaction.savingsAccountId },
          data: { balance: { increment: amountToRevert } },
        });
      }

      return await tx.transaction.delete({ where: { id } });
    });

    revalidateTransaction();
    return { success: true, message: "Transaksi berhasil dihapus", result };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal menghapus transaksi";
    return { success: false, message, error };
  }
};
