"use client"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import MultiSelectFilter from "./MultiSelectFilter"
import RangeSliderFilter from "./RangeSliderFilter"
import { useFilterParams } from "@/lib/filters/hooks"
import { GLOBAL_FILTERS, getFiltersForCategory, type Category, type Subcategory } from "@/lib/filters/config"

interface FilterDrawerProps {
  category: Category
  subcategory: Subcategory
  productCount: number
}

export default function FilterDrawer({
  category,
  subcategory,
  productCount,
}: FilterDrawerProps) {
  const { activeCount, clearAll } = useFilterParams()
  const categoryFilters = getFiltersForCategory(category, subcategory)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="lg:hidden fixed bottom-6 right-6 z-40 h-14 px-5 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-gray-800 dark:hover:bg-gray-200 font-helvicta"
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          FILTERS
          {activeCount > 0 && (
            <span className="ml-2 flex items-center justify-center w-6 h-6 text-xs font-bold bg-white dark:bg-black text-black dark:text-white rounded-full">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md bg-white dark:bg-black border-l-2 border-black dark:border-white p-0 overflow-hidden"
      >
        <SheetHeader className="p-6 border-b-2 border-black dark:border-white">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="font-helvicta text-lg font-bold text-black dark:text-white">
                FILTERS
              </SheetTitle>
              <p className="font-business text-xs text-gray-500 dark:text-gray-400 mt-1">
                {productCount} {productCount === 1 ? 'result' : 'results'}
              </p>
            </div>
            {activeCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="font-business text-xs text-gray-500 hover:text-black dark:hover:text-white"
              >
                Clear all
              </Button>
            )}
          </div>
        </SheetHeader>

        {/* Scrollable Filter Content */}
        <div className="flex-1 overflow-y-auto p-6 h-[calc(100vh-180px)]">
          {/* Global Filters */}
          {GLOBAL_FILTERS.map((filter) => {
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

        {/* Footer with Apply Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white dark:bg-black border-t-2 border-black dark:border-white">
          <SheetClose asChild>
            <Button className="w-full font-helvicta bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100">
              APPLY FILTERS
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
