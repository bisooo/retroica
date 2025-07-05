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
    <div className="border-2 border-black bg-white group hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square border-b-2 border-black">
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
