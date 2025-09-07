import type React from "react"

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-screen bg-white dark:bg-black overflow-hidden">{children}</div>
}
