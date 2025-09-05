import {
  getTotalLoans,
  getTotalMembers,
  getTotalSavings,
  getTotalTransactions,
} from "@/app/actions/dashboard-actions";
import { DashboardCard } from "@/components/main/dashboard-card";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import { Landmark, Repeat, Users, Wallet } from "lucide-react";

const DashboardPage = async () => {
  const anggota = await getTotalMembers();
  const simpanan = await getTotalSavings();
  const pinjaman = await getTotalLoans();
  const transaksi = await getTotalTransactions();
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

export default DashboardPage;
