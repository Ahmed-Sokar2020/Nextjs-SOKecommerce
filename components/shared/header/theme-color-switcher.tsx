"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeStore } from "@/store/use-theme-store";
import { Check, ChevronDown, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import React, { useState } from "react";

export function ThemeColorSwitcher() {
  const { theme, setTheme } = useTheme();
  const { color, setColor } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Header");

  //Using Zustand (store/use-theme-store.ts) to implement switching between colors[gold,green,red]
  // Sync Zustand state with DOM on mount
  React.useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute("data-theme", color);
  }, [color]);

  if (!mounted) return <div className="h-9 w-28" />;

  const colorOptions = [
    { name: "Gold", value: "gold" as const, tw: "bg-yellow-400" },
    { name: "Green", value: "green" as const, tw: "bg-green-600" },
    { name: "Red", value: "red" as const, tw: "bg-red-600" },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 px-2! gap-1 border border-white/20 transition-all duration-300"
        >
          <div className="relative h-[1.2rem] w-[1.2rem]">
            {theme === "dark" ? (
              <Moon className="absolute scale-100 transition-all rotate-0" />
            ) : (
              <Sun className="absolute scale-100 transition-all rotate-0" />
            )}
          </div>
          <span className="capitalize hidden sm:block">
            {theme && t(theme)}
          </span>
          <ChevronDown size={14} className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{t("Theme")}</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Moon size={14} /> {t("Dark")}
          </div>
          {theme === "dark" && <Check size={14} className="text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Sun size={14} /> {t("Light")}
          </div>
          {theme === "light" && <Check size={14} className="text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>{t("Color")}</DropdownMenuLabel>
        {colorOptions.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => setColor(opt.value)}
            className="justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${opt.tw}`} />
              {t(opt.name)}
            </div>
            {color === opt.value && (
              <Check size={14} className="text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
