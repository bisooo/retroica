"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { CartService } from "@/lib/services/cart.service"
import type { Cart } from "@/lib/types/cart.types"
import { useToast } from "@/hooks/use-toast"

interface CartContextType {
  cart: Cart | null
  isLoading: boolean
  itemCount: number
  addToCart: (variantId: string, quantity?: number) => Promise<void>
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>
  removeFromCart: (lineItemId: string) => Promise<void>
  refreshCart: () => Promise<void>
  updateCartCurrency: (currencyCode: string) => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0

  const refreshCart = async () => {
    try {
      setIsLoading(true)
      const cartId = CartService.getCartId()
      if (cartId) {
        const cart = await CartService.getOrCreateCart()
        setCart(cart)
      }
    } catch (error) {
      console.error("Failed to refresh cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateCartCurrency = async (currencyCode: string) => {
    try {
      const cartId = CartService.getCartId()
      if (!cartId) return

      // Find region for the selected currency
      const region = await CartService.findRegionByCurrency(currencyCode)
      if (!region) {
        console.error(`No region found for currency: ${currencyCode}`)
        return
      }

      // Update cart to use the new region
      const updatedCart = await CartService.updateRegion(region.id)
      setCart(updatedCart)
    } catch (error) {
      console.error("Failed to update cart currency:", error)
    }
  }

  useEffect(() => {
    refreshCart()
    
    const handleCurrencyChange = (event: CustomEvent) => {
      const { currency } = event.detail
      updateCartCurrency(currency)
    }
    
    window.addEventListener('currencyChanged', handleCurrencyChange as EventListener)
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange as EventListener)
  }, [])

  const addToCart = async (variantId: string, quantity = 1) => {
    try {
      const updatedCart = await CartService.addItem(variantId, quantity)
      setCart(updatedCart)

      const addedItem = updatedCart.items?.find((item) => item.variant_id === variantId)
      const productName = addedItem?.title || "Product"

      toast({
        title: "ITEM ADDED TO CART",
        description: `${productName} added to your cart`,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to add item to cart"

      // Extract product name from error if it's a duplicate item error
      if (message.includes("already in your cart")) {
        // Try to get the product name from the cart
        const existingItem = cart?.items?.find((item) => item.variant_id === variantId)
        const productName = existingItem?.title || "This item"

        toast({
          title: "CAN'T ADD ITEM",
          description: `${productName} is already in your cart`,
          variant: "destructive",
        })
      } else {
        toast({
          title: "CAN'T ADD ITEM",
          description: message,
          variant: "destructive",
        })
      }
    }
  }

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    toast({
      title: "Cannot update quantity",
      description: "Each product has a maximum quantity of 1",
      variant: "destructive",
    })
  }

  const removeFromCart = async (lineItemId: string) => {
    try {
      const updatedCart = await CartService.removeItem(lineItemId)
      setCart(updatedCart)

      toast({
        title: "Removed from cart",
        description: "Item removed from your cart",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      })
      // Refresh cart from server if there was an error
      await refreshCart()
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        itemCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        refreshCart,
        updateCartCurrency,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
