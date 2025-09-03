import { create } from "zustand";

import { MemberType, SavingType } from "@/generated/prisma";

type MemberTypeModalProps = {
  onOpen: () => void;
  onClose: () => void;
  onOpenEdit: (memberType: MemberType) => void;
  isOpen: boolean;
  isEdit: boolean;
  memberType?: MemberType;
};

type SavingTypeModalProps = {
  onOpen: () => void;
  onClose: () => void;
  onOpenEdit: (savingType: SavingType) => void;
  isOpen: boolean;
  isEdit: boolean;
  savingType?: SavingType;
};

export const useMemberTypeModal = create<MemberTypeModalProps>((set) => ({
  isEdit: false,
  isOpen: false,
  memberType: undefined,
  onOpen: () => set({ isOpen: true, isEdit: false, memberType: undefined }),
  onOpenEdit: (memberType: MemberType) =>
    set({ isOpen: true, isEdit: true, memberType }),
  onClose: () => set({ isOpen: false, isEdit: false, memberType: undefined }),
}));

export const useSavingTypeModal = create<SavingTypeModalProps>((set) => ({
  isEdit: false,
  isOpen: false,
  savingType: undefined,
  onOpen: () => set({ isOpen: true, isEdit: false, savingType: undefined }),
  onOpenEdit: (savingType: SavingType) =>
    set({ isOpen: true, isEdit: true, savingType }),
  onClose: () => set({ isOpen: false, isEdit: false, savingType: undefined }),
}));
