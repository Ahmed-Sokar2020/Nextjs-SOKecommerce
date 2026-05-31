"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
import { updateUserEmail } from "@/lib/actions/user.actions";
import { UserEmailSchema } from "@/lib/validator";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function EmailForm() {
  const router = useRouter();
  const t = useTranslations("Account");
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof UserEmailSchema>>({
    resolver: zodResolver(UserEmailSchema),
    defaultValues: { email: session?.user?.email ?? "" },
  });

  useEffect(() => {
    if (session?.user?.email) form.reset({ email: session.user.email });
  }, [session?.user?.email, form]);

  async function onSubmit(values: z.infer<typeof UserEmailSchema>) {
    const res = await updateUserEmail(values);
    if (!res.success) return toast.error(res.message);

    const { data, message } = res;

    const newSession = {
      ...session,
      user: {
        ...session?.user,
        email: data?.email, // This will now map perfectly to updatedUser.email
      },
    };

    await update(newSession);
    toast.success(message);

    // Force server component layout trees to invalidate their cache
    router.refresh();
    router.push("/account/manage");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full text-start"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-bold">{t("New Email")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("Email Placeholder")}
                  {...field}
                  className="h-10 text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full font-semibold h-10 text-sm"
        >
          {form.formState.isSubmitting ? t("Submitting") : t("Save Changes")}
        </Button>
      </form>
    </Form>
  );
}
