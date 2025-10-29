import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"
import { ProductService } from "@/lib/services/product.service"
import { ProductMapper } from "@/lib/mappers/product.mapper"

interface CategoryPageProps {
  params: {
    category: string
  }
  searchParams: {
    type?: string // analog or digital
    subcategory?: string
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = params
  const { subcategory } = searchParams

  const categoryHandle = subcategory || category
  // TODO: currently only 20 products are fetched, implement pagination
  const medusaProducts = await ProductService.getProductsByHandle(categoryHandle, 20)
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
