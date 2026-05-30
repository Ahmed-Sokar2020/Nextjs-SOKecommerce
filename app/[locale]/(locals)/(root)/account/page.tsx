import BrowsingHistoryList from "@/components/shared/browsing-history-list";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Home, PackageCheckIcon, User } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// 🎯 أفضل ممارسة: توليد الـ Metadata ديناميكياً بناءً على اللغة الحالية للموقع
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Account");
  return {
    title: t("Your Account"),
  };
}

export default async function AccountPage() {
  const t = await getTranslations("Account");

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <h1 className="h1-bold py-4 text-2xl md:text-3xl font-bold text-foreground">
        {t("Your Account")}
      </h1>

      <div className="grid md:grid-cols-3 gap-4 items-stretch">
        {/* 1. Orders Card*/}
        <Card className="hover:border-primary/50 transition-colors duration-200">
          <Link href="/account/orders" className="block h-full">
            <CardContent className="flex items-start gap-4 p-6 h-full">
              <div className="text-primary shrink-0">
                <PackageCheckIcon className="w-12 h-12" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-foreground">
                  {t("Orders")}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("Orders Desc")}
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* 2. Login & security Card*/}
        <Card className="hover:border-primary/50 transition-colors duration-200">
          <Link href="/account/manage" className="block h-full">
            <CardContent className="flex items-start gap-4 p-6 h-full">
              <div className="text-primary shrink-0">
                <User className="w-12 h-12" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-foreground">
                  {t("Login & security")}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("Login Desc")}
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* 3. Addresses Card */}
        <Card className="hover:border-primary/50 transition-colors duration-200">
          <Link href="/account/addresses" className="block h-full">
            <CardContent className="flex items-start gap-4 p-6 h-full">
              <div className="text-primary shrink-0">
                <Home className="w-12 h-12" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-foreground">
                  {t("Addresses")}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("Addresses Desc")}
                </p>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      <BrowsingHistoryList className="mt-16" />
    </div>
  );
}
