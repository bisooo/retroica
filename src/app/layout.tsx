import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/hooks/use-theme"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CartProvider } from "@/lib/contexts/cart-context"
import { CurrencyProvider } from "@/lib/contexts/currency-context"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  metadataBase: new URL("https://retroica.com"),
  title: {
    default: "RETRO-ICA | Authentic Vintage Electronics",
    template: "%s | RETRO-ICA",
  },
  description:
    "Shop authentic, tested, retro electronics at RETRO-ICA. Point and shoot cameras, medium format cameras, iPods, cassette players, camcorders, and vintage audio equipment.",
  keywords: [
    "vintage electronics",
    "retro electronics",
    "point and shoot camera",
    "film camera",
    "vintage camera",
    "medium format camera",
    "SLR camera",
    "APS camera",
    "digital camera",
    "y2k camera",
    "iPod",
    "Walkman",
    "cassette player",
    "vintage audio",
    "camcorder",
    "vintage video camera",
    "retro gaming",
    "gameboy",
    "compact camera",
    "pocket camera",
    "sony camera",
    "olympus mju",
    "kodak camera",
    "boombox",
    "vinyl player",
  ],
  authors: [{ name: "RETRO-ICA" }],
  creator: "RETRO-ICA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://retroica.com",
    siteName: "RETRO-ICA",
    title: "RETRO-ICA | Authentic Vintage Electronics",
    description:
      "Shop authentic, tested, retro electronics. Point and shoot cameras, medium format cameras, iPods, cassette players, camcorders, and vintage audio equipment.",
    images: [
      {
        url: "/images/film-can.avif",
        width: 1200,
        height: 630,
        alt: "RETRO-ICA - Authentic Vintage Electronics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RETRO-ICA | Authentic Vintage Electronics",
    description:
      "Shop authentic, tested, retro electronics. Point and shoot cameras, iPods, cassette players, camcorders, and more.",
    images: ["/images/film-can.avif"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="retro-ica-theme">
          <CurrencyProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </CurrencyProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
