// import InfoPageWrapper from "@/components/shared/info-page-wrapper";
// import { APP_NAME } from "@/lib/constants";

// export default function ConditionsOfUsePage() {
//   return (
//     <InfoPageWrapper title="Conditions of Use">
//       <section className="space-y-4">
//         <p>
//           Welcome to {APP_NAME}. By accessing or using our platform, you agree
//           to comply with these Conditions of Use.
//         </p>
//       </section>

//       <section className="space-y-4">
//         <h2 className="text-2xl font-semibold text-foreground">
//           Account Responsibilities
//         </h2>

//         <p>
//           Users are responsible for maintaining the confidentiality of their
//           account credentials and all activities performed under their account.
//         </p>
//       </section>

//       <section className="space-y-4">
//         <h2 className="text-2xl font-semibold text-foreground">
//           Product Information
//         </h2>

//         <p>
//           We strive to ensure that product descriptions, pricing, and images are
//           accurate. However, errors may occasionally occur.
//         </p>
//       </section>

//       <section className="space-y-4">
//         <h2 className="text-2xl font-semibold text-foreground">
//           Prohibited Activities
//         </h2>

//         <p>
//           Users may not misuse the platform, attempt unauthorized access, or
//           interfere with website operations.
//         </p>
//       </section>

//       <section className="space-y-4">
//         <h2 className="text-2xl font-semibold text-foreground">
//           Changes to Terms
//         </h2>

//         <p>We reserve the right to update these terms at any time.</p>
//       </section>
//     </InfoPageWrapper>
//   );
// }

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
