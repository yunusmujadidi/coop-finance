import {
  getTotalLoans,
  getTotalMembers,
  getTotalSavings,
  getTotalTransactions,
} from "@/app/actions/dashboard-actions";
import { DashboardCard } from "@/components/main/dashboard-card";
import { formatRupiah } from "@/lib/utils";
import { Landmark, Repeat, Users, Wallet } from "lucide-react";

const DashboardPage = async () => {
  const { result: totalAnggota } = await getTotalMembers();
  const { result: totalSimpanan } = await getTotalSavings();
  const { result: totalPinjaman } = await getTotalLoans();
  const { result: totalTransaksi } = await getTotalTransactions();
  return (
    <div className="m-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Anggota"
          content={totalAnggota.toString()}
          icon={<Users className="h-4 w-4" />}
        />
        <DashboardCard
          title="Total Simpanan"
          content={formatRupiah(totalSimpanan)}
          icon={<Wallet className="h-4 w-4" />}
        />
        <DashboardCard
          title="Total Pinjaman"
          content={formatRupiah(totalPinjaman)}
          icon={<Landmark className="h-4 w-4" />}
        />
        <DashboardCard
          title="Total Transaksi"
          content={totalTransaksi.toString()}
          icon={<Repeat className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
