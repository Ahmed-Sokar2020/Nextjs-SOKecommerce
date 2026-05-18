import Menu from "@/components/shared/header/menu";
import Logo from "@/components/shared/logo";
import React from "react";
import { AdminNav } from "./admin-nav";

export default async function AdminLayout({
  children,
  params, // 1. Pass the route parameters object
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // 2. Add the proper Next.js 15 typing
}) {
  const { locale } = await params; // 3. Await the parameters token

  return (
    /* 4. we supply key={locale}.
       When changing languages, React destroys this layout instance
       and builds a fresh one using the clean language dictionary instantly. */
    <div
      key={locale}
      className="flex flex-col"
      // dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="bg-black text-white">
        <div className="flex h-16 items-center px-2">
          <Logo />

          <AdminNav className="mx-6 hidden md:flex" />

          <div className="ml-auto flex items-center space-x-4">
            <Menu forAdmin />
          </div>
        </div>

        <div>
          <AdminNav className="flex md:hidden px-4 pb-2" />
        </div>
      </div>

      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
