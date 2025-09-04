import { getLoans } from "@/app/actions/loan-action";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "./columns";

const PinjamanPage = async () => {
  // fetch data pinjaman dan anggota secara paralel
  const loanData = await getLoans();
  return (
    <div className="m-4">
      <Card>
        <CardContent>
          <DataTable
            data={loanData.result}
            columns={columns}
            filterKey="member.name"
            filterName="Nama Anggota"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PinjamanPage;
