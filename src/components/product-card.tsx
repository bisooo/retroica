import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  id: string
  name: string
  price: number
  rating: number
  image?: string
}

export default function ProductCard({ id, name, price, rating }: ProductCardProps) {
  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-black group hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square border-b-2 border-black dark:border-white">
        <Link href={`/products/${id}`} className="block w-full h-full">
          <Image
            src="/images/film-can.avif"
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
        <Link href={`/products/${id}`}>
          <h3 className="font-mono text-sm font-bold mb-1 hover:underline text-black dark:text-white">{name}</h3>
        </Link>
        <p className="font-mono text-sm mb-2 text-black dark:text-white">${price}</p>

        {/* Rating */}
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < rating ? "fill-black dark:fill-white" : "fill-gray-200 dark:fill-gray-600"}`}
            />
          ))}
          <span className="ml-1 font-mono text-xs text-black dark:text-white">({rating})</span>
        </div>
      </div>
    </div>
  )
}
