"use client"

import { Grid3X3, List, ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductGridControlsProps {
  productCount: number
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  onFiltersOpen: () => void
}

export default function ProductGridControls({
  productCount,
  viewMode,
  onViewModeChange,
  onFiltersOpen,
}: ProductGridControlsProps) {
  return (
    <div className="mb-6 border-b border-black pb-4">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Top Row - View controls and product count */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex border border-black">
            <Button
              variant="ghost"
              size="sm"
              className={`border-r border-black rounded-none px-2 ${viewMode === "grid" ? "bg-black text-white" : ""}`}
              onClick={() => onViewModeChange("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none px-2 ${viewMode === "list" ? "bg-black text-white" : ""}`}
              onClick={() => onViewModeChange("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <span className="font-mono text-sm">{productCount} PRODUCTS</span>
        </div>

        {/* Bottom Row - Filters and Sort */}
        <div className="flex items-center justify-between">
          <Button variant="outline" className="font-mono text-sm border-black flex-1 mr-2" onClick={onFiltersOpen}>
            <Filter className="h-4 w-4 mr-2" />
            FILTERS
          </Button>
          <Button variant="outline" className="font-mono text-sm border-black flex-1 ml-2">
            SORT BY PRICE
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between">
        {/* Left side - View controls and product count */}
        <div className="flex items-center space-x-4">
          <div className="flex border border-black">
            <Button
              variant="ghost"
              size="sm"
              className={`border-r border-black rounded-none ${viewMode === "grid" ? "bg-black text-white" : ""}`}
              onClick={() => onViewModeChange("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none ${viewMode === "list" ? "bg-black text-white" : ""}`}
              onClick={() => onViewModeChange("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <span className="font-mono text-sm">{productCount} PRODUCTS</span>
        </div>

        {/* Right side - Sort dropdown */}
        <div className="flex items-center space-x-2">
          <span className="font-mono text-sm">SORT BY</span>
          <Button variant="outline" className="font-mono text-sm border-black">
            PRICE
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
