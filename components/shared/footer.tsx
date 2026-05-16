"use client";

import { Link } from "@/i18n/navigation";
import { ChevronUp } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import useSettingStore from "@/store/use-setting-store";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

import { i18n } from "@/i18n-config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { SelectValue } from "@radix-ui/react-select";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const router = useRouter();
  const {
    setting: { site, availableCurrencies, currency },
    setCurrency,
  } = useSettingStore();

  const { locales } = i18n;
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <footer className="bg-black text-white underline-link">
      <div className="w-full">
        <Button
          variant="ghost"
          className="bg-gray-800 w-full rounded-none cursor-pointer hover:bg-gray-800 hover:text-white dark:hover:bg-gray-800"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp className="mr-2 h-4 w-4" />
          {t("Footer.Back to top")}
        </Button>

        <div className="grid sm:place-items-start md:place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
          <div>
            <h3 className="font-bold mb-2">{t("Footer.Get to Know Us")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="hover:opacity-60 transition-opacity duration-500"
                  href="/careers"
                >
                  {t("Footer.Careers")}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:opacity-60 transition-opacity duration-500"
                  href="/blog"
                >
                  {t("Footer.Blog")}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:opacity-60 transition-opacity duration-500"
                  href="/about-us"
                >
                  {t("Footer.About name", { name: site.name })}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">{t("Footer.Shop with Us")}</h3>
            <ul className="space-y-2 ">
              <li>
                <Link
                  href="/account"
                  className="hover:opacity-60 transition-opacity duration-500"
                >
                  {t("Footer.Your Account")}
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="hover:opacity-60 transition-opacity duration-500 "
                >
                  {t("Footer.Your Orders")}
                </Link>
              </li>
              <li>
                <Link
                  href="/addresses"
                  className="hover:opacity-60 transition-opacity duration-500"
                >
                  {t("Footer.Your Addresses")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">{t("Footer.Make Money with Us")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="hover:opacity-60 transition-opacity duration-500"
                  href="/sell"
                >
                  {t("Footer.Sell products on", { name: site.name })}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:opacity-60 transition-opacity duration-500"
                  href="/become-affiliate"
                >
                  {t("Footer.Become an Affiliate")}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:opacity-60 transition-opacity duration-500"
                  href="/advertise"
                >
                  {t("Footer.Advertise Your Products")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">{t("Footer.Let Us Help You")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="hover:opacity-60 transition-opacity duration-500"
                  href="/shipping"
                >
                  {t("Footer.Shipping Rates & Policies")}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:opacity-60 transition-opacity duration-500"
                  href="/returns-policy"
                >
                  {t("Footer.Returns & Replacements")}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:opacity-60 transition-opacity duration-500"
                  href="/help"
                >
                  {t("Footer.Help")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4 flex-wrap md:flex-nowrap">
              <Image
                src="/icons/logo.svg"
                alt={`${site.name} logo`}
                width={48}
                height={48}
                className="w-14"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
              {/* Select for Languages */}
              <Select
                value={locale}
                onValueChange={(value) => {
                  router.push(pathname, { locale: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("Footer.Select a language")} />
                </SelectTrigger>
                <SelectContent>
                  {locales.map((lang, index) => (
                    <SelectItem key={index} value={lang.code}>
                      <Link
                        className="w-full flex items-center gap-1"
                        href={pathname}
                        locale={lang.code}
                      >
                        {/* <span className="text-lg">{lang.icon}</span> {lang.name} */}
                        <div className="flex items-center gap-2">
                          <span className={`fi fi-${lang.icon} w-5 h-4`}></span>
                          <span>
                            {lang.icon} {lang.name}
                          </span>
                        </div>
                      </Link>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Select for Currencies */}

              <Select
                value={currency}
                onValueChange={(value) => {
                  setCurrency(value);
                  window.scrollTo(0, 0);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("Footer.Select a currency")} />
                </SelectTrigger>
                <SelectContent>
                  {availableCurrencies
                    .filter((x) => x.code)
                    .map((currency, index) => (
                      <SelectItem key={index} value={currency.code}>
                        {currency.name} ({currency.code})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-center  gap-3 text-sm ">
          <Link
            className="hover:opacity-60 transition-opacity duration-500"
            href="/conditions-of-use"
          >
            {t("Footer.Conditions of Use")}
          </Link>
          <Link
            className="hover:opacity-60 transition-opacity duration-500"
            href="/privacy-notice"
          >
            {t("Footer.Privacy Notice")}
          </Link>
          <Link
            className="hover:opacity-60 transition-opacity duration-500"
            href="/help"
          >
            {t("Footer.Help")}
          </Link>
        </div>

        <div className="flex justify-center text-sm">
          <p> © {site.copyright}</p>
        </div>

        <div className="mt-8 flex justify-center text-sm text-gray-400">
          {site.address} | {site.phone}
        </div>
      </div>
    </footer>
  );
}
