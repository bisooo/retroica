import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ProductCardProps {
  id: string
  name: string
  price: number
  rating: number
  image?: string
}

export default function ProductCard({ id, name, price, rating }: ProductCardProps) {
  return (
    <div className="border-2 border-black bg-white group hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square border-b-2 border-black">
        <Link href={`/products/${id}`} className="block w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-colors">
            <div className="absolute inset-4 border border-gray-300 transform rotate-12"></div>
            <div className="absolute inset-6 border border-gray-400 transform -rotate-6"></div>
            <div className="absolute inset-8 border border-gray-500 transform rotate-3"></div>
          </div>
        </Link>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white border border-black hover:bg-gray-100"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${id}`}>
          <h3 className="font-mono text-sm font-bold mb-1 hover:underline">{name}</h3>
        </Link>
        <p className="font-mono text-sm mb-2">${price}</p>

        {/* Rating */}
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-black" : "fill-gray-200"}`} />
          ))}
          <span className="ml-1 font-mono text-xs">({rating})</span>
        </div>
      </div>
    </div>
  )
}
