import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MemberForm } from "@/components/forms/member-form";
import { Button } from "@/components/ui/button";

export const MemberSheet = () => {
  return (
    <Sheet open>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Buat Member Baru</SheetTitle>
          <SheetDescription>
            Isi form berikut untuk menambahkan member baru
          </SheetDescription>
        </SheetHeader>
        <MemberForm />
        <SheetFooter>
          <Button type="submit" form="proposal-form">
            "Buat Proposal"
          </Button>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Tutup
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
