"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

interface StripePaymentElementProps {
  onSuccess: () => void
  onError: (error: string) => void
}

export function StripePaymentElement({ onSuccess, onError }: StripePaymentElementProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isCheckoutEnabled, setIsCheckoutEnabled] = useState(true)
  const [flagLoading, setFlagLoading] = useState(true)

  useEffect(() => {
    fetch('/api/feature-flags')
      .then((res) => res.json())
      .then((data) => {
        setIsCheckoutEnabled(data.enableCheckout)
        setFlagLoading(false)
      })
      .catch(() => {
        setIsCheckoutEnabled(true)
        setFlagLoading(false)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isCheckoutEnabled) {
      onError("Checkout is currently disabled for testing")
      return
    }

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      })

      if (error) {
        onError(error.message || "Payment failed")
      } else {
        onSuccess()
      }
    } catch (err) {
      onError("An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          layout: {
            type: "tabs",
            defaultCollapsed: false,
          },
          wallets: {
            applePay: "auto",
            googlePay: "auto",
          },
        }}
        onReady={() => setIsReady(true)}
        onChange={(e) => {
          setIsReady(e.complete)
        }}
      />
      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing || !isReady || !isCheckoutEnabled || flagLoading}
        className="w-full h-12 font-helvicta"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            PROCESSING...
          </>
        ) : (
          "PLACE ORDER"
        )}
      </Button>
      {!isCheckoutEnabled && (
        <p className="text-sm text-muted-foreground text-center">
          Checkout is currently disabled for testing purposes
        </p>
      )}
    </form>
  )
}
