"use client"

import { useEffect } from "react"

export function ScrollLock() {
  useEffect(() => {
    // Lock body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"

    // Prevent scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    // Scroll to top immediately
    window.scrollTo(0, 0)

    return () => {
      // Restore original overflow
      document.body.style.overflow = originalStyle
      document.documentElement.style.overflow = ""

      // Restore scroll restoration
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto"
      }
    }
  }, [])

  return null
}
