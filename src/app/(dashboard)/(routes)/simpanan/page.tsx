import { getSavings } from "@/app/actions/saving-actions";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "./columns";

const SimpananPage = async () => {
  const data = await getSavings();
  return (
    <div className="m-4">
      <Card>
        <CardContent>
          <DataTable
            data={data.result}
            columns={columns}
            filterKey="member.name"
            filterName="Nama Anggota"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpananPage;
