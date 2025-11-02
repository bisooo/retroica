"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNavigationMenu from "./mobile-navigation-menu"
import SearchModal from "./search-modal"
import DesktopSearch from "./desktop-search"
import Image from "next/image"

export default function MinimalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [desktopSearchActive, setDesktopSearchActive] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  return (
    <>
      <div className="sticky top-0 z-50 bg-white dark:bg-black">
        <div className="border-b-2 border-black dark:border-white">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/">
              <h1 className="font-helvicta text-lg font-bold text-black dark:text-white">RETRO-ICA</h1>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="hidden lg:block">
                <DesktopSearch
                  isActive={desktopSearchActive}
                  onActiveChange={setDesktopSearchActive}
                  onResultsChange={setSearchResults}
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="lg:hidden text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              </Button>
            </div>
          </div>
        </div>

        {desktopSearchActive && searchResults.length > 0 && (
          <div className="hidden lg:block absolute top-full left-0 w-full bg-white dark:bg-black border-b-2 border-black dark:border-white shadow-lg z-50 animate-fade-in">
            <div className="container mx-auto px-4 border-t-2 border-black dark:border-white">
              <div className="py-5">
                <div className="grid grid-cols-6 gap-4">
                  {searchResults.map((product, index) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.handle}`}
                      onClick={() => {
                        setDesktopSearchActive(false)
                        setSearchResults([])
                      }}
                      className="border-2 border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors animate-fade-in-sequence"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative aspect-square border-b-2 border-black dark:border-white">
                        <Image
                          src={product.thumbnail || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </div>
                      <div className="p-3">
                        <div className="font-helvicta text-sm font-medium text-black dark:text-white line-clamp-2 min-h-[2.5rem]">
                          {product.title}
                        </div>
                        <div className="font-business text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {product.currencySymbol}
                          {product.price.toFixed(2)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <MobileNavigationMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
