import { getMembersDashboard } from "@/app/actions/member-actions";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "@/app/(dashboard)/(routes)/anggota/columns";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const AnggotaPageAsync = async () => {
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

const AnggotaPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-3/4">
          <Loader2 className="animate-spin size-12 text-primary" />
        </div>
      }
    >
      <AnggotaPageAsync />
    </Suspense>
  );
};

export default AnggotaPage;
