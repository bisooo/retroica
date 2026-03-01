"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useFilterParams } from "@/lib/filters/hooks"

interface RangeSliderFilterProps {
  title: string
  paramKeyMin: string
  paramKeyMax: string
  min: number
  max: number
  step: number
  formatLabel?: (val: number) => string
  defaultOpen?: boolean
}

export default function RangeSliderFilter({
  title,
  paramKeyMin,
  paramKeyMax,
  min,
  max,
  step,
  formatLabel = (val) => val.toString(),
  defaultOpen = false,
}: RangeSliderFilterProps) {
  const { getRangeValues, setRange } = useFilterParams()
  const [minValue, maxValue] = getRangeValues(paramKeyMin.replace('_min', ''), min, max)
  
  // Local state for smooth slider interaction
  const [localValues, setLocalValues] = useState<[number, number]>([minValue, maxValue])
  
  // Sync local state with URL params
  useEffect(() => {
    setLocalValues([minValue, maxValue])
  }, [minValue, maxValue])

  const handleValueChange = (values: number[]) => {
    setLocalValues([values[0], values[1]])
  }

  const handleValueCommit = (values: number[]) => {
    setRange(paramKeyMin, paramKeyMax, values[0], values[1], min, max)
  }

  const isActive = localValues[0] !== min || localValues[1] !== max

  return (
    <Collapsible defaultOpen={defaultOpen} className="mb-6">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left group">
        <div className="flex items-center gap-2">
          <h3 className="font-helvicta text-sm font-bold text-black dark:text-white">
            {title}
          </h3>
          {isActive && (
            <span className="w-2 h-2 bg-black dark:bg-white rounded-full" />
          )}
        </div>
        <ChevronDown className="h-4 w-4 text-black dark:text-white transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand">
        <div className="pt-4 space-y-4">
          {/* Slider */}
          <div className="px-1">
            <Slider
              value={localValues}
              min={min}
              max={max}
              step={step}
              onValueChange={handleValueChange}
              onValueCommit={handleValueCommit}
              className="[&_[data-orientation=horizontal]]:h-2 [&_.bg-primary]:bg-black dark:[&_.bg-primary]:bg-white [&_.bg-secondary]:bg-gray-200 dark:[&_.bg-secondary]:bg-gray-700 [&_[role=slider]]:border-2 [&_[role=slider]]:border-black dark:[&_[role=slider]]:border-white [&_[role=slider]]:bg-white dark:[&_[role=slider]]:bg-black"
            />
          </div>

          {/* Value Display */}
          <div className="flex justify-between font-business text-xs text-black dark:text-white">
            <span>{formatLabel(localValues[0])}</span>
            <span>{formatLabel(localValues[1])}</span>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
