import { Card, CardContent } from "@/components/ui/card";

import { columns } from "@/app/(dashboard)/(routes)/pengaturan/columns";
import { getMemberType } from "@/app/actions/member-actions";
import { DataTable } from "@/components/table/data-table";

const SettingPage = async () => {
  const data = await getMemberType();
  return (
    <div className="m-4">
      <Card>
        <CardContent>
          <DataTable data={data.result} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingPage;
