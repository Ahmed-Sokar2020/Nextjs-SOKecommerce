"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-200 px-4">
      <div className="flex flex-col items-center text-center gap-6 p-10 rounded-2xl shadow-xl bg-white/70 backdrop-blur-md max-w-md w-full">
        {/* Icon */}
        <div className="p-4 rounded-full bg-red-100">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800">
          404 - {t("Not Found.Page Not Found.Page Not Found")}
        </h1>

        {/* Description */}
        <p className="text-gray-600">
          {t("Not Found.Page Not Found.Description")}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/">
            <Button>{t("Not Found.Go To Home")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
