import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation"; // 2. Use localized Link
import { getOrderById } from "@/lib/actions/order.actions";
import { getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";
import ConfettiEffect from "./ConfettiEffect";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function SuccessPage(props: {
  params: Promise<{ id: string; locale: string }>; // Added locale
  searchParams: Promise<{ payment_intent: string }>;
}) {
  const { id } = await props.params;
  const { payment_intent } = await props.searchParams;

  const order = await getOrderById(id);
  if (!order) notFound();

  // Stripe check
  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order._id.toString()
  ) {
    return notFound();
  }

  const isSuccess = paymentIntent.status === "succeeded";
  if (!isSuccess) return redirect(`/checkout/${id}`);

  const t = await getTranslations("Success");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <ConfettiEffect />
      <div className="max-w-2xl w-full text-center space-y-8 relative">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full"></div>

        <div className="flex justify-center">
          <div className="bg-green-100 text-green-600 rounded-full p-6 shadow-lg animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white">
          {t("title")} {/* 🎉 Payment Successful! */}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t("message")} {/* Thank you for your purchase! */}
        </p>

        <div className="bg-muted/50 border rounded-xl p-4 text-sm text-gray-600 dark:text-gray-300 text-center">
          📦 {t("processing")}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Use localized Link from @/i18n/navigation */}
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={`/account/orders/${id}`}>{t("viewOrder")}</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/">{t("continueShopping")}</Link>
          </Button>
        </div>

        <p className="text-xs text-gray-400">{t("help")}</p>
      </div>
    </div>
  );
}
