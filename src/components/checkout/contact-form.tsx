"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ShippingAddress } from "@/lib/types/cart.types"

interface ContactFormProps {
  email: string
  shippingForm: ShippingAddress
  isLoading: boolean
  onEmailChange: (email: string) => void
  onShippingFormChange: (form: ShippingAddress) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
}

export function ContactForm({
  email,
  shippingForm,
  isLoading,
  onEmailChange,
  onShippingFormChange,
  onSubmit,
}: ContactFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="border-2 border-black dark:border-white p-6 space-y-4">
        <h2 className="font-helvicta text-xl font-bold mb-4">CONTACT</h2>

        <div>
          <Label htmlFor="email" className="font-helvicta text-sm">
            EMAIL
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name" className="font-helvicta text-sm">
              FIRST NAME
            </Label>
            <Input
              id="first_name"
              value={shippingForm.first_name}
              onChange={(e) => onShippingFormChange({ ...shippingForm, first_name: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="last_name" className="font-helvicta text-sm">
              LAST NAME
            </Label>
            <Input
              id="last_name"
              value={shippingForm.last_name}
              onChange={(e) => onShippingFormChange({ ...shippingForm, last_name: e.target.value })}
              required
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full font-helvicta h-12">
        {isLoading ? "SAVING..." : "CONTINUE TO SHIPPING"}
      </Button>
    </form>
  )
}
