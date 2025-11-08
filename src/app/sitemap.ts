import type { MetadataRoute } from "next"
import { ProductService } from "@/lib/services/product.service"
import { allCategoryHandles } from "@/lib/data/categories"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://retroica.com"

  // Get all product handles from Medusa
  const productHandles = await ProductService.getAllProductHandles()

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
  ]

  // Category pages
  allCategoryHandles.forEach((category) => {
    routes.push({
      url: `${baseUrl}/${category}`,
      lastModified: new Date(),
      priority: 0.8,
    })
  })

  // Product pages
  productHandles.forEach((handle) => {
    routes.push({
      url: `${baseUrl}/product/${handle}`,
      lastModified: new Date(),
      priority: 0.9,
    })
  })

  return routes
}
