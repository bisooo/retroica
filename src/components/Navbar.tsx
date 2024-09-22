"use client";

import { Logo } from "./navbar/Logo";
import { Navigation } from "./navbar/Navigation";
import { ActionButtons } from "./navbar/ActionButtons";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useCurrency } from "@/hooks/useCurrency";
import { NavCategory } from "@/types/navbar";

const navCategories: NavCategory[] = [
  { name: "CAMERAS", path: "/cameras" },
  { name: "CAM-CODERS", path: "/cam-coder" },
  { name: "CONTENT", path: "/content" },
];

export function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useMobileMenu();
  const { currency, changeCurrency, currencies } = useCurrency();

  return (
    <header className="border-b border-[#00FF00] bg-black text-[#CCCCCC]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
          <Logo />
          <Navigation
            categories={navCategories}
            isMobileMenuOpen={isMobileMenuOpen}
            closeMobileMenu={closeMobileMenu}
          />
          <ActionButtons
            currency={currency}
            currencies={currencies}
            changeCurrency={changeCurrency}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
      </div>
    </header>
  );
}
