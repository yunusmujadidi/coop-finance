import { create } from "zustand";

import { Member } from "@/generated/prisma";

type MemberSheetProps = {
  onOpen: () => void;
  onClose: () => void;
  onOpenEdit: (member: Member) => void;
  isOpen: boolean;
  isEdit: boolean;
  member?: Member;
};

export const useMemberSheet = create<MemberSheetProps>((set) => ({
  isEdit: false,
  isOpen: false,
  member: undefined,
  onOpen: () => set({ isOpen: true, isEdit: false, member: undefined }),
  onOpenEdit: (member: Member) => set({ isOpen: true, isEdit: true, member }),
  onClose: () => set({ isOpen: false, isEdit: false, member: undefined }),
}));
