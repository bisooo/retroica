"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNavigationMenu from "./mobile-navigation-menu"

export default function MinimalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="border-b-2 border-black dark:border-white bg-white dark:bg-black">
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
            <h1 className="font-mono text-lg font-bold text-black dark:text-white">RETRO-ICA</h1>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileNavigationMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
