import type { MedusaProduct, ProductCardData } from "@/lib/types/product.types"

export class ProductMapper {
  static toProductCard(product: MedusaProduct): ProductCardData {
    const variant = product.variants?.[0]
    const price = variant?.calculated_price?.calculated_amount || 0
    const currency = variant?.calculated_price?.currency_code?.toUpperCase() || "USD"

    return {
      id: product.id,
      handle: product.handle,
      name: product.title,
      price: price,
      currency: currency,
      image: product.thumbnail || "/images/film-can.avif",
      condition: product.metadata?.condition as string | undefined,
    }
  }

  static toProductCards(products: MedusaProduct[]): ProductCardData[] {
    return products.map((product) => this.toProductCard(product))
  }
}
