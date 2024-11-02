import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Currency } from "@/types/navbar";

interface ActionButtonsProps {
  currency: Currency;
  currencies: Currency[];
  changeCurrency: (code: string) => void;
  toggleMobileMenu: () => void;
}

const getCurrencySymbol = (code: string): string => {
  switch (code) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "CZK":
      return "Kč";
    default:
      return code;
  }
};

export function ActionButtons({
  currency,
  currencies,
  changeCurrency,
  toggleMobileMenu,
}: ActionButtonsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-center space-x-4 order-2 md:order-3">
      <div className="relative">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              ref={triggerRef}
              variant="ghost"
              size="icon"
              className="text-[#CCCCCC] hover:text-[#00FF00] w-10 h-10"
            >
              <span className="text-lg font-bold">
                {getCurrencySymbol(currency.code)}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-black border-[#00FF00] absolute right-0 mt-2"
            style={{
              zIndex: 1000,
            }}
          >
            {currencies.map((c) => (
              <DropdownMenuItem
                key={c.code}
                onSelect={() => changeCurrency(c.code)}
                className={`justify-center text-[#CCCCCC] hover:bg-[#00FF00] hover:text-black ${
                  currency.code === c.code ? "bg-[#00FF00] text-black" : ""
                }`}
              >
                <span className="mr-2">{getCurrencySymbol(c.code)}</span>
                {c.code}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-[#CCCCCC] hover:text-[#00FF00]"
      >
        <ShoppingCartIcon className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-[#CCCCCC] hover:text-[#00FF00]"
        onClick={toggleMobileMenu}
      >
        <MenuIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}
