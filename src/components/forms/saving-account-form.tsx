"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { savingsAccountSchema } from "@/lib/zod-schema";
import { Member, SavingsAccount, SavingType } from "@/generated/prisma";

export const SavingsAccountForm = ({
  onSubmit,
  saving,
  savingTypes = [],
  members = [],
}: {
  onSubmit: (data: z.infer<typeof savingsAccountSchema>) => void;
  saving?: SavingsAccount;
  savingTypes?: SavingType[];
  members?: Member[];
}) => {
  const form = useForm<z.infer<typeof savingsAccountSchema>>({
    resolver: zodResolver(savingsAccountSchema),
    defaultValues: {
      accountNo: saving?.accountNo || "",
      balance: saving?.balance || 0,
      memberId: saving?.memberId || "",
      savingTypeId: saving?.savingTypeId || "",
      isActive: saving?.isActive ?? true,
    },
  });

  return (
    <Form {...form}>
      <form
        id="savings-account-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-4"
      >
        <div className="space-y-8">
          {/* nomor rekening */}
          <FormField
            control={form.control}
            name="accountNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nomor Rekening <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="SW-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* anggota */}
          <FormField
            control={form.control}
            name="memberId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Anggota <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih anggota" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.memberNo} - {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*  jenis simpanan */}
          <FormField
            control={form.control}
            name="savingTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Jenis Simpanan <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis simpanan" />
                    </SelectTrigger>
                    <SelectContent>
                      {savingTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* saldo awal */}
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Saldo Awal <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* status aktif */}
          {saving && (
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status Aktif</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Aktifkan atau nonaktifkan rekening simpanan
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>
      </form>
    </Form>
  );
};
