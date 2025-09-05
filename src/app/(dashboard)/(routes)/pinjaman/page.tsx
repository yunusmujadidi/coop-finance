import { getLoansForDashboard } from "@/app/actions/loan-action";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "./columns";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const PinjamanPageAsync = async () => {
  // fetch data pinjaman dan anggota secara paralel
  const loanData = await getLoansForDashboard();
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

const PinjamanPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-3/4">
          <Loader2 className="animate-spin size-12 text-primary" />
        </div>
      }
    >
      <PinjamanPageAsync />
    </Suspense>
  );
};

export default PinjamanPage;
