"use server";

import { prisma } from "@/lib/prisma";

export const getTotalMembers = async () => {
  try {
    const result = await prisma.member.count();
    return { success: true, message: "Total anggota berhasil dimuat", result };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengambil total anggota",
      error,
      result: 0,
    };
  }
};

export const getTotalSavings = async () => {
  try {
    const result = await prisma.savingsAccount.aggregate({
      _sum: {
        balance: true,
      },
    });
    return {
      success: true,
      message: "Total simpanan berhasil dimuat",
      result: result._sum.balance || 0,
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengambil total simpanan",
      error,
      result: 0,
    };
  }
};

export const getTotalLoans = async () => {
  try {
    const result = await prisma.loan.aggregate({
      _sum: {
        principalAmount: true,
      },
    });
    return {
      success: true,
      message: "Total pinjaman berhasil dimuat",
      result: result._sum.principalAmount || 0,
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengambil total pinjaman",
      error,
      result: 0,
    };
  }
};

export const getTotalTransactions = async () => {
  try {
    const result = await prisma.transaction.count();
    return {
      success: true,
      message: "Total transaksi berhasil dimuat",
      result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengambil total transaksi",
      error,
      result: 0,
    };
  }
};
