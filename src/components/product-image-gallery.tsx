"use client"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
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
      <div className="flex-1 min-h-0">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="h-full">
            {images.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative aspect-square border-2 border-black dark:border-white bg-gray-50 dark:bg-gray-800 overflow-hidden">
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

                  {/* Product Image */}
                  <Image
                    src={image || "/images/film-can.avif"}
                    alt={`${productName} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/80 dark:bg-black/80 border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black" />
          <CarouselNext className="right-4 bg-white/80 dark:bg-black/80 border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black" />
        </Carousel>
      </div>
    </div>
  )
}
