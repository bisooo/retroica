"use client"

import { ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useFilterParams } from "@/lib/filters/hooks"

interface FilterOption {
  label: string
  value: string
  count?: number
}

interface MultiSelectFilterProps {
  title: string
  paramKey: string
  options: FilterOption[]
  defaultOpen?: boolean
}

export default function MultiSelectFilter({
  title,
  paramKey,
  options,
  defaultOpen = false,
}: MultiSelectFilterProps) {
  const { isSelected, toggleFilterValue, getSelectedCount } = useFilterParams()
  const selectedCount = getSelectedCount(paramKey)

  return (
    <Collapsible defaultOpen={defaultOpen} className="mb-6">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left group">
        <div className="flex items-center gap-2">
          <h3 className="font-helvicta text-sm font-bold text-black dark:text-white">
            {title}
          </h3>
          {selectedCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-black dark:bg-white text-white dark:text-black rounded-full">
              {selectedCount}
            </span>
          )}
        </div>
        <ChevronDown className="h-4 w-4 text-black dark:text-white transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand">
        <div className="pt-4 space-y-3">
          {options.map((option) => {
            const isChecked = isSelected(paramKey, option.value)
            return (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${paramKey}-${option.value}`}
                  checked={isChecked}
                  onCheckedChange={() => toggleFilterValue(paramKey, option.value)}
                  className="border-2 border-black dark:border-white data-[state=checked]:bg-black dark:data-[state=checked]:bg-white data-[state=checked]:text-white dark:data-[state=checked]:text-black"
                />
                <label
                  htmlFor={`${paramKey}-${option.value}`}
                  className={`font-business text-xs cursor-pointer transition-colors ${
                    isChecked 
                      ? "text-black dark:text-white font-bold" 
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {option.label}
                  {option.count !== undefined && (
                    <span className="ml-1 text-gray-400">({option.count})</span>
                  )}
                </label>
              </div>
            )
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
