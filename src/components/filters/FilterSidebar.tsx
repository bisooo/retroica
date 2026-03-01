"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import MultiSelectFilter from "./MultiSelectFilter"
import RangeSliderFilter from "./RangeSliderFilter"
import { useFilterParams } from "@/lib/filters/hooks"
import { GLOBAL_FILTERS, getFiltersForCategory, type Category, type Subcategory } from "@/lib/filters/config"
import { useCurrency } from "@/lib/contexts/currency-context"
import { getCurrencySymbol } from "@/lib/utils/currency"
import type { ProductCardData } from "@/lib/types/product.types"

interface FilterSidebarProps {
  category: Category
  subcategory: Subcategory
  products: ProductCardData[]
}

export default function FilterSidebar({
  category,
  subcategory,
  products,
}: FilterSidebarProps) {
  const { activeCount, clearAll } = useFilterParams()
  const categoryFilters = getFiltersForCategory(category, subcategory)
  const { currency } = useCurrency()
  const currencySymbol = getCurrencySymbol(currency)

  // Calculate dynamic price range based on products in selected currency
  const priceRange = useMemo(() => {
    if (!products.length) return { min: 0, max: 500 }
    
    const prices = products.map(p => {
      const priceInCurrency = p.allPrices?.find(
        price => price.currency_code?.toLowerCase() === currency.toLowerCase()
      )?.amount ?? p.price
      return priceInCurrency
    }).filter(p => p > 0)
    
    if (!prices.length) return { min: 0, max: 500 }
    
    const minPrice = Math.floor(Math.min(...prices) / 10) * 10
    const maxPrice = Math.ceil(Math.max(...prices) / 10) * 10
    
    return { min: minPrice, max: maxPrice }
  }, [products, currency])

  return (
    <aside className="w-64 border-r-2 border-black dark:border-white bg-white dark:bg-black h-screen sticky top-0 hidden lg:block overflow-hidden">
      <div className="p-6 h-full overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black dark:border-white">
          <h2 className="font-helvicta text-sm font-bold text-black dark:text-white">
            FILTERS
          </h2>
          {activeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="font-business text-xs text-gray-500 hover:text-black dark:hover:text-white p-0 h-auto"
            >
              Clear all ({activeCount})
            </Button>
          )}
        </div>

        {/* Global Filters */}
        {GLOBAL_FILTERS.map((filter) => {
          if (filter.type === 'range' && filter.rangeConfig) {
            // Use dynamic price range and currency-aware formatting for price filter
            const isPriceFilter = filter.id === 'price'
            const formatLabel = isPriceFilter 
              ? (val: number) => `${currencySymbol}${val}`
              : filter.rangeConfig.formatLabel
            return (
              <RangeSliderFilter
                key={`${filter.id}-${currency}`}
                title={filter.title}
                paramKeyMin={filter.rangeConfig.paramKeyMin}
                paramKeyMax={filter.rangeConfig.paramKeyMax}
                min={isPriceFilter ? priceRange.min : filter.rangeConfig.min}
                max={isPriceFilter ? priceRange.max : filter.rangeConfig.max}
                step={filter.rangeConfig.step}
                formatLabel={formatLabel}
                defaultOpen={filter.defaultOpen}
              />
            )
          }
          if (filter.type === 'multiselect' && filter.options) {
            return (
              <MultiSelectFilter
                key={filter.id}
                title={filter.title}
                paramKey={filter.paramKey}
                options={filter.options}
                defaultOpen={filter.defaultOpen}
              />
            )
          }
          return null
        })}

        {/* Divider */}
        <div className="my-6 border-t-2 border-black dark:border-white" />

        {/* Category Filters */}
        {categoryFilters.map((filter) => {
          if (filter.type === 'range' && filter.rangeConfig) {
            return (
              <RangeSliderFilter
                key={filter.id}
                title={filter.title}
                paramKeyMin={filter.rangeConfig.paramKeyMin}
                paramKeyMax={filter.rangeConfig.paramKeyMax}
                min={filter.rangeConfig.min}
                max={filter.rangeConfig.max}
                step={filter.rangeConfig.step}
                formatLabel={filter.rangeConfig.formatLabel}
                defaultOpen={filter.defaultOpen}
              />
            )
          }
          if (filter.type === 'multiselect' && filter.options) {
            return (
              <MultiSelectFilter
                key={filter.id}
                title={filter.title}
                paramKey={filter.paramKey}
                options={filter.options}
                defaultOpen={filter.defaultOpen}
              />
            )
          }
          return null
        })}
      </div>
    </aside>
  )
}
