import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ProductForm from "../product-form";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProductPage = () => {
  const t = useTranslations("Admin");

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="flex mb-4">
        <Link href="/admin/products">{t("Products")}</Link>
        <span className="mx-1">›</span>
        <Link href="/admin/products/create">
          {t("AdminProducts.Add Product")}
        </Link>
      </div>

      <div className="my-8">
        <ProductForm type="Create" />
      </div>
    </main>
  );
};

export default CreateProductPage;
