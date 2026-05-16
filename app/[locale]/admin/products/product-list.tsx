/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteProduct,
  getAllProductsForAdmin,
} from "@/lib/actions/product.actions";
import { IProduct } from "@/lib/db/models/product.model";

import DeleteDialog from "@/components/shared/delete-dialog";
import { Input } from "@/components/ui/input";
import { formatDateTime, formatId } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState, useTransition } from "react";

type ProductListDataProps = {
  products: IProduct[];
  totalPages: number;
  totalProducts: number;
  to: number;
  from: number;
};
const ProductList = () => {
  const [page, setPage] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<ProductListDataProps>();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (changeType: "next" | "prev") => {
    const newPage = changeType === "next" ? page + 1 : page - 1;
    if (changeType === "next") {
      setPage(newPage);
    } else {
      setPage(newPage);
    }
    startTransition(async () => {
      const data = await getAllProductsForAdmin({
        query: inputValue,
        page: newPage,
      });
      setData(data);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      clearTimeout((window as any).debounce);
      (window as any).debounce = setTimeout(() => {
        startTransition(async () => {
          const data = await getAllProductsForAdmin({ query: value, page: 1 });
          setData(data);
        });
      }, 500);
    } else {
      startTransition(async () => {
        const data = await getAllProductsForAdmin({ query: "", page });
        setData(data);
      });
    }
  };
  useEffect(() => {
    startTransition(async () => {
      const data = await getAllProductsForAdmin({ query: "" });
      setData(data);
    });
  }, []);

  const t = useTranslations("Admin");

  return (
    <div>
      <div className="space-y-2">
        <div className="flex-between flex-wrap gap-2">
          <div className="flex flex-wrap items-center gap-2 ">
            <h1 className="font-bold text-lg">{t("Products")}</h1>
            <div className="flex flex-wrap items-center  gap-2 ">
              <Input
                className="w-auto"
                type="text "
                value={inputValue}
                onChange={handleInputChange}
                placeholder={t("AdminProducts.Filter name") + "..."}
              />

              {isPending ? (
                // <LoadingPage />
                <p>{t("Loading")}...</p>
              ) : (
                <p>
                  {data?.totalProducts === 0
                    ? "No"
                    : `${data?.from}-${data?.to} ${t("of")} ${data?.totalProducts}`}{" "}
                  {t("AdminProducts.results")}
                </p>
              )}
            </div>
          </div>

          <Button asChild variant="default">
            <Link href="/admin/products/create">
              {t("AdminProducts.Add Product")}
            </Link>
          </Button>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Form.Id")}</TableHead>
                <TableHead>{t("Form.Name")}</TableHead>
                <TableHead className="text-right">{t("Form.Price")}</TableHead>
                <TableHead>{t("Form.Category")}</TableHead>
                <TableHead>{t("Form.Stock")}</TableHead>
                <TableHead>{t("Form.Rating")}</TableHead>
                <TableHead>{t("Form.Is Published")}</TableHead>
                <TableHead>{t("Form.Last Update")}</TableHead>
                <TableHead className="w-[100px]">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.products.map((product: IProduct) => (
                <TableRow key={product._id.toString()}>
                  <TableCell>{formatId(product._id.toString())}</TableCell>
                  <TableCell>
                    <Link href={`/admin/products/${product._id}`}>
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.countInStock}</TableCell>
                  <TableCell>{product.avgRating}</TableCell>
                  <TableCell>{product.isPublished ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {formatDateTime(product.updatedAt).dateTime}
                  </TableCell>
                  <TableCell className="flex gap-1">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/products/${product._id}`}>
                        {t("Form.Actions.Edit")}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link target="_blank" href={`/product/${product.slug}`}>
                        {t("Form.Actions.View")}
                      </Link>
                    </Button>
                    <DeleteDialog
                      id={product._id.toString()}
                      action={deleteProduct}
                      callbackAction={() => {
                        startTransition(async () => {
                          const data = await getAllProductsForAdmin({
                            query: inputValue,
                          });
                          setData(data);
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {(data?.totalPages ?? 0) > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange("prev")}
                disabled={Number(page) <= 1}
                className="w-24"
              >
                <ChevronLeft /> {t("Previous")}
              </Button>
              {t("Page")} {page} {t("of")} {data?.totalPages}
              <Button
                variant="outline"
                onClick={() => handlePageChange("next")}
                disabled={Number(page) >= (data?.totalPages ?? 0)}
                className="w-24"
              >
                {t("Next")} <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
