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
import { updateUserName } from "@/lib/actions/user.actions";
import { UserNameSchema } from "@/lib/validator";
import { useTranslations } from "next-intl"; // Import client-side translation hook
import { toast } from "sonner";

export const NameForm = () => {
  const router = useRouter();
  const t = useTranslations("Account"); // Initialize translation hooks
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof UserNameSchema>>({
    resolver: zodResolver(UserNameSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
    },
  });

  // Sync session default values if they load asynchronously after mount
  useEffect(() => {
    if (session?.user?.name) {
      form.reset({ name: session.user.name });
    }
  }, [session?.user?.name, form]);

  async function onSubmit(values: z.infer<typeof UserNameSchema>) {
    const res = await updateUserName(values);
    if (!res.success) return toast.error(res.message);

    const { data, message } = res;
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: data?.name,
      },
    };
    await update(newSession);
    toast(message);
    router.push("/account/manage");
  }

  return (
    <Form {...form}>
      {/* 'text-start' enforces localized text direction matching current locale settings */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full text-start"
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-sm md:text-base">
                  {t("New name")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("Name Placeholder")}
                    {...field}
                    className="input-field h-10 text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full font-semibold h-10 text-sm mt-2 transition-all"
        >
          {form.formState.isSubmitting ? t("Submitting") : t("Save Changes")}
        </Button>
      </form>
    </Form>
  );
};
