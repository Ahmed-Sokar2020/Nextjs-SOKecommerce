/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/db/models/user.model";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
export default async function AddressesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  await connectToDatabase();
  const dbUser = await User.findById(session.user.id).lean();

  if (!dbUser) redirect("/sign-in");

  const t = await getTranslations("Account.AccountAddresses");

  // 🎯 FIX: Convert complex Mongoose objects into clean browser-safe text strings
  const rawAddresses = (dbUser as any).addresses || [];
  const addresses = rawAddresses.map((address: any) => ({
    ...address,
    _id: address._id?.toString() || "", // Safely force conversion to plain string text
  }));

  return (
    <div className="container mx-auto px-4 max-w-6xl mb-24 space-y-6">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
        <Link
          href="/account"
          className="font-semibold hover:text-primary transition-colors"
        >
          {t("Your Account")}
        </Link>
        <span className="font-semibold rtl:rotate-180">›</span>
        <span className="font-semibold text-foreground">
          {t("Your Addresses")}
        </span>
      </div>

      {/* Top Header Title Grid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <h1 className="h1-bold text-2xl md:text-3xl font-bold text-foreground">
          {t("Your Addresses")}
        </h1>
        <Link href="/account/addresses/add">
          <Button className="rounded-full font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {t("Add Address")}
          </Button>
        </Link>
      </div>

      {/* Addresses Interactive View Blocks */}
      {addresses.length === 0 ? (
        <Card className="border-dashed py-12 text-center shadow-sm">
          <CardContent className="flex flex-col items-center justify-center space-y-3">
            <p className="text-muted-foreground text-sm">
              {t("No addresses saved yet")}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address: any) => (
            // 🎯 Now the key prop receives a clean string identifier and resolves perfectly!
            <Card
              key={address._id}
              className="border shadow-sm flex flex-col justify-between"
            >
              <CardContent className="p-5 space-y-2 text-start relative">
                {address.isDefault && (
                  <span className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                    {t("Default")}
                  </span>
                )}
                <h3 className="font-bold text-foreground text-base pt-2">
                  {address.fullName}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {address.streetAddress}, {address.city}, {address.state}{" "}
                  {address.postalCode}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("Phone")}: {address.phone}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t mt-4">
                  <Link
                    href={`/account/addresses/edit/${address._id}`}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    {t("Edit")}
                  </Link>
                  <span className="text-muted-foreground/40">|</span>
                  <button className="text-sm font-semibold text-destructive hover:underline">
                    {t("Remove")}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
