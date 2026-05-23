"use client"; // لضمان عمل النموذج (Form) بشكل تفاعلي

import InfoPageWrapper from "@/components/shared/info-page-wrapper";
import { Button } from "@/components/ui/button"; // افترضت وجود Shadcn UI
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactUsPage() {
  const t = useTranslations("InfoPages.ContactUs");
  const tCommon = useTranslations("InfoPages.CustomerService"); // سنعيد استخدام بيانات الهاتف من الصفحة السابقة

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("successMessage"));
  };

  return (
    <InfoPageWrapper title={t("title")}>
      <div className="grid gap-12 md:grid-cols-2">
        {/* قسم معلومات الاتصال */}
        <div className="space-y-8">
          <p className="text-lg text-muted-foreground">{t("intro")}</p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">
                  {tCommon("phoneSupportTitle")}
                </h3>
                <p dir="ltr" className="text-muted-foreground">
                  {tCommon("phoneNumber")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">
                  {tCommon("emailSupportTitle")}
                </h3>
                <p className="text-muted-foreground">
                  {tCommon("emailAddress")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">{t("officeTitle")}</h3>
                <p className="text-muted-foreground">{t("address")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* نموذج الاتصال */}
        <form
          onSubmit={handleSubmit}
          className="p-8 border rounded-2xl bg-card space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("formName")}</label>
            <Input placeholder="John Doe" required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("formEmail")}</label>
            <Input type="email" placeholder="example@mail.com" required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("formSubject")}</label>
            <Input placeholder={t("formSubject")} required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("formMessage")}</label>
            <Textarea
              placeholder={t("formMessage")}
              className="min-h-[120px]"
              required
            />
          </div>

          <Button type="submit" className="w-full gap-2">
            <Send className="w-4 h-4" />
            {t("formSubmit")}
          </Button>
        </form>
      </div>
    </InfoPageWrapper>
  );
}
