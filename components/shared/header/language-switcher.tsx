// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"; // Assuming you use Shadcn UI
// import { i18n } from "@/i18n-config";
// import { usePathname, useRouter } from "@/i18n/navigation";
// import { useLocale } from "next-intl";

// export default function LanguageSwitcher() {
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   // Find the current language object to show the active flag/name
//   const currentLanguage = i18n.locales.find((l) => l.code === locale);

//   const handleLocaleChange = (newLocale: string) => {
//     // In the new API, you just pass the locale directly as the first argument
//     // next-intl automatically handles the pathname!
//     router.replace(pathname, { locale: newLocale });
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger className="flex items-center gap-1 outline-none text-white text-sm font-bold">
//         <span>{currentLanguage?.icon}</span>
//         <span className="uppercase">{currentLanguage?.code.split("-")[0]}</span>
//         <span className="text-[10px] opacity-60">▼</span>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="end" className="bg-white text-black">
//         {i18n.locales.map((lang) => (
//           <DropdownMenuItem
//             key={lang.code}
//             className="flex items-center gap-3 cursor-pointer"
//             onClick={() => handleLocaleChange(lang.code)}
//           >
//             <span>{lang.icon}</span>
//             <span className={locale === lang.code ? "font-bold" : ""}>
//               {lang.name}
//             </span>
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { i18n } from "@/i18n-config";
import { Link, usePathname } from "@/i18n/navigation";
import { setCurrencyOnServer } from "@/lib/actions/setting.actions";
import useSettingStore from "@/store/use-setting-store";
import { ChevronDownIcon } from "lucide-react";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const { locales } = i18n;
  const locale = useLocale();
  const pathname = usePathname();

  const {
    setting: { availableCurrencies, currency },
    setCurrency,
  } = useSettingStore();

  const handleCurrencyChange = async (newCurrency: string) => {
    await setCurrencyOnServer(newCurrency);
    setCurrency(newCurrency);
  };

  const currentLanguage = locales.find((l) => l.code === locale);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="header-button h-[41px]">
        <div className="flex items-center gap-1">
          {/* Flag Icon from library */}
          <span
            className={`fi fi-${currentLanguage?.icon} w-5 h-4 shadow-sm`}
          />
          {locale.toUpperCase().slice(0, 2)}
          <ChevronDownIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={locale}>
          {locales.map((lang) => (
            <DropdownMenuRadioItem key={lang.name} value={lang.code}>
              <Link
                className="w-full flex items-center gap-1"
                href={pathname}
                locale={lang.code}
              >
                <div className="flex gap-2">
                  <span className={`fi fi-${lang.icon} w-5 h-4`}></span>
                  <span>
                    {lang.icon} {lang.name}
                  </span>
                </div>
              </Link>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={currency}
          onValueChange={handleCurrencyChange}
        >
          {availableCurrencies.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.code}>
              {c.symbol} {c.code}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
