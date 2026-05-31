"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider
      attribute="class" // For Dark/Light
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme={false} // 🎯 Stops next-themes from injecting structural script chunks mid-render
      {...props}
    >
      {mounted ? (
        children
      ) : (
        <div style={{ visibility: "hidden" }}>{children}</div>
      )}
    </NextThemesProvider>
  );
}
