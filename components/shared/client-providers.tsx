"use client";

import useCartSidebar from "@/hooks/use-cart-sidebar";
import { useThemeStore } from "@/store/use-theme-store";
import React, { useEffect } from "react";
import { Toaster } from "../ui/sonner";
import CartSidebar from "./cart-sidebar";
import { ThemeProvider } from "./theme-provider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const isCartSidebarOpen = useCartSidebar();
  const color = useThemeStore((state) => state.color);

  // Keep the DOM completely in sync whenever the store state updates
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", color);
  }, [color]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {isCartSidebarOpen ? (
        <div className="flex min-h-screen">
          <div className="flex-1 overflow-hidden">{children}</div>
          <CartSidebar />
        </div>
      ) : (
        <>{children}</>
      )}
      <Toaster />
    </ThemeProvider>
  );
}
