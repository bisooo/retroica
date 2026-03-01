"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Star, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { MetadataService } from "@/lib/services/metadata.service"
import { getCurrencySymbol } from "@/lib/utils/currency"
import { getStarColor } from "@/lib/utils/rating"
import { useCart } from "@/lib/contexts/cart-context"
import { useCurrency } from "@/lib/contexts/currency-context"
import { getSpecExplanation } from "@/lib/data/spec-explanations"
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
  const router = useRouter()
  const { toast } = useToast()
  const { currency: selectedCurrency } = useCurrency()

  const [expandedSections, setExpandedSections] = useState({
    specs: true,
    deliveryIncludes: true,
  })

  // Spec tooltip/modal state
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const [mobileModal, setMobileModal] = useState<{ field: string; explanation: string } | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

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

  const handleBuyNow = async () => {
    if (!product.variantId) {
      console.error("[v0] No variant ID available for product")
      return
    }

    setIsAdding(true)
    try {
      await addToCart(product.variantId, 1)
      router.push("/checkout")
    } finally {
      setIsAdding(false)
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "LINK COPIED",
        description: "Product link copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "SHARE FAILED",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      })
    }
  }

  const displayFields = product.rawMetadata ? MetadataService.getAllDisplayFields(product.rawMetadata) : {}

  // Handle spec field click - tooltip on desktop, modal on mobile
  const handleSpecClick = (field: string) => {
    const explanation = getSpecExplanation(field)
    if (!explanation) return

    // Check if mobile (using window width)
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileModal({ field: MetadataService.formatFieldName(field), explanation })
    } else {
      setActiveTooltip(activeTooltip === field ? null : field)
    }
  }

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setActiveTooltip(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const deliveryIncludes = product.rawMetadata?.delivery_includes as string | undefined

  const conditionStarsDesktop = Math.floor(product.condition)
  const conditionStarsMobile = Math.floor(product.condition / 2)
  const mobileRating = (product.condition / 2).toFixed(1)

  const starColor = getStarColor(product.condition)

  const priceInSelectedCurrency = product.allPrices?.find(
    (p) => p.currency_code.toLowerCase() === selectedCurrency.toLowerCase(),
  )
  const displayPrice = (priceInSelectedCurrency?.amount || product.price).toFixed(2)
  const displayCurrency =
    priceInSelectedCurrency?.currency_code.toUpperCase() || product.currency || selectedCurrency.toUpperCase()

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
          onClick={handleBuyNow}
          disabled={isAdding || cartLoading || !product.variantId}
          variant="outline"
          className="w-full font-helvetica text-sm py-3 border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white bg-transparent"
        >
          {isAdding ? "PROCESSING..." : "BUY NOW"}
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full font-helvetica text-sm py-3 border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white bg-transparent flex items-center justify-center gap-2"
        >
          <Share2 className="h-4 w-4" />
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
            <div className="mt-4 space-y-2 font-helvetica text-xs text-black dark:text-white" ref={tooltipRef}>
              {Object.entries(displayFields).map(([field, value]) => {
                const explanation = getSpecExplanation(field)
                const isActive = activeTooltip === field
                
                return (
                  <div key={field} className="relative">
                    <div className="flex justify-between gap-4">
                      <span 
                        className={`font-bold ${explanation ? "cursor-help underline decoration-dotted underline-offset-2 hover:text-gray-600 dark:hover:text-gray-300" : ""}`}
                        onClick={() => explanation && handleSpecClick(field)}
                        onMouseEnter={() => explanation && typeof window !== "undefined" && window.innerWidth >= 1024 && setActiveTooltip(field)}
                        onMouseLeave={() => typeof window !== "undefined" && window.innerWidth >= 1024 && setActiveTooltip(null)}
                      >
                        {MetadataService.formatFieldName(field)}:
                      </span>
                      <span className="text-right font-business">{value}</span>
                    </div>
                    
                    {/* Desktop Tooltip */}
                    {isActive && explanation && (
                      <div className="hidden lg:block absolute left-0 top-full mt-1 z-50 w-64 p-3 bg-white dark:bg-black border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                        <p className="font-helvetica text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                          {explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
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

      {/* Mobile Spec Explanation Modal */}
      {mobileModal && (
        <div 
          className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setMobileModal(null)}
        >
          <div 
            className="mx-4 w-full max-w-sm bg-white dark:bg-black border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b-2 border-black dark:border-white">
              <h3 className="font-helvetica text-sm font-bold text-black dark:text-white">
                {mobileModal.field}
              </h3>
              <button 
                onClick={() => setMobileModal(null)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <X className="h-4 w-4 text-black dark:text-white" />
              </button>
            </div>
            <div className="p-4">
              <p className="font-helvetica text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {mobileModal.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
