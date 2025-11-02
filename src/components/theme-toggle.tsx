"use client"

import { useTheme } from "@/hooks/use-theme"

interface ThemeToggleProps {
  variant?: "desktop" | "mobile"
}

export default function ThemeToggle({ variant = "desktop" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  if (variant === "mobile") {
    return (
      <button
        onClick={toggleTheme}
        className={`w-full py-3 px-4 font-helvicta text-sm border-2 transition-all ${
          theme === "dark"
            ? "bg-white text-black border-white hover:bg-gray-100"
            : "bg-black text-white border-black hover:bg-gray-800"
        }`}
      >
        {theme === "dark" ? "LIGHT MODE" : "DARK MODE"}
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors ${
        theme === "dark" ? "bg-white border-white" : "bg-black border-black"
      }`}
      aria-label="Toggle dark mode"
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full transition-transform ${
          theme === "dark" ? "translate-x-6 bg-black" : "translate-x-1 bg-white"
        }`}
      />
    </button>
  )
}
