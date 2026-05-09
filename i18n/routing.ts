// i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { i18n } from "../i18n-config"; // Double check this path!

export const routing = defineRouting({
  // This extracts ["en-US", "fr", "ar"] automatically
  locales: i18n.locales.map((l) => l.code),
  defaultLocale: i18n.defaultLocale,
  localePrefix: "always",
});
