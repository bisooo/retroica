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
                  {/* Product Image */}
                  <Image
                    src={image || "/images/film-can.avif"}
                    alt={`${productName} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    loading={index < 3 ? "eager" : "lazy"}
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
