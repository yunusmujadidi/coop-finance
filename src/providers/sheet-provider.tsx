import { getMemberType } from "@/app/actions/member-actions";
import { SheetProviderClient } from "./sheet-provider-client";

export const SheetProvider = async () => {
  const memberTypes = await getMemberType();

  return (
    <SheetProviderClient
      memberTypes={memberTypes.success ? memberTypes.result || [] : []}
    />
  );
};
