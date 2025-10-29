"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MetadataService } from "@/lib/services/metadata.service"

interface ProductInfoProps {
  product: {
    name: string
    brand: string
    price: number
    currency: string
    condition: number
    year: string
    stockStatus: string
    rawMetadata?: Record<string, unknown>
  }
}

function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CZK: "Kč",
  }
  return symbols[currency.toUpperCase()] || currency
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [expandedSections, setExpandedSections] = useState({
    specs: true,
    deliveryIncludes: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const displayFields = product.rawMetadata ? MetadataService.getAllDisplayFields(product.rawMetadata) : {}

  const deliveryIncludes = product.rawMetadata?.delivery_includes as string | undefined

  const conditionStars = Math.floor(product.condition)

  return (
    <div className="h-full flex flex-col space-y-4 pt-4 overflow-y-auto">
      {/* Product Title and Year */}
      <div className="flex-shrink-0 flex items-start justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold mb-1 text-black dark:text-white">{product.name}</h1>
          <p className="font-mono text-base text-gray-600 dark:text-gray-400 mb-2">{product.brand}</p>
        </div>
        <div className="text-right">
          <span className="font-mono text-base text-black dark:text-white">{product.year}</span>
        </div>
      </div>

      {/* Product Description */}
      <div className="flex-shrink-0 font-mono text-xs leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="break-words">
          .....................................................................................................
        </p>
      </div>

      {/* Price, Condition, and Stock - Desktop Layout */}
      <div className="flex-shrink-0 hidden lg:flex lg:items-center lg:justify-between lg:space-x-4">
        {/* Price */}
        <div className="font-mono text-xl font-bold text-black dark:text-white">
          {getCurrencySymbol(product.currency)}
          {product.price}
        </div>

        {/* Condition */}
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[...Array(10)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < conditionStars ? "fill-black dark:fill-white" : "fill-gray-200 dark:fill-gray-600"}`}
              />
            ))}
          </div>
          <span className="font-mono text-sm text-black dark:text-white">({product.condition})</span>
        </div>

        {/* Stock Status */}
        <div className="font-mono text-sm text-black dark:text-white">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          {product.stockStatus}
        </div>
      </div>

      {/* Price and Condition - Mobile Layout */}
      <div className="flex-shrink-0 lg:hidden space-y-3">
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="font-mono text-xl font-bold text-black dark:text-white">
            {getCurrencySymbol(product.currency)}
            {product.price}
          </div>

          {/* Condition */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(10)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < conditionStars ? "fill-black dark:fill-white" : "fill-gray-200 dark:fill-gray-600"}`}
                />
              ))}
            </div>
            <span className="font-mono text-sm text-black dark:text-white">({product.condition})</span>
          </div>
        </div>

        {/* Stock Status - Mobile */}
        <div className="font-mono text-sm text-black dark:text-white">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          {product.stockStatus}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 space-y-3">
        <Button className="w-full font-mono text-sm py-3 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100">
          ADD TO CART
        </Button>
        <Button
          variant="outline"
          className="w-full font-mono text-sm py-3 border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white bg-transparent"
        >
          BUY NOW
        </Button>
        <Button
          variant="outline"
          className="w-full font-mono text-sm py-3 border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white bg-transparent"
        >
          SHARE IT
        </Button>
      </div>

      {/* Collapsible Sections */}
      <div className="flex-1 min-h-0 space-y-4 border-t-2 border-black dark:border-white pt-4">
        {/* SPECS Section */}
        <div className="border-b border-black dark:border-white pb-4">
          <button onClick={() => toggleSection("specs")} className="flex items-center justify-between w-full text-left">
            <h3 className="font-mono text-sm font-bold text-black dark:text-white">SPECS</h3>
            <div
              className={`w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[8px] border-t-black dark:border-t-white transform transition-transform ${expandedSections.specs ? "rotate-180" : ""}`}
            ></div>
          </button>
          {expandedSections.specs && (
            <div className="mt-4 space-y-2 font-mono text-xs text-black dark:text-white">
              {Object.entries(displayFields).map(([field, value]) => (
                <div key={field} className="flex justify-between gap-4">
                  <span className="font-bold">{MetadataService.formatFieldName(field)}:</span>
                  <span className="text-right">{value}</span>
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
              <h3 className="font-mono text-sm font-bold text-black dark:text-white">DELIVERY INCLUDES</h3>
              <div
                className={`w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[8px] border-t-black dark:border-t-white transform transition-transform ${expandedSections.deliveryIncludes ? "rotate-180" : ""}`}
              ></div>
            </button>
            {expandedSections.deliveryIncludes && (
              <div className="mt-4 space-y-1 font-mono text-xs text-black dark:text-white">
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
