export interface CartItem {
  id: string
  variant_id: string
  product_id: string
  title: string
  subtitle?: string
  thumbnail?: string
  quantity: number
  unit_price: number
  total: number
}

export interface Cart {
  id: string
  email?: string
  region_id: string
  currency_code: string
  items: CartItem[]
  subtotal: number
  total: number
  shipping_address?: ShippingAddress
  billing_address?: BillingAddress
  payment_session?: PaymentSession
  shipping_option?: ShippingOption // Added shipping option
}

export interface ShippingAddress {
  first_name: string
  last_name: string
  address_1: string
  address_2?: string
  city: string
  country_code: string
  postal_code: string
  phone?: string
}

export interface BillingAddress extends ShippingAddress {}

export interface PaymentSession {
  id: string
  provider_id: string
  data: {
    client_secret?: string
  }
}

export interface ShippingOption {
  id: string
  name: string
  price_incl_tax: number
  amount: number
}

export interface Region {
  id: string
  name: string
  currency_code: string
  countries: { iso_2: string; display_name: string }[]
}
