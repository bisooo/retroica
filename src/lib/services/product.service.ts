import { sdk } from "@/lib/sdk"
import type { MedusaProduct } from "@/lib/types/product.types"
import { isCollection } from "@/lib/config/collections"

const PRODUCT_FIELDS = "id,title,handle,thumbnail,*variants,*variants.prices,metadata.condition"
const PRODUCT_DETAIL_FIELDS = "id,title,handle,thumbnail,*images,*variants,*variants.prices,metadata"

const collectionIdCache = new Map<string, string>()
const categoryIdCache = new Map<string, string>()

export class ProductService {
  private static async getCollectionId(handle: string): Promise<string | null> {
    if (collectionIdCache.has(handle)) {
      return collectionIdCache.get(handle)!
    }

    try {
      const { collections } = await sdk.store.collection.list(
        { handle },
        {
          next: { revalidate: 86400 },
        } as any,
      )

      if (collections && collections.length > 0) {
        const id = collections[0].id
        collectionIdCache.set(handle, id)
        return id
      }

      return null
    } catch (error) {
      return null
    }
  }

  private static async getCategoryId(handle: string): Promise<string | null> {
    if (categoryIdCache.has(handle)) {
      return categoryIdCache.get(handle)!
    }

    try {
      const { product_categories } = await sdk.store.category.list(
        { handle },
        {
          next: { revalidate: 86400 },
        } as any,
      )

      if (product_categories && product_categories.length > 0) {
        const id = product_categories[0].id
        categoryIdCache.set(handle, id)
        return id
      }

      return null
    } catch (error) {
      return null
    }
  }

  static async getRecentProducts(limit = 8): Promise<MedusaProduct[]> {
    try {
      const response = await sdk.store.product.list(
        {
          fields: PRODUCT_FIELDS,
          limit,
          order: "-created_at",
        },
        {
          next: { revalidate: 86400 },
        } as any,
      )
      return response.products as MedusaProduct[]
    } catch (error) {
      return []
    }
  }

  static async getProductByHandle(handle: string): Promise<MedusaProduct | null> {
    try {
      const response = await sdk.store.product.list(
        {
          handle,
          fields: PRODUCT_DETAIL_FIELDS,
          limit: 1,
        },
        {
          next: { revalidate: 86400 },
        } as any,
      )

      if (response.products && response.products.length > 0) {
        return response.products[0] as MedusaProduct
      }

      return null
    } catch (error) {
      return null
    }
  }

  static async searchProducts(query: string): Promise<MedusaProduct[]> {
    try {
      const response = await sdk.store.product.list(
        {
          q: query,
          fields: PRODUCT_FIELDS,
          limit: 1000,
        },
        {
          next: { revalidate: 3600 },
        } as any,
      )

      return response.products as MedusaProduct[]
    } catch (error) {
      return []
    }
  }

  static async getAllProducts(): Promise<MedusaProduct[]> {
    try {
      const response = await sdk.store.product.list(
        {
          fields: PRODUCT_FIELDS,
          limit: 1000,
        },
        {
          next: { revalidate: 86400 },
        } as any,
      )

      return response.products as MedusaProduct[]
    } catch (error) {
      return []
    }
  }

  static async getAllProductHandles(): Promise<string[]> {
    try {
      const response = await sdk.store.product.list(
        {
          fields: "handle",
          limit: 1000,
        },
        {
          next: { revalidate: 86400 },
        } as any,
      )

      return response.products.map((p) => p.handle).filter((handle): handle is string => !!handle)
    } catch (error) {
      return []
    }
  }

  static async getAllProductsByHandle(handle: string): Promise<MedusaProduct[]> {
    if (isCollection(handle)) {
      return this.getAllProductsByCollection(handle)
    } else {
      return this.getAllProductsByCategory(handle)
    }
  }

  static async getAllProductsByCollection(collectionHandle: string): Promise<MedusaProduct[]> {
    try {
      const collectionId = await this.getCollectionId(collectionHandle)
      if (!collectionId) return []

      const response = await sdk.store.product.list(
        {
          collection_id: [collectionId],
          fields: PRODUCT_FIELDS,
          limit: 1000,
        },
        {
          next: { revalidate: 86400 },
        } as any,
      )

      return response.products as MedusaProduct[]
    } catch (error) {
      return []
    }
  }

  static async getAllProductsByCategory(categoryHandle: string): Promise<MedusaProduct[]> {
    try {
      const categoryId = await this.getCategoryId(categoryHandle)
      if (!categoryId) return []

      const response = await sdk.store.product.list(
        {
          category_id: [categoryId],
          fields: PRODUCT_FIELDS,
          limit: 1000,
        },
        {
          next: { revalidate: 86400 },
        } as any,
      )

      return response.products as MedusaProduct[]
    } catch (error) {
      return []
    }
  }
}
