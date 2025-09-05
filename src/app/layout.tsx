import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SheetProvider } from "@/providers/sheet-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { getMembers, getMemberType } from "@/app/actions/member-actions";
import { getSavingType, getSavings } from "@/app/actions/saving-actions";
import { getLoans } from "@/app/actions/loan-action";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Coop",
  description: "Cooperative Finance App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [members, memberTypes, savingTypes, loans, savings] = await Promise.all([
    getMembers(),
    getMemberType(),
    getSavingType(),
    getLoans(),
    getSavings(),
  ]);

  return (
    <html suppressHydrationWarning lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster />
          <SheetProvider
            memberTypes={memberTypes.result}
            savingTypes={savingTypes.result}
            members={members.result}
          />
          <ModalProvider
            members={members.result}
            loans={loans.result}
            savings={savings.result}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
