"use client";

import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAddressSchema } from "@/lib/validator";
import { IUserAddressFormValues } from "@/types";
import { Loader2 } from "lucide-react";

interface AddressFormProps {
  initialData?: IUserAddressFormValues & { _id?: string };
  actionSubmit: (
    values: IUserAddressFormValues,
  ) => Promise<{ success: boolean; message: string }>;
}

export default function AddressForm({
  initialData,
  actionSubmit,
}: AddressFormProps) {
  const t = useTranslations("Account.AccountAddresses");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<IUserAddressFormValues>({
    resolver: zodResolver(UserAddressSchema),
    defaultValues: initialData || {
      fullName: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      isDefault: false,
    },
  });

  const onSubmit = async (values: IUserAddressFormValues) => {
    startTransition(async () => {
      const res = await actionSubmit(values);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      router.refresh();
      router.push("/account/addresses");
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-start max-w-xl"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Full Name")}</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder={t("Enter full name")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Street Address")}</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder={t("Street address or POBox")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("City")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder={t("City")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("State / Region")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder={t("State / Region")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Postal Code")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder={t("Postal Code")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Phone Number")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder={t("Phone Number")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm rtl:space-x-reverse">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{t("Set as default address")}</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-2">
          <Button
            type="submit"
            className="w-32 font-semibold"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              t("Save")
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-32 font-semibold"
            disabled={isPending}
            onClick={() => router.push("/account/addresses")}
          >
            {t("Cancel")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
