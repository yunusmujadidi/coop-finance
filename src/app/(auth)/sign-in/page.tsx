import { SignInForm } from "@/components/forms/signin-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const SignInPage = () => {
  return (
    // container
    <div className="min-h-screen bg-background">
      <div className="p-2 m-2 h-screen w-full flex flex-col items-center justify-center space-y-4">
        {/* logo */}
        <div className="text-center text-3xl font-bold">
          Unit Simpan Pinjam <br />
          <span className="text-primary">Permata Barokah Sejahtera</span>
        </div>
        {/* content */}
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              <div className="text-2xl">Login untuk melanjutkan</div>
            </CardTitle>
            <CardDescription>
              Silahkan isi form berikut untuk login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
          <CardFooter>
            <div>
              Belum punya akun?
              <Link href="/sign-up">
                <Button className="cursor-pointer" variant="link">
                  Daftar
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
