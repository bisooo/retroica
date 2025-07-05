"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MinimalNavbar() {
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
      <div className="border-b-2 border-black bg-white">
        <div className="flex items-center justify-between p-4">
          {/* Mobile menu */}
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link href="/">
            <h1 className="font-mono text-lg font-bold">RETRO-ICA</h1>
          </Link>

          {/* Right icons */}
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Popup */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />

          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white border-r-2 border-black">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-2 border-black">
              <h2 className="font-mono text-xl font-bold">CATEGORIES</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="p-6">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-4 px-6 font-mono text-sm border-2 border-black bg-white text-black hover:bg-gray-100 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
