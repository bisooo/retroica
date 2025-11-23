import { sdk } from "@/lib/sdk"
import type { Cart, ShippingAddress, BillingAddress } from "@/lib/types/cart.types"

export class CartService {
  private static CART_ID_KEY = "cart_id"

  static getCartId(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(this.CART_ID_KEY)
  }

  static setCartId(cartId: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.CART_ID_KEY, cartId)
  }

  static clearCartId(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.CART_ID_KEY)
  }

  static async getOrCreateCart(regionId?: string, currencyCode?: string): Promise<Cart> {
    const cartId = this.getCartId()

    if (cartId) {
      try {
        const { cart } = await sdk.store.cart.retrieve(cartId, {
          fields: "+items.product.metadata,+items.product.weight",
        })

        if (currencyCode && cart.currency_code?.toLowerCase() !== currencyCode.toLowerCase()) {
          const region = await this.findRegionByCurrency(currencyCode)
          if (region) {
            return await this.updateRegion(region.id)
          }
        }

        return cart as Cart
      } catch (error) {
        this.clearCartId()
      }
    }

    return this.createCart(regionId, currencyCode)
  }

  static async createCart(regionId?: string, currencyCode?: string): Promise<Cart> {
    try {
      if (!regionId) {
        if (currencyCode) {
          const region = await this.findRegionByCurrency(currencyCode)
          regionId = region?.id
        }

        if (!regionId) {
          const { regions } = await sdk.store.region.list()
          regionId = regions?.[0]?.id
        }
      }

      const { cart } = await sdk.store.cart.create({ region_id: regionId })
      this.setCartId(cart.id)
      return cart as Cart
    } catch (error) {
      throw new Error("Failed to create cart")
    }
  }

  static async addItem(variantId: string, quantity = 1): Promise<Cart> {
    try {
      const cart = await this.getOrCreateCart()

      const existingItem = cart.items?.find((item) => item.variant_id === variantId)

      if (existingItem) {
        throw new Error("This item is already in your cart. Each product has a maximum quantity of 1.")
      }

      const { cart: updatedCart } = await sdk.store.cart.createLineItem(cart.id, {
        variant_id: variantId,
        quantity: 1,
      })
      return updatedCart as Cart
    } catch (error) {
      throw error
    }
  }

  static async removeItem(lineItemId: string): Promise<Cart> {
    try {
      const cartId = this.getCartId()
      if (!cartId) throw new Error("No cart found")

      await sdk.store.cart.deleteLineItem(cartId, lineItemId)

      const { cart } = await sdk.store.cart.retrieve(cartId)
      return cart as Cart
    } catch (error) {
      throw new Error("Failed to remove item from cart")
    }
  }

  static async updateEmail(email: string): Promise<Cart> {
    try {
      const cartId = this.getCartId()
      if (!cartId) throw new Error("No cart found")

      const { cart } = await sdk.store.cart.update(cartId, { email })
      return cart as Cart
    } catch (error) {
      throw new Error("Failed to update email")
    }
  }

  static async updateShippingAddress(address: ShippingAddress): Promise<Cart> {
    try {
      const cartId = this.getCartId()
      if (!cartId) throw new Error("No cart found")

      const normalizedAddress = {
        ...address,
        country_code: address.country_code.toLowerCase(),
      }

      const currentCart = await this.getOrCreateCart()
      const targetRegion = await this.findRegionForCountry(normalizedAddress.country_code)

      if (!targetRegion) {
        throw new Error(
          `No region found for country: ${normalizedAddress.country_code}. Please ensure this country is added to a region.`,
        )
      }

      if (currentCart.region_id !== targetRegion.id) {
        await this.updateRegion(targetRegion.id)
      }

      const { cart } = await sdk.store.cart.update(cartId, { shipping_address: normalizedAddress })
      return cart as Cart
    } catch (error) {
      if (error instanceof Error && error.message.includes("region")) {
        throw error
      }
      throw new Error("Failed to update shipping address")
    }
  }

  static async updateBillingAddress(address: BillingAddress): Promise<Cart> {
    try {
      const cartId = this.getCartId()
      if (!cartId) throw new Error("No cart found")

      const { cart } = await sdk.store.cart.update(cartId, { billing_address: address })
      return cart as Cart
    } catch (error) {
      throw new Error("Failed to update billing address")
    }
  }

  static async initializePaymentSession(providerId = "pp_stripe_stripe"): Promise<Cart> {
    try {
      const cartId = this.getCartId()
      if (!cartId) throw new Error("No cart found")

      const { cart } = await sdk.store.cart.retrieve(cartId)

      await sdk.store.payment.initiatePaymentSession(cart, {
        provider_id: providerId,
      })

      const { cart: updatedCart } = await sdk.store.cart.retrieve(cartId)
      return updatedCart as Cart
    } catch (error) {
      throw new Error("Failed to initialize payment session")
    }
  }

  static async completeCart(): Promise<{ order: any }> {
    try {
      const cartId = this.getCartId()
      if (!cartId) throw new Error("No cart found")

      const { cart } = await sdk.store.cart.retrieve(cartId)

      if (!cart.shipping_methods || cart.shipping_methods.length === 0) {
        throw new Error("No shipping method selected. Please go back and select a shipping method.")
      }

      const { order } = await sdk.store.cart.complete(cartId)
      this.clearCartId()
      return { order }
    } catch (error) {
      throw error
    }
  }

  static async getRegions() {
    try {
      const { regions } = await sdk.store.region.list()
      return regions
    } catch (error) {
      return []
    }
  }

  static async findRegionForCountry(countryCode: string) {
    try {
      const regions = await this.getRegions()
      const normalizedCode = countryCode.toLowerCase()

      return regions.find((r: any) => {
        return r.countries?.some((c: any) => c.iso_2?.toLowerCase() === normalizedCode)
      })
    } catch (error) {
      return null
    }
  }

  static async updateRegion(regionId: string): Promise<Cart> {
    try {
      const cartId = this.getCartId()
      if (!cartId) throw new Error("No cart found")

      const { cart } = await sdk.store.cart.update(cartId, { region_id: regionId })
      return cart as Cart
    } catch (error) {
      throw new Error("Failed to update cart region")
    }
  }

  static async getShippingOptions() {
    try {
      const cartId = this.getCartId()
      if (!cartId) throw new Error("No cart found")

      const { shipping_options } = await sdk.store.fulfillment.listCartOptions({ cart_id: cartId })
      return shipping_options
    } catch (error) {
      throw new Error("Failed to fetch shipping options")
    }
  }

  static async addShippingMethod(shippingOptionId: string, data?: Record<string, any>): Promise<Cart> {
    try {
      const cartId = this.getCartId()
      if (!cartId) throw new Error("No cart found")

      await sdk.store.cart.addShippingMethod(cartId, {
        option_id: shippingOptionId,
        data,
      })

      const { cart } = await sdk.store.cart.retrieve(cartId)
      return cart as Cart
    } catch (error) {
      throw new Error("Failed to add shipping method")
    }
  }

  static async findRegionByCurrency(currencyCode: string) {
    try {
      const regions = await this.getRegions()
      const normalizedCode = currencyCode.toLowerCase()

      return regions.find((r: any) => r.currency_code?.toLowerCase() === normalizedCode)
    } catch (error) {
      return null
    }
  }
}
