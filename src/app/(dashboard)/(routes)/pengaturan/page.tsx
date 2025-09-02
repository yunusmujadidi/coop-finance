import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SettingButton } from "@/components/buttons/settings-button";
import { DataTable } from "@/app/(dashboard)/(routes)/pengaturan/data-table";
import { columns } from "@/app/(dashboard)/(routes)/pengaturan/columns";
import { getMemberType } from "@/app/actions/member-actions";

const SettingPage = async () => {
  // fetch data
  const data = await getMemberType();
  return (
    <div className="m-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col md:flex-row">
              <div>
                <h1>Tipe Anggota</h1>
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            <p>Kelola tipe anggota koperasi</p>
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingPage;
