import { Navbar } from "@/components/main/navbar";
import { Title } from "@/components/main/title";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
