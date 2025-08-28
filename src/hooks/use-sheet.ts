import { create } from "zustand";

type MemberSheetProps = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  // member: Member | null
};

export const useMemberSheet = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  //   member: null,
}));
