import ProductFilters from "@/components/product-filters"
import { Star, Grid3X3, List, ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CategoryLoading() {
  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:block">
        <ProductFilters />
      </div>

      <div className="flex-1 p-4 lg:p-6 w-full bg-white dark:bg-black">
        <div className="mb-6 border-b border-black dark:border-white pb-4">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Top Row - View controls and product count */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex border border-black dark:border-white">
                <Button
                  variant="ghost"
                  size="sm"
                  className="border-r border-black dark:border-white rounded-none px-2 bg-black dark:bg-white text-white dark:text-black"
                  disabled
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-none px-2 text-black dark:text-white" disabled>
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24" />
            </div>

            {/* Bottom Row - Filters and Sort */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                className="font-mono text-sm border-black dark:border-white flex-1 mr-2 text-black dark:text-white bg-transparent"
                disabled
              >
                <Filter className="h-4 w-4 mr-2" />
                FILTERS
              </Button>
              <Button
                variant="outline"
                className="font-mono text-sm border-black dark:border-white flex-1 ml-2 text-black dark:text-white bg-transparent"
                disabled
              >
                SORT BY PRICE
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between">
            {/* Left side - View controls and product count */}
            <div className="flex items-center space-x-4">
              <div className="flex border border-black dark:border-white">
                <Button
                  variant="ghost"
                  size="sm"
                  className="border-r border-black dark:border-white rounded-none bg-black dark:bg-white text-white dark:text-black"
                  disabled
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-none text-black dark:text-white" disabled>
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-28" />
            </div>

            {/* Right side - Sort dropdown */}
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm text-black dark:text-white">SORT BY</span>
              <Button
                variant="outline"
                className="font-mono text-sm border-black dark:border-white text-black dark:text-white bg-transparent"
                disabled
              >
                PRICE
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid gap-4 lg:gap-6 w-full grid-cols-2 lg:grid-cols-4">
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
                  <div className="flex sm:hidden">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-2 w-2 fill-gray-200 dark:fill-gray-700 stroke-gray-300 dark:stroke-gray-600 animate-pulse"
                      />
                    ))}
                  </div>
                  <div className="hidden sm:flex">
                    {[...Array(10)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-3 w-3 fill-gray-200 dark:fill-gray-700 stroke-gray-300 dark:stroke-gray-600 animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button Skeleton */}
        <div className="flex justify-center py-8">
          <div className="px-8 py-3 border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 animate-pulse w-40 h-12" />
        </div>
      </div>
    </main>
  )
}
