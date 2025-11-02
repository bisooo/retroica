"use client"

import { useState } from "react"
import ProductCard from "./product-card"
import ProductGridControls from "./product-grid-controls"
import MobileFilters from "./mobile-filters"
import type { ProductCardData } from "@/lib/types/product.types"

interface ProductGridProps {
  products: ProductCardData[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="flex-1 p-4 lg:p-6 w-full bg-white dark:bg-black">
      <ProductGridControls
        productCount={products.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onFiltersOpen={() => setFiltersOpen(true)}
      />

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="font-business text-sm text-black dark:text-white">NO PRODUCTS YET FAM.</p>
        </div>
      ) : (
        <div
          className={`grid gap-4 lg:gap-6 w-full ${
            viewMode === "grid" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}

      <MobileFilters isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} />
    </div>
  )
}
