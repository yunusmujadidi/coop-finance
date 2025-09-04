import { getMembers } from "@/app/actions/member-actions";
import { LoanModal } from "@/components/modals/loan-modal";
import { MemberTypeModal } from "@/components/modals/member-type-modal";
import { SavingTypeModal } from "@/components/modals/saving-type-modal";

export const ModalProvider = async () => {
  const members = await getMembers();
  return (
    <>
      <MemberTypeModal />
      <SavingTypeModal />
      <LoanModal member={members.success ? members.result || [] : []} />
    </>
  );
};
