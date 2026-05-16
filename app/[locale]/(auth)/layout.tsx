// import { getSetting } from '@/lib/actions/setting.actions'
import Logo from "@/components/shared/logo";
import { APP_COPYRIGHT } from "@/lib/constants";
// import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { site } = await getSetting()
  return (
    <div className="flex flex-col items-center min-h-screen highlight-link  ">
      <header className="mt-8">
        <Logo />
      </header>

      <main className="mx-auto max-w-sm min-w-80 p-4">{children}</main>

      <footer className=" flex-1 mt-8  bg-gray-800 w-full flex flex-col gap-4 items-center p-8 text-sm">
        <div className="flex justify-center space-x-4">
          <Link
            href="/conditions-of-use"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            Conditions of Use
          </Link>
          <Link
            href="/privacy-notice"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            {" "}
            Privacy Notice
          </Link>
          <Link
            href="/help"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            {" "}
            Help{" "}
          </Link>
        </div>
        <div>
          <p className="text-gray-400">{APP_COPYRIGHT}</p>
        </div>
      </footer>
    </div>
  );
}
