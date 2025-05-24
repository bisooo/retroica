"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "P&S FILM", href: "/cameras/point-shoot" },
    { name: "SLR FILM", href: "/cameras/slr" },
    { name: "Y2K DIGITAL", href: "/cameras/digital" },
    { name: "CAMCORDER", href: "/cameras/camcorder" },
    { name: "SUPER8", href: "/cameras/super8" },
    { name: "ACCESSORIES", href: "/cameras/accessories" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 border-b-2 border-black bg-white">
        <div className="container mx-auto px-4">
          {/* Top message bar with scrolling animation */}
          <div className="border-b border-black py-2 overflow-hidden relative">
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
                <div className="border-2 border-black px-4 py-2 font-mono text-xl font-bold inline-block transform -rotate-1">
                  RETRO-ICA
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 font-mono text-sm">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`hover:underline transition-all ${
                      isActive ? "underline font-bold text-black" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
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

      {/* Mobile Navigation Popup */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />

          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white border-r-2 border-black">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-black">
              <h2 className="font-mono text-lg font-bold">CATEGORIES</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="p-4">
              <div className="space-y-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block py-3 px-4 font-mono text-sm border-2 border-black transition-all ${
                        isActive ? "bg-black text-white font-bold" : "bg-white text-black hover:bg-gray-100"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
