//Using Zustand  (store/use-theme-store.ts) to implement switching between colors[gold,green,red]
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ColorTheme = "gold" | "green" | "red";

interface ThemeState {
  color: ColorTheme;
  setColor: (color: ColorTheme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      color: "gold", // Default
      setColor: (newColor) => {
        // Update DOM attribute for CSS selectors
        document.documentElement.setAttribute("data-theme", newColor);
        set({ color: newColor });
      },
    }),
    {
      name: "accent-color", // key in localStorage
    },
  ),
);
