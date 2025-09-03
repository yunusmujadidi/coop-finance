import { getMembersDashboard } from "@/app/actions/member-actions";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "@/app/(dashboard)/(routes)/anggota/columns";

const AnggotaPage = async () => {
  const data = await getMembersDashboard();
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

export default AnggotaPage;
