import { MemberSheet } from "@/components/sheets/member-sheet";
import { SavingSheet } from "@/components/sheets/saving-sheet";
import { Member, MemberType, SavingType } from "@/generated/prisma";

interface SheetProviderProps {
  memberTypes: MemberType[];
  savingTypes: SavingType[];
  members: Member[];
}

export const SheetProvider = ({ memberTypes, savingTypes, members }: SheetProviderProps) => {
  return (
    <>
      <MemberSheet memberTypes={memberTypes} />
      <SavingSheet savingTypes={savingTypes} members={members} />
    </>
  );
};

