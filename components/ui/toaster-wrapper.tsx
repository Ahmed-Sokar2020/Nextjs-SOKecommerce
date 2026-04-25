"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

export function ToasterWrapper() {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group-[.toaster]:text-green-600 dark:group-[.toaster]:text-green-400",
          error:
            "group-[.toaster]:text-red-600 dark:group-[.toaster]:text-red-400",
        },
      }}
    />
  );
}
