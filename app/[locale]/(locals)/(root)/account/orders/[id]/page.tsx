// import { auth } from "@/auth";
// import OrderDetailsForm from "@/components/shared/order/order-details-form";
// import { Link } from "@/i18n/navigation";
// import { getOrderById } from "@/lib/actions/order.actions";
// import { formatId } from "@/lib/utils";
// import { notFound } from "next/navigation";

// export async function generateMetadata(props: {
//   params: Promise<{ id: string }>;
// }) {
//   const params = await props.params;

//   return {
//     title: `Order ${formatId(params.id)}`,
//   };
// }

// export default async function OrderDetailsPage(props: {
//   params: Promise<{
//     id: string;
//   }>;
// }) {
//   const params = await props.params;

//   const { id } = params;

//   const order = await getOrderById(id);
//   if (!order) notFound();

//   const session = await auth();

//   return (
//     <>
//       <div className="flex gap-2">
//         <Link href="/account">Your Account</Link>
//         <span>›</span>
//         <Link href="/account/orders">Your Orders</Link>
//         <span>›</span>
//         <span>Order {formatId(order._id.toString())}</span>
//       </div>
//       <h1 className="h1-bold py-4">Order {formatId(order._id.toString())}</h1>
//       <OrderDetailsForm
//         order={order}
//         isAdmin={session?.user?.role === "Admin" || false}
//       />
//     </>
//   );
// }

import { auth } from "@/auth";
import OrderDetailsForm from "@/components/shared/order/order-details-form";
import { Link } from "@/i18n/navigation";
import { getOrderById } from "@/lib/actions/order.actions";
import { formatId } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

// 🎯 توليد الـ Metadata ديناميكياً ومعرباً لعنوان تصفح الصفحة
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const t = await getTranslations("Account");

  return {
    title: `${t("Order")} ${formatId(params.id)}`,
  };
}

export default async function OrderDetailsPage(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const params = await props.params;
  const { id } = params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();
  const t = await getTranslations("Account");

  return (
    <div className="container mx-auto px-4 max-w-6xl space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
        <Link
          href="/account"
          className="font-semibold hover:text-primary transition-colors"
        >
          {t("Your Account")}
        </Link>
        <span className="font-semibold rtl:rotate-180">›</span>
        <Link
          href="/account/orders"
          className="font-semibold hover:text-primary transition-colors"
        >
          {t("Your Orders")}
        </Link>
        <span className="font-semibold rtl:rotate-180">›</span>
        <span className="font-semibold text-foreground">
          {t("Order")} {formatId(order._id.toString())}
        </span>
      </div>

      <h1 className="h1-bold text-2xl md:text-3xl font-bold text-foreground py-2">
        {t("Order")} {formatId(order._id.toString())}
      </h1>

      {/* 3. فورم تفاصيل وأكشنات الطلب */}
      <OrderDetailsForm
        order={order}
        isAdmin={session?.user?.role === "Admin" || false}
      />
    </div>
  );
}
