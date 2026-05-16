"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import { SignOut } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
// import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserButtonClient({ session }: any) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Header");

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="header-button flex items-center">
            <div className="flex flex-col text-xs text-left">
              <span>
                {t("Hello")}, {session?.user?.name ?? t("Sign in")}
              </span>
              <span className="font-bold">{t("Account & Orders")}</span>
            </div>
            <ChevronDownIcon />
          </button>
        </DropdownMenuTrigger>

        {session ? (
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <p>{session?.user?.name}</p>
              <p>{session?.user?.email}</p>
            </DropdownMenuLabel>

            <DropdownMenuGroup>
              <Link href="/account">
                <DropdownMenuItem>{t("Your account")}</DropdownMenuItem>
              </Link>

              <Link href="/account/orders">
                <DropdownMenuItem>{t("Your orders")}</DropdownMenuItem>
              </Link>

              {session?.user?.role === "Admin" && (
                <Link href="/admin/overview">
                  <DropdownMenuItem>{t("Admin")}</DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuGroup>

            <DropdownMenuItem className="p-0">
              <form action={SignOut}>
                <Button variant="ghost" className="w-full justify-start">
                  {t("Sign out")}
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  className={cn(buttonVariants(), "w-full")}
                  href="/sign-in"
                >
                  {t("Sign in")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className="font-normal">
                {t("New Customer")}? <Link href="/sign-up">{t("Sign up")}</Link>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
