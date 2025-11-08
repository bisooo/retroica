import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"
import { ProductService } from "@/lib/services/product.service"
import { ProductMapper } from "@/lib/mappers/product.mapper"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ""

  if (!query) {
    return (
      <main className="flex min-h-screen">
        <div className="hidden lg:block">
          <ProductFilters />
        </div>
        <div className="flex-1 p-8">
          <div className="text-center">
            <h1 className="font-helvicta text-2xl font-bold mb-4">SEARCH PRODUCTS</h1>
            <p className="font-business text-gray-600 dark:text-gray-400">Enter a search query to find products</p>
          </div>
        </div>
      </main>
    )
  }

  const medusaProducts = await ProductService.searchProducts(query)
  const products = ProductMapper.toProductCards(medusaProducts)

  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:block">
        <ProductFilters />
      </div>
      <ProductGrid products={products} />
    </main>
  )
}
