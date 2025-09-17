import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"

interface CategoryPageProps {
  params: {
    category: string
  }
  searchParams: {
    type?: string // analog or digital
    subcategory?: string
  }
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = params
  const { type, subcategory } = searchParams

  // You can use these params to filter products later
  // For now, we'll just render the same layout

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

// Generate static params for the main categories
export function generateStaticParams() {
  return [{ category: "photo" }, { category: "video" }, { category: "music" }, { category: "accessories" }]
}
