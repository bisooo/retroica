import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"

interface CamerasPageProps {
  params: {
    category: string
  }
}

export default function CamerasPage({ params }: CamerasPageProps) {
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
