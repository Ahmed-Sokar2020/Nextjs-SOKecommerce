import InfoPageWrapper from "@/components/shared/info-page-wrapper";
import { APP_NAME } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function AboutUsPage() {
  const t = useTranslations("InfoPages.AboutUs");

  return (
    <InfoPageWrapper title={t("title", { appName: APP_NAME })}>
      {/* Intro Section */}
      <section className="space-y-4">
        <p>{t("intro", { appName: APP_NAME })}</p>
      </section>

      {/* Our Mission */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("missionTitle")}
        </h2>
        <p>{t("missionDesc")}</p>
      </section>

      {/* What We Offer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("offerTitle")}
        </h2>
        <p>{t("offerDesc")}</p>
      </section>

      {/* Customer Experience */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("experienceTitle")}
        </h2>
        <p>{t("experienceDesc")}</p>
      </section>
    </InfoPageWrapper>
  );
}
