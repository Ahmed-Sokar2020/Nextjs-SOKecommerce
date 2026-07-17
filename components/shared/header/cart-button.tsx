"use client";

import useCartSidebar from "@/hooks/use-cart-sidebar";
import useIsMounted from "@/hooks/use-is-mounted";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/use-cart-store";
import { useTranslations } from "next-intl";

export default function CartButton() {
  const isMounted = useIsMounted();
  const {
    cart: { items },
  } = useCartStore();
  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0);
  const isCartSidebarOpen = useCartSidebar();
  const t = useTranslations("Cart");

  return (
    <Link
      href="/cart"
      className="relative flex items-end pb-[6px] pt-2 px-2 text-white hover:outline hover:outline-1 hover:outline-white rounded-sm h-[44px] cursor-pointer select-none transition-all duration-100 group "
    >
      {/* 1. Icon Wrapper */}
      <div className="relative flex items-end h-full">
        {/* 🎯 Centered Orange Count Digit */}
        {isMounted && (
          <span
            className={cn(
              "absolute top-[2px] left-[20px] -translate-x-1/2 text-primary text-[15px] font-black leading-none text-center z-10 tracking-tighter",
              cartItemsCount >= 10 && "text-[12px] left-[20px] top-[2px]",
            )}
          >
            {cartItemsCount}
          </span>
        )}

        {/* 🛒 Balanced Open Basket Geometry */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 42 34"
          className="w-[38px] h-[26px]"
        >
          <g
            className="stroke-white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            {/* Smooth continuous handle, low rail, and right side wedge */}
            <path d="M3 7h5.5l5 15.5h18.5l5.5-12.5" />
          </g>

          {/* 🎯 FIXED: Small, clean wheels matching the correct layout radius */}
          <circle
            cx="16.5"
            cy="29.5"
            r="2.5"
            className="fill-white stroke-white"
            strokeWidth="0.5"
          />
          <circle
            cx="31.5"
            cy="29.5"
            r="2.5"
            className="fill-white stroke-white"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* 2. Text Label */}
      <span className="text-[14px] font-bold pb-1px hidden sm:inline-block text-white self-end tracking-wide ml-[-3px]">
        {t("Cart")}
      </span>

      {/* 3. Dropdown Indicator Triangle */}
      {isCartSidebarOpen && (
        <div
          className={`absolute top-[24px] right-[-10px] rotate-[-90deg] z-10  w-0 h-0 border-l-[7px] border-r-[7px] border-b-[8px] border-transparent border-b-background dark:border-b-white`}
        ></div>
      )}
    </Link>
  );
}
