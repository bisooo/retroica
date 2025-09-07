"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const router = useRouter()

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Back Button */}
      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 w-10 h-10 text-black dark:text-white"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Image */}
      <div className="flex-1 min-h-0 aspect-square border-2 border-black dark:border-white bg-gray-50 dark:bg-gray-800 overflow-hidden relative">
        {/* Heart icon for wishlist */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 w-10 h-10 text-black dark:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </Button>

        {/* Main Product Image */}
        <Image
          src="/images/film-can.avif"
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex-shrink-0 grid grid-cols-3 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square border-2 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-all ${
              selectedImage === index
                ? "border-black dark:border-white"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }`}
          >
            <Image
              src="/images/film-can.avif"
              alt={`${productName} view ${index + 1}`}
              fill
              className="object-cover"
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
