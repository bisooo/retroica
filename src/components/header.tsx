"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, User, ShoppingCart, Menu, X, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ThemeToggle from "./theme-toggle"

const navItems = [
  {
    name: "PHOTO",
    href: "/photo",
    analog: [
      { name: "POINT & SHOOT (35mm)", href: "/photo?subcategory=point-shoot" },
      { name: "MEDIUM FORMAT (120mm)", href: "/photo?subcategory=medium-format" },
      { name: "APS", href: "/photo?subcategory=aps" },
      { name: "SLR", href: "/photo?subcategory=slr" },
    ],
    digital: [
      { name: "POCKET DIGICAM", href: "/photo?subcategory=pocket-digicam" },
      { name: "SONY DIGICAM", href: "/photo?subcategory=sony-digicam" },
      { name: "SUPERZOOM DIGICAM", href: "/photo?subcategory=superzoom-digicam" },
      { name: "DSLR", href: "/photo?subcategory=dslr" },
    ],
  },
  {
    name: "VIDEO",
    href: "/video",
    analog: [
      { name: "SUPER 8 (8mm)", href: "/video?subcategory=super8" },
      { name: "FILM MOVIE (16mm)", href: "/video?subcategory=film-movie" },
    ],
    digital: [
      { name: "CAMCODER TAPE", href: "/video?subcategory=camcoder-tape" },
      { name: "CAMCODER DVD", href: "/video?subcategory=camcoder-dvd" },
      { name: "CAMCODER SD/HDD", href: "/video?subcategory=camcoder-sd" },
    ],
  },
  {
    name: "MUSIC",
    href: "/music",
    analog: [
      { name: "CASSETTE PLAYERS", href: "/music?subcategory=cassette" },
      { name: "VINYL PLAYERS", href: "/music?subcategory=vinyl" },
      { name: "BOOMBOX", href: "/music?subcategory=boombox" },
    ],
    digital: [
      { name: "IPODs", href: "/music?subcategory=ipods" },
      { name: "CD PLAYERS", href: "/music?subcategory=cd-players" },
      { name: "SPEAKERS", href: "/music?subcategory=speakers" },
    ],
  },
  {
    name: "ACCESSORIES",
    href: "/accessories",
    subcategories: [
      { name: "CAMERA BAGS", href: "/accessories?subcategory=bags" },
      { name: "FILM ROLLS", href: "/accessories?subcategory=film" },
      { name: "FLASH UNITS", href: "/accessories?subcategory=flash" },
      { name: "TRIPODS", href: "/accessories?subcategory=tripods" },
      { name: "LENS FILTERS", href: "/accessories?subcategory=filters" },
      { name: "CLEANING KITS", href: "/accessories?subcategory=cleaning" },
    ],
  },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mobileSubcategory, setMobileSubcategory] = useState<string | null>(null)

  const getVisualElement = (categoryName?: string) => {
    const getGifForCategory = (category: string) => {
      switch (category) {
        case "PHOTO":
          return "/gifs/point-shoot.gif"
        case "VIDEO":
          return "/gifs/camcoder.gif"
        case "MUSIC":
          return "/images/cassette.jpg"
        case "ACCESSORIES":
          return "/gifs/accessories.gif"
        default:
          return "/images/film-can.avif"
      }
    }

    const imageSrc = categoryName ? getGifForCategory(categoryName) : "/images/film-can.avif"

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
              {/* Mobile menu */}
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
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <User className="h-5 w-5" />
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
                          href={`${navItems.find((item) => item.name === hoveredItem)?.href}?type=analog`}
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
                          href={`${navItems.find((item) => item.name === hoveredItem)?.href}?type=digital`}
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
      </div>

      {/* Mobile Navigation Popup */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />

          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-black border-r-2 border-black dark:border-white flex flex-col">
            {/* Header - Fixed */}
            <div className="flex items-center justify-between p-4 border-b-2 border-black dark:border-white flex-shrink-0">
              {mobileSubcategory ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileSubcategory(null)}
                    className="mr-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="font-mono text-lg font-bold flex-1 text-black dark:text-white">{mobileSubcategory}</h2>
                </>
              ) : (
                <h2 className="font-mono text-lg font-bold text-black dark:text-white">CATEGORIES</h2>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              {!mobileSubcategory ? (
                /* Main Categories */
                <div className="space-y-4">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href
                    return (
                      <button
                        key={item.name}
                        onClick={() => setMobileSubcategory(item.name)}
                        className={`block w-full text-left py-3 px-4 font-mono text-sm border-2 border-black dark:border-white transition-all animate-slide-in-top ${
                          isActive
                            ? "bg-black dark:bg-white text-white dark:text-black font-bold"
                            : "bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
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
                  <div className="space-y-3">
                    {/* ALL option first */}
                    <Link
                      href={navItems.find((item) => item.name === mobileSubcategory)?.href || "#"}
                      className="block py-2 px-4 font-mono text-sm border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-all animate-slide-in-top font-bold"
                      style={{ animationDelay: "0ms" }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ALL {mobileSubcategory}
                    </Link>

                    {mobileSubcategory === "ACCESSORIES" ? (
                      /* Accessories - Regular subcategories */
                      navItems
                        .find((item) => item.name === mobileSubcategory)
                        ?.subcategories?.map((sub, index) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block py-2 px-4 font-mono text-sm border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all animate-slide-in-top"
                            style={{ animationDelay: `${(index + 1) * 80}ms` }}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))
                    ) : (
                      /* Photo/Video/Music - Analog/Digital sections */
                      <>
                        {/* ALL ANALOG */}
                        <Link
                          href={`${navItems.find((item) => item.name === mobileSubcategory)?.href}?type=analog`}
                          className="block py-2 px-4 font-mono text-sm border-2 border-black dark:border-white bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all animate-slide-in-top font-bold"
                          style={{ animationDelay: "80ms" }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          ALL ANALOG
                        </Link>

                        {/* Analog subcategories */}
                        {navItems
                          .find((item) => item.name === mobileSubcategory)
                          ?.analog?.map((sub, index) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block py-2 px-4 font-mono text-sm border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all animate-slide-in-top ml-4"
                              style={{ animationDelay: `${(index + 2) * 80}ms` }}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}

                        {/* ALL DIGITAL */}
                        <Link
                          href={`${navItems.find((item) => item.name === mobileSubcategory)?.href}?type=digital`}
                          className="block py-2 px-4 font-mono text-sm border-2 border-black dark:border-white bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all animate-slide-in-top font-bold mt-4"
                          style={{
                            animationDelay: `${(navItems.find((item) => item.name === mobileSubcategory)?.analog?.length || 0 + 3) * 80}ms`,
                          }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          ALL DIGITAL
                        </Link>

                        {/* Digital subcategories */}
                        {navItems
                          .find((item) => item.name === mobileSubcategory)
                          ?.digital?.map((sub, index) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block py-2 px-4 font-mono text-sm border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all animate-slide-in-top ml-4"
                              style={{
                                animationDelay: `${(navItems.find((item) => item.name === mobileSubcategory)?.analog?.length || 0 + index + 4) * 80}ms`,
                              }}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                      </>
                    )}
                  </div>

                  {/* Visual Element for Mobile */}
                  <div className="animate-slide-in-top" style={{ animationDelay: "400ms" }}>
                    {getVisualElement(mobileSubcategory)}
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle - Fixed at bottom */}
            <div className="p-4 border-t-2 border-black dark:border-white flex-shrink-0">
              <ThemeToggle variant="mobile" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
