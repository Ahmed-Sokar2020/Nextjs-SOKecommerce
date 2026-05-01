"use client";

import useCartSidebar from "@/hooks/use-cart-sidebar";
import useIsMounted from "@/hooks/use-is-mounted";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/use-cart-store";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
// import { useLocale, useTranslations } from 'next-intl'
// import { getDirection } from '@/i18n-config'

export default function CartButton() {
  const isMounted = useIsMounted();
  const {
    cart: { items },
  } = useCartStore();
  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0);
  const isCartSidebarOpen = useCartSidebar();
  // const t = useTranslations()

  // const locale = useLocale()
  return (
    <Link href="/cart" className="px-1 header-button">
      <div className="flex items-end text-xs relative">
        <ShoppingCartIcon className="h-8 w-8" />

        {isMounted && (
          <span
            className={cn(
              `bg-primary text-primary-foreground px-[7px] rounded-full  text-base font-semibold absolute right-[15px]
              top-[-16px] z-10`,
              cartItemsCount >= 10 && "text-sm p-1 py-0",
            )}
          >
            {cartItemsCount}
          </span>
        )}
        <span className="font-bold">Cart</span>

        {isCartSidebarOpen && (
          <div
            className={`absolute top-[20px] right-[-16px] rotate-[-90deg] z-10  w-0 h-0 border-l-[7px] border-r-[7px] border-b-[8px] border-transparent border-b-background dark:border-b-white`}
          ></div>
        )}
      </div>
    </Link>
  );
}
