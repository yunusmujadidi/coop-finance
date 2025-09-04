import { getMembers } from "@/app/actions/member-actions";
import { getLoans } from "@/app/actions/loan-action";
import { getSavings } from "@/app/actions/saving-actions";
import { LoanModal } from "@/components/modals/loan-modal";
import { MemberTypeModal } from "@/components/modals/member-type-modal";
import { SavingTypeModal } from "@/components/modals/saving-type-modal";
import { TransactionModal } from "@/components/modals/transaction-modal";

export const ModalProvider = async () => {
  const members = await getMembers();
  const loans = await getLoans();
  const savings = await getSavings();

  return (
    <>
      <MemberTypeModal />
      <SavingTypeModal />
      <LoanModal member={members.result} />
      <TransactionModal
        members={members.result}
        loans={loans.result}
        savings={savings.result}
      />
    </>
  );
};

