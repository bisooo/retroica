"use client"

import { useState } from "react"
import { X, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileFilters({ isOpen, onClose }: MobileFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    price: true,
    format: true,
    iso: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const brands = [
    { name: "KODAK", count: 3 },
    { name: "FUJIFILM", count: 10 },
    { name: "OLYMPUS", count: 20 },
  ]

  const formats = [
    { name: "35MM", count: 30 },
    { name: "120MM", count: 18 },
    { name: "110MM", count: 5 },
    { name: "APS", count: 2 },
  ]

  const isoTypes = [
    { name: "MANUAL", count: 7 },
    { name: "DX-CODE", count: 20 },
    { name: "FIXED", count: 3 },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white border-l-2 border-black overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-black">
          <h2 className="font-mono text-lg font-bold">FILTERS</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Filters Content */}
        <div className="p-6">
          {/* Brand Filter */}
          <div className="mb-8">
            <button
              onClick={() => toggleSection("brand")}
              className="flex items-center justify-between w-full mb-4 text-left"
            >
              <h3 className="font-mono text-sm font-bold">BRAND</h3>
              {expandedSections.brand ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.brand && (
              <div className="space-y-3">
                {brands.map((brand) => (
                  <div key={brand.name} className="flex items-center space-x-2">
                    <Checkbox id={`mobile-${brand.name.toLowerCase()}`} />
                    <label htmlFor={`mobile-${brand.name.toLowerCase()}`} className="font-mono text-xs cursor-pointer">
                      {brand.name} ({brand.count})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="mb-8">
            <button
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full mb-4 text-left"
            >
              <h3 className="font-mono text-sm font-bold">PRICE</h3>
              {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.price && (
              <div className="space-y-4">
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    min={0}
                    step={10}
                    className="w-full [&_[role=slider]]:bg-black [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:shadow-md"
                  />
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Format Filter */}
          <div className="mb-8">
            <button
              onClick={() => toggleSection("format")}
              className="flex items-center justify-between w-full mb-4 text-left"
            >
              <h3 className="font-mono text-sm font-bold">FORMAT</h3>
              {expandedSections.format ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.format && (
              <div className="space-y-3">
                {formats.map((format) => (
                  <div key={format.name} className="flex items-center space-x-2">
                    <Checkbox id={`mobile-${format.name.toLowerCase()}`} />
                    <label htmlFor={`mobile-${format.name.toLowerCase()}`} className="font-mono text-xs cursor-pointer">
                      {format.name} ({format.count})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ISO Filter */}
          <div className="mb-8">
            <button
              onClick={() => toggleSection("iso")}
              className="flex items-center justify-between w-full mb-4 text-left"
            >
              <h3 className="font-mono text-sm font-bold">ISO</h3>
              {expandedSections.iso ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.iso && (
              <div className="space-y-3">
                {isoTypes.map((iso) => (
                  <div key={iso.name} className="flex items-center space-x-2">
                    <Checkbox id={`mobile-${iso.name.toLowerCase()}`} />
                    <label htmlFor={`mobile-${iso.name.toLowerCase()}`} className="font-mono text-xs cursor-pointer">
                      {iso.name} ({iso.count})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <Button className="w-full font-mono bg-black text-white border-2 border-black hover:bg-gray-800">
            APPLY FILTERS
          </Button>
        </div>
      </div>
    </div>
  )
}
