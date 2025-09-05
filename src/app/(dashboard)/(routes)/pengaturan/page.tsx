import { Loader2, Users, Wallet } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getMemberType } from "@/app/actions/member-actions";
import { DataTable } from "@/components/table/data-table";
import { getSavingType } from "@/app/actions/saving-actions";
import { MemberTypeColumns } from "@/app/(dashboard)/(routes)/pengaturan/member-type-columns";
import { SavingTypeColumns } from "@/app/(dashboard)/(routes)/pengaturan/saving-type-columns";
import { SavingTypeButton } from "@/components/buttons/saving-type-button";
import { MemberTypeButton } from "@/components/buttons/member-type-button";
import { Suspense } from "react";

const SettingPageAsync = async () => {
  const [members, savings] = await Promise.all([
    getMemberType(),
    getSavingType(),
  ]);

  return (
    <div className="m-4">
      {/* tabs component */}
      <Tabs defaultValue="member-types">
        <TabsList className="w-[400px] grid grid-cols-2">
          <TabsTrigger value="member-types" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Jenis Anggota
          </TabsTrigger>
          <TabsTrigger value="saving-types" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Jenis Simpanan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="member-types" className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Tabel Jenis Anggota</CardTitle>
              <CardDescription>
                Atur dan kelola berbagai jenis anggota dalam koperasi
              </CardDescription>
              <CardAction>
                <MemberTypeButton />
              </CardAction>
            </CardHeader>
            <CardContent>
              <DataTable data={members.result} columns={MemberTypeColumns} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saving-types" className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Tabel Jenis Simpanan</CardTitle>
              <CardDescription>
                Atur dan kelola berbagai jenis simpanan yang tersedia
              </CardDescription>
              <CardAction>
                <SavingTypeButton />
              </CardAction>
            </CardHeader>
            <CardContent>
              <DataTable data={savings.result} columns={SavingTypeColumns} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SettingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-3/4">
          <Loader2 className="animate-spin size-12 text-primary" />
        </div>
      }
    >
      <SettingPageAsync />
    </Suspense>
  );
};

export default SettingPage;
