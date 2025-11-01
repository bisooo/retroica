import type React from "react"
import ScrollToTop from "@/components/scroll-to-top"

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen bg-white dark:bg-black overflow-hidden">
      <ScrollToTop />
      {children}
    </div>
  )
}
