import ProductCard from "./product-card"

const newArrivals = [
  { id: "1", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "2", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "3", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "4", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "5", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "6", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "7", name: "CAMERA 123", price: 21, rating: 4 },
  { id: "8", name: "CAMERA 123", price: 21, rating: 4 },
]

export default function NewArrivals() {
  return (
    <section className="py-12 bg-white border-t-2 border-black">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-mono font-bold mb-8 text-center">NEW ARRIVALS:</h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 px-2" style={{ width: "calc(100% + 1rem)" }}>
            {newArrivals.map((product) => (
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
