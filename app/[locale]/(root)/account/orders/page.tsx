import { Link } from "@/i18n/navigation";
import { Metadata } from "next";

import BrowsingHistoryList from "@/components/shared/browsing-history-list";
import Pagination from "@/components/shared/pagination";
import ProductPrice from "@/components/shared/product/product-price";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyOrders } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/db/models/order.model";
import { formatDateTime, formatId } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Account");
  return {
    title: t("Your Orders"),
  };
}

export default async function OrdersPage(props: {
  searchParams: Promise<{ page: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const orders = await getMyOrders({
    page,
  });

  const t = await getTranslations("Account");

  return (
    <div className="container mx-auto px-4 max-w-6xl space-y-4">
      {/* 1. شريط التنقل Breadcrumbs المعرب والديناميكي */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
        <Link
          href="/account"
          className="font-semibold hover:text-primary transition-colors"
        >
          {t("Your Account")}
        </Link>
        <span className="font-semibold rtl:rotate-180">›</span>
        <span className="font-semibold text-foreground">
          {t("Your Orders")}
        </span>
      </div>

      <h1 className="h1-bold text-2xl md:text-3xl font-bold text-foreground">
        {t("Your Orders")}
      </h1>

      {/* 2. جدول الطلبات المستجيب */}
      <div className="overflow-x-auto rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-start">
                {t("Id")}
              </TableHead>
              <TableHead className="font-semibold text-start">
                {t("Date")}
              </TableHead>
              <TableHead className="font-semibold text-start">
                {t("Total")}
              </TableHead>
              <TableHead className="font-semibold text-start">
                {t("Paid")}
              </TableHead>
              <TableHead className="font-semibold text-start">
                {t("Delivered")}
              </TableHead>
              <TableHead className="font-semibold text-start">
                {t("Actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  {t("No Orders")}
                </TableCell>
              </TableRow>
            )}

            {orders.data.map((order: IOrder) => (
              <TableRow
                key={order._id.toString()}
                className="hover:bg-accent/40"
              >
                <TableCell className="font-medium">
                  <Link
                    href={`/account/orders/${order._id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {formatId(order._id.toString())}
                  </Link>
                </TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt!).dateTime}
                </TableCell>
                <TableCell>
                  <ProductPrice price={order.totalPrice} plain />
                </TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : t("No")}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : t("No")}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/account/orders/${order._id}`}
                    className="inline-flex items-center justify-center text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 transition-colors"
                  >
                    {t("Details")}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 3. قواسم الصفحات الإضافية */}
      {orders.totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination page={page} totalPages={orders.totalPages} />
        </div>
      )}

      {/* عرض مكون تاريخ التصفح المستقر */}
      <BrowsingHistoryList className="mt-16" />
    </div>
  );
}
