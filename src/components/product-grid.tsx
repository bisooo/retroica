"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "./product-card"
import ProductGridControls from "./product-grid-controls"
import MobileFilters from "./mobile-filters"
import { useCurrency } from "@/lib/contexts/currency-context"
import type { ProductCardData } from "@/lib/types/product.types"
import type { Category, Subcategory } from "@/lib/filters/config"

interface ProductGridProps {
  products: ProductCardData[]
  filterCategory?: Category
  filterSubcategory?: Subcategory
}

export default function ProductGrid({ products, filterCategory = 'PHOTO', filterSubcategory = 'ANALOG' }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const searchParams = useSearchParams()
  const { currency: selectedCurrency } = useCurrency()

  // Client-side filtering based on URL params
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Get all multiselect filter params
    const params: Record<string, string[]> = {}
    searchParams.forEach((value, key) => {
      if (!key.endsWith('_min') && !key.endsWith('_max') && key !== 'currency') {
        params[key] = value.split(',').filter(Boolean)
      }
    })

    // Price range filter - use price in selected currency
    const priceMin = searchParams.get('price_min')
    const priceMax = searchParams.get('price_max')
    if (priceMin || priceMax) {
      const min = priceMin ? parseFloat(priceMin) : 0
      const max = priceMax ? parseFloat(priceMax) : Infinity
      result = result.filter(p => {
        // Get price in selected currency
        const priceInCurrency = p.allPrices?.find(
          price => price.currency_code?.toLowerCase() === selectedCurrency.toLowerCase()
        )?.amount ?? p.price
        return priceInCurrency >= min && priceInCurrency <= max
      })
    }

    // Condition range filter (numeric rating 6-10)
    const conditionMin = searchParams.get('condition_min')
    const conditionMax = searchParams.get('condition_max')
    if (conditionMin || conditionMax) {
      const min = conditionMin ? parseFloat(conditionMin) : 0
      const max = conditionMax ? parseFloat(conditionMax) : 10
      result = result.filter(p => {
        if (!p.condition) return true
        const conditionStr = String(p.condition)
        const match = conditionStr.match(/(\d+\.?\d*)/)
        if (!match) return true
        const conditionValue = parseFloat(match[1])
        return conditionValue >= min && conditionValue <= max
      })
    }

    // Apply multiselect filters based on product metadata
    Object.entries(params).forEach(([key, values]) => {
      if (values.length === 0) return
      
      result = result.filter(product => {
        const metadataValue = product.rawMetadata?.[key]
        if (!metadataValue) return false
        
        const metadataStr = String(metadataValue).toLowerCase()
        return values.some(v => metadataStr.includes(v.toLowerCase()))
      })
    })

    return result
  }, [products, searchParams, selectedCurrency])

  return (
    <div className="flex-1 p-4 lg:p-6 w-full bg-white dark:bg-black">
      <ProductGridControls
        productCount={filteredProducts.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onFiltersOpen={() => setFiltersOpen(true)}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="font-business text-sm text-black dark:text-white">NO PRODUCTS MATCH YOUR FILTERS.</p>
        </div>
      ) : (
        <div
          className={`grid gap-4 lg:gap-6 w-full ${
            viewMode === "grid" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}

      <MobileFilters 
        isOpen={filtersOpen} 
        onClose={() => setFiltersOpen(false)} 
        category={filterCategory}
        subcategory={filterSubcategory}
        products={products}
      />
    </div>
  )
}
