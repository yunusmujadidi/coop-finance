"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { savingType } from "@/lib/zod-schema";
import { requireAuth } from "@/lib/auth-server";

const revalidateSaving = () => {
  revalidatePath("/simpanan");
  revalidatePath("/");
  revalidatePath("/pengaturan");
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
