"use client";

import useSettingStore from "@/store/use-setting-store";
import { useThemeStore } from "@/store/use-theme-store";
import { ClientSetting } from "@/types";

let initialized = false;

export default function AppInitializer({
  setting,
  children,
}: {
  setting: ClientSetting;
  children: React.ReactNode;
}) {
  if (!initialized) {
    useSettingStore.setState({
      setting,
    });

    const theme =
      typeof document !== "undefined"
        ? document.documentElement.getAttribute("data-theme") || "gold"
        : "gold";

    useThemeStore.setState({
      color: theme as "gold" | "green" | "red",
    });

    initialized = true;
  }

  return children;
}
