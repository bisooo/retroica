"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ProductService } from "@/lib/services/product.service"
import type { MedusaProduct } from "@/lib/types/product.types"
import Image from "next/image"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<MedusaProduct[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      setSearchQuery("")
      setSearchResults([])
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([])
        return
      }

      setIsSearching(true)
      try {
        const results = await ProductService.searchProducts(searchQuery.trim())
        setSearchResults(results)
      } catch (error) {
        console.error("Search error:", error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    const debounceTimer = setTimeout(handleSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-x-0 top-0 bg-white dark:bg-black border-b-2 border-black dark:border-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 border-2 border-black dark:border-white font-helvicta"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-4">
          {isSearching ? (
            <div className="text-center py-8 font-helvicta text-sm text-gray-500">SEARCHING...</div>
          ) : searchResults.length === 0 && searchQuery.trim().length >= 2 ? (
            <div className="text-center py-8 font-helvicta text-sm text-gray-500">NO PRODUCTS FOUND.</div>
          ) : searchResults.length > 0 ? (
            <div className="overflow-x-auto -mx-4 px-4">
              <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.handle}`}
                    onClick={onClose}
                    className="flex-shrink-0 w-48 border-2 border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="relative aspect-square border-b-2 border-black dark:border-white">
                      <Image
                        src={product.thumbnail || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="192px"
                      />
                    </div>
                    <div className="p-3">
                      <div className="font-helvicta text-sm font-medium text-black dark:text-white line-clamp-2 min-h-[2.5rem]">
                        {product.title}
                      </div>
                      <div className="font-business text-sm text-gray-600 dark:text-gray-400 mt-2">
                        €{(product.variants?.[0]?.calculated_price?.calculated_amount || 0).toFixed(2)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
