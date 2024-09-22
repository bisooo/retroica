import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, MenuIcon, DollarSign } from "lucide-react";
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

export function ActionButtons({
  currency,
  currencies,
  changeCurrency,
  toggleMobileMenu,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center space-x-4 order-2 md:order-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#CCCCCC] hover:text-[#00FF00]"
          >
            <DollarSign className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-black border-[#00FF00]">
          {currencies.map((c) => (
            <DropdownMenuItem
              key={c.code}
              onSelect={() => changeCurrency(c.code)}
              className={`justify-center text-[#CCCCCC] hover:bg-[#00FF00] hover:text-black ${
                currency.code === c.code ? "bg-[#00FF00] text-black" : ""
              }`}
            >
              {c.code}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
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
