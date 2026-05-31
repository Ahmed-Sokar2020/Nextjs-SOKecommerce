import InfoPageWrapper from "@/components/shared/info-page-wrapper";
import { APP_NAME } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function ReturnsPolicyPage() {
  const t = useTranslations("InfoPages.ReturnsPolicy");

  return (
    <InfoPageWrapper title={t("title")}>
      {/* Intro */}
      <section className="space-y-4">
        <p>{t("intro", { appName: APP_NAME })}</p>
      </section>

      {/* 1. Return Eligibility */}
      <section className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("eligibilityTitle")}
        </h2>
        <p className="text-muted-foreground">{t("eligibilityDesc")}</p>
        <ul className="list-disc list-inside space-y-2 pl-4 rtl:pl-0 rtl:pr-4">
          <li>{t("cond1")}</li>
          <li>{t("cond2")}</li>
          <li>{t("cond3")}</li>
        </ul>
      </section>

      {/* 2. Non-Returnable Items */}
      <section className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("nonReturnableTitle")}
        </h2>
        <p className="text-muted-foreground">{t("nonReturnableDesc")}</p>
        <ul className="list-disc list-inside space-y-2 pl-4 rtl:pl-0 rtl:pr-4">
          <li>{t("item1")}</li>
          <li>{t("item2")}</li>
          <li>{t("item3")}</li>
        </ul>
      </section>

      {/* 3. Return Process */}
      <section className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("processTitle")}
        </h2>
        <p className="text-muted-foreground">{t("processDesc")}</p>
        <ol className="list-decimal list-inside space-y-2 pl-4 rtl:pl-0 rtl:pr-4">
          <li>{t("step1")}</li>
          <li>{t("step2")}</li>
          <li>{t("step3")}</li>
        </ol>
      </section>

      {/* 4. Refunds Timeline */}
      <section className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold text-foreground">
          {t("refundsTitle")}
        </h2>
        <p>{t("refundsDesc")}</p>
      </section>
    </InfoPageWrapper>
  );
}
