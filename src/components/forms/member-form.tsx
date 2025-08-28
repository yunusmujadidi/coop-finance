"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memberSchema } from "@/lib/zod-schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const MemberForm = () => {
  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      memberNo: "",
      name: "",
      address: "",
      gender: "MALE" as const,
      nationalId: "",
      birthPlace: "",
      birthDate: new Date(),
      phone: "",
      job: "",
      memberTypeId: "",
      isActive: true,
    },
  });

  const onSubmit = (values: z.infer<typeof memberSchema>) => {
    console.log(values);
  };

  return (
    <div className="gap-6 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
