import InfoPageWrapper from "@/components/shared/info-page-wrapper";
import { APP_NAME } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function ConditionsOfUsePage() {
  const t = useTranslations("InfoPages.ConditionsOfUse");

  return (
    <InfoPageWrapper title={t("title")}>
      {/* Welcome Section */}
      <section className="space-y-4">
        <p>{t("welcome", { appName: APP_NAME })}</p>
      </section>

      {/* Account Responsibilities */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("accountTitle")}
        </h2>
        <p>{t("accountDesc")}</p>
      </section>

      {/* Product Information */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("productTitle")}
        </h2>
        <p>{t("productDesc")}</p>
      </section>

      {/* Prohibited Activities */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("prohibitedTitle")}
        </h2>
        <p>{t("prohibitedDesc")}</p>
      </section>

      {/* Changes to Terms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("changesTitle")}
        </h2>
        <p>{t("changesDesc")}</p>
      </section>
    </InfoPageWrapper>
  );
}
