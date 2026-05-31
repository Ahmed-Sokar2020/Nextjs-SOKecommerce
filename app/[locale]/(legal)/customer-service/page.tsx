import InfoPageWrapper from "@/components/shared/info-page-wrapper";
import { Clock, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CustomerServicePage() {
  const t = useTranslations("InfoPages.CustomerService");

  return (
    <InfoPageWrapper title={t("title")}>
      <section className="space-y-4">
        <p>{t("description")}</p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {/* Phone Support */}
        <div className="border rounded-2xl p-6 bg-card space-y-4">
          <Phone className="w-8 h-8" />
          <h2 className="text-2xl font-semibold text-foreground">
            {t("phoneSupportTitle")}
          </h2>
          <p>{t("phoneSupportDesc")}</p>
          <p className="text-foreground font-medium" dir="ltr">
            {t("phoneNumber")}
          </p>
        </div>

        {/* Email Support */}
        <div className="border rounded-2xl p-6 bg-card space-y-4">
          <Mail className="w-8 h-8" />
          <h2 className="text-2xl font-semibold text-foreground">
            {t("emailSupportTitle")}
          </h2>
          <p>{t("emailSupportDesc")}</p>
          <p className="text-foreground font-medium">{t("emailAddress")}</p>
        </div>

        {/* Working Hours */}
        <div className="border rounded-2xl p-6 bg-card space-y-4">
          <Clock className="w-8 h-8" />
          <h2 className="text-2xl font-semibold text-foreground">
            {t("workingHoursTitle")}
          </h2>
          <p>{t("workingHoursDesc")}</p>
          <p className="text-foreground font-medium">{t("hours")}</p>
        </div>
      </div>
    </InfoPageWrapper>
  );
}
