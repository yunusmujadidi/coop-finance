import {
  BanknoteArrowUp,
  BookUser,
  CreditCard,
  LayoutDashboard,
  Settings,
  Wallet,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "Selamat datang kembali",
  },
  {
    title: "Simpanan",
    url: "/simpanan",
    icon: Wallet,
    description: "Kelola simpanan anggota koperasi",
  },
  {
    title: "Pinjaman",
    url: "/pinjaman",
    icon: CreditCard,
    description: "Kelola pinjaman anggota koperasi",
  },
  {
    title: "Transaksi",
    url: "/transaksi",
    icon: BanknoteArrowUp,
    description: "Kelola transaksi anggota koperasi",
  },
  {
    title: "Anggota",
    url: "/anggota",
    icon: BookUser,
    description: "Kelola data anggota koperasi",
  },
  {
    title: "Pengaturan",
    url: "/pengaturan",
    icon: Settings,
    description: "Pengaturan aplikasi",
  },
];
