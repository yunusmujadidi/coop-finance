import { BookUser, CreditCard, LayoutDashboard, Wallet } from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Simpanan",
    url: "/simpanan",
    icon: Wallet,
  },
  {
    title: "Pinjaman",
    url: "/pinjaman",
    icon: CreditCard,
  },
  {
    title: "Anggota",
    url: "/anggota",
    icon: BookUser,
  },
];
