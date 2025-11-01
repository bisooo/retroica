import ProductFilters from "@/components/product-filters"
import ProductGridWithPagination from "@/components/product-grid-with-pagination"
import { ProductService } from "@/lib/services/product.service"
import { ProductMapper } from "@/lib/mappers/product.mapper"

interface SearchPageProps {
  searchParams: Promise<{ q?: string; offset?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ""
  const offset = Number.parseInt(params.offset || "0", 10)

  if (!query) {
    return (
      <main className="flex min-h-screen">
        <div className="hidden lg:block">
          <ProductFilters />
        </div>
        <div className="flex-1 p-8">
          <div className="text-center">
            <h1 className="font-mono text-2xl font-bold mb-4">SEARCH PRODUCTS</h1>
            <p className="font-mono text-gray-600 dark:text-gray-400">Enter a search query to find products</p>
          </div>
        </div>
      </main>
    )
  }

  const medusaProducts = await ProductService.searchProducts(query, offset + 20, 0)
  const products = ProductMapper.toProductCards(medusaProducts)

  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:block">
        <ProductFilters />
      </div>
      <ProductGridWithPagination initialProducts={products} searchQuery={query} initialOffset={offset} />
    </main>
  )
}
