"use client"

import { Button } from "@/components/ui/button"
import { Elements } from "@stripe/react-stripe-js"
import type { Stripe } from "@stripe/stripe-js"
import { Loader2 } from 'lucide-react'
import { StripePaymentElement } from "@/components/stripe-payment-element"
import type { ShippingAddress } from "@/lib/types/cart.types"

interface PaymentSectionProps {
  clientSecret: string | null
  stripePromise: Promise<Stripe | null>
  email: string
  shippingForm: ShippingAddress
  shippingOptions: any[]
  selectedShippingOption: string
  onPaymentSuccess: () => Promise<void>
  onPaymentError: (error: string) => void
  onEditContact: () => void
  onEditShipping: () => void
}

export function PaymentSection({
  clientSecret,
  stripePromise,
  email,
  shippingForm,
  shippingOptions,
  selectedShippingOption,
  onPaymentSuccess,
  onPaymentError,
  onEditContact,
  onEditShipping,
}: PaymentSectionProps) {
  return (
    <div className="space-y-4">
      <div className="border-2 border-black dark:border-white">
        <details className="group">
          <summary className="cursor-pointer p-4 font-helvicta font-bold text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900">
            <span>CONTACT</span>
            <span className="text-xs text-gray-500">{email}</span>
          </summary>
          <div className="p-4 border-t-2 border-black dark:border-white bg-gray-50 dark:bg-gray-900">
            <p className="font-business text-sm mb-2">
              <strong>Email:</strong> {email}
            </p>
            <p className="font-business text-sm">
              <strong>Name:</strong> {shippingForm.first_name} {shippingForm.last_name}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={onEditContact}
              className="mt-3 font-helvicta text-xs"
            >
              EDIT
            </Button>
          </div>
        </details>
      </div>

      <div className="border-2 border-black dark:border-white">
        <details className="group">
          <summary className="cursor-pointer p-4 font-helvicta font-bold text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900">
            <span>SHIPPING</span>
            <span className="text-xs text-gray-500">
              {shippingForm.city}, {shippingForm.country_code.toUpperCase()}
            </span>
          </summary>
          <div className="p-4 border-t-2 border-black dark:border-white bg-gray-50 dark:bg-gray-900">
            <p className="font-business text-sm">
              {shippingForm.address_1}
              {shippingForm.address_2 && `, ${shippingForm.address_2}`}
            </p>
            <p className="font-business text-sm">
              {shippingForm.city}, {shippingForm.postal_code}
            </p>
            <p className="font-business text-sm mb-2">{shippingForm.country_code.toUpperCase()}</p>
            <p className="font-business text-sm mb-2">
              <strong>Phone:</strong> {shippingForm.phone}
            </p>
            <p className="font-business text-sm">
              <strong>Shipping Method:</strong>{" "}
              {shippingOptions.find((opt) => opt.id === selectedShippingOption)?.name}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={onEditShipping}
              className="mt-3 font-helvicta text-xs"
            >
              EDIT
            </Button>
          </div>
        </details>
      </div>

      <div className="border-2 border-black dark:border-white p-6">
        <h2 className="font-helvicta text-xl font-bold mb-4">PAYMENT</h2>

        {clientSecret && stripePromise ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#000000",
                  colorBackground: "#ffffff",
                  colorText: "#000000",
                  colorDanger: "#ef4444",
                  fontFamily: "system-ui, sans-serif",
                  borderRadius: "0.375rem",
                },
              },
            }}
          >
            <StripePaymentElement onSuccess={onPaymentSuccess} onError={onPaymentError} />
          </Elements>
        ) : (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}
