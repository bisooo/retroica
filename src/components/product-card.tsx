"use client"

import { Star } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { getCurrencySymbol } from "@/lib/utils/currency"
import { getStarColor } from "@/lib/utils/rating"
import { useCurrency } from "@/lib/contexts/currency-context"
import type { VariantPrice } from "@/lib/types/product.types"

interface ProductCardProps {
  id: string
  handle?: string
  name: string
  price: number
  currency?: string
  image?: string
  condition?: string
  allPrices?: VariantPrice[]
}

function parseCondition(condition?: string): number {
  if (!condition) return 0
  const match = String(condition).match(/(\d+)/)
  return match ? Number.parseInt(match[1], 10) : 0
}

export default function ProductCard({ id, handle, name, price, currency, image, condition, allPrices }: ProductCardProps) {
  const { currency: selectedCurrency } = useCurrency()
  
  const priceInSelectedCurrency = allPrices?.find(
    (p) => p.currency_code.toLowerCase() === selectedCurrency.toLowerCase()
  )
  const displayPrice = priceInSelectedCurrency?.amount || price
  const displayCurrency = priceInSelectedCurrency?.currency_code.toUpperCase() || currency || selectedCurrency.toUpperCase()
  
  const conditionStars = parseCondition(condition)
  const productUrl = `/product/${handle || id}?currency=${selectedCurrency.toLowerCase()}`

  const starColor = getStarColor(conditionStars)

  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-black group hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square border-b-2 border-black dark:border-white">
        <Link href={productUrl} className="block w-full h-full" scroll={true}>
          <Image
            src={image || "/images/film-can.avif"}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col">
        {/* Product Name - Fixed height for uniformity */}
        <Link href={productUrl} className="block" scroll={true}>
          <h3 className="font-helvicta text-sm font-bold mb-3 hover:underline text-black text-center dark:text-white line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>
        </Link>

        {/* Divider */}
        <div className="border-t border-black dark:border-white mb-3" />

        {/* Price */}
        <p className="font-business text-sm text-black dark:text-white text-center mb-3">
          {getCurrencySymbol(displayCurrency)}
          {displayPrice.toFixed(2)}
        </p>

        {/* Divider */}
        <div className="border-t border-black dark:border-white mb-3" />

        {/* Condition Stars */}
        <div className="flex items-center justify-center gap-[2px] sm:gap-0.5">
          {/* Mobile: 5 stars */}
          <div className="flex sm:hidden">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-2 w-2 ${
                  i < Math.floor(conditionStars / 2) ? starColor : "fill-none stroke-gray-300 dark:stroke-gray-600"
                }`}
              />
            ))}
          </div>
          {/* Desktop: 10 stars */}
          <div className="hidden sm:flex">
            {[...Array(10)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < conditionStars ? starColor : "fill-none stroke-gray-300 dark:stroke-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
