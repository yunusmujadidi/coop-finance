import { create } from "zustand";

interface useMemberTypeModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMemberTypeModal = create<useMemberTypeModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
