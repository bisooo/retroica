import ProductFilters from "@/components/product-filters"
import { Star } from "lucide-react"

export default function CategoryLoading() {
  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:block">
        <ProductFilters />
      </div>

      <div className="flex-1 p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border-2 border-black dark:border-white bg-white dark:bg-black">
              <div className="relative aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse border-b-2 border-black dark:border-white" />

              <div className="p-4 flex flex-col">
                {/* Product Name - Left aligned with fixed height */}
                <div className="mb-3 min-h-[2.5rem] space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-2/3" />
                </div>

                {/* Divider */}
                <div className="border-t border-black dark:border-white mb-3" />

                {/* Price - Centrally aligned */}
                <div className="mb-3 flex justify-center">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-20" />
                </div>

                {/* Divider */}
                <div className="border-t border-black dark:border-white mb-3" />

                {/* Condition Stars - Centrally aligned */}
                <div className="flex items-center justify-center gap-[2px] sm:gap-0.5">
                  {[...Array(10)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-2 w-2 sm:h-3 sm:w-3 fill-gray-200 dark:fill-gray-700 stroke-gray-300 dark:stroke-gray-600 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
