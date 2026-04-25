"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignOut } from "@/lib/actions/user.actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserButtonClient({ session }: any) {
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="header-button flex items-center">
            <div className="flex flex-col text-xs text-left">
              <span>Hello, {session?.user?.name ?? "sign in"}</span>
              <span className="font-bold">Account & Orders</span>
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
                <DropdownMenuItem>Your account</DropdownMenuItem>
              </Link>

              <Link href="/account/orders">
                <DropdownMenuItem>Your orders</DropdownMenuItem>
              </Link>

              {session?.user?.role === "Admin" && (
                <Link href="/admin/overview">
                  <DropdownMenuItem>Admin</DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuGroup>

            <DropdownMenuItem className="p-0">
              <form action={SignOut}>
                <Button variant="ghost" className="w-full justify-start">
                  Sign out
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
                  Sign in
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className="font-normal">
                New Customer <Link href="/sign-up">Sign up</Link>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
