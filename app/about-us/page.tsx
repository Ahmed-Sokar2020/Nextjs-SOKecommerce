import InfoPageWrapper from "@/components/shared/info-page-wrapper";
import { APP_NAME } from "@/lib/constants";

export default function AboutUsPage() {
  return (
    <InfoPageWrapper title={`About ${APP_NAME}`}>
      <section className="space-y-4">
        <p>
          {APP_NAME} is a modern e-commerce platform focused on delivering a
          fast, secure, and enjoyable shopping experience.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>

        <p>
          Our mission is to connect customers with high-quality products through
          a reliable and user-friendly marketplace.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          What We Offer
        </h2>

        <p>
          We provide a wide range of products including fashion, electronics,
          accessories, and more.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Customer Experience
        </h2>

        <p>
          We prioritize customer satisfaction through responsive support, secure
          payments, and a seamless shopping journey.
        </p>
      </section>
    </InfoPageWrapper>
  );
}
