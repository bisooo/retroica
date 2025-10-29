"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [thumbnailOffset, setThumbnailOffset] = useState(0)
  const router = useRouter()

  const thumbnailsPerPage = 3
  const totalPages = Math.ceil(images.length / thumbnailsPerPage)
  const canScrollLeft = thumbnailOffset > 0
  const canScrollRight = thumbnailOffset < totalPages - 1

  const handleScrollLeft = () => {
    if (canScrollLeft) {
      setThumbnailOffset(thumbnailOffset - 1)
    }
  }

  const handleScrollRight = () => {
    if (canScrollRight) {
      setThumbnailOffset(thumbnailOffset + 1)
    }
  }

  const visibleThumbnails = images.slice(thumbnailOffset * thumbnailsPerPage, (thumbnailOffset + 1) * thumbnailsPerPage)

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
          src={images[selectedImage] || "/images/film-can.avif"}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnail Images with Scroll Arrows */}
      <div className="flex-shrink-0 relative">
        <div className="grid grid-cols-3 gap-3">
          {visibleThumbnails.map((image, index) => {
            const actualIndex = thumbnailOffset * thumbnailsPerPage + index
            return (
              <button
                key={actualIndex}
                onClick={() => setSelectedImage(actualIndex)}
                className={`aspect-square border-2 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-all ${
                  selectedImage === actualIndex
                    ? "border-black dark:border-white"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                <Image
                  src={image || "/images/film-can.avif"}
                  alt={`${productName} view ${actualIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </button>
            )
          })}
        </div>

        {/* Scroll Arrows */}
        {images.length > thumbnailsPerPage && (
          <>
            {/* Left Arrow */}
            <button
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white/80 dark:bg-black/80 border-2 border-black dark:border-white rounded-full p-2 transition-opacity ${
                canScrollLeft ? "opacity-100 hover:bg-white dark:hover:bg-black" : "opacity-30 cursor-not-allowed"
              }`}
              aria-label="Previous images"
            >
              <ChevronLeft className="h-4 w-4 text-black dark:text-white" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white/80 dark:bg-black/80 border-2 border-black dark:border-white rounded-full p-2 transition-opacity ${
                canScrollRight ? "opacity-100 hover:bg-white dark:hover:bg-black" : "opacity-30 cursor-not-allowed"
              }`}
              aria-label="Next images"
            >
              <ChevronRight className="h-4 w-4 text-black dark:text-white" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
