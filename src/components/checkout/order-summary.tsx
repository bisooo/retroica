"use client"

import Image from "next/image"
import { getCurrencySymbol } from "@/lib/utils/currency"
import type { Cart } from "@/lib/types/cart.types"
import { X, Minus, Plus } from "lucide-react"
import { useCart } from "@/lib/contexts/cart-context"

interface OrderSummaryProps {
  cart: Cart
  displayCurrency: string
  itemSubtotal: number
  shippingAmount: number
  showShipping: boolean
}

export function OrderSummary({ cart, displayCurrency, itemSubtotal, shippingAmount, showShipping }: OrderSummaryProps) {
  const { removeFromCart } = useCart()

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
            <div className="flex-1 min-w-0">
              <h3 className="font-helvicta text-sm font-bold line-clamp-1 md:line-clamp-2">{item.title}</h3>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center border-2 border-black dark:border-white">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      type="button"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 py-1 border-x-2 border-black dark:border-white font-business text-xs min-w-[32px] text-center">
                      {item.quantity}
                    </span>
                    <button disabled className="px-2 py-1 opacity-30 cursor-not-allowed" type="button">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-black dark:hover:text-white"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="font-business text-sm font-bold">
                  {getCurrencySymbol(displayCurrency)}
                  {(item.unit_price * item.quantity).toFixed(2)}
                </p>
              </div>
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
              {shippingAmount === 0 ? "FREE" : `${getCurrencySymbol(displayCurrency)}${shippingAmount.toFixed(2)}`}
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
