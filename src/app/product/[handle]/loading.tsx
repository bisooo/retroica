export default function ProductLoading() {
  return (
    <div className="h-screen bg-white dark:bg-black">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full">
        {/* Left Side - Image Skeleton */}
        <div className="w-1/2 h-full flex items-center justify-center p-6">
          <div className="w-full max-w-2xl aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse border-2 border-black dark:border-white" />
        </div>

        {/* Right Side - Info Skeleton */}
        <div className="w-1/2 h-full border-l-2 border-black dark:border-white flex flex-col overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-3/4" />
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3" />
            <div className="flex gap-1">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              ))}
            </div>
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden h-full flex flex-col overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse border-2 border-black dark:border-white" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-3/4" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
