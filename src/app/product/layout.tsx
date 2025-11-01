import type React from "react"

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-white dark:bg-black">{children}</div>
}
