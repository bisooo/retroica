export interface VariantPrice {
  id: string
  amount: number
  currency_code: string
  min_quantity: number | null
  max_quantity: number | null
}

export interface MedusaVariant {
  id: string
  title: string
  prices: VariantPrice[]
  inventory_quantity?: number
}

export interface MedusaProduct {
  id: string
  title: string
  handle: string
  thumbnail: string | null
  images?: Array<{ url: string }>
  variants: MedusaVariant[]
  metadata: {
    condition?: string
    [key: string]: unknown
  }
}

export interface ProductCardData {
  id: string
  handle?: string
  name: string
  price: number
  currency: string
  image: string
  condition?: string
  allPrices?: VariantPrice[]
}
