"use client";

import * as React from "react";
import { Moon, Sun, Check, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useThemeStore } from "@/store/use-theme-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function ThemeColorSwitcher() {
  const { theme, setTheme } = useTheme();
  const { color, setColor } = useThemeStore();
  const [mounted, setMounted] = React.useState(false);

  //Using Zustand (store/use-theme-store.ts) to implement switching between colors[gold,green,red]
  // Sync Zustand state with DOM on mount
  React.useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute("data-theme", color);
  }, [color]);

  if (!mounted) return <div className="h-9 w-28" />;

  const colorOptions = [
    { name: "Gold", value: "gold" as const, tw: "bg-yellow-400" },
    { name: "Green", value: "green" as const, tw: "bg-green-600" },
    { name: "Red", value: "red" as const, tw: "bg-red-600" },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 px-3 gap-2 border border-white/20 transition-all duration-500"
        >
          {/* {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />} */}
          <div className="relative h-[1.2rem] w-[1.2rem]">
            {theme === "dark" ? (
              <Moon className="absolute scale-100 transition-all rotate-0" />
            ) : (
              <Sun className="absolute scale-100 transition-all rotate-0" />
            )}
          </div>
          <span className="capitalize hidden sm:block">{theme}</span>
          <ChevronDown size={14} className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Moon size={14} /> Dark
          </div>
          {theme === "dark" && <Check size={14} className="text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Sun size={14} /> Light
          </div>
          {theme === "light" && <Check size={14} className="text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Accent Color</DropdownMenuLabel>
        {colorOptions.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => setColor(opt.value)}
            className="justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${opt.tw}`} />
              {opt.name}
            </div>
            {color === opt.value && (
              <Check size={14} className="text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

////////////////////////////////////

// "use client";

// import * as React from "react";
// import { Moon, Sun, Check, ChevronDown } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useColorTheme } from "@/hooks/use-theme-color";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";

// export function ThemeColorSwitcher() {
// Using useColorTheme hook with useState, useEffect  from "react"
// to implement switching between colors[gold,green,red]
//   const { theme, setTheme } = useTheme();
//   const { color, setAccentColor } = useColorTheme();
//   const [mounted, setMounted] = React.useState(false);

//   // Prevent hydration mismatch: icons won't flicker on load
//   React.useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <Button variant="ghost" className="h-9 w-24 border border-white/20" />
//     );
//   }

//   const colorOptions = [
//     { name: "Gold", value: "gold", hex: "bg-yellow-400" },
//     { name: "Green", value: "green", hex: "bg-green-600" },
//     { name: "Red", value: "red", hex: "bg-red-600" },
//   ];

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="ghost"
//           className="h-9 px-3 gap-2 border border-white/20 outline-none"
//         >
//           {/* This icon now correctly reflects the current theme state */}
//           {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
//           <span className="capitalize">{theme}</span>
//           <ChevronDown size={14} className="opacity-50" />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="end" className="w-48">
//         <DropdownMenuLabel>Appearance</DropdownMenuLabel>
//         <DropdownMenuItem
//           onClick={() => setTheme("dark")}
//           className="flex justify-between items-center cursor-pointer"
//         >
//           <div className="flex items-center gap-2">
//             <Moon size={14} /> Dark
//           </div>
//           {theme === "dark" && <Check size={14} className="text-primary" />}
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={() => setTheme("light")}
//           className="flex justify-between items-center cursor-pointer"
//         >
//           <div className="flex items-center gap-2">
//             <Sun size={14} /> Light
//           </div>
//           {theme === "light" && <Check size={14} className="text-primary" />}
//         </DropdownMenuItem>

//         <DropdownMenuSeparator />

//         <DropdownMenuLabel>Accent Color</DropdownMenuLabel>
//         {colorOptions.map((opt) => (
//           <DropdownMenuItem
//             key={opt.value}
//             onClick={() => setAccentColor(opt.value)}
//             className="flex justify-between items-center cursor-pointer"
//           >
//             <div className="flex items-center gap-2">
//               <div className={`w-3 h-3 rounded-full ${opt.hex}`} />
//               {opt.name}
//             </div>
//             {color === opt.value && (
//               <Check size={14} className="text-primary" />
//             )}
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
