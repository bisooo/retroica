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
      } md:block w-full md:w-auto order-3 md:order-2 md:h-full`}
    >
      <ul className="flex flex-col md:flex-row h-full relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-600"></div>
        {categories.map((category, index) => (
          <li
            key={category.name}
            className={`
              relative flex items-center h-full
              ${
                index !== categories.length - 1
                  ? "after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-gray-600"
                  : ""
              }
            `}
          >
            <Link
              href={category.path}
              className={`
                flex items-center justify-center w-full h-full px-6 text-lg font-medium
                transition-colors duration-200
                hover:bg-gray-700
                ${
                  pathname === category.path ? "bg-gray-700 text-[#00FF00]" : ""
                }
              `}
              onClick={closeMobileMenu}
            >
              {category.name}
            </Link>
          </li>
        ))}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-600"></div>
      </ul>
    </nav>
  );
}
