import InfoPageWrapper from "@/components/shared/info-page-wrapper";
import { APP_NAME } from "@/lib/constants";

export default function ConditionsOfUsePage() {
  return (
    <InfoPageWrapper title="Conditions of Use">
      <section className="space-y-4">
        <p>
          Welcome to {APP_NAME}. By accessing or using our platform, you agree
          to comply with these Conditions of Use.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Account Responsibilities
        </h2>

        <p>
          Users are responsible for maintaining the confidentiality of their
          account credentials and all activities performed under their account.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Product Information
        </h2>

        <p>
          We strive to ensure that product descriptions, pricing, and images are
          accurate. However, errors may occasionally occur.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Prohibited Activities
        </h2>

        <p>
          Users may not misuse the platform, attempt unauthorized access, or
          interfere with website operations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Changes to Terms
        </h2>

        <p>We reserve the right to update these terms at any time.</p>
      </section>
    </InfoPageWrapper>
  );
}
