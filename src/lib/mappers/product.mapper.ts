import type { MedusaProduct, ProductCardData, VariantPrice } from "@/lib/types/product.types"

export class ProductMapper {
  static toProductCard(product: MedusaProduct, currencyCode = "eur"): ProductCardData {
    const variant = product.variants?.[0]
    const priceObj = variant?.prices?.find(
      (p) => p.currency_code.toLowerCase() === currencyCode.toLowerCase()
    )
    const price = priceObj?.amount || 0
    const currency = priceObj?.currency_code?.toUpperCase() || currencyCode.toUpperCase()

    return {
      id: product.id,
      handle: product.handle,
      name: product.title,
      price: price,
      currency: currency,
      image: product.thumbnail || "/images/film-can.avif",
      condition: product.metadata?.condition as string | undefined,
      allPrices: variant?.prices || [],
    }
  }

  static toProductCards(products: MedusaProduct[], currencyCode = "eur"): ProductCardData[] {
    return products.map((product) => this.toProductCard(product, currencyCode))
  }
}
