"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/lib/db/models/order.model";
import { cn, formatDateTime } from "@/lib/utils";
import { useTranslations } from "next-intl";
import ProductPrice from "../product/product-price";

export default function OrderDetailsForm({
  order,
}: {
  order: IOrder;
  isAdmin: boolean;
}) {
  const t = useTranslations("Account.OrderDetails");

  const {
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
    expectedDeliveryDate,
  } = order;

  return (
    // Outer layout: Responsive 1-column layout on mobile, 3-columns on desktop.
    // Added 'px-2' to prevent cards from snapping tightly to mobile viewport borders.
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 px-2 md:px-0">
      {/* Left Column: Occupies full width on mobile, 2/3 width on desktop */}
      <div className="col-span-1 md:col-span-2 space-y-4 w-full min-w-0">
        {/* 1. Shipping Information Card */}
        <Card className="w-full">
          <CardContent className="p-4 md:p-6 flex flex-col gap-2">
            <h2 className="text-lg md:text-xl font-bold pb-2 text-foreground border-b">
              {t("Shipping Address")}
            </h2>
            {/* 'break-words' prevents long names or strings from breaking card layouts */}
            <p className="font-semibold text-sm md:text-base pt-1 break-words">
              {shippingAddress.fullName} — {shippingAddress.phone}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed break-words">
              {shippingAddress.street}, {shippingAddress.city},{" "}
              {shippingAddress.province}, {shippingAddress.postalCode},{" "}
              {shippingAddress.country}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              {isDelivered ? (
                // Added 'justify-center text-center' to center the text inside the badge
                <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 justify-center text-center">
                  {t("Delivered at")} {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <div className="flex flex-col gap-1.5 items-start">
                  {/* Added 'justify-center text-center' here as well */}
                  <Badge
                    variant="destructive"
                    className="text-xs py-1 justify-center text-center"
                  >
                    {t("Not delivered")}
                  </Badge>
                  <div className="text-xs md:text-sm text-amber-600 dark:text-amber-400 font-medium">
                    {t("Expected delivery at")}{" "}
                    {formatDateTime(expectedDeliveryDate!).dateTime}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 2. Payment Status Card */}
        <Card className="w-full">
          <CardContent className="p-4 md:p-6 flex flex-col gap-2">
            <h2 className="text-lg md:text-xl font-bold pb-2 text-foreground border-b">
              {t("Payment Method")}
            </h2>
            <p className="font-medium text-sm md:text-base pt-1">
              {t(paymentMethod) || paymentMethod}
            </p>
            <div className="pt-1">
              {isPaid ? (
                <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs py-1">
                  {t("Paid at")} {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-xs py-1">
                  {t("Not paid")}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 3. Order Items Table Card */}
        <Card className="w-full overflow-hidden">
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold pb-4 text-foreground">
              {t("Order Items")}
            </h2>

            {/* Table Wrapper: Confines horizontal scroll to table component on mobile */}
            <div className="w-full overflow-x-auto rounded-lg border border-border">
              {/* 'min-w-[500px]' forces scrollbar only for table content on tiny touchscreens */}
              <Table className="w-full min-w-[500px] md:min-w-full">
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="text-start text-xs md:text-sm font-semibold">
                      {t("Item")}
                    </TableHead>
                    <TableHead className="text-start text-xs md:text-sm font-semibold">
                      {t("Quantity")}
                    </TableHead>
                    <TableHead className="text-end text-xs md:text-sm font-semibold">
                      {t("Price")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow
                      key={item.slug}
                      className="hover:bg-accent/30 transition-colors"
                    >
                      <TableCell className="p-3">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center gap-2 md:gap-3 group"
                        >
                          {/* Aspect ratio layout setup for high-quality responsive images */}
                          <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 overflow-hidden rounded-md border bg-background">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-w-768px) 40px, 48px"
                              className="object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          {/* 'line-clamp-2' limits product string sizes on smaller phone panels */}
                          <span className="font-medium text-xs md:text-sm line-clamp-2 max-w-[150px] md:max-w-xs text-foreground group-hover:underline">
                            {item.name}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell className="p-3">
                        <span className="font-semibold text-xs md:text-sm text-foreground">
                          {item.quantity}
                        </span>
                      </TableCell>
                      <TableCell className="p-3 text-end font-bold text-xs md:text-sm">
                        ${item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Invoice / Summary Sticky Panel */}
      <div className="col-span-1 w-full">
        {/* 'sticky top-4' keeps aggregate price details pinned during vertical screen navigation */}
        <Card className="sticky top-4 w-full">
          <CardContent className="p-4 md:p-6 space-y-4">
            <h2 className="text-lg md:text-xl font-bold pb-2 border-b text-foreground">
              {t("Order Summary")}
            </h2>

            <div className="flex justify-between text-xs md:text-sm">
              <div className="text-muted-foreground">{t("Items")}</div>
              <div className="font-medium text-foreground">
                <ProductPrice price={itemsPrice} plain />
              </div>
            </div>

            <div className="flex justify-between text-xs md:text-sm">
              <div className="text-muted-foreground">{t("Tax")}</div>
              <div className="font-medium text-foreground">
                <ProductPrice price={taxPrice} plain />
              </div>
            </div>

            <div className="flex justify-between text-xs md:text-sm">
              <div className="text-muted-foreground">{t("Shipping")}</div>
              <div className="font-medium text-foreground">
                <ProductPrice price={shippingPrice} plain />
              </div>
            </div>

            <div className="flex justify-between text-sm md:text-base font-bold pt-3 border-t border-dashed">
              <div className="text-foreground">{t("Total")}</div>
              <div className="text-primary text-base md:text-lg">
                <ProductPrice price={totalPrice} plain />
              </div>
            </div>

            {/* Render processing gateway button if target payment option matches standard setup */}
            {!isPaid && ["Stripe", "PayPal"].includes(paymentMethod) && (
              <Link
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full mt-2 font-semibold text-sm py-2 h-10",
                )}
                href={`/checkout/${order._id}`}
              >
                {t("Pay Order")}
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
