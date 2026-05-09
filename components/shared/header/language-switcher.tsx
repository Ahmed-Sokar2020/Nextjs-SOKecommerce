"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Assuming you use Shadcn UI
import { i18n } from "@/i18n-config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Find the current language object to show the active flag/name
  const currentLanguage = i18n.locales.find((l) => l.code === locale);

  const handleLocaleChange = (newLocale: string) => {
    // In the new API, you just pass the locale directly as the first argument
    // next-intl automatically handles the pathname!
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 outline-none text-white text-sm font-bold">
        <span>{currentLanguage?.icon}</span>
        <span className="uppercase">{currentLanguage?.code.split("-")[0]}</span>
        <span className="text-[10px] opacity-60">▼</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white text-black">
        {i18n.locales.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleLocaleChange(lang.code)}
          >
            <span>{lang.icon}</span>
            <span className={locale === lang.code ? "font-bold" : ""}>
              {lang.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
