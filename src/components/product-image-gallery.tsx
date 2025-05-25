"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const router = useRouter()

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Back Button */}
      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="border-2 border-black hover:bg-gray-100 w-10 h-10"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Image */}
      <div className="flex-1 min-h-0 aspect-square border-2 border-black bg-gray-50 overflow-hidden relative">
        {/* Heart icon for wishlist */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-white border-2 border-black hover:bg-gray-100 w-10 h-10"
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

        {/* Main Product Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="absolute inset-8 border-2 border-gray-300 transform rotate-12"></div>
          <div className="absolute inset-12 border border-gray-400 transform -rotate-6"></div>
          <div className="absolute inset-16 border border-gray-500 transform rotate-3"></div>
          {/* Camera lens circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-gray-600 rounded-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex-shrink-0 grid grid-cols-3 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square border-2 bg-gray-50 relative overflow-hidden transition-all ${
              selectedImage === index ? "border-black" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="absolute inset-2 border border-gray-300 transform rotate-12"></div>
              <div className="absolute inset-3 border border-gray-400 transform -rotate-6"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
