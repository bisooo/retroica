"use client"

import { useState } from "react"
import ProductCard from "./product-card"
import ProductGridControls from "./product-grid-controls"
import MobileFilters from "./mobile-filters"

// Mock product data
const products = [
  { id: "1", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "2", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "3", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "4", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "5", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "6", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "7", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "8", name: "CAMERA 123", price: 21, rating: 4 },
]

export default function ProductGrid() {
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

      <div
        className={`grid gap-4 lg:gap-6 w-full ${
          viewMode === "grid" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <MobileFilters isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} />
    </div>
  )
}
