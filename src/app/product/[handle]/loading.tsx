import MinimalNavbar from "@/components/minimal-navbar"

export default function ProductLoading() {
  return (
    <>
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Image Skeleton matching ProductImageGallery */}
        <div className="w-1/2 h-full flex flex-col p-6">
          <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse border-2 border-black dark:border-white" />
        </div>

        {/* Right Side - Navbar + Info Skeleton matching actual layout */}
        <div className="w-1/2 h-full border-l-2 border-black dark:border-white flex flex-col">
          <div className="flex-shrink-0">
            <MinimalNavbar />
          </div>

          <div className="flex-1 min-h-0 px-6 pb-6 overflow-y-auto">
            <div className="space-y-6 pt-6">
              {/* Product Name */}
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-3/4" />
              </div>

              {/* Brand */}
              <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3" />

              {/* Price */}
              <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/4" />

              {/* Condition Stars */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  ))}
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-12" />
              </div>

              {/* Divider */}
              <div className="border-t-2 border-black dark:border-white" />

              {/* Metadata */}
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                ))}
              </div>

              {/* Add to Cart Button */}
              <div className="h-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden h-screen flex flex-col">
        <div className="flex-shrink-0">
          <MinimalNavbar />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Product Images */}
          <div className="px-6 py-4">
            <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse border-2 border-black dark:border-white" />
          </div>

          {/* Product Info */}
          <div className="px-6 pb-6 space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <div className="h-7 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              <div className="h-7 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-2/3" />
            </div>

            {/* Brand */}
            <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3" />

            {/* Price */}
            <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3" />

            {/* Condition Stars */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                ))}
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-10" />
            </div>

            {/* Divider */}
            <div className="border-t-2 border-black dark:border-white" />

            {/* Metadata */}
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              ))}
            </div>

            {/* Add to Cart Button */}
            <div className="h-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </>
  )
}
