import { sdk } from "@/lib/sdk"
import type { MedusaProduct } from "@/lib/types/product.types"
import { isCollection } from "@/lib/config/collections"
import { mockProducts } from "@/lib/data/mock-products"

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
      const { regions } = await sdk.store.region.list({}, {
        next: { revalidate: 86400 },
      } as any)

      if (regions && regions.length > 0) {
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
      const { collections } = await sdk.store.collection.list({ handle }, {
        next: { revalidate: 86400 },
      } as any)

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
      const { product_categories } = await sdk.store.category.list({ handle }, {
        next: { revalidate: 86400 },
      } as any)

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

  static async getRecentProducts(limit = 8): Promise<MedusaProduct[]> {
    try {
      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch products: region not found, using mock data")
        return mockProducts.slice(0, limit)
      }

      const response = await sdk.store.product.list(
        {
          region_id: regionId,
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
      console.error("Error fetching recent products:", error)
      return mockProducts.slice(0, limit)
    }
  }

  static async getProductByHandle(handle: string): Promise<MedusaProduct | null> {
    try {
      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch product: region not found, using mock data")
        return mockProducts.find((p) => p.handle === handle) || mockProducts[0]
      }

      const response = await sdk.store.product.list(
        {
          handle,
          region_id: regionId,
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

      return mockProducts.find((p) => p.handle === handle) || mockProducts[0]
    } catch (error) {
      console.error(`Error fetching product by handle ${handle}:`, error)
      return mockProducts.find((p) => p.handle === handle) || mockProducts[0]
    }
  }

  static async searchProducts(query: string): Promise<MedusaProduct[]> {
    try {
      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot search products: region not found")
        return []
      }

      const response = await sdk.store.product.list(
        {
          q: query,
          region_id: regionId,
          fields: PRODUCT_FIELDS,
          limit: 1000,
        },
        {
          next: { revalidate: 3600 },
        } as any,
      )

      return response.products as MedusaProduct[]
    } catch (error) {
      console.error(`Error searching products with query "${query}":`, error)
      return []
    }
  }

  static async getAllProducts(): Promise<MedusaProduct[]> {
    try {
      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch products: region not found, using mock data")
        return mockProducts
      }

      const response = await sdk.store.product.list(
        {
          region_id: regionId,
          fields: PRODUCT_FIELDS,
          limit: 1000,
        },
        {
          next: { revalidate: 86400 },
        } as any,
      )

      return response.products as MedusaProduct[]
    } catch (error) {
      console.error("Error fetching all products:", error)
      return mockProducts
    }
  }

  static async getAllProductHandles(): Promise<string[]> {
    try {
      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch products: region not found")
        return []
      }

      const response = await sdk.store.product.list(
        {
          region_id: regionId,
          fields: "handle",
          limit: 1000,
        },
        {
          next: { revalidate: 86400 },
        } as any,
      )

      return response.products.map((p) => p.handle).filter((handle): handle is string => !!handle)
    } catch (error) {
      console.error("Error fetching all product handles:", error)
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
      if (!collectionId) return mockProducts

      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch products: region not found, using mock data")
        return mockProducts
      }

      const response = await sdk.store.product.list(
        {
          collection_id: [collectionId],
          region_id: regionId,
          fields: PRODUCT_FIELDS,
          limit: 1000,
        },
        {
          next: { revalidate: 86400 },
        } as any,
      )

      return response.products as MedusaProduct[]
    } catch (error) {
      console.error(`Error fetching all products for collection ${collectionHandle}:`, error)
      return mockProducts
    }
  }

  static async getAllProductsByCategory(categoryHandle: string): Promise<MedusaProduct[]> {
    try {
      const categoryId = await this.getCategoryId(categoryHandle)
      if (!categoryId) return mockProducts

      const regionId = await this.getRegionId()
      if (!regionId) {
        console.error("Cannot fetch products: region not found, using mock data")
        return mockProducts
      }

      const response = await sdk.store.product.list(
        {
          category_id: [categoryId],
          region_id: regionId,
          fields: PRODUCT_FIELDS,
          limit: 1000,
        },
        {
          next: { revalidate: 86400 },
        } as any,
      )

      return response.products as MedusaProduct[]
    } catch (error) {
      console.error(`Error fetching all products for category ${categoryHandle}:`, error)
      return mockProducts
    }
  }
}
