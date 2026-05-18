import ClientProviders from "@/components/shared/client-providers";

import { APP_DESCRIPTION, APP_NAME, APP_SLOGAN } from "@/lib/constants";
import "flag-icons/css/flag-icons.min.css"; // Add this line
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME}. ${APP_SLOGAN}`,
  },
  description: `${APP_DESCRIPTION}`,
  icons: {
    icon: [{ url: "/icons/logo.svg", type: "image/svg+xml" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning // Add this for hydration mismatch warnings
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col">
        {/* Your ClientProviders should already contain the ThemeProvider */}
        <NextIntlClientProvider>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
