import { create } from "zustand";

type Color = "gold" | "green" | "red";

interface ThemeState {
  color: Color;
  setColor: (color: Color) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  color: "gold",

  setColor: (newColor) => {
    set({ color: newColor });

    document.documentElement.setAttribute("data-theme", newColor);
  },
}));
