import ProductFilters from "@/components/product-filters"

export default function CategoryLoading() {
  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:block">
        <ProductFilters />
      </div>

      <div className="flex-1 p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border-2 border-black dark:border-white">
              {/* Image skeleton */}
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse border-b-2 border-black dark:border-white" />
              {/* Content skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-2/3" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/2 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
