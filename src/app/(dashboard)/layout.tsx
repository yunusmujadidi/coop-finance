import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Navbar } from "@/components/main/navbar";
import { Title } from "@/components/main/title";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // check session for page protection
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  if (session?.user.role === "PENDING") {
    redirect("/sign-in");
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <Title />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
