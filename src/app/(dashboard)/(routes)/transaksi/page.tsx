import { getTransactions } from "@/app/actions/transaction-actions";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "@/app/(dashboard)/(routes)/transaksi/columns";

const TransaksiPage = async () => {
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

export default TransaksiPage;
