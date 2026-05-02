import InfoPageWrapper from "@/components/shared/info-page-wrapper";
import { Clock, Mail, Phone } from "lucide-react";

export default function CustomerServicePage() {
  return (
    <InfoPageWrapper title="Customer Service">
      <section className="space-y-4">
        <p>
          Our Customer Service team is dedicated to providing a smooth, secure,
          and enjoyable shopping experience.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <div className="border rounded-2xl p-6 bg-card space-y-4">
          <Phone className="w-8 h-8" />

          <h2 className="text-2xl font-semibold text-foreground">
            Phone Support
          </h2>

          <p>
            Contact our support team for assistance with orders, shipping,
            returns, or account issues.
          </p>

          <p className="text-foreground font-medium">+20 121 020 3040</p>
        </div>

        <div className="border rounded-2xl p-6 bg-card space-y-4">
          <Mail className="w-8 h-8" />

          <h2 className="text-2xl font-semibold text-foreground">
            Email Support
          </h2>

          <p>
            Reach out anytime through email and our team will respond as quickly
            as possible.
          </p>

          <p className="text-foreground font-medium">support@example.com</p>
        </div>

        <div className="border rounded-2xl p-6 bg-card space-y-4">
          <Clock className="w-8 h-8" />

          <h2 className="text-2xl font-semibold text-foreground">
            Working Hours
          </h2>

          <p>Our support team is available 7 days a week.</p>

          <p className="text-foreground font-medium">
            9:00 AM - 9:00 PM (GMT+2)
          </p>
        </div>
      </div>
    </InfoPageWrapper>
  );
}
