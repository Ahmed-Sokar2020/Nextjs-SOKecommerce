// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { i18n } from "@/i18n-config";
// import { Link, usePathname } from "@/i18n/navigation";
// import { setCurrencyOnServer } from "@/lib/actions/setting.actions";
// import useSettingStore from "@/store/use-setting-store";
// import { ChevronDownIcon } from "lucide-react";
// import { useLocale } from "next-intl";

// export default function LanguageSwitcher() {
//   const { locales } = i18n;
//   const locale = useLocale();
//   const pathname = usePathname();

//   const {
//     setting: { availableCurrencies, currency },
//     setCurrency,
//   } = useSettingStore();

//   const handleCurrencyChange = async (newCurrency: string) => {
//     await setCurrencyOnServer(newCurrency);
//     setCurrency(newCurrency);
//   };

//   const currentLanguage = locales.find((l) => l.code === locale);

//   return (
//     <DropdownMenu modal={false}>
//       <DropdownMenuTrigger className="header-button h-[41px]">
//         <div className="flex items-center gap-1">
//           {/* Flag Icon from library */}
//           <span
//             className={`fi fi-${currentLanguage?.icon} w-5 h-4 shadow-sm`}
//           />
//           {locale.toUpperCase().slice(0, 2)}
//           <ChevronDownIcon />
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <DropdownMenuLabel>Language</DropdownMenuLabel>
//         <DropdownMenuRadioGroup value={locale}>
//           {locales.map((lang) => (
//             <DropdownMenuRadioItem key={lang.name} value={lang.code}>
//               <Link
//                 className="w-full flex items-center gap-1"
//                 href={pathname}
//               >
//                 <div className="flex gap-2">
//                   <span className={`fi fi-${lang.icon} w-5 h-4`}></span>
//                   <span>
//                     {lang.icon} {lang.name}
//                   </span>
//                 </div>
//               </Link>
//             </DropdownMenuRadioItem>
//           ))}
//         </DropdownMenuRadioGroup>

//         <DropdownMenuSeparator />

//         <DropdownMenuLabel>Currency</DropdownMenuLabel>
//         <DropdownMenuRadioGroup
//           value={currency}
//           onValueChange={handleCurrencyChange}
//         >
//           {availableCurrencies.map((c) => (
//             <DropdownMenuRadioItem key={c.name} value={c.code}>
//               {c.symbol} {c.code}
//             </DropdownMenuRadioItem>
//           ))}
//         </DropdownMenuRadioGroup>
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
// 1. Swap Link for useRouter to handle programmatic navigation
import { usePathname, useRouter } from "@/i18n/navigation";
import { setCurrencyOnServer } from "@/lib/actions/setting.actions";
import useSettingStore from "@/store/use-setting-store";
import { ChevronDownIcon } from "lucide-react";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const { locales } = i18n;
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter(); // 2. Initialize the router hook

  const {
    setting: { availableCurrencies, currency },
    setCurrency,
  } = useSettingStore();

  const handleCurrencyChange = async (newCurrency: string) => {
    await setCurrencyOnServer(newCurrency);
    setCurrency(newCurrency);
  };

  // 3. Clean navigation handler that handles switching languages correctly
  const handleLocaleChange = (newLocale: string) => {
    // next-intl's router expects the clean pathname and the locale option object
    router.replace(pathname, { locale: newLocale });
    // If switching within secure panels, force an immediate data refresh
    router.refresh();
  };

  const currentLanguage = locales.find((l) => l.code === locale);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="header-button h-[41px]">
        <div className="flex items-center gap-1">
          <span
            className={`fi fi-${currentLanguage?.icon} w-5 h-4 shadow-sm`}
          />
          {locale.toUpperCase().slice(0, 2)}
          <ChevronDownIcon />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Language</DropdownMenuLabel>

        {/* 4. Fire handleLocaleChange natively when an item is selected */}
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleLocaleChange}
        >
          {locales.map((lang) => (
            <DropdownMenuRadioItem
              key={lang.code}
              value={lang.code}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2 w-full">
                <span className={`fi fi-${lang.icon} w-5 h-4`}></span>
                <span>{lang.name}</span>
              </div>
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
            <DropdownMenuRadioItem key={c.code} value={c.code}>
              {c.symbol} {c.code}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
