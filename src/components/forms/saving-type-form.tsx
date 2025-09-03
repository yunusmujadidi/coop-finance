"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { savingType } from "@/lib/zod-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SavingType } from "@/generated/prisma";

export const SavingTypeForm = ({
  onSubmit,
  savingType: savingTypeData,
}: {
  onSubmit: (data: z.infer<typeof savingType>) => void;
  savingType?: SavingType;
}) => {
  const form = useForm<z.infer<typeof savingType>>({
    resolver: zodResolver(savingType),
    defaultValues: {
      name: savingTypeData?.name || "",
    },
  });

  return (
    <Form {...form}>
      <form
        id="saving-type-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-4"
      >
        {/* nama simpanan */}
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Jenis Simpanan <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Simpanan Wajib" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
