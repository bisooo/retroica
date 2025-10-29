import { sdk } from "@/lib/sdk"
import type { MedusaProduct } from "@/lib/types/product.types"
import { isCollection } from "@/lib/config/collections"

const PRODUCT_FIELDS = "id,title,handle,thumbnail,*variants.calculated_price,metadata.condition"
const PRODUCT_DETAIL_FIELDS = "id,title,handle,thumbnail,*images,*variants.calculated_price,metadata"

const collectionIdCache = new Map<string, string>()
const categoryIdCache = new Map<string, string>()
let cachedRegionId: string | null = null

export class ProductService {
  private static async getRegionId(): Promise<string | null> {
    if (cachedRegionId) {
      return cachedRegionId
    }

    try {
      const { regions } = await sdk.store.region.list()

      if (regions && regions.length > 0) {
        // Find Czech Republic region (EUR) or use first available region
        const czechRegion = regions.find((r) => r.name === "Czech Republic" || r.currency_code === "eur")
        const selectedRegion = czechRegion || regions[0]

        cachedRegionId = selectedRegion.id
        return cachedRegionId
      }

      return null
    } catch (error) {
      console.error("Error fetching region:", error)
      return null
    }
  }

  private static async getCollectionId(handle: string): Promise<string | null> {
    if (collectionIdCache.has(handle)) {
      return collectionIdCache.get(handle)!
    }

    try {
      const { collections } = await sdk.store.collection.list({ handle })

      if (collections && collections.length > 0) {
        const id = collections[0].id
        collectionIdCache.set(handle, id)
        return id
      }

      return null
    } catch (error) {
      console.error(`Error fetching collection ID for ${handle}:`, error)
      return null
    }
  }

  private static async getCategoryId(handle: string): Promise<string | null> {
    if (categoryIdCache.has(handle)) {
      return categoryIdCache.get(handle)!
    }

    try {
      const { product_categories } = await sdk.store.category.list({ handle })

      if (product_categories && product_categories.length > 0) {
        const id = product_categories[0].id
        categoryIdCache.set(handle, id)
        return id
      }

      return null
    } catch (error) {
      console.error(`Error fetching category ID for ${handle}:`, error)
      return null
    }
  }

  static async getProductsByCollection(collectionHandle: string, limit = 20): Promise<MedusaProduct[]> {
    try {
      const collectionId = await this.getCollectionId(collectionHandle)
      if (!collectionId) return []

      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch products: region not found")
        return []
      }

      const response = await sdk.store.product.list({
        collection_id: [collectionId],
        region_id: regionId,
        fields: PRODUCT_FIELDS,
        limit,
      })

      return response.products as MedusaProduct[]
    } catch (error) {
      console.error(`Error fetching products for collection ${collectionHandle}:`, error)
      return []
    }
  }

  static async getProductsByCategory(categoryHandle: string, limit = 20): Promise<MedusaProduct[]> {
    try {
      const categoryId = await this.getCategoryId(categoryHandle)
      if (!categoryId) return []

      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch products: region not found")
        return []
      }

      const response = await sdk.store.product.list({
        category_id: [categoryId],
        region_id: regionId,
        fields: PRODUCT_FIELDS,
        limit,
      })

      return response.products as MedusaProduct[]
    } catch (error) {
      console.error(`Error fetching products for category ${categoryHandle}:`, error)
      return []
    }
  }

  static async getRecentProducts(limit = 8): Promise<MedusaProduct[]> {
    try {
      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch products: region not found")
        return []
      }

      const response = await sdk.store.product.list({
        region_id: regionId,
        fields: PRODUCT_FIELDS,
        limit,
        order: "-created_at",
      })
      return response.products as MedusaProduct[]
    } catch (error) {
      console.error("Error fetching recent products:", error)
      return []
    }
  }

  static async getProductsWithFilters(params: {
    categoryHandle?: string
    minPrice?: number
    maxPrice?: number
    limit?: number
    offset?: number
  }): Promise<MedusaProduct[]> {
    try {
      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch products: region not found")
        return []
      }

      const queryParams: Record<string, unknown> = {
        region_id: regionId,
        fields: PRODUCT_FIELDS,
        limit: params.limit || 20,
        offset: params.offset || 0,
      }

      if (params.categoryHandle) {
        const categoryId = await this.getCategoryId(params.categoryHandle)
        if (categoryId) {
          queryParams.category_id = [categoryId]
        } else {
          console.log(`Category ${params.categoryHandle} not found, fetching all products`)
        }
      }

      const response = await sdk.store.product.list(queryParams)
      return response.products as MedusaProduct[]
    } catch (error) {
      console.error("Error fetching products with filters:", error)
      return []
    }
  }

  static async getProductsByHandle(handle: string, limit = 20): Promise<MedusaProduct[]> {
    if (isCollection(handle)) {
      return this.getProductsByCollection(handle, limit)
    } else {
      return this.getProductsByCategory(handle, limit)
    }
  }

  static async getProductById(productId: string): Promise<MedusaProduct | null> {
    try {
      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch product: region not found")
        return null
      }

      const response = await sdk.store.product.retrieve(productId, {
        region_id: regionId,
        fields: PRODUCT_DETAIL_FIELDS,
      })

      return response.product as MedusaProduct
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error)
      return null
    }
  }

  static async getProductByHandle(handle: string): Promise<MedusaProduct | null> {
    try {
      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch product: region not found")
        return null
      }

      const response = await sdk.store.product.list({
        handle,
        region_id: regionId,
        fields: PRODUCT_DETAIL_FIELDS,
        limit: 1,
      })

      if (response.products && response.products.length > 0) {
        return response.products[0] as MedusaProduct
      }

      return null
    } catch (error) {
      console.error(`[v0Error fetching product by handle ${handle}:`, error)
      return null
    }
  }
}
