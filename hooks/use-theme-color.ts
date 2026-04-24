// Using useColorTheme hook with useState, useEffect  from "react"
// to implement switching between colors[gold,green,red]
// ,But I have already implemented the logic with Zustand store ["@/store/use-theme-store"]
"use client";

import { useEffect, useState } from "react";

export function useColorTheme() {
  const [color, setColor] = useState("gold");

  useEffect(() => {
    const savedColor = localStorage.getItem("accent-color") || "gold";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColor(savedColor);
    document.documentElement.setAttribute("data-theme", savedColor);
  }, []);

  const setAccentColor = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("accent-color", newColor);
    document.documentElement.setAttribute("data-theme", newColor);
  };

  return { color, setAccentColor };
}
