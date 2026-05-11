"use client";

import { cn } from "@/lib/utils";
import useBrowsingHistoryStore from "@/store/use-browsing-history-store";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { Separator } from "../ui/separator";
import ProductSlider from "./product/product-slider";

export default function BrowsingHistoryList({
  className,
}: {
  className?: string;
}) {
  const { products } = useBrowsingHistoryStore();
  const t = useTranslations("Home");
  return (
    products.length !== 0 && (
      <div className="bg-background">
        <Separator className={cn("mb-4", className)} />
        <ProductList
          title={t("Related to items that you've viewed")}
          type="related"
        />
        <Separator className="mb-4" />
        <ProductList
          title={t("Your browsing history")}
          hideDetails
          type="history"
        />
      </div>
    )
  );
}

function ProductList({
  title,
  type = "history",
  hideDetails = false,
  // excludeId = "",
}: {
  title: string;
  type: "history" | "related";
  hideDetails?: boolean;
  // excludeId?: string;
}) {
  const { products } = useBrowsingHistoryStore();
  const [data, setData] = React.useState([]);

  // const productIds = products.map((p) => p.id).join(",");
  const productIds = React.useMemo(
    () => products.map((p) => p.id).join(","),
    [products],
  );

  // const categories = products.map((p) => p.category).join(",");
  const categories = React.useMemo(
    () => products.map((p) => p.category).join(","),
    [products],
  );

  useEffect(() => {
    if (!productIds) return;
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/products/browsing-history?type=${type}&categories=${categories}&ids=${productIds}`,
      );

      const data = await res.json();
      setData(data);
    };

    fetchProducts();
  }, [productIds, categories, type]);

  return (
    data.length > 0 && (
      <ProductSlider title={title} products={data} hideDetails={hideDetails} />
    )
  );
}
