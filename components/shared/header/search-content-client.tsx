"use client";

import { SearchIcon, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { APP_NAME } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SearchContent({
  categories,
}: {
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");

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
              {selectedCategory === "all" ? "All" : selectedCategory}
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
            All
          </DropdownMenuItem>

          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="cursor-pointer capitalize transition-colors focus:text-foreground"
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Input
        className="flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-foreground text-base h-full outline-none focus-visible:ring-0 placeholder:text-muted-foreground"
        placeholder={`Search Site ${APP_NAME}`}
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
