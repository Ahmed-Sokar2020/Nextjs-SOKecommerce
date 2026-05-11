import Logo from "@/components/shared/logo";
import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Checkout");
  return (
    <div className="p-4">
      <header className="bg-card mb-4 pb-4 border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Logo />

          <div>
            <h1 className="text-3xl">{t("Checkout")}</h1>
          </div>

          <div>
            <Link href="/help">
              <HelpCircle className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
