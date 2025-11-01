"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ThemeToggle from "./theme-toggle"
import MobileNavigationMenu from "./mobile-navigation-menu"
import SearchModal from "./search-modal"
import DesktopSearch from "./desktop-search"
import { navItems } from "@/lib/navigation-data"

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [desktopSearchActive, setDesktopSearchActive] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (hoveredItem) {
        setHoveredItem(null)
      }
      if (desktopSearchActive) {
        setDesktopSearchActive(false)
        setSearchResults([])
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (hoveredItem && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setHoveredItem(null)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("touchstart", handleTouchStart)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("touchstart", handleTouchStart)
    }
  }, [hoveredItem, desktopSearchActive])

  const getVisualElement = (categoryName?: string) => {
    const category = navItems.find((item) => item.name === categoryName)
    const imageSrc = category?.gif || "/images/film-can.avif"

    return (
      <div className="w-full h-44 border-2 border-black dark:border-white relative overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={categoryName ? `${categoryName} equipment` : "Camera equipment"}
          fill
          className="object-cover"
          sizes="400px"
          unoptimized={imageSrc.endsWith(".gif")}
        />
      </div>
    )
  }

  const handleMouseEnterNav = (itemName: string) => {
    setDesktopSearchActive(false)
    setSearchResults([])
    setHoveredItem(itemName)
  }

  const handleMouseLeaveContainer = () => {
    setHoveredItem(null)
  }

  const handleMessageAreaEnter = () => {
    setHoveredItem(null)
  }

  const handleLinkClick = () => {
    setHoveredItem(null)
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-white dark:bg-black">
        <header className="border-b-2 border-black dark:border-white">
          <div className="container mx-auto px-4">
            {/* Top message bar with scrolling animation */}
            <div
              className="border-b border-black dark:border-white py-2 overflow-hidden relative"
              onMouseEnter={handleMessageAreaEnter}
            >
              <div className="animate-scroll-left font-mono text-sm whitespace-nowrap text-black dark:text-white">
                "MESSAGE" • WELCOME TO RETRO-ICA • FREE SHIPPING ON ORDERS OVER $100 • AUTHENTIC VINTAGE CAMERAS •
                "MESSAGE"
              </div>
            </div>

            {/* Main header */}
            <div className="flex items-center justify-between py-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Logo and Theme Toggle Container */}
              <div className="flex items-center space-x-4 flex-1 lg:flex-none">
                <Link href="/">
                  <div className="text-center lg:text-left">
                    <h1 className="font-mono text-xl font-bold text-black dark:text-white">RETRO-ICA</h1>
                  </div>
                </Link>
                {/* Desktop Theme Toggle */}
                <div className="hidden lg:block">
                  <ThemeToggle variant="desktop" />
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8 font-mono text-sm relative">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <div key={item.name} className="relative" onMouseEnter={() => handleMouseEnterNav(item.name)}>
                      <Link
                        href={item.href}
                        className={`hover:underline transition-all ${
                          isActive
                            ? "underline font-bold text-black dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </div>
                  )
                })}
              </nav>

              {/* Right icons */}
              <div className="flex items-center space-x-4 relative">
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
                  className="lg:hidden text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setSearchOpen(true)}
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
        </header>

        {/* Full-width Desktop Dropdown */}
        {hoveredItem && (
          <div
            ref={dropdownRef}
            className="hidden lg:block absolute top-full left-0 w-full bg-white dark:bg-black border-b-2 border-black dark:border-white shadow-lg z-50 animate-fade-in"
            onMouseLeave={handleMouseLeaveContainer}
          >
            <div className="container mx-auto px-4 border-t-2 border-black dark:border-white">
              <div className="flex">
                {/* Left 2/3 - Split Categories */}
                <div className="w-2/3 py-5 pr-6">
                  {navItems.find((item) => item.name === hoveredItem)?.name === "ACCESSORIES" ? (
                    /* Accessories - Single Column */
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      {navItems
                        .find((item) => item.name === hoveredItem)
                        ?.subcategories?.map((sub, index) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={handleLinkClick}
                            className="block font-mono text-sm hover:underline text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all animate-fade-in-sequence py-1"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                    </div>
                  ) : (
                    /* Photo/Video/Music - Analog/Digital Split */
                    <div className="grid grid-cols-2 gap-x-8">
                      {/* Analog Column */}
                      <div>
                        <Link
                          href={`${navItems.find((item) => item.name === hoveredItem)?.href}-analog`}
                          onClick={handleLinkClick}
                          className="font-mono text-sm font-bold mb-3 text-black dark:text-white border-b border-black dark:border-white pb-1 block hover:underline animate-fade-in-sequence"
                          style={{ animationDelay: "0ms" }}
                        >
                          ANALOG
                        </Link>
                        {navItems
                          .find((item) => item.name === hoveredItem)
                          ?.analog?.map((sub, index) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={handleLinkClick}
                              className="block font-mono text-sm hover:underline text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all animate-fade-in-sequence py-1"
                              style={{ animationDelay: `${(index + 1) * 100}ms` }}
                            >
                              {sub.name}
                            </Link>
                          ))}
                      </div>

                      {/* Digital Column */}
                      <div>
                        <Link
                          href={`${navItems.find((item) => item.name === hoveredItem)?.href}-digital`}
                          onClick={handleLinkClick}
                          className="font-mono text-sm font-bold mb-3 text-black dark:text-white border-b border-black dark:border-white pb-1 block hover:underline animate-fade-in-sequence"
                          style={{ animationDelay: "0ms" }}
                        >
                          DIGITAL
                        </Link>
                        {navItems
                          .find((item) => item.name === hoveredItem)
                          ?.digital?.map((sub, index) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={handleLinkClick}
                              className="block font-mono text-sm hover:underline text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all animate-fade-in-sequence py-1"
                              style={{ animationDelay: `${(index + 1) * 100}ms` }}
                            >
                              {sub.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right 1/3 - Visual */}
                <div
                  key={hoveredItem}
                  className="w-1/3 py-5 pl-6 border-l-2 border-black dark:border-white animate-fade-in-sequence"
                  style={{ animationDelay: "600ms" }}
                >
                  {getVisualElement(hoveredItem)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results Dropdown */}
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
                        <div className="font-mono text-sm font-medium text-black dark:text-white line-clamp-2 min-h-[2.5rem]">
                          {product.title}
                        </div>
                        <div className="font-mono text-sm text-gray-600 dark:text-gray-400 mt-2">
                          €{product.price.toFixed(2)}
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

      <MobileNavigationMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <ThemeToggle variant="mobile" />
      </MobileNavigationMenu>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
