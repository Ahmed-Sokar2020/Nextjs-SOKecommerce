"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFilterUrl } from "@/lib/utils";
import { useTranslations } from "next-intl"; // Import hook
import { useRouter } from "next/navigation";

export default function ProductSortSelector({
  sortOrders,
  sort,
  params,
}: {
  sortOrders: { value: string; name: string }[];
  sort: string;
  params: {
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  };
}) {
  const router = useRouter();
  const t = useTranslations("Search");

  return (
    <div className="flex items-center gap-2">
      <Select
        onValueChange={(v) => {
          router.push(getFilterUrl({ params, sort: v }));
        }}
        value={sort}
      >
        <SelectTrigger className="w-full md:w-[240px] min-w-fit px-4 text-left">
          <SelectValue>
            {/* Localized "Sort By" label */}
            {t("SortBy")} {t(`SortOptions.${sort}`)}
          </SelectValue>
        </SelectTrigger>

        <SelectContent position="popper" side="bottom">
          {sortOrders.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {/* Translate each option using its value as a key */}
              {t(`SortOptions.${s.value}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
