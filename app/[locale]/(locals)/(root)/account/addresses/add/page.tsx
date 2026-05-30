import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AddressForm from "../_components/address-form";
// 🎯 Import your real database action here
import { addNewAddressAction } from "@/lib/actions/address.actions";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Account.AccountAddresses");
  return { title: t("Add New Address") };
}

export default async function AddAddressPage() {
  const t = await getTranslations("Account.AccountAddresses");

  return (
    <div className="container mx-auto px-4 max-w-6xl mb-24 space-y-6">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
        <Link href="/account" className="font-semibold hover:text-primary">
          {t("Your Account")}
        </Link>
        <span className="font-semibold rtl:rotate-180">›</span>
        <Link
          href="/account/addresses"
          className="font-semibold hover:text-primary"
        >
          {t("Your Addresses")}
        </Link>
        <span className="font-semibold rtl:rotate-180">›</span>
        <span className="font-semibold text-foreground">
          {t("Add Address")}
        </span>
      </div>

      <h1 className="h1-bold text-2xl md:text-3xl font-bold text-foreground text-start">
        {t("Add New Address")}
      </h1>

      {/* 🎯 Pass the live mongoose server action directly into the form */}
      <AddressForm actionSubmit={addNewAddressAction} />
    </div>
  );
}
