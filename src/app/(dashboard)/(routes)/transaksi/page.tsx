import { getTransactions } from "@/app/actions/transaction-actions";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "@/app/(dashboard)/(routes)/transaksi/columns";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const TransaksiPageAsync = async () => {
  const data = await getTransactions();
  return (
    <div className="m-4">
      <Card>
        <CardContent>
          <DataTable
            data={data.result}
            columns={columns}
            filterKey="transactionNo"
            filterName="No. Transaksi"
          />
        </CardContent>
      </Card>
    </div>
  );
};

const TransaksiPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-3/4">
          <Loader2 className="animate-spin size-12 text-primary" />
        </div>
      }
    >
      <TransaksiPageAsync />
    </Suspense>
  );
};

export default TransaksiPage;
