"use client";

import { ChevronUp } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
// import useSettingStore from "@/store/use-setting-store";
// import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

// import { SelectValue } from "@radix-ui/react-select";
import { useTranslations } from "next-intl";
// import { usePathname, useRouter } from '@/i18n/routing'

import { APP_NAME } from "@/lib/constants";
import Logo from "./logo";

// interface FooterProps {
//   locale: string;
// }

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // const router = useRouter()
  // const pathname = usePathname()
  // const {
  //   setting: { site, availableCurrencies, currency },
  //   setCurrency,
  // } = useSettingStore();

  // const { locales } = i18n;

  // const locale = useLocale()
  const t = useTranslations();
  return (
    <footer className="bg-black  text-white underline-link">
      <div className="w-full">
        <Button
          variant="ghost"
          className="bg-gray-600 w-full rounded-none cursor-pointer hover:bg-gray-600 dark:hover:bg-gray-600 hover:text-white"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp className="mr-2 h-4 w-4" />
          Back to top
        </Button>

        <div className="bg-gray-800 grid sm:place-items-start md:place-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
          <div>
            <h2 className="font-bold mb-2">{t("Footer.Get to Know Us")}</h2>
            <ul className="space-y-2 ">
              <li>
                <Link
                  href="/careers"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  {t("Footer.Careers")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  {t("Footer.Blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  {t("Footer.About name", { name: APP_NAME })}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-2">Shop with Us</h2>
            <ul className="space-y-2 ">
              <li>
                <Link
                  href="/account"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  Your Account
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  Your Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/addresses"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  Your Addresses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-2">Make Money with Us</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sell"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  Sell products on, {APP_NAME}
                </Link>
              </li>
              <li>
                <Link
                  href="/become-affiliate"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  Become an Affiliate
                </Link>
              </li>
              <li>
                <Link
                  href="/advertise"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  Advertise Your Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-2">Let Us Help You</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shipping"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  {" "}
                  Shipping Rates & Policies
                </Link>
              </li>
              <li>
                <Link
                  href="/returns-policy"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  Returns & Replacements
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:opacity-70 transition-opacity duration-500"
                >
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4 flex-wrap md:flex-nowrap">
              {/* <Select
                value="USA"
                // onValueChange={(value) => {
                //   router.push(pathname, { locale: value })
                // }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {locales.map((lang, index) => (
                    <SelectItem key={index} value="arabic">
                      <Link
                        className="w-full flex items-center gap-1"
                        href="/"
                        // locale={lang.code}
                      >
                         <span className='text-lg'>{lang.icon}</span> {lang.name}
                      </Link>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
              {/* <Select
                value={currency}
                onValueChange={(value) => {
                  setCurrency(value);
                  window.scrollTo(0, 0);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a currency" />
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
              </Select> */}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-center items-center  gap-3 text-sm">
          <Logo />
          <Link
            href="/conditions-of-use"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            Conditions of Use
          </Link>
          <Link
            href="/privacy-notice"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            Privacy Notice
          </Link>
          <Link
            href="/help"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            Help
          </Link>
        </div>

        <div className="flex justify-center text-sm">
          <p>
            {" "}
            © {currentYear} {APP_NAME}, Inc
          </p>
        </div>

        <div className="mt-8 flex justify-center text-sm text-gray-400">
          123 Alnozha, Cairo, Egypt | +201210203040
        </div>
      </div>
    </footer>
  );
}
