"use client"

import type React from "react"

import { useState } from "react"
import { X, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

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

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setPriceRange([value, priceRange[1]])
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setPriceRange([priceRange[0], value])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-black border-l-2 border-black dark:border-white overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-black dark:border-white">
          <h2 className="font-mono text-lg font-bold text-black dark:text-white">FILTERS</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
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
              <h3 className="font-mono text-sm font-bold text-black dark:text-white">BRAND</h3>
              {expandedSections.brand ? (
                <ChevronUp className="h-4 w-4 text-black dark:text-white" />
              ) : (
                <ChevronDown className="h-4 w-4 text-black dark:text-white" />
              )}
            </button>
            {expandedSections.brand && (
              <div className="space-y-3">
                {brands.map((brand) => (
                  <div key={brand.name} className="flex items-center space-x-2">
                    <Checkbox id={`mobile-${brand.name.toLowerCase()}`} />
                    <label
                      htmlFor={`mobile-${brand.name.toLowerCase()}`}
                      className="font-mono text-xs cursor-pointer text-black dark:text-white"
                    >
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
              <h3 className="font-mono text-sm font-bold text-black dark:text-white">PRICE</h3>
              {expandedSections.price ? (
                <ChevronUp className="h-4 w-4 text-black dark:text-white" />
              ) : (
                <ChevronDown className="h-4 w-4 text-black dark:text-white" />
              )}
            </button>
            {expandedSections.price && (
              <div className="space-y-4">
                {/* Custom Dual Range Slider */}
                <div className="px-2">
                  <div className="relative">
                    {/* Track */}
                    <div className="slider-track">
                      <div
                        className="slider-range"
                        style={{
                          left: `${(priceRange[0] / 1000) * 100}%`,
                          width: `${((priceRange[1] - priceRange[0]) / 1000) * 100}%`,
                        }}
                      ></div>
                    </div>

                    {/* Min Handle */}
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[0]}
                      onChange={handleMinChange}
                      className="absolute w-full h-4 bg-transparent appearance-none cursor-pointer slider-thumb-input"
                      style={{ zIndex: 1 }}
                    />

                    {/* Max Handle */}
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[1]}
                      onChange={handleMaxChange}
                      className="absolute w-full h-4 bg-transparent appearance-none cursor-pointer slider-thumb-input"
                      style={{ zIndex: 2 }}
                    />
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex justify-between font-mono text-xs text-black dark:text-white">
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
              <h3 className="font-mono text-sm font-bold text-black dark:text-white">FORMAT</h3>
              {expandedSections.format ? (
                <ChevronUp className="h-4 w-4 text-black dark:text-white" />
              ) : (
                <ChevronDown className="h-4 w-4 text-black dark:text-white" />
              )}
            </button>
            {expandedSections.format && (
              <div className="space-y-3">
                {formats.map((format) => (
                  <div key={format.name} className="flex items-center space-x-2">
                    <Checkbox id={`mobile-${format.name.toLowerCase()}`} />
                    <label
                      htmlFor={`mobile-${format.name.toLowerCase()}`}
                      className="font-mono text-xs cursor-pointer text-black dark:text-white"
                    >
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
              <h3 className="font-mono text-sm font-bold text-black dark:text-white">ISO</h3>
              {expandedSections.iso ? (
                <ChevronUp className="h-4 w-4 text-black dark:text-white" />
              ) : (
                <ChevronDown className="h-4 w-4 text-black dark:text-white" />
              )}
            </button>
            {expandedSections.iso && (
              <div className="space-y-3">
                {isoTypes.map((iso) => (
                  <div key={iso.name} className="flex items-center space-x-2">
                    <Checkbox id={`mobile-${iso.name.toLowerCase()}`} />
                    <label
                      htmlFor={`mobile-${iso.name.toLowerCase()}`}
                      className="font-mono text-xs cursor-pointer text-black dark:text-white"
                    >
                      {iso.name} ({iso.count})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <Button className="w-full font-mono bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100">
            APPLY FILTERS
          </Button>
        </div>
      </div>
    </div>
  )
}
