"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const categories = [
  { name: "PHOTO", href: "/photo" },
  { name: "VIDEO", href: "/video" },
  { name: "MUSIC", href: "/music" },
  { name: "ACCESSORIES", href: "/accessories" },
]

export default function CategoryNavigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b-2 border-black bg-white hidden lg:block">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {categories.map((category) => {
            const isActive = pathname === category.href
            return (
              <Link
                key={category.name}
                href={category.href}
                className={`py-4 font-mono text-sm whitespace-nowrap transition-all ${
                  isActive ? "border-b-2 border-black font-bold text-black" : "hover:text-gray-600 text-gray-700"
                }`}
              >
                {category.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
