"use client"

import Image from "next/image"
import { getCurrencySymbol } from "@/lib/utils/currency"
import type { Cart } from "@/lib/types/cart.types"

interface OrderSummaryProps {
  cart: Cart
  displayCurrency: string
  itemSubtotal: number
  shippingAmount: number
  showShipping: boolean
}

export function OrderSummary({
  cart,
  displayCurrency,
  itemSubtotal,
  shippingAmount,
  showShipping,
}: OrderSummaryProps) {
  return (
    <div className="border-2 border-black dark:border-white p-6">
      <h2 className="font-helvicta text-xl font-bold mb-4">ORDER SUMMARY</h2>

      <div className="space-y-4 mb-6">
        {cart?.items?.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-20 h-20 border-2 border-black dark:border-white flex-shrink-0">
              <Image
                src={item.thumbnail || "/images/film-can.avif"}
                alt={item.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-helvicta text-sm font-bold line-clamp-2">{item.title}</h3>
              <p className="font-business text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
              <p className="font-business text-sm font-bold mt-1">
                {getCurrencySymbol(displayCurrency)}
                {(item.unit_price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-black dark:border-white pt-4 space-y-2">
        <div className="flex justify-between font-business text-sm">
          <span>Subtotal</span>
          <span>
            {getCurrencySymbol(displayCurrency)}
            {itemSubtotal.toFixed(2)}
          </span>
        </div>
        {showShipping && (
          <div className="flex justify-between font-business text-sm">
            <span>Shipping</span>
            <span>
              {shippingAmount === 0
                ? "FREE"
                : `${getCurrencySymbol(displayCurrency)}${shippingAmount.toFixed(2)}`}
            </span>
          </div>
        )}
        <div className="flex justify-between font-helvicta text-lg font-bold border-t-2 border-black dark:border-white pt-2">
          <span>Total</span>
          <span>
            {getCurrencySymbol(displayCurrency)}
            {(() => {
              let total = itemSubtotal
              if (showShipping) {
                total += shippingAmount
              }
              return total.toFixed(2)
            })()}
          </span>
        </div>
      </div>
    </div>
  )
}
