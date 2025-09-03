import { MemberTypeModal } from "@/components/modals/member-type-modal";
import { SavingTypeModal } from "@/components/modals/saving-type-modal";

export const ModalProvider = () => {
  return (
    <>
      <MemberTypeModal />
      <SavingTypeModal />
    </>
  );
};
