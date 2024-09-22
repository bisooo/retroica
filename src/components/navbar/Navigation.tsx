import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavCategory } from "@/types/navbar";

interface NavigationProps {
  categories: NavCategory[];
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

export function Navigation({
  categories,
  isMobileMenuOpen,
  closeMobileMenu,
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`${
        isMobileMenuOpen ? "block" : "hidden"
      } md:block w-full md:w-auto order-3 md:order-2`}
    >
      <ul className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
        {categories.map((category) => (
          <li key={category.name} className="mb-2 md:mb-0">
            <Link
              href={category.path}
              className={`
                block text-[#CCCCCC] px-3 py-2 rounded-md text-sm font-medium
                ${pathname === category.path ? "bg-[#00FF00] text-black" : ""}
              `}
              onClick={closeMobileMenu}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
