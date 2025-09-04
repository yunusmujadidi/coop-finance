import { create } from "zustand";

import { Member, SavingsAccount } from "@/generated/prisma";

type MemberSheetProps = {
  onOpen: () => void;
  onClose: () => void;
  onOpenEdit: (member: Member) => void;
  isOpen: boolean;
  isEdit: boolean;
  member?: Member;
};

type SavingSheetState = {
  onOpen: () => void;
  onClose: () => void;
  onOpenEdit: (saving: SavingsAccount) => void;
  isOpen: boolean;
  isEdit: boolean;
  saving?: SavingsAccount;
};

export const useMemberSheet = create<MemberSheetProps>((set) => ({
  isEdit: false,
  isOpen: false,
  member: undefined,
  onOpen: () => set({ isOpen: true, isEdit: false, member: undefined }),
  onOpenEdit: (member: Member) => set({ isOpen: true, isEdit: true, member }),
  onClose: () => set({ isOpen: false, isEdit: false, member: undefined }),
}));

export const useSavingSheet = create<SavingSheetState>((set) => ({
  isEdit: false,
  isOpen: false,
  saving: undefined,
  onOpen: () => set({ isOpen: true, isEdit: false, saving: undefined }),
  onOpenEdit: (saving: SavingsAccount) =>
    set({ isOpen: true, isEdit: true, saving }),
  onClose: () => set({ isOpen: false, isEdit: false, saving: undefined }),
}));
