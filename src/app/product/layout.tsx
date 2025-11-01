import type React from "react"

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-dvh overflow-hidden bg-white dark:bg-black">{children}</div>
}
