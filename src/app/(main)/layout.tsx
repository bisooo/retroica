import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WelcomePopup from "@/components/welcome-popup"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      {children}
      <Footer />
      <WelcomePopup />
    </div>
  )
}
