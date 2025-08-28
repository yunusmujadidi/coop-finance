import { SignUpForm } from "@/components/forms/signup-form";
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

const SignUpPage = () => {
  return (
    // container
    <div className="min-h-screen bg-background">
      <div className="h-screen w-full flex flex-col items-center justify-center space-y-4">
        {/* logo */}
        <div className="text-center text-3xl font-bold">
          Unit Simpan Pinjam <br />
          <span className="text-primary">Permata Barokah Sejahtera</span>
        </div>
        {/* content */}
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              <div className="text-2xl"> Daftar untuk masuk ke aplikasi</div>
            </CardTitle>
            <CardDescription>
              Silahkan isi form berikut untuk mendaftar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
          <CardFooter>
            <div>
              Sudah punya akun?
              <Link href="/sign-in">
                <Button className="cursor-pointer" variant="link">
                  Login
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
