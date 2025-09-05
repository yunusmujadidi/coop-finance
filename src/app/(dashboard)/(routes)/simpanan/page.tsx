import { getSavingsForDashboard } from "@/app/actions/saving-actions";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "./columns";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const SimpananPageAsync = async () => {
  const data = await getSavingsForDashboard();
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

const SimpananPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-3/4">
          <Loader2 className="animate-spin size-12 text-primary" />
        </div>
      }
    >
      <SimpananPageAsync />
    </Suspense>
  );
};

export default SimpananPage;
