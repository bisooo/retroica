"use client"

import { useState } from "react"
import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { MetadataService } from "@/lib/services/metadata.service"
import { getCurrencySymbol } from "@/lib/utils/currency"
import { getStarColor } from "@/lib/utils/rating"
import { useCart } from "@/lib/contexts/cart-context"
import { useCurrency } from "@/lib/contexts/currency-context"
import type { VariantPrice } from "@/lib/types/product.types"

interface ProductInfoProps {
  product: {
    id?: string
    variantId?: string
    name: string
    brand: string
    price: number
    currency: string
    condition: number
    year: string
    stockStatus: string
    rawMetadata?: Record<string, unknown>
    allPrices?: VariantPrice[]
  }
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { currency: selectedCurrency } = useCurrency()
  
  const [expandedSections, setExpandedSections] = useState({
    specs: true,
    deliveryIncludes: true,
  })

  const { addToCart, isLoading: cartLoading } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleAddToCart = async () => {
    if (!product.variantId) {
      console.error("[v0] No variant ID available for product")
      return
    }

    setIsAdding(true)
    try {
      await addToCart(product.variantId, 1)
    } finally {
      setIsAdding(false)
    }
  }

  const displayFields = product.rawMetadata ? MetadataService.getAllDisplayFields(product.rawMetadata) : {}

  const deliveryIncludes = product.rawMetadata?.delivery_includes as string | undefined

  const conditionStarsDesktop = Math.floor(product.condition)
  const conditionStarsMobile = Math.floor(product.condition / 2)
  const mobileRating = (product.condition / 2).toFixed(1)

  const starColor = getStarColor(product.condition)

  const priceInSelectedCurrency = product.allPrices?.find(
    (p) => p.currency_code.toLowerCase() === selectedCurrency.toLowerCase()
  )
  const displayPrice = (priceInSelectedCurrency?.amount || product.price).toFixed(2)
  const displayCurrency = priceInSelectedCurrency?.currency_code.toUpperCase() || product.currency || selectedCurrency.toUpperCase()

  return (
    <div className="h-full flex flex-col space-y-4 pt-4 overflow-y-auto">
      {/* Product Title and Year */}
      <div className="flex-shrink-0 flex items-start justify-between">
        <div>
          <h1 className="font-helvetica text-2xl font-bold mb-1 text-black dark:text-white">{product.name}</h1>
          <p className="font-business text-base text-gray-600 dark:text-gray-400 mb-2">{product.brand}</p>
        </div>
        <div className="text-right">
          <span className="font-business text-base text-black dark:text-white">{product.year}</span>
        </div>
      </div>

      {/* Product Description */}
      <div className="flex-shrink-0 font-helvetica text-xs leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="break-words">
          .....................................................................................................
        </p>
      </div>

      {/* Price, Condition, and Stock - Desktop Layout */}
      <div className="flex-shrink-0 hidden lg:flex lg:items-center lg:justify-between lg:space-x-4">
        {/* Price */}
        <div className="font-business text-xl font-bold text-black dark:text-white">
          {getCurrencySymbol(displayCurrency)}
          {displayPrice}
        </div>

        {/* Condition - Desktop 10 stars */}
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[...Array(10)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < conditionStarsDesktop ? starColor : "fill-gray-200 dark:fill-gray-600"}`}
              />
            ))}
          </div>
          <span className="font-business text-sm text-black dark:text-white">({product.condition})</span>
        </div>

        {/* Stock Status */}
        <div className="font-business text-sm text-black dark:text-white">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          {product.stockStatus}
        </div>
      </div>

      {/* Price and Condition - Mobile Layout */}
      <div className="flex-shrink-0 lg:hidden space-y-3">
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="font-business text-xl font-bold text-black dark:text-white">
            {getCurrencySymbol(displayCurrency)}
            {displayPrice}
          </div>

          {/* Condition - Mobile 5 stars */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < conditionStarsMobile ? starColor : "fill-gray-200 dark:fill-gray-600"}`}
                />
              ))}
            </div>
            <span className="font-business text-sm text-black dark:text-white">({mobileRating})</span>
          </div>
        </div>

        {/* Stock Status - Mobile */}
        <div className="font-business text-sm text-black dark:text-white">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          {product.stockStatus}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 space-y-3">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding || cartLoading || !product.variantId}
          className="w-full font-helvetica text-sm py-3 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100"
        >
          {isAdding ? "ADDING..." : "ADD TO CART"}
        </Button>
        <Button
          variant="outline"
          className="w-full font-helvetica text-sm py-3 border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white bg-transparent"
        >
          BUY NOW
        </Button>
        <Button
          variant="outline"
          className="w-full font-helvetica text-sm py-3 border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white bg-transparent"
        >
          SHARE IT
        </Button>
      </div>

      {/* Collapsible Sections */}
      <div className="flex-1 min-h-0 space-y-4 border-t-2 border-black dark:border-white pt-4">
        {/* SPECS Section */}
        <div className="border-b border-black dark:border-white pb-4">
          <button onClick={() => toggleSection("specs")} className="flex items-center justify-between w-full text-left">
            <h3 className="font-helvetica text-sm font-bold text-black dark:text-white">SPECS</h3>
            <div
              className={`w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[8px] border-t-black dark:border-t-white transform transition-transform ${expandedSections.specs ? "rotate-180" : ""}`}
            ></div>
          </button>
          {expandedSections.specs && (
            <div className="mt-4 space-y-2 font-helvetica text-xs text-black dark:text-white">
              {Object.entries(displayFields).map(([field, value]) => (
                <div key={field} className="flex justify-between gap-4">
                  <span className="font-bold">{MetadataService.formatFieldName(field)}:</span>
                  <span className="text-right font-business">{value}</span>
                </div>
              ))}
              {Object.keys(displayFields).length === 0 && <p className="text-gray-500">MISSING SPECS</p>}
            </div>
          )}
        </div>

        {/* Delivery Includes Section */}
        {deliveryIncludes && (
          <div className="pb-4">
            <button
              onClick={() => toggleSection("deliveryIncludes")}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-helvetica text-sm font-bold text-black dark:text-white">DELIVERY INCLUDES</h3>
              <div
                className={`w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[8px] border-t-black dark:border-t-white transform transition-transform ${expandedSections.deliveryIncludes ? "rotate-180" : ""}`}
              ></div>
            </button>
            {expandedSections.deliveryIncludes && (
              <div className="mt-4 space-y-1 font-helvetica text-xs text-black dark:text-white">
                {deliveryIncludes.split(",").map((item: string, index: number) => (
                  <p key={index}>• {item.trim()}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
