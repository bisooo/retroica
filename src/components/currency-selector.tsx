"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { getCurrencySymbol } from "@/lib/utils/currency"

const CURRENCIES = [
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
]

export default function CurrencySelector() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState("EUR")

  useEffect(() => {
    // Get currency from URL or localStorage
    const urlCurrency = searchParams.get("currency")
    const storedCurrency = typeof window !== "undefined" ? localStorage.getItem("preferred_currency") : null

    if (urlCurrency) {
      setSelectedCurrency(urlCurrency.toUpperCase())
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred_currency", urlCurrency.toUpperCase())
      }
    } else if (storedCurrency) {
      setSelectedCurrency(storedCurrency)
    }
  }, [searchParams])

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode)
    setIsOpen(false)

    // Store preference
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred_currency", currencyCode)
      window.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency: currencyCode } }))
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set("currency", currencyCode.toLowerCase())
    window.history.replaceState({}, '', `${pathname}?${params.toString()}`)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        title="Change currency"
      >
        <Globe className="h-5 w-5" />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-black border-2 border-black dark:border-white shadow-lg z-50 animate-fade-in">
            <div className="p-2">
              <div className="font-helvicta text-xs font-bold px-3 py-2 border-b border-black dark:border-white">
                SELECT CURRENCY
              </div>
              {CURRENCIES.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencyChange(currency.code)}
                  className={`w-full text-left px-3 py-2 font-business text-sm hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors flex items-center justify-between ${
                    selectedCurrency === currency.code ? "font-bold bg-gray-50 dark:bg-gray-900" : ""
                  }`}
                >
                  <span>
                    {currency.name} ({currency.symbol})
                  </span>
                  {selectedCurrency === currency.code && <span className="text-xs">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
