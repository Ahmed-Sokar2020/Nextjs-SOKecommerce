"use client";

import { cn } from "@/lib/utils";
import useBrowsingHistoryStore from "@/store/use-browsing-history-store";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import useSWR from "swr";
import { Separator } from "../ui/separator";
import ProductSlider from "./product/product-slider";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("API Fetch Error");
    return res.json();
  });

export default function BrowsingHistoryList({
  className,
}: {
  className?: string;
}) {
  const { products } = useBrowsingHistoryStore();
  const t = useTranslations("Home");

  const productIds = useMemo(
    () => products.map((p) => p.id).join(","),
    [products],
  );
  const categories = useMemo(
    () => products.map((p) => p.category).join(","),
    [products],
  );

  if (products.length === 0) return null;

  return (
    <div className="bg-background">
      <Separator className={cn("mb-4", className)} />
      <ProductList
        title={t("Related to items that you've viewed")}
        type="related"
        productIds={productIds}
        categories={categories}
      />
      <Separator className="mb-4" />
      <ProductList
        title={t("Your browsing history")}
        hideDetails
        type="history"
        productIds={productIds}
        categories={categories}
      />
    </div>
  );
}

function ProductList({
  title,
  type = "history",
  hideDetails = false,
  productIds,
  categories,
}: {
  title: string;
  type: "history" | "related";
  hideDetails?: boolean;
  productIds: string;
  categories: string;
}) {
  // 🎯 إذا كانت البيانات غير جاهزة بعد، نمرر null للـ key لـ SWR لكي لا يطلق أي طلب
  const apiUrl =
    productIds && categories
      ? `/api/products/browsing-history?type=${type}&categories=${encodeURIComponent(categories)}&ids=${productIds}`
      : null;

  // 🧠 استخدام useSWR السحري لمنع تكرار الطلبات المتطابقة نهائياً
  const { data } = useSWR(apiUrl, fetcher, {
    dedupingInterval: 3000, // 🟩 أي طلب متطابق تمامًا خلال 3 ثوانٍ، يتم دمجه في طلب واحد فقط!
    revalidateOnFocus: false, // منع إعادة الطلب عند التنقل بين نوافذ المتصفح
    revalidateOnReconnect: false,
  });

  if (!data || data.length === 0) return null;

  return (
    <ProductSlider title={title} products={data} hideDetails={hideDetails} />
  );
}
