import { getMembers, getMemberType } from "@/app/actions/member-actions";
import { getSavingType } from "@/app/actions/saving-actions";
import { MemberSheet } from "@/components/sheets/member-sheet";
import { SavingSheet } from "@/components/sheets/saving-sheet";

export const SheetProvider = async () => {
  const memberTypes = await getMemberType();
  const savingTypes = await getSavingType();
  const members = await getMembers();

  return (
    <>
      <MemberSheet memberTypes={memberTypes.result} />
      <SavingSheet savingTypes={savingTypes.result} members={members.result} />
    </>
  );
};
