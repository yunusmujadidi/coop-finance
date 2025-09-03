"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { memberSchema, memberTypeSchema } from "@/lib/zod-schema";

const revalidateMember = () => {
  revalidatePath("/anggota");
  revalidatePath("/");
  revalidatePath("/pengaturan");
};

export const createMember = async (data: z.infer<typeof memberSchema>) => {
  try {
    const validatedData = memberSchema.parse(data);
    const result = await prisma.member.create({
      data: validatedData,
    });
    revalidateMember();
    return { success: true, message: "Anggota baru berhasil dibuat", result };
  } catch (error) {
    return { success: false, message: "Gagal membuat anggota baru", error };
  }
};

export const updateMember = async (
  id: string,
  data: z.infer<typeof memberSchema>
) => {
  try {
    const validatedData = memberSchema.parse(data);
    const result = await prisma.member.update({
      where: {
        id,
      },
      data: validatedData,
    });
    revalidateMember();
    return { success: true, message: "Anggota berhasil diupdate", result };
  } catch (error) {
    return { success: false, message: "Gagal membuat anggota baru", error };
  }
};

export const getMembersDashboard = async () => {
  try {
    const result = await prisma.member.findMany({
      include: {
        memberType: {
          select: {
            name: true,
          },
        },
      },
    });
    return { success: true, message: "Data anggota berhasil dimuat", result };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengambil jenis anggota",
      error,
      result: [],
    };
  }
};

export const memberActiveToggle = async ({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) => {
  try {
    await prisma.member.updateMany({
      where: { id },
      data: { isActive: !isActive },
    });
    revalidateMember();
    return { success: true, message: "Berhasil meng-update status anggota!" };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengupdate status anggota",
      error,
    };
  }
};

export const deleteMembers = async (id: string) => {
  try {
    const result = await prisma.member.deleteMany({
      where: {
        id,
      },
    });
    revalidateMember();
    return { success: true, message: "Berhasil menghapus anggota!", result };
  } catch (error) {
    return { success: false, message: "Gagal menghapus anggota", error };
  }
};

// member type

export const createMemberType = async (
  data: z.infer<typeof memberTypeSchema>
) => {
  try {
    const validatedData = memberTypeSchema.parse(data);
    const result = await prisma.memberType.create({
      data: validatedData,
    });
    revalidateMember();
    return { success: true, message: "Jenis anggota berhasil dibuat", result };
  } catch (error) {
    return { success: false, message: "Gagal membuat jenis anggota", error };
  }
};

export const getMemberType = async () => {
  try {
    const result = await prisma.memberType.findMany();
    return { success: true, message: "Jenis anggota berhasil dimuat", result };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mengambil jenis anggota",
      error,
      result: [],
    };
  }
};
