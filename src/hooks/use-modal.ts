import { create } from "zustand";

import { Loan, MemberType, SavingType, Transaction } from "@/generated/prisma";

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

type LoanModalState = {
  onOpen: () => void;
  onClose: () => void;
  onOpenEdit: (loan: Loan) => void;
  isOpen: boolean;
  isEdit: boolean;
  loan?: Loan;
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

export const useLoanModal = create<LoanModalState>((set) => ({
  isEdit: false,
  isOpen: false,
  loan: undefined,
  onOpen: () => set({ isOpen: true, isEdit: false, loan: undefined }),
  onOpenEdit: (loan: Loan) => set({ isOpen: true, isEdit: true, loan }),
  onClose: () => set({ isOpen: false, isEdit: false, loan: undefined }),
}));

type TransactionModalState = {
  onOpen: () => void;
  onClose: () => void;
  onOpenEdit: (transaction: Transaction) => void;
  isOpen: boolean;
  isEdit: boolean;
  transaction?: Transaction;
};

export const useTransactionModal = create<TransactionModalState>((set) => ({
  isEdit: false,
  isOpen: false,
  transaction: undefined,
  onOpen: () => set({ isOpen: true, isEdit: false, transaction: undefined }),
  onOpenEdit: (transaction: Transaction) =>
    set({ isOpen: true, isEdit: true, transaction }),
  onClose: () => set({ isOpen: false, isEdit: false, transaction: undefined }),
}));
