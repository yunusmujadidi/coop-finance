"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { memberTypeSchema } from "@/lib/zod-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const MemberTypeForm = ({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof memberTypeSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof memberTypeSchema>>({
    resolver: zodResolver(memberTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form
        id="member-type-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-4"
      >
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Jenis Anggota <span className="text-red-800">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Karyawan Kontrak" {...field} />
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
