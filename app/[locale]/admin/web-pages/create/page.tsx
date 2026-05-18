import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import WebPageForm from "../web-page-form";

export const metadata: Metadata = {
  title: "Create WebPage",
};

export default function CreateWebPagePage() {
  const t = useTranslations("Admin");

  return (
    <main>
      <div className="flex mb-4">
        <Link href="/admin/web-pages">{t("Web Pages")}</Link>
        <span className="mx-1">›</span>
        <Link href="/admin/web-pages/create">
          {t("AdminWepPages.Create Web Page")}
        </Link>
      </div>
      <div className="my-8">
        <WebPageForm type="Create" />
      </div>
    </main>
  );
}
