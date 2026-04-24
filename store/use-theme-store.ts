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
      setColor: (color) => {
        // Update DOM attribute for CSS selectors
        document.documentElement.setAttribute("data-theme", color);
        set({ color });
      },
    }),
    {
      name: "accent-color-storage", // key in localStorage
    },
  ),
);
