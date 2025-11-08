import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"
import { ProductService } from "@/lib/services/product.service"
import { ProductMapper } from "@/lib/mappers/product.mapper"
import { allCategoryHandles } from "@/lib/data/categories"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export const revalidate = 86400 // 1 day
export const dynamicParams = true

export async function generateStaticParams() {
  return allCategoryHandles.map((category) => ({
    category,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params

  const medusaProducts = await ProductService.getAllProductsByHandle(category)
  const products = ProductMapper.toProductCards(medusaProducts)

  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:block">
        <ProductFilters />
      </div>
      <div className="flex-1 flex flex-col">
        <ProductGrid products={products} />
      </div>
    </main>
  )
}
