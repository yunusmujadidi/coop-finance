"use server";

import { prisma } from "@/lib/prisma";
import { memberSchema, memberTypeSchema } from "@/lib/zod-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const revalidateMember = () => {
  revalidatePath("/anggota");
  revalidatePath("/");
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

export const getMemberType = () => {
  try {
    const result = prisma.memberType.findMany({});
    revalidateMember();
    return { success: true, message: "Jenis anggota berhasil dibuat", result };
  } catch (error) {
    return { success: false, message: "Gagal membuat jenis anggota", error };
  }
};
