"use client"

import { useState } from "react"
import ProductGrid from "./product-grid"
import type { ProductCardData } from "@/lib/types/product.types"
import { ProductService } from "@/lib/services/product.service"
import { ProductMapper } from "@/lib/mappers/product.mapper"

interface ProductGridWithPaginationProps {
  initialProducts: ProductCardData[]
  categoryHandle: string
}

export default function ProductGridWithPagination({ initialProducts, categoryHandle }: ProductGridWithPaginationProps) {
  const [products, setProducts] = useState<ProductCardData[]>(initialProducts)
  const [offset, setOffset] = useState(20) // Start at 20 since we already loaded first 20
  const [hasMore, setHasMore] = useState(initialProducts.length === 20)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    console.log("Loading more products with offset:", offset)

    try {
      const medusaProducts = await ProductService.getProductsByHandle(categoryHandle, 20, offset)
      const newProducts = ProductMapper.toProductCards(medusaProducts)

      console.log("Loaded products:", newProducts.length)

      if (newProducts.length < 20) {
        setHasMore(false)
      }

      setProducts((prev) => [...prev, ...newProducts])
      setOffset((prev) => prev + 20)
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
