"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserPassword } from "@/lib/actions/user.actions";
import { UserPasswordSchema } from "@/lib/validator";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function PasswordForm() {
  const router = useRouter();
  const t = useTranslations("Account");

  const form = useForm<z.infer<typeof UserPasswordSchema>>({
    resolver: zodResolver(UserPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserPasswordSchema>) {
    const res = await updateUserPassword(values);
    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
    router.push("/account/manage");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full text-start"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-bold">
                {t("Current Password")}
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} className="h-10 text-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-bold">{t("New Password")}</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="h-10 text-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-bold">
                {t("Confirm Password")}
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} className="h-10 text-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full font-semibold h-10 text-sm mt-2"
        >
          {form.formState.isSubmitting ? t("Submitting") : t("Save Changes")}
        </Button>
      </form>
    </Form>
  );
}
