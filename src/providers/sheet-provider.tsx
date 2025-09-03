import { getMemberType } from "@/app/actions/member-actions";
import { MemberSheet } from "@/components/sheets/member-sheet";

export const SheetProvider = async () => {
  const memberTypes = await getMemberType();

  return (
    <MemberSheet
      memberTypes={memberTypes.success ? memberTypes.result || [] : []}
    />
  );
};
