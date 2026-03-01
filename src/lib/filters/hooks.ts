"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useMemo } from "react"

export interface FilterParams {
  [key: string]: string[]
}

export interface RangeParams {
  [key: string]: { min: number; max: number }
}

export function useFilterParams() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Parse current filter state from URL
  const params = useMemo(() => {
    const result: FilterParams = {}
    searchParams.forEach((value, key) => {
      // Skip range params (handled separately)
      if (key.endsWith('_min') || key.endsWith('_max')) return
      // Split comma-separated values
      result[key] = value.split(',').filter(Boolean)
    })
    return result
  }, [searchParams])

  // Parse range params from URL
  const rangeParams = useMemo(() => {
    const result: RangeParams = {}
    const rangeKeys = new Set<string>()
    
    searchParams.forEach((_, key) => {
      if (key.endsWith('_min') || key.endsWith('_max')) {
        const baseKey = key.replace(/_min$|_max$/, '')
        rangeKeys.add(baseKey)
      }
    })

    rangeKeys.forEach(baseKey => {
      const minVal = searchParams.get(`${baseKey}_min`)
      const maxVal = searchParams.get(`${baseKey}_max`)
      if (minVal !== null || maxVal !== null) {
        result[baseKey] = {
          min: minVal ? parseFloat(minVal) : 0,
          max: maxVal ? parseFloat(maxVal) : Infinity,
        }
      }
    })

    return result
  }, [searchParams])

  // Set filter values (multi-select)
  const setFilter = useCallback((key: string, values: string[]) => {
    const newParams = new URLSearchParams(searchParams.toString())
    
    if (values.length === 0) {
      newParams.delete(key)
    } else {
      newParams.set(key, values.join(','))
    }

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false })
  }, [searchParams, router, pathname])

  // Toggle a single value in a multi-select filter
  const toggleFilterValue = useCallback((key: string, value: string) => {
    const currentValues = params[key] || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    setFilter(key, newValues)
  }, [params, setFilter])

  // Set range filter
  const setRange = useCallback((paramKeyMin: string, paramKeyMax: string, min: number, max: number, defaultMin: number, defaultMax: number) => {
    const newParams = new URLSearchParams(searchParams.toString())
    
    // Only set params if different from defaults
    if (min !== defaultMin) {
      newParams.set(paramKeyMin, min.toString())
    } else {
      newParams.delete(paramKeyMin)
    }
    
    if (max !== defaultMax) {
      newParams.set(paramKeyMax, max.toString())
    } else {
      newParams.delete(paramKeyMax)
    }

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false })
  }, [searchParams, router, pathname])

  // Clear all filters
  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [router, pathname])

  // Check if a specific value is selected
  const isSelected = useCallback((key: string, value: string): boolean => {
    return (params[key] || []).includes(value)
  }, [params])

  // Get selected count for a filter
  const getSelectedCount = useCallback((key: string): number => {
    return (params[key] || []).length
  }, [params])

  // Get range values
  const getRangeValues = useCallback((baseKey: string, defaultMin: number, defaultMax: number): [number, number] => {
    const minVal = searchParams.get(`${baseKey}_min`)
    const maxVal = searchParams.get(`${baseKey}_max`)
    return [
      minVal ? parseFloat(minVal) : defaultMin,
      maxVal ? parseFloat(maxVal) : defaultMax,
    ]
  }, [searchParams])

  // Count total active filters
  const activeCount = useMemo(() => {
    let count = 0
    // Count multi-select filters
    Object.values(params).forEach(values => {
      count += values.length
    })
    // Count range filters (each active range counts as 1)
    Object.keys(rangeParams).forEach(() => {
      count += 1
    })
    return count
  }, [params, rangeParams])

  return {
    params,
    rangeParams,
    setFilter,
    toggleFilterValue,
    setRange,
    clearAll,
    isSelected,
    getSelectedCount,
    getRangeValues,
    activeCount,
  }
}
