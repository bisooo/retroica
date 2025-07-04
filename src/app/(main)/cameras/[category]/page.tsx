import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"

export default function CamerasPage() {
  return (
    <main className="flex min-h-screen">
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <ProductFilters />
      </div>
      <ProductGrid />
    </main>
  )
}
