import BrowsingHistoryList from "@/components/shared/browsing-history-list";
import { HomeBannerCarousel } from "@/components/shared/home/home-banner-carousel";
import { HomeCard } from "@/components/shared/home/home-card";
import ProductSlider from "@/components/shared/product/product-slider";
import { Card, CardContent } from "@/components/ui/card";

import {
  getAllCategories,
  getProductsByTag,
  getProductsForCard,
} from "@/lib/actions/product.actions";
import { getSetting } from "@/lib/actions/setting.actions";
import { toSlug } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("Home");

  // 🎯 أفضل ممارسة: جلب البيانات بالتوازي باستخدام Promise.all لمنع الـ Waterfall
  const [
    settings,
    todaysDeals,
    bestSellingProducts,
    allCategories,
    newArrivals,
    featureds,
    bestSellers,
  ] = await Promise.all([
    getSetting(),
    getProductsByTag({ tag: "todays-deal" }),
    getProductsByTag({ tag: "best-seller" }),
    getAllCategories(),
    getProductsForCard({ tag: "new-arrival" }),
    getProductsForCard({ tag: "featured" }),
    getProductsForCard({ tag: "best-seller" }),
  ]);

  const carousels = settings.carousels;
  const categories = allCategories.slice(0, 4);

  const cards = [
    {
      title: t("Categories to explore"),
      link: { text: t("See More"), href: "/search" },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: t("Explore New Arrivals"),
      items: newArrivals,
      link: { text: t("View All"), href: "/search?tag=new-arrival" },
    },
    {
      title: t("Discover Best Sellers"),
      items: bestSellers,
      link: { text: t("View All"), href: "/search?tag=best-seller" }, // 📝 تصحيح الـ الروابط لتطابق التاج الأصلي
    },
    {
      title: t("Featured Products"),
      items: featureds,
      link: { text: t("Shop Now"), href: "/search?tag=featured" }, // 📝 تصحيح الـ الروابط لتطابق التاج الأصلي
    },
  ];

  return (
    <>
      <HomeBannerCarousel items={carousels} />
      <div className="md:p-4 md:space-y-4 bg-border">
        <HomeCard cards={cards} />

        {/* Today's Deals */}
        <Card className="w-full rounded-none">
          <CardContent className="p-4 items-center gap-3">
            <ProductSlider title={t("Today's Deals")} products={todaysDeals} />
          </CardContent>
        </Card>

        {/* Best Selling Products */}
        <Card className="w-full rounded-none">
          <CardContent className="p-4 items-center gap-3">
            <ProductSlider
              title={t("Best Selling Products")}
              products={bestSellingProducts}
              hideDetails
            />
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-background">
        <BrowsingHistoryList />
      </div>
    </>
  );
}
