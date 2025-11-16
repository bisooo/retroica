"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'
import { getCurrencySymbol } from "@/lib/utils/currency"
import type { ShippingAddress } from "@/lib/types/cart.types"
import { COUNTRIES } from "@/lib/data/countries"

interface ShippingFormProps {
  shippingForm: ShippingAddress
  isLoading: boolean
  isCalculatingShipping: boolean
  shippingOptions: any[]
  selectedShippingOption: string
  shippingAmount: number
  displayCurrency: string
  onShippingFormChange: (form: ShippingAddress) => void
  onShippingOptionChange: (optionId: string) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
  onBack: () => void
}

export function ShippingForm({
  shippingForm,
  isLoading,
  isCalculatingShipping,
  shippingOptions,
  selectedShippingOption,
  shippingAmount,
  displayCurrency,
  onShippingFormChange,
  onShippingOptionChange,
  onSubmit,
  onBack,
}: ShippingFormProps) {
  const showShippingMethodSelector = false
  
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="border-2 border-black dark:border-white p-6 space-y-4">
        <h2 className="font-helvicta text-xl font-bold mb-4">SHIPPING</h2>

        <div>
          <Label htmlFor="country_code" className="font-helvicta text-sm">
            COUNTRY
          </Label>
          <select
            id="country_code"
            value={shippingForm.country_code}
            onChange={(e) => onShippingFormChange({ ...shippingForm, country_code: e.target.value })}
            required
            className="mt-1 flex h-10 w-full rounded-md border-2 border-black dark:border-white bg-white dark:bg-black px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300"
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.display_name}
              </option>
            ))}
          </select>
        </div>

        {isCalculatingShipping && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-white flex items-center gap-3">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="font-business text-sm">Calculating shipping...</p>
          </div>
        )}

        {!isCalculatingShipping && shippingOptions.length > 0 && selectedShippingOption && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-helvicta font-bold text-sm">{shippingOptions[0].name}</p>
              </div>
              <p className="font-helvicta text-sm font-bold">
                {shippingAmount === 0
                  ? "FREE"
                  : `${getCurrencySymbol(displayCurrency)}${shippingAmount.toFixed(2)}`}
              </p>
            </div>
          </div>
        )}


        <div>
          <Label htmlFor="address_1" className="font-helvicta text-sm">
            ADDRESS
          </Label>
          <Input
            id="address_1"
            value={shippingForm.address_1}
            onChange={(e) => onShippingFormChange({ ...shippingForm, address_1: e.target.value })}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="address_2" className="font-helvicta text-sm">
            APARTMENT, SUITE, ETC. (OPTIONAL)
          </Label>
          <Input
            id="address_2"
            value={shippingForm.address_2}
            onChange={(e) => onShippingFormChange({ ...shippingForm, address_2: e.target.value })}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="font-helvicta text-sm">
              CITY
            </Label>
            <Input
              id="city"
              value={shippingForm.city}
              onChange={(e) => onShippingFormChange({ ...shippingForm, city: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="postal_code" className="font-helvicta text-sm">
              POSTAL CODE
            </Label>
            <Input
              id="postal_code"
              value={shippingForm.postal_code}
              onChange={(e) => onShippingFormChange({ ...shippingForm, postal_code: e.target.value })}
              required
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="font-helvicta text-sm">
            PHONE NUMBER
          </Label>
          <Input
            id="phone"
            type="tel"
            value={shippingForm.phone}
            onChange={(e) => onShippingFormChange({ ...shippingForm, phone: e.target.value })}
            required
            className="mt-1"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || isCalculatingShipping || (!selectedShippingOption && shippingAmount !== 0) || (!isCalculatingShipping && shippingOptions.length > 0 && shippingAmount === undefined)}
        className="w-full font-helvicta h-12"
      >
        {isLoading ? "PROCESSING..." : "CONTINUE TO PAYMENT"}
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className="w-full font-helvicta h-12"
        disabled={isLoading}
      >
        BACK TO CONTACT
      </Button>
    </form>
  )
}
