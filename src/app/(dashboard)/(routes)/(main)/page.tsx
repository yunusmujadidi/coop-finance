import {
  getTotalLoans,
  getTotalMembers,
  getTotalSavings,
  getTotalTransactions,
} from "@/app/actions/dashboard-actions";
import { DashboardCard } from "@/components/main/dashboard-card";
import { formatRupiah } from "@/lib/utils";
import { Landmark, Loader2, Repeat, Users, Wallet } from "lucide-react";
import { Suspense } from "react";

const DashboardAsyncPage = async () => {
  const [anggota, simpanan, pinjaman, transaksi] = await Promise.all([
    getTotalMembers(),
    getTotalSavings(),
    getTotalLoans(),
    getTotalTransactions(),
  ]);
  return (
    <div className="m-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Anggota"
          content={anggota.result.toString()}
          icon={<Users className="h-4 w-4" />}
        />
        <DashboardCard
          title="Total Simpanan"
          content={formatRupiah(simpanan.result)}
          icon={<Wallet className="h-4 w-4" />}
        />
        <DashboardCard
          title="Total Pinjaman"
          content={formatRupiah(pinjaman.result)}
          icon={<Landmark className="h-4 w-4" />}
        />
        <DashboardCard
          title="Total Transaksi"
          content={transaksi.result.toString()}
          icon={<Repeat className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-3/4">
          <Loader2 className="animate-spin size-12 text-primary" />
        </div>
      }
    >
      <DashboardAsyncPage />
    </Suspense>
  );
};

export default DashboardPage;
