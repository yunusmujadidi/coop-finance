"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { savingsAccountSchema, savingType } from "@/lib/zod-schema";
import { requireAuth } from "@/lib/auth-server";

const revalidateSaving = () => {
  revalidatePath("/simpanan");
  revalidatePath("/");
  revalidatePath("/pengaturan");
};

export const createSaving = async (
  data: z.infer<typeof savingsAccountSchema>
) => {
  try {
    await requireAuth();
    const validatedData = savingsAccountSchema.parse(data);
    const result = await prisma.savingsAccount.create({
      data: validatedData,
    });
    revalidateSaving();
    return { success: true, message: "Simpanan baru berhasil dibuat", result };
  } catch (error) {
    return { success: false, message: "Gagal membuat simpanan baru", error };
  }
};

export const updateSaving = async (
  id: string,
  data: z.infer<typeof savingsAccountSchema>
) => {
  try {
    await requireAuth();
    const validatedData = savingsAccountSchema.parse(data);
    const result = await prisma.savingsAccount.update({
      where: {
        id,
      },
      data: validatedData,
    });
    revalidateSaving();
    return {
      success: true,
      message: "Simpanan berhasil diupdate",
      result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengupdate simpanan",
      error,
    };
  }
};

export const getSavings = async () => {
  try {
    await requireAuth();
    const result = await prisma.savingsAccount.findMany({
      include: {
        member: {
          select: {
            name: true,
          },
        },
        SavingType: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, message: "Data simpanan berhasil dimuat", result };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengambil data simpanan",
      error,
      result: [],
    };
  }
};

export const deleteSavings = async (id: string) => {
  try {
    await requireAuth();
    const result = await prisma.savingsAccount.deleteMany({
      where: {
        id,
      },
    });
    revalidateSaving();
    return {
      success: true,
      message: "Berhasil menghapus simpanan!",
      result,
    };
  } catch (error) {
    return { success: false, message: "Gagal menghapus simpanan", error };
  }
};

// saving type

export const createSavingType = async (data: z.infer<typeof savingType>) => {
  try {
    await requireAuth();
    const validatedData = savingType.parse(data);
    const result = await prisma.savingType.create({
      data: validatedData,
    });
    revalidateSaving();
    return { success: true, message: "Jenis simpanan berhasil dibuat", result };
  } catch (error) {
    return { success: false, message: "Gagal membuat jenis simpanan", error };
  }
};

export const updateSavingType = async (
  id: string,
  data: z.infer<typeof savingType>
) => {
  try {
    await requireAuth();
    const validatedData = savingType.parse(data);
    const result = await prisma.savingType.update({
      where: {
        id,
      },
      data: validatedData,
    });
    revalidateSaving();
    return {
      success: true,
      message: "Jenis simpanan berhasil diupdate",
      result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengupdate jenis simpanan",
      error,
    };
  }
};

export const getSavingType = async () => {
  try {
    await requireAuth();
    const result = await prisma.savingType.findMany();
    return { success: true, message: "Jenis simpanan berhasil dimuat", result };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengambil jenis simpanan",
      error,
      result: [],
    };
  }
};

export const deleteSavingTypes = async (id: string) => {
  try {
    await requireAuth();
    const result = await prisma.savingType.deleteMany({
      where: {
        id,
      },
    });
    revalidateSaving();
    return {
      success: true,
      message: "Berhasil menghapus jenis simpanan!",
      result,
    };
  } catch (error) {
    return { success: false, message: "Gagal menghapus jenis simpanan", error };
  }
};
