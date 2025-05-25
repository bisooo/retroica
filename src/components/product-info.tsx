"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductInfoProps {
  product: {
    name: string
    brand: string
    price: number
    rating: number
    reviewCount: number
    year: string
    stockStatus: string
  }
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [expandedSections, setExpandedSections] = useState({
    details: false,
    specs: false,
    shipping: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="h-full flex flex-col space-y-4 pt-4 overflow-y-auto">
      {/* Product Title and Year */}
      <div className="flex-shrink-0 flex items-start justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold mb-1">{product.name}</h1>
          <p className="font-mono text-base text-gray-600 mb-2">{product.brand}</p>
        </div>
        <div className="text-right">
          <span className="font-mono text-base">{product.year}</span>
        </div>
      </div>

      {/* Product Description */}
      <div className="flex-shrink-0 font-mono text-xs leading-relaxed text-gray-700">
        <p className="break-words">
          .....................................................................................................
        </p>
      </div>

      {/* Price, Rating, and Stock - Desktop Layout */}
      <div className="flex-shrink-0 hidden lg:flex lg:items-center lg:justify-between lg:space-x-4">
        {/* Price */}
        <div className="font-mono text-xl font-bold">${product.price}</div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-black" : "fill-gray-200"}`} />
            ))}
          </div>
          <span className="font-mono text-sm">({product.reviewCount})</span>
        </div>

        {/* Stock Status */}
        <div className="font-mono text-sm">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          {product.stockStatus}
        </div>
      </div>

      {/* Price and Rating - Mobile Layout */}
      <div className="flex-shrink-0 lg:hidden space-y-3">
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="font-mono text-xl font-bold">${product.price}</div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-black" : "fill-gray-200"}`} />
              ))}
            </div>
            <span className="font-mono text-sm">({product.reviewCount})</span>
          </div>
        </div>

        {/* Stock Status - Mobile */}
        <div className="font-mono text-sm">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          {product.stockStatus}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 space-y-3">
        <Button className="w-full font-mono text-sm py-3 bg-black text-white border-2 border-black hover:bg-gray-800">
          ADD TO CART
        </Button>
        <Button variant="outline" className="w-full font-mono text-sm py-3 border-2 border-black hover:bg-gray-100">
          BUY NOW
        </Button>
        <Button variant="outline" className="w-full font-mono text-sm py-3 border-2 border-black hover:bg-gray-100">
          SHARE IT
        </Button>
      </div>

      {/* Collapsible Sections */}
      <div className="flex-1 min-h-0 space-y-4 border-t-2 border-black pt-4">
        {/* Details Section */}
        <div className="border-b border-black pb-4">
          <button
            onClick={() => toggleSection("details")}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-mono text-sm font-bold">DETAILS</h3>
            <div
              className={`w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[8px] border-t-black transform transition-transform ${expandedSections.details ? "rotate-180" : ""}`}
            ></div>
          </button>
          {expandedSections.details && (
            <div className="mt-4 space-y-1 font-mono text-xs">
              <p>•</p>
              <p>•</p>
              <p>•</p>
            </div>
          )}
        </div>

        {/* Specs Section */}
        <div className="border-b border-black pb-4">
          <button onClick={() => toggleSection("specs")} className="flex items-center justify-between w-full text-left">
            <h3 className="font-mono text-sm font-bold">SPECS</h3>
            <div
              className={`w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[8px] border-t-black transform transition-transform ${expandedSections.specs ? "rotate-180" : ""}`}
            ></div>
          </button>
          {expandedSections.specs && (
            <div className="mt-4 space-y-1 font-mono text-xs">
              <p>•</p>
              <p>•</p>
              <p>•</p>
            </div>
          )}
        </div>

        {/* Shipping Section */}
        <div className="pb-4">
          <button
            onClick={() => toggleSection("shipping")}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-mono text-sm font-bold">SHIPPING</h3>
            <div
              className={`w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[8px] border-t-black transform transition-transform ${expandedSections.shipping ? "rotate-180" : ""}`}
            ></div>
          </button>
          {expandedSections.shipping && (
            <div className="mt-4 space-y-1 font-mono text-xs">
              <p>•</p>
              <p>•</p>
              <p>•</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
