"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, Suspense } from "react"
import { useSearchParams } from 'next/navigation'

interface CurrencyContextType {
  currency: string
  setCurrency: (currency: string) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

function CurrencyProviderInner({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const [currency, setCurrencyState] = useState("EUR")

  useEffect(() => {
    // Get currency from URL or localStorage
    const urlCurrency = searchParams.get("currency")
    const storedCurrency = typeof window !== "undefined" ? localStorage.getItem("preferred_currency") : null

    if (urlCurrency) {
      setCurrencyState(urlCurrency.toUpperCase())
    } else if (storedCurrency) {
      setCurrencyState(storedCurrency)
    }
  }, [searchParams])

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency)
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred_currency", newCurrency)
    }
    window.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency: newCurrency } }))
  }

  return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={
      <CurrencyContext.Provider value={{ currency: "EUR", setCurrency: () => {} }}>
        {children}
      </CurrencyContext.Provider>
    }>
      <CurrencyProviderInner>{children}</CurrencyProviderInner>
    </Suspense>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
