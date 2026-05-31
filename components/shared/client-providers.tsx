"use client";

import useCartSidebar from "@/hooks/use-cart-sidebar";
import { useThemeStore } from "@/store/use-theme-store";
import { ClientSetting } from "@/types";
import React, { useEffect } from "react";
import { Toaster } from "sonner";
import AppInitializer from "./app-initializer";
import CartSidebar from "./cart-sidebar";
import { ThemeProvider } from "./theme-provider";

export default function ClientProviders({
  setting,
  children,
}: {
  setting: ClientSetting;
  children: React.ReactNode;
}) {
  const isCartSidebarOpen = useCartSidebar();
  const color = useThemeStore((state) => state.color);

  // Keep the DOM completely in sync whenever the store state updates
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", color);
  }, [color]);

  return (
    <AppInitializer setting={setting}>
      <ThemeProvider
        attribute="class"
        defaultTheme={setting.common.defaultTheme.toLocaleLowerCase()}
      >
        {isCartSidebarOpen ? (
          <div className="flex min-h-screen">
            <div className="flex-1 overflow-hidden">{children}</div>
            <CartSidebar />
          </div>
        ) : (
          <div>{children}</div>
        )}
        <Toaster />
      </ThemeProvider>
    </AppInitializer>
  );
}
