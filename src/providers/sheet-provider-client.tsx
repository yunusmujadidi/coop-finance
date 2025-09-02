import { MemberSheet } from "@/components/sheets/member-sheet";
import { MemberType } from "@/generated/prisma";

export const SheetProviderClient = ({
  memberTypes,
}: {
  memberTypes: MemberType[];
}) => {
  return <MemberSheet memberTypes={memberTypes} />;
};
