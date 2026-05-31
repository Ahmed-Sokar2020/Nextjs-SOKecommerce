"use client";

import useSettingStore from "@/store/use-setting-store";
import { ClientSetting } from "@/types";
import React, { useLayoutEffect } from "react";

export default function AppInitializer({
  setting,
  children,
}: {
  setting: ClientSetting;
  children: React.ReactNode;
}) {
  // 🎯 FIX: Move the Zustand state update safely out of the render pass.
  // This executes after React computes the elements but right BEFORE the browser paints the screen.
  useLayoutEffect(() => {
    useSettingStore.setState({
      setting,
    });
  }, [setting]); // Runs once on mount, and re-triggers only if the setting prop actually changes

  return children;
}
