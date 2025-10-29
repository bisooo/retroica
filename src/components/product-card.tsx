import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  id: string
  handle?: string
  name: string
  price: number
  currency: string
  image?: string
  condition?: string
}

function parseCondition(condition?: string): number {
  if (!condition) return 0
  const match = condition.match(/(\d+)/)
  return match ? Number.parseInt(match[1], 10) : 0
}

function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CZK: "Kč",
  }
  return symbols[currency] || currency
}

export default function ProductCard({ id, handle, name, price, currency, image, condition }: ProductCardProps) {
  const conditionStars = parseCondition(condition)
  const productUrl = `/products/${handle || id}`

  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-black group hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square border-b-2 border-black dark:border-white">
        <Link href={productUrl} className="block w-full h-full">
          <Image
            src={image || "/images/film-can.avif"}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white dark:bg-black border border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={productUrl}>
          <h3 className="font-mono text-sm font-bold mb-1 hover:underline text-black dark:text-white line-clamp-2">
            {name}
          </h3>
        </Link>
        <p className="font-mono text-sm mb-2 text-black dark:text-white">
          {getCurrencySymbol(currency)}
          {price.toFixed(2)}
        </p>

        <div className="flex items-center gap-1">
          <div className="flex flex-wrap gap-0.5">
            {[...Array(10)].map((_, i) => (
              <Star
                key={i}
                className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                  i < conditionStars
                    ? "fill-black dark:fill-white stroke-black dark:stroke-white"
                    : "fill-none stroke-gray-300 dark:stroke-gray-600"
                }`}
              />
            ))}
          </div>
          {condition && (
            <span className="ml-1 font-mono text-xs text-black dark:text-white whitespace-nowrap">{condition}</span>
          )}
        </div>
      </div>
    </div>
  )
}
