import InfoPageWrapper from "@/components/shared/info-page-wrapper";

export default function HelpPage() {
  return (
    <InfoPageWrapper title="Help Center">
      <section className="space-y-4">
        <p>
          Welcome to our Help Center. Find answers to common questions and
          support resources below.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Orders & Shipping
        </h2>

        <p>
          Track orders, view shipping updates, and learn more about delivery
          timelines.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Returns & Refunds
        </h2>

        <p>
          Learn about return eligibility, refund requests, and replacement
          procedures.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Account Support
        </h2>

        <p>
          Manage account settings, update personal information, and reset
          passwords securely.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Contact Support
        </h2>

        <p>Need additional help? Our support team is available anytime.</p>
      </section>
    </InfoPageWrapper>
  );
}
