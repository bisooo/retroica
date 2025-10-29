import ProductCard from "./product-card"
import { ProductService } from "@/lib/services/product.service"
import { ProductMapper } from "@/lib/mappers/product.mapper"
import { MOCK_PRODUCTS } from "@/lib/data/mock-products"

export default async function NewArrivals() {
  const medusaProducts = await ProductService.getRecentProducts(8)
  const products = medusaProducts.length > 0 ? ProductMapper.toProductCards(medusaProducts) : MOCK_PRODUCTS

  return (
    <section className="py-12 bg-white dark:bg-black border-t-2 border-black dark:border-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-mono font-bold mb-8 text-center text-black dark:text-white">NEW ARRIVALS:</h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 px-2" style={{ width: "calc(100% + 1rem)" }}>
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0" style={{ width: "calc(50% - 0.5rem)" }}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
