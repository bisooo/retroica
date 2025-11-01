"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ProductService } from "@/lib/services/product.service"

interface DesktopSearchProps {
  isActive: boolean
  onActiveChange: (active: boolean) => void
  onResultsChange: (results: any[]) => void
}

export default function DesktopSearch({ isActive, onActiveChange, onResultsChange }: DesktopSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus()
    }
  }, [isActive])

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length < 2) {
        onResultsChange([])
        return
      }

      setIsSearching(true)
      try {
        const results = await ProductService.searchProducts(searchQuery.trim())
        const formattedResults = results.slice(0, 6).map((product) => ({
          ...product,
          price: product.variants?.[0]?.calculated_price?.calculated_amount || 0,
        }))
        onResultsChange(formattedResults)
      } catch (error) {
        console.error("Search error:", error)
        onResultsChange([])
      } finally {
        setIsSearching(false)
      }
    }

    const debounceTimer = setTimeout(handleSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, onResultsChange])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      onActiveChange(false)
      setSearchQuery("")
      onResultsChange([])
    } else if (e.key === "Escape") {
      onActiveChange(false)
      setSearchQuery("")
      onResultsChange([])
    }
  }

  return (
    <div className="relative w-10">
      {!isActive ? (
        <Button
          variant="ghost"
          size="icon"
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => onActiveChange(true)}
        >
          <Search className="h-5 w-5" />
        </Button>
      ) : (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 border-2 border-black dark:border-white px-3 py-1 bg-white dark:bg-black z-10 whitespace-nowrap">
          <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-48 border-none focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm h-7 px-0"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              onActiveChange(false)
              setSearchQuery("")
              onResultsChange([])
            }}
            className="h-7 w-7 hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
