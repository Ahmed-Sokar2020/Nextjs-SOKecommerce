import InfoPageWrapper from "@/components/shared/info-page-wrapper";
import { useTranslations } from "next-intl";

export default function HelpPage() {
  const t = useTranslations("InfoPages.HelpCenter");

  return (
    <InfoPageWrapper title={t("title")}>
      {/* Welcome Section */}
      <section className="space-y-4">
        <p>{t("welcome")}</p>
      </section>

      {/* Orders & Shipping */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("ordersTitle")}
        </h2>
        <p>{t("ordersDesc")}</p>
      </section>

      {/* Returns & Refunds */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("returnsTitle")}
        </h2>
        <p>{t("returnsDesc")}</p>
      </section>

      {/* Account Support */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("accountTitle")}
        </h2>
        <p>{t("accountDesc")}</p>
      </section>

      {/* Contact Support */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("contactTitle")}
        </h2>
        <p>{t("contactDesc")}</p>
      </section>
    </InfoPageWrapper>
  );
}
