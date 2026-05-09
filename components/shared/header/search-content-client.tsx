"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { APP_NAME } from "@/lib/constants";
import { ChevronDown, SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function SearchContent({
  categories,
}: {
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const t = useTranslations("Search");

  return (
    <form
      action="/search"
      method="GET"
      className="flex items-stretch h-10 w-full max-w-[700px]"
    >
      {/* Hidden input ensures the category is submitted with the form */}
      <input type="hidden" name="category" value={selectedCategory} />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            className="w-auto h-full px-4 flex items-center gap-1 dark:border-gray-200 bg-gray-100 text-foreground border-r rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none transition-colors dark:bg-black dark:border"
          >
            <span className="capitalize">
              {selectedCategory === "all" ? t("All") : selectedCategory}
            </span>
            <ChevronDown className="w-4 h-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={4}
          className="w-48 bg-popover text-popover-foreground z-[100]"
        >
          <DropdownMenuItem
            onClick={() => setSelectedCategory("all")}
            className="cursor-pointer transition-colors focus:text-foreground"
          >
            {t("All")}
          </DropdownMenuItem>

          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => setSelectedCategory(t(category))}
              className="cursor-pointer capitalize transition-colors focus:text-foreground"
            >
              {t(category)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Input
        className="flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-foreground text-base h-full outline-none focus-visible:ring-0 placeholder:text-muted-foreground"
        placeholder={t("Search Site") + ` ${APP_NAME}`}
        name="q"
        type="search"
      />

      <button
        type="submit"
        className="bg-primary text-primary-foreground rounded-s-none rounded-e-md h-full px-4 py-2 transition-all hover:opacity-90 active:scale-95 flex items-center justify-center"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </form>
  );
}
