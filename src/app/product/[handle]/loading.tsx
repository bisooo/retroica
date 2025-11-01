import MinimalNavbar from "@/components/minimal-navbar"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductLoading() {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Image Skeleton */}
        <div className="w-1/2 h-full flex flex-col p-6">
          <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse border-2 border-black dark:border-white" />
        </div>

        {/* Right Side - Navbar + Product Info */}
        <div className="w-1/2 h-full border-l-2 border-black dark:border-white flex flex-col">
          <div className="flex-shrink-0">
            <MinimalNavbar />
          </div>

          <div className="flex-1 min-h-0 px-6 pb-6">
            <div className="h-full flex flex-col space-y-4 pt-4 overflow-y-auto">
              {/* Product Title and Year */}
              <div className="flex-shrink-0 flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-1" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3 mb-2" />
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-16" />
              </div>

              {/* Product Description */}
              <div className="flex-shrink-0">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              </div>

              {/* Price, Condition, and Stock - Desktop Layout */}
              <div className="flex-shrink-0 flex items-center justify-between space-x-4">
                {/* Price */}
                <div className="h-7 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24" />

                {/* Condition */}
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(10)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-gray-200 dark:fill-gray-700 stroke-gray-300 dark:stroke-gray-600"
                      />
                    ))}
                  </div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-12" />
                </div>

                {/* Stock Status */}
                <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24" />
              </div>

              <div className="flex-shrink-0 space-y-3">
                <Button
                  disabled
                  className="w-full font-mono text-sm py-3 bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-2 border-gray-300 dark:border-gray-600 cursor-not-allowed"
                >
                  ADD TO CART
                </Button>
                <Button
                  disabled
                  variant="outline"
                  className="w-full font-mono text-sm py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed bg-transparent"
                >
                  BUY NOW
                </Button>
                <Button
                  disabled
                  variant="outline"
                  className="w-full font-mono text-sm py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed bg-transparent"
                >
                  SHARE IT
                </Button>
              </div>

              <div className="flex-1 min-h-0 space-y-4 border-t-2 border-black dark:border-white pt-4">
                {/* SPECS Section */}
                <div className="border-b border-black dark:border-white pb-4">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-mono text-sm font-bold text-black dark:text-white">SPECS</h3>
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[8px] border-t-black dark:border-t-white" />
                  </div>
                  <div className="mt-4 space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                    ))}
                  </div>
                </div>

                {/* DELIVERY INCLUDES Section */}
                <div className="pb-4">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-mono text-sm font-bold text-black dark:text-white">DELIVERY INCLUDES</h3>
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[8px] border-t-black dark:border-t-white" />
                  </div>
                  <div className="mt-4 space-y-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden h-screen flex flex-col">
        <div className="flex-shrink-0">
          <MinimalNavbar />
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Product Images */}
          <div className="px-6 py-4">
            <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse border-2 border-black dark:border-white" />
          </div>

          {/* Product Info */}
          <div className="px-6 pb-6">
            <div className="space-y-4">
              {/* Product Title and Year */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-7 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-1" />
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3 mb-2" />
                </div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-16" />
              </div>

              {/* Product Description */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />

              {/* Price and Condition - Mobile Layout */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-7 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24" />
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(10)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-gray-200 dark:fill-gray-700 stroke-gray-300 dark:stroke-gray-600"
                        />
                      ))}
                    </div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-12" />
                  </div>
                </div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24" />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  disabled
                  className="w-full font-mono text-sm py-3 bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-2 border-gray-300 dark:border-gray-600 cursor-not-allowed"
                >
                  ADD TO CART
                </Button>
                <Button
                  disabled
                  variant="outline"
                  className="w-full font-mono text-sm py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed bg-transparent"
                >
                  BUY NOW
                </Button>
                <Button
                  disabled
                  variant="outline"
                  className="w-full font-mono text-sm py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed bg-transparent"
                >
                  SHARE IT
                </Button>
              </div>

              {/* Collapsible Sections */}
              <div className="space-y-4 border-t-2 border-black dark:border-white pt-4">
                <div className="border-b border-black dark:border-white pb-4">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-mono text-sm font-bold text-black dark:text-white">SPECS</h3>
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[8px] border-t-black dark:border-t-white" />
                  </div>
                  <div className="mt-4 space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                    ))}
                  </div>
                </div>

                <div className="pb-4">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-mono text-sm font-bold text-black dark:text-white">DELIVERY INCLUDES</h3>
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[8px] border-t-black dark:border-t-white" />
                  </div>
                  <div className="mt-4 space-y-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
