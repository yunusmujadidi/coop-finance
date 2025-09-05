import { LoanModal } from "@/components/modals/loan-modal";
import { MemberTypeModal } from "@/components/modals/member-type-modal";
import { SavingTypeModal } from "@/components/modals/saving-type-modal";
import { TransactionModal } from "@/components/modals/transaction-modal";
import { Loan, Member, SavingsAccount } from "@/generated/prisma";

interface ModalProviderProps {
  members: Member[];
  loans: Loan[];
  savings: SavingsAccount[];
}

export const ModalProvider = ({ members, loans, savings }: ModalProviderProps) => {
  return (
    <>
      <MemberTypeModal />
      <SavingTypeModal />
      <LoanModal member={members} />
      <TransactionModal members={members} loans={loans} savings={savings} />
    </>
  );
};

