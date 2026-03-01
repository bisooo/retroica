"use client"

import { useMemo } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import MultiSelectFilter from "./filters/MultiSelectFilter"
import RangeSliderFilter from "./filters/RangeSliderFilter"
import { useFilterParams } from "@/lib/filters/hooks"
import { GLOBAL_FILTERS, getFiltersForCategory, type Category, type Subcategory } from "@/lib/filters/config"
import { useCurrency } from "@/lib/contexts/currency-context"
import { getCurrencySymbol } from "@/lib/utils/currency"
import type { ProductCardData } from "@/lib/types/product.types"

interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
  category?: Category
  subcategory?: Subcategory
  products?: ProductCardData[]
}

export default function MobileFilters({ 
  isOpen, 
  onClose, 
  category = 'PHOTO', 
  subcategory = 'ANALOG',
  products = []
}: MobileFiltersProps) {
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-black border-l-2 border-black dark:border-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-black dark:border-white">
          <div>
            <h2 className="font-helvicta text-lg font-bold text-black dark:text-white">FILTERS</h2>
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="font-business text-xs text-gray-500 hover:text-black dark:hover:text-white"
              >
                Clear all ({activeCount})
              </button>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Filters Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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

        {/* Apply Button - Fixed at bottom */}
        <div className="p-4 border-t-2 border-black dark:border-white">
          <Button 
            onClick={onClose}
            className="w-full font-helvicta bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100"
          >
            APPLY FILTERS
          </Button>
        </div>
      </div>
    </div>
  )
}
