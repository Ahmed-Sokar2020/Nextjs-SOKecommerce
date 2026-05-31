import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { APP_NAME } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import { NameForm } from "./name-form";

// Generate localized page tab title dynamically based on the current locale
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Account");
  return {
    title: t("Change Your Name"),
  };
}

export default async function NamePage() {
  const session = await auth();
  const t = await getTranslations("Account");

  return (
    <div className="container mx-auto px-4 max-w-6xl mb-24 space-y-4">
      <SessionProvider session={session}>
        {/* 1. Fully localized breadcrumbs handling RTL direction shifts */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
          <Link
            href="/account"
            className="font-semibold hover:text-primary transition-colors"
          >
            {t("Your Account")}
          </Link>
          <span className="font-semibold rtl:rotate-180">›</span>
          <Link
            href="/account/manage"
            className="font-semibold hover:text-primary transition-colors"
          >
            {t("Login & Security")}
          </Link>
          <span className="font-semibold rtl:rotate-180">›</span>
          <span className="font-semibold text-foreground">
            {t("Change Your Name")}
          </span>
        </div>

        {/* 2. Page Title Header */}
        <h1 className="h1-bold text-2xl md:text-3xl font-bold text-foreground">
          {t("Change Your Name")}
        </h1>

        {/* 3. Form Content Container Wrapper */}
        <Card className="max-w-2xl border shadow-sm">
          <CardContent className="p-4 md:p-6 flex flex-col gap-4 text-start">
            {/* Labeled explanation block passing APP_NAME as a dynamic variable template parameter */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("Change Name Warning", { appName: APP_NAME })}
            </p>

            {/* Underlying Client side sub-component rendering form controls */}
            <NameForm />
          </CardContent>
        </Card>
      </SessionProvider>
    </div>
  );
}
