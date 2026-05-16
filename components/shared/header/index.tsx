import { Link } from "@/i18n/navigation";
import { getAllCategories } from "@/lib/actions/product.actions";
import { getTranslations } from "next-intl/server";
import Menu from "./menu";
import Search from "./search";
import Sidebar from "./sidebar";

import { APP_NAME } from "@/lib/constants";
import data from "@/lib/data";
import Logo from "../logo";

export default async function Header() {
  const categories = await getAllCategories();

  const t = await getTranslations();
  return (
    <header className="sticky top-0 z-50 w-full text-white bg-black border-b border-border  backdrop-blur-md supports-backdrop-filter:bg-black/60">
      {/* <header className="bg-black sticky top-0 z-50 text-white w-full"> */}

      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* LOGO */}
            <div className="flex items-center header-button font-extrabold text-2xl m-1 ">
              <Logo />
              <Link href="/">
                <span className="text-primary text-xl font-bold ml-3">
                  {/* {APP_NAME} */}
                  {APP_NAME}
                </span>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block flex-1 max-w-xl">
            <Search />
          </div>

          <Menu />
        </div>

        <div className="lg:hidden flex items-center px-3">
          <Search />
        </div>
      </div>

      <div className="flex items-center px-3 mb-px  bg-gray-800">
        <Sidebar categories={categories} />
        {/* Header Menus after the Navbar */}
        <div className="flex items-center flex-wrap gap-3 overflow-hidden max-h-10.5">
          {data.headerMenus.map((menu) => (
            <Link
              href={menu.href}
              key={menu.href}
              className="header-button p-2! "
            >
              {t("Header." + menu.name)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
