"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { X, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { navItems } from "@/lib/navigation-data"

interface MobileNavigationMenuProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

export default function MobileNavigationMenu({ isOpen, onClose, children }: MobileNavigationMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const currentCategory = navItems.find((item) => item.name === activeCategory)

  const renderSubcategoryLink = (sub: { name: string; href: string }, index: number, isIndented = false) => (
    <Link
      key={sub.name}
      href={sub.href}
      className={`block py-2 px-4 font-mono text-sm border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all animate-slide-in-top ${isIndented ? "ml-4" : ""}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={onClose}
    >
      {sub.name}
    </Link>
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-black border-r-2 border-black dark:border-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-black dark:border-white flex-shrink-0">
          {activeCategory && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveCategory(null)}
              className="mr-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <h2 className="font-mono text-lg font-bold flex-1 text-black dark:text-white">
            {activeCategory || "CATEGORIES"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col min-h-0">
          {!activeCategory ? (
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setActiveCategory(item.name)}
                  className="block w-full text-left py-3 px-4 font-mono text-sm border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all animate-slide-in-top"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6 flex-1 flex flex-col min-h-0">
              <div className="space-y-3 flex-shrink-0">
                <Link
                  href={currentCategory?.href || "#"}
                  className="block py-2 px-4 font-mono text-sm border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-all animate-slide-in-top font-bold"
                  onClick={onClose}
                >
                  ALL {activeCategory}
                </Link>

                {currentCategory?.subcategories ? (
                  currentCategory.subcategories.map((sub, i) => renderSubcategoryLink(sub, i + 1))
                ) : (
                  <>
                    <Link
                      href={`${currentCategory?.href}?type=analog`}
                      className="block py-2 px-4 font-mono text-sm border-2 border-black dark:border-white bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all animate-slide-in-top font-bold"
                      style={{ animationDelay: "80ms" }}
                      onClick={onClose}
                    >
                      ALL ANALOG
                    </Link>
                    {currentCategory?.analog?.map((sub, i) => renderSubcategoryLink(sub, i + 2, true))}

                    <Link
                      href={`${currentCategory?.href}?type=digital`}
                      className="block py-2 px-4 font-mono text-sm border-2 border-black dark:border-white bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all animate-slide-in-top font-bold mt-4"
                      style={{ animationDelay: `${((currentCategory?.analog?.length || 0) + 3) * 80}ms` }}
                      onClick={onClose}
                    >
                      ALL DIGITAL
                    </Link>
                    {currentCategory?.digital?.map((sub, i) =>
                      renderSubcategoryLink(sub, (currentCategory?.analog?.length || 0) + i + 4, true),
                    )}
                  </>
                )}
              </div>

              <div className="animate-slide-in-top flex-shrink-0 mt-auto" style={{ animationDelay: "400ms" }}>
                <div className="w-full h-44 border-2 border-black dark:border-white relative overflow-hidden">
                  <Image
                    src={currentCategory?.gif || "/images/film-can.avif"}
                    alt={`${activeCategory} equipment`}
                    fill
                    className="object-cover"
                    sizes="400px"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {children && <div className="p-4 border-t-2 border-black dark:border-white flex-shrink-0">{children}</div>}
      </div>
    </div>
  )
}
