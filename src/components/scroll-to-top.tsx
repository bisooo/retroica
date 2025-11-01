"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Use instant behavior to prevent smooth scrolling issues
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })

    // Also scroll after a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      // Also try to scroll any scrollable containers
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}
