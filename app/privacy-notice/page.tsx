import InfoPageWrapper from "@/components/shared/info-page-wrapper";
import { APP_NAME } from "@/lib/constants";

export default function PrivacyNoticePage() {
  return (
    <InfoPageWrapper title="Privacy Notice">
      <section className="space-y-4">
        <p>
          {APP_NAME} respects your privacy and is committed to protecting your
          personal information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Information We Collect
        </h2>

        <p>
          We may collect personal information such as your name, email address,
          shipping details, and payment information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          How We Use Your Information
        </h2>

        <p>
          Your information helps us process orders, improve user experience,
          provide support, and enhance our services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Data Security
        </h2>

        <p>
          We implement modern security measures to protect your data against
          unauthorized access or misuse.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>

        <p>
          If you have questions regarding our privacy practices, please contact
          our support team.
        </p>
      </section>
    </InfoPageWrapper>
  );
}
