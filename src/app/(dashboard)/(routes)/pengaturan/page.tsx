import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getMemberType } from "@/app/actions/member-actions";
import { DataTable } from "@/components/table/data-table";
import { getSavingType } from "@/app/actions/saving-actions";
import { MemberTypeColumns } from "./member-type-columns";
import { SavingTypeColumns } from "./saving-type-columns";

const SettingPage = async () => {
  const members = await getMemberType();
  const savings = await getSavingType();
  return (
    <div className="m-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Tabel Jenis Anggota</CardTitle>
          <CardDescription>Atur jenis anggota dibawah ini</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={members.result} columns={MemberTypeColumns} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tabel Jenis Anggota</CardTitle>
          <CardDescription>Atur jenis anggota dibawah ini</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={savings.result} columns={SavingTypeColumns} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingPage;
