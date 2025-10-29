export interface MedusaVariant {
  calculated_price: {
    calculated_amount: number
    currency_code: string
  }
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
}
