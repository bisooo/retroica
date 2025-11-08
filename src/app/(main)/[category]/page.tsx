import ProductFilters from "@/components/product-filters"
import ProductGridWithPagination from "@/components/product-grid-with-pagination"
import { ProductService } from "@/lib/services/product.service"
import { ProductMapper } from "@/lib/mappers/product.mapper"
import { allCategoryHandles } from "@/lib/data/categories"

interface CategoryPageProps {
  params: {
    category: string
  }
  searchParams: {
    type?: string
    subcategory?: string
    offset?: string
  }
}

export const revalidate = 86400 // 1 day

export const dynamicParams = true

export async function generateStaticParams() {
  return allCategoryHandles.map((category) => ({
    category,
  }))
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = params
  const { subcategory, offset: offsetParam } = searchParams

  const offset = offsetParam ? Number.parseInt(offsetParam, 10) : 20
  const categoryHandle = subcategory || category

  const medusaProducts = await ProductService.getProductsByHandle(categoryHandle, offset, 0)
  const products = ProductMapper.toProductCards(medusaProducts)

  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:block">
        <ProductFilters />
      </div>
      <ProductGridWithPagination initialProducts={products} categoryHandle={categoryHandle} initialOffset={offset} />
    </main>
  )
}
