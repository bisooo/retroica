"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import ProductGrid from "./product-grid"
import type { ProductCardData } from "@/lib/types/product.types"
import { ProductService } from "@/lib/services/product.service"
import { ProductMapper } from "@/lib/mappers/product.mapper"

interface ProductGridWithPaginationProps {
  initialProducts: ProductCardData[]
  categoryHandle: string
  initialOffset: number
}

export default function ProductGridWithPagination({
  initialProducts,
  categoryHandle,
  initialOffset,
}: ProductGridWithPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<ProductCardData[]>(initialProducts)
  const [offset, setOffset] = useState(initialOffset)
  const [hasMore, setHasMore] = useState(initialProducts.length % 20 === 0 && initialProducts.length > 0)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    const newOffset = offset + 20

    try {
      const medusaProducts = await ProductService.getProductsByHandle(categoryHandle, 20, offset)
      const newProducts = ProductMapper.toProductCards(medusaProducts)

      if (newProducts.length < 20) {
        setHasMore(false)
      }

      setProducts((prev) => [...prev, ...newProducts])
      setOffset(newOffset)

      const params = new URLSearchParams(searchParams.toString())
      params.set("offset", newOffset.toString())
      router.push(`?${params.toString()}`, { scroll: false })
    } catch (error) {
      console.error("Error loading more products:", error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1">
      <ProductGrid products={products} />

      {hasMore && (
        <div className="flex justify-center py-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 font-mono text-sm font-medium border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "LOADING..." : "[LOAD MORE]"}
          </button>
        </div>
      )}
    </div>
  )
}
