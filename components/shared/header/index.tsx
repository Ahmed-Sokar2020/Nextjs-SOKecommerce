import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import Search from "./search";
// import { getAllCategories } from '@/lib/actions/product.actions'
// import Sidebar from './sidebar'
// import { getSetting } from '@/lib/actions/setting.actions'
// import { getTranslations } from 'next-intl/server'

import { APP_NAME } from "@/lib/constants";
import data from "@/lib/data";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export default async function Header() {
  // const categories = await getAllCategories()
  // const { site } = await getSetting()
  // const t = await getTranslations()
  return (
    <header className="bg-black sticky top-0 z-50 text-white">
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center header-button font-extrabold text-2xl m-1 "
            >
              <Image
                className="w-10 h-auto"
                src="/icons/logo.svg"
                width={100}
                height={100}
                alt={`${APP_NAME} logo`}
                priority
              />
              <span className="text-orange-400 hidden sm:block text-xl font-bold ml-3">
                {APP_NAME}
              </span>
            </Link>
          </div>

          <div className="hidden md:block flex-1 max-w-xl">
            <Search />
          </div>

          <Menu />
        </div>

        <div className="md:hidden block py-2">
          <Search />
        </div>
      </div>

      <div className="flex items-center px-3 mb-px  bg-gray-800">
        <Button
          variant="ghost"
          className="dark header-button flex items-center gap-1 text-base [&_svg]:size-6"
        >
          <MenuIcon />
          All
        </Button>

        <div className="flex items-center flex-wrap gap-3 overflow-hidden max-h-10.5">
          {data.headerMenus.map((menu) => (
            <Link
              href={menu.href}
              key={menu.href}
              className="header-button p-2! "
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
