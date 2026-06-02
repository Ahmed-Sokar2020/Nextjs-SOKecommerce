import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { getTranslations } from "next-intl/server";

// Dynamic metadata generation supporting both AR and EN contexts
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Account");
  return {
    title: t("Login & Security"),
  };
}

export default async function ProfilePage() {
  const session = await auth();
  const t = await getTranslations("Account");

  return (
    <div className="container mx-auto px-4 max-w-6xl mb-24 space-y-4">
      <SessionProvider session={session}>
        {/* 1. Breadcrumbs Navigation with support for RTL inversion */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
          <Link
            href="/account"
            className="font-semibold hover:text-primary transition-colors"
          >
            {t("Your Account")}
          </Link>
          <span className="font-semibold rtl:rotate-180">›</span>
          <span className="font-semibold text-foreground">
            {t("Login & Security")}
          </span>
        </div>

        {/* 2. Page Header Title */}
        <h1 className="h1-bold text-2xl md:text-3xl font-bold text-foreground">
          {t("Login & Security")}
        </h1>

        {/* 3. Main Data Card Configuration */}
        <Card className="max-w-2xl border shadow-sm">
          {/* Row A: User Display Name Context */}
          <CardContent className="p-4 flex items-center justify-between flex-wrap gap-4 text-start">
            <div className="space-y-1">
              <h3 className="font-bold text-foreground text-sm md:text-base">
                {t("Name")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {session?.user?.name}
              </p>
            </div>
            <div>
              <Link href="/account/manage/name">
                <Button
                  className="rounded-full w-32 font-semibold text-sm h-9"
                  variant="outline"
                >
                  {t("Edit")}
                </Button>
              </Link>
            </div>
          </CardContent>
          <Separator />

          {/* Row B: Contact Information Context */}
          <CardContent className="p-4 flex items-center justify-between flex-wrap gap-4 text-start">
            <div className="space-y-1">
              <h3 className="font-bold text-foreground text-sm md:text-base">
                {t("Email")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
            <div>
              <Link href="/account/manage/email">
                <Button
                  className="rounded-full w-32 font-semibold text-sm h-9"
                  variant="outline"
                >
                  {t("Edit")}
                </Button>
              </Link>
            </div>
          </CardContent>
          <Separator />

          {/* Row C: Authentication Password Security Context */}
          <CardContent className="p-4 flex items-center justify-between flex-wrap gap-4 text-start">
            <div className="space-y-1">
              <h3 className="font-bold text-foreground text-sm md:text-base">
                {t("Password")}
              </h3>
              <p className="text-sm tracking-widest text-muted-foreground">
                ************
              </p>
            </div>
            <div>
              <Link href="/account/manage/password">
                <Button
                  className="rounded-full w-32 font-semibold text-sm h-9"
                  variant="outline"
                >
                  {t("Edit")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </SessionProvider>
    </div>
  );
}
