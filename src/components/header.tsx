"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, User, ShoppingCart, Menu, X, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    name: "P&S FILM",
    href: "/cameras/point-shoot",
    subcategories: [
      { name: "35MM COMPACT", href: "/cameras/point-shoot" },
      { name: "WATERPROOF", href: "/cameras/point-shoot" },
      { name: "PANORAMIC", href: "/cameras/point-shoot" },
      { name: "INSTANT", href: "/cameras/point-shoot" },
      { name: "VINTAGE KODAK", href: "/cameras/point-shoot" },
      { name: "OLYMPUS MJU", href: "/cameras/point-shoot" },
    ],
  },
  {
    name: "SLR FILM",
    href: "/cameras/slr",
    subcategories: [
      { name: "CANON AE-1", href: "/cameras/slr" },
      { name: "NIKON FM", href: "/cameras/slr" },
      { name: "PENTAX K1000", href: "/cameras/slr" },
      { name: "MINOLTA X-700", href: "/cameras/slr" },
      { name: "OLYMPUS OM", href: "/cameras/slr" },
      { name: "LEICA R", href: "/cameras/slr" },
    ],
  },
  {
    name: "Y2K DIGITAL",
    href: "/cameras/digital",
    subcategories: [
      { name: "EARLY 2000S", href: "/cameras/digital" },
      { name: "FLIP SCREEN", href: "/cameras/digital" },
      { name: "COMPACT DIGITAL", href: "/cameras/digital" },
      { name: "SONY MAVICA", href: "/cameras/digital" },
      { name: "CANON POWERSHOT", href: "/cameras/digital" },
      { name: "FUJI FINEPIX", href: "/cameras/digital" },
    ],
  },
  {
    name: "CAMCORDER",
    href: "/cameras/camcorder",
    subcategories: [
      { name: "8MM TAPES", href: "/cameras/camcorder" },
      { name: "MINI DV", href: "/cameras/camcorder" },
      { name: "VHS-C", href: "/cameras/camcorder" },
      { name: "DIGITAL8", href: "/cameras/camcorder" },
      { name: "SONY HANDYCAM", href: "/cameras/camcorder" },
      { name: "PANASONIC", href: "/cameras/camcorder" },
    ],
  },
  {
    name: "SUPER8",
    href: "/cameras/super8",
    subcategories: [
      { name: "KODAK SUPER8", href: "/cameras/super8" },
      { name: "CANON SUPER8", href: "/cameras/super8" },
      { name: "NIZO SUPER8", href: "/cameras/super8" },
      { name: "BOLEX", href: "/cameras/super8" },
      { name: "FILM CARTRIDGES", href: "/cameras/super8" },
      { name: "PROJECTORS", href: "/cameras/super8" },
    ],
  },
  {
    name: "ACCESSORIES",
    href: "/cameras/accessories",
    subcategories: [
      { name: "CAMERA BAGS", href: "/cameras/accessories" },
      { name: "FILM ROLLS", href: "/cameras/accessories" },
      { name: "FLASH UNITS", href: "/cameras/accessories" },
      { name: "TRIPODS", href: "/cameras/accessories" },
      { name: "LENS FILTERS", href: "/cameras/accessories" },
      { name: "CLEANING KITS", href: "/cameras/accessories" },
    ],
  },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mobileSubcategory, setMobileSubcategory] = useState<string | null>(null)

  const getVisualElement = () => {
    // Consistent visual element for all categories
    return (
      <div className="w-full h-44 border-2 border-black bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <div className="absolute inset-6 border border-gray-300 transform rotate-12"></div>
        <div className="absolute inset-8 border border-gray-400 transform -rotate-6"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-gray-600 rounded-full">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    )
  }

  const handleMouseEnterNav = (itemName: string) => {
    setHoveredItem(itemName)
  }

  const handleMouseLeaveContainer = () => {
    setHoveredItem(null)
  }

  const handleMessageAreaEnter = () => {
    setHoveredItem(null)
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <header className="border-b-2 border-black">
          <div className="container mx-auto px-4">
            {/* Top message bar with scrolling animation */}
            <div className="border-b border-black py-2 overflow-hidden relative" onMouseEnter={handleMessageAreaEnter}>
              <div className="animate-scroll-left font-mono text-sm whitespace-nowrap">
                "MESSAGE" • WELCOME TO RETRO-ICA • FREE SHIPPING ON ORDERS OVER $100 • AUTHENTIC VINTAGE CAMERAS •
                "MESSAGE"
              </div>
            </div>

            {/* Main header */}
            <div className="flex items-center justify-between py-4">
              {/* Mobile menu */}
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>

              {/* Logo */}
              <Link href="/" className="flex-1 lg:flex-none">
                <div className="text-center lg:text-left">
                  <h1 className="font-mono text-xl font-bold">RETRO-ICA</h1>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8 font-mono text-sm relative">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <div key={item.name} className="relative" onMouseEnter={() => handleMouseEnterNav(item.name)}>
                      <Link
                        href={item.href}
                        className={`hover:underline transition-all ${
                          isActive ? "underline font-bold text-black" : "text-gray-700"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </div>
                  )
                })}
              </nav>

              {/* Right icons */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
            className="hidden lg:block absolute top-full left-0 w-full bg-white border-b-2 border-black shadow-lg z-50 animate-fade-in"
            onMouseLeave={handleMouseLeaveContainer}
          >
            <div className="container mx-auto px-4 border-t-2 border-black">
              <div className="flex">
                {/* Left 2/3 - Subcategories */}
                <div className="w-2/3 py-5 pr-6">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {navItems
                      .find((item) => item.name === hoveredItem)
                      ?.subcategories.map((sub, index) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block font-mono text-sm hover:underline text-gray-700 hover:text-black transition-all animate-fade-in-sequence py-1"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {sub.name}
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Right 1/3 - Visual */}
                <div
                  key={hoveredItem}
                  className="w-1/3 py-5 pl-6 border-l-2 border-black animate-fade-in-sequence"
                  style={{ animationDelay: "600ms" }}
                >
                  {getVisualElement()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation Popup */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />

          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white border-r-2 border-black overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-black">
              {mobileSubcategory ? (
                <>
                  <Button variant="ghost" size="icon" onClick={() => setMobileSubcategory(null)} className="mr-2">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="font-mono text-lg font-bold flex-1">{mobileSubcategory}</h2>
                </>
              ) : (
                <h2 className="font-mono text-lg font-bold">CATEGORIES</h2>
              )}
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Content */}
            <div className="p-4">
              {!mobileSubcategory ? (
                /* Main Categories */
                <div className="space-y-4">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href
                    return (
                      <button
                        key={item.name}
                        onClick={() => setMobileSubcategory(item.name)}
                        className={`block w-full text-left py-3 px-4 font-mono text-sm border-2 border-black transition-all animate-slide-in-top ${
                          isActive ? "bg-black text-white font-bold" : "bg-white text-black hover:bg-gray-100"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {item.name}
                      </button>
                    )
                  })}
                </div>
              ) : (
                /* Subcategories */
                <div className="space-y-6">
                  {/* Subcategory Links */}
                  <div className="space-y-3">
                    {navItems
                      .find((item) => item.name === mobileSubcategory)
                      ?.subcategories.map((sub, index) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block py-2 px-4 font-mono text-sm border border-black bg-white text-black hover:bg-gray-100 transition-all animate-slide-in-top"
                          style={{ animationDelay: `${index * 80}ms` }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                  </div>

                  {/* Visual Element */}
                  <div className="animate-slide-in-top" style={{ animationDelay: "400ms" }}>
                    {getVisualElement()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
