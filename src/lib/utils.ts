import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// format number to rupiah currency
export function formatRupiah(amount: number | string): string {
  const num =
    typeof amount === "string"
      ? parseInt(amount.replace(/\D/g, "")) || 0
      : amount;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

// parse rupiah string back to number
export function parseRupiah(value: string): number {
  return parseInt(value.replace(/\D/g, "")) || 0;
}

// get status badge color
export const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return { label: "Menunggu", variant: "secondary" as const };
    case "APPROVED":
      return { label: "Disetujui", variant: "default" as const };
    case "ACTIVE":
      return { label: "Aktif", variant: "default" as const };
    case "COMPLETED":
      return { label: "Lunas", variant: "default" as const };
    case "DEFAULTED":
      return { label: "Bermasalah", variant: "destructive" as const };
    default:
      return { label: status, variant: "secondary" as const };
  }
};
