import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SquareMenu } from "lucide-react";
// import { EllipsisVertical } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import CartButton from "./cart-button";
import { ThemeColorSwitcher } from "./theme-color-switcher";
import UserButton from "./user-button";
// import LanguageSwitcher from './language-switcher'
// import { useTranslations } from 'next-intl'

const Menu = ({ forAdmin = false }: { forAdmin?: boolean }) => {
  // const t = useTranslations()

  return (
    <div className="flex justify-end">
      <nav className="md:flex gap-3 hidden w-full">
        {/* <LanguageSwitcher /> */}
        <ThemeColorSwitcher />
        <UserButton />
        {forAdmin ? null : <CartButton />}
      </nav>
      {/* For mobile Device */}
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle header-button">
            <SquareMenu className="h-7 w-7" />
          </SheetTrigger>
          <SheetContent className="bg-black text-white flex flex-col items-center gap-6">
            <SheetHeader className="w-full">
              <div className="flex items-center justify-between ">
                <SheetTitle className="  ">{APP_NAME} Menu</SheetTitle>
                <SheetDescription></SheetDescription>
              </div>
            </SheetHeader>
            {/* <LanguageSwitcher /> */}
            <ThemeColorSwitcher />
            <UserButton />
            <CartButton />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
