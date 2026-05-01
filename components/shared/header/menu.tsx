// import CartButton from "./cart-button";
// import { ThemeColorSwitcher } from "./theme-switcher";
// import UserButton from "./user-button";

// const Menu = () => {
//   return (
//     <div className="flex justify-end">
//       <nav className="flex justify-center items-center gap-3 w-full">
//         <ThemeColorSwitcher />
//         <UserButton />
//         <CartButton />
//       </nav>
//     </div>
//   );
// };

// export default Menu;

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EllipsisVertical } from "lucide-react";
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
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle header-button">
            <EllipsisVertical className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent className="bg-black text-white  flex flex-col items-start  ">
            <SheetHeader className="w-full">
              <div className="flex items-center justify-between ">
                <SheetTitle className="  ">Site Menu</SheetTitle>
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
