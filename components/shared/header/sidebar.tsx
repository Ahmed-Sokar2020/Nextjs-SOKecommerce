"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Link } from "@/i18n/navigation";
import { ChevronRight, MenuIcon, UserCircle, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface SidebarProps {
  categories: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  signOutAction: () => Promise<void>;
}

export default function Sidebar({
  categories = [],
  session,
  signOutAction,
}: SidebarProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <button className="header-button flex items-center p-2!">
        <MenuIcon className="h-5 w-5 mr-1" />
        {t("Header.All")}
      </button>
    );
  }

  const direction = locale === "ar" ? "right" : "left";

  return (
    <Drawer direction={direction}>
      <DrawerTrigger className="header-button flex items-center p-2!">
        <MenuIcon className="h-5 w-5 mr-1" />
        {t("Header.All")}
      </DrawerTrigger>

      <DrawerContent className="w-[350px] h-screen mt-0 top-0 rounded-none fixed inset-y-0 z-50">
        <div className="grid grid-rows-[60px_1fr_auto] h-full w-full bg-background text-foreground">
          {/* 1. Header*/}
          <div className="dark bg-gray-800 text-foreground flex items-center justify-between px-4 border-b">
            <div className="flex items-center">
              <UserCircle className="h-6 w-6 mr-2 rtl:mr-0 rtl:ml-2" />
              <DrawerHeader className="p-0 text-left rtl:text-right">
                <DrawerTitle>
                  {session ? (
                    <DrawerClose asChild>
                      <Link href="/account" className="hover:underline">
                        <span className="text-lg font-semibold whitespace-nowrap text-foreground block">
                          {t("Header.Hello")}, {session.user.name}
                        </span>
                      </Link>
                    </DrawerClose>
                  ) : (
                    <DrawerClose asChild>
                      <Link href="/sign-in" className="hover:underline">
                        <span className="text-lg font-semibold whitespace-nowrap text-foreground block">
                          {t("Header.Hello")}, {t("Header.sign in")}
                        </span>
                      </Link>
                    </DrawerClose>
                  )}
                </DrawerTitle>
                <DrawerDescription className="sr-only">
                  SOKecommerce navigation sidebar menu
                </DrawerDescription>
              </DrawerHeader>
            </div>

            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>

          {/* 2. Departments*/}
          <div className="overflow-y-auto min-h-0 flex flex-col w-full">
            <div className="p-4 border-b bg-background sticky top-0 z-10">
              <h2 className="text-lg font-semibold">
                {t("Header.Shop By Department")}
              </h2>
            </div>

            <nav className="flex flex-col w-full divide-y divide-border/40">
              {categories.map((c) => (
                <DrawerClose asChild key={`${locale}-${c}`}>
                  <Link
                    href={`/search?category=${c}`}
                    className="flex items-center justify-between min-h-[50px] px-6 hover:bg-accent/50 transition-colors w-full"
                  >
                    <span className="text-sm font-medium">
                      {t(`Search.${c}`) || c}
                    </span>
                    <ChevronRight className="h-4 w-4 transform rtl:rotate-180 text-muted-foreground shrink-0" />
                  </Link>
                </DrawerClose>
              ))}
            </nav>
          </div>

          {/* 3.  Settings */}
          <div className="border-t flex flex-col bg-card bg-gray-900/5 dark:bg-gray-900/40 pb-6">
            <div className="p-4">
              <h2 className="text-lg font-semibold">
                {t("Header.Help & Settings")}
              </h2>
            </div>

            <div className="flex flex-col">
              <DrawerClose asChild>
                <Link
                  href="/account"
                  className="min-h-[44px] flex items-center px-6 hover:bg-accent/60 transition-colors text-sm font-medium"
                >
                  {t("Header.Your account")}
                </Link>
              </DrawerClose>

              <DrawerClose asChild>
                <Link
                  href="/customer-service"
                  className="min-h-[44px] flex items-center px-6 hover:bg-accent/60 transition-colors text-sm font-medium"
                >
                  {t("Header.Customer Service")}
                </Link>
              </DrawerClose>

              {session ? (
                <form action={signOutAction} className="w-full mt-1">
                  <Button
                    className="w-full justify-start text-sm font-medium h-[44px] rounded-none px-6 hover:bg-destructive/10 text-destructive bg-transparent"
                    variant="ghost"
                  >
                    {t("Header.Sign out")}
                  </Button>
                </form>
              ) : (
                <DrawerClose asChild>
                  <Link
                    href="/sign-in"
                    className="min-h-[44px] flex items-center px-6 hover:bg-accent/60 transition-colors text-sm font-medium"
                  >
                    {t("Header.Sign in")}
                  </Link>
                </DrawerClose>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
