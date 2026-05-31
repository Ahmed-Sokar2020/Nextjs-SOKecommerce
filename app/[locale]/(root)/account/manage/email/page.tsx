import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { getTranslations } from "next-intl/server";
import { EmailForm } from "./email-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Account");
  return { title: t("Change Your Email") };
}

export default async function EmailPage() {
  const session = await auth();
  const t = await getTranslations("Account");

  return (
    <div className="container mx-auto px-4 max-w-6xl mb-24 space-y-4">
      <SessionProvider session={session}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
          <Link href="/account" className="font-semibold hover:text-primary">
            {t("Your Account")}
          </Link>
          <span className="font-semibold rtl:rotate-180">›</span>
          <Link
            href="/account/manage"
            className="font-semibold hover:text-primary"
          >
            {t("Login & Security")}
          </Link>
          <span className="font-semibold rtl:rotate-180">›</span>
          <span className="font-semibold text-foreground">
            {t("Change Your Email")}
          </span>
        </div>

        <h1 className="h1-bold text-2xl md:text-3xl font-bold text-foreground">
          {t("Change Your Email")}
        </h1>

        <Card className="max-w-2xl border shadow-sm">
          <CardContent className="p-4 md:p-6 flex flex-col gap-4 text-start">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("Change Email Warning")}
            </p>
            <EmailForm />
          </CardContent>
        </Card>
      </SessionProvider>
    </div>
  );
}
