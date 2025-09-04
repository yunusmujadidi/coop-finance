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

type SavingsSheetState = {
  onOpen: () => void;
  onClose: () => void;
  onOpenEdit: (savingsAccount: SavingsAccount) => void;
  isOpen: boolean;
  isEdit: boolean;
  savingsAccount?: SavingsAccount;
};

export const useMemberSheet = create<MemberSheetProps>((set) => ({
  isEdit: false,
  isOpen: false,
  member: undefined,
  onOpen: () => set({ isOpen: true, isEdit: false, member: undefined }),
  onOpenEdit: (member: Member) => set({ isOpen: true, isEdit: true, member }),
  onClose: () => set({ isOpen: false, isEdit: false, member: undefined }),
}));

export const useSavingsSheet = create<SavingsSheetState>((set) => ({
  isEdit: false,
  isOpen: false,
  member: undefined,
  onOpen: () => set({ isOpen: true, isEdit: false, savingsAccount: undefined }),
  onOpenEdit: (savingsAccount: SavingsAccount) =>
    set({ isOpen: true, isEdit: true, savingsAccount }),
  onClose: () =>
    set({ isOpen: false, isEdit: false, savingsAccount: undefined }),
}));
