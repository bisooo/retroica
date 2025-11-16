"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, X, Minus, Plus } from 'lucide-react'
import { useCart } from "@/lib/contexts/cart-context"
import { useCurrency } from "@/lib/contexts/currency-context"
import Image from "next/image"
import Link from "next/link"
import { getCurrencySymbol } from "@/lib/utils/currency"

export default function CartDrawer() {
  const { cart, itemCount, removeFromCart, isLoading } = useCart()
  const { currency } = useCurrency()

  const isEmpty = !cart || !cart.items || cart.items.length === 0
  const displayCurrency = cart?.currency_code?.toUpperCase() || currency || 'EUR'

  const calculateSubtotal = () => {
    if (!cart?.items) return 0
    return cart.items.reduce((sum, item) => {
      return sum + (item.unit_price * item.quantity)
    }, 0)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg border-l-2 border-black dark:border-white bg-white dark:bg-black flex flex-col">
        <SheetHeader className="border-b-2 border-black dark:border-white pb-4">
          <SheetTitle className="font-helvicta text-xl">SHOPPING CART</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="font-business text-gray-500 dark:text-gray-400">Loading cart...</p>
          </div>
        ) : isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <ShoppingCart className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
            <p className="font-helvicta text-lg mb-2">Your cart is empty</p>
            <p className="font-business text-sm text-gray-500 dark:text-gray-400">
              Add some vintage items to get started
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 py-6">
              {cart.items.map((item) => {
                return (
                  <div key={item.id} className="border-2 border-black dark:border-white p-3">
                    <div className="flex gap-3">
                      <div className="relative w-20 h-20 border-2 border-black dark:border-white flex-shrink-0">
                        <Image
                          src={item.thumbnail || "/images/film-can.avif"}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className="font-helvicta text-sm font-bold line-clamp-2 flex-1">{item.title}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-black dark:hover:text-white flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        {item.subtitle && (
                          <p className="font-business text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                            {item.subtitle}
                          </p>
                        )}

                        <div className="flex justify-between items-center gap-3 mt-auto">
                          <div className="flex items-center border-2 border-black dark:border-white w-fit">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 py-1 border-x-2 border-black dark:border-white font-business text-xs min-w-[32px] text-center">
                              1
                            </span>
                            <button disabled className="px-2 py-1 opacity-30 cursor-not-allowed">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <p className="font-helvicta text-sm font-bold">
                            {getCurrencySymbol(displayCurrency)}
                            {item.unit_price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="border-t-2 border-black dark:border-white pt-4 space-y-3 flex-shrink-0">
              <div className="flex justify-between font-business text-sm">
                <span>Subtotal</span>
                <span>
                  {getCurrencySymbol(displayCurrency)}
                  {calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <Link href="/checkout" className="block">
                <Button className="w-full font-helvicta text-sm h-12">PROCEED TO CHECKOUT</Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
