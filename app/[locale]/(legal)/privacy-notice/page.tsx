import InfoPageWrapper from "@/components/shared/info-page-wrapper";
import { APP_NAME } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function PrivacyNoticePage() {
  const t = useTranslations("InfoPages.PrivacyNotice");

  return (
    <InfoPageWrapper title={t("title")}>
      {/* Intro Section */}
      <section className="space-y-4">
        <p>{t("intro", { appName: APP_NAME })}</p>
      </section>

      {/* Information We Collect */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("collectTitle")}
        </h2>
        <p>{t("collectDesc")}</p>
      </section>

      {/* How We Use Your Information */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("useTitle")}
        </h2>
        <p>{t("useDesc")}</p>
      </section>

      {/* Data Security */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("securityTitle")}
        </h2>
        <p>{t("securityDesc")}</p>
      </section>

      {/* Contact Us */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("contactTitle")}
        </h2>
        <p>{t("contactDesc")}</p>
      </section>
    </InfoPageWrapper>
  );
}
