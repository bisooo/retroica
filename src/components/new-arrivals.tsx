import { Star } from "lucide-react"

const newArrivals = [
  { name: "CAMERA 123", price: 21, rating: 4 },
  { name: "CAMERA 123", price: 21, rating: 4 },
  { name: "CAMERA 123", price: 21, rating: 4 },
  { name: "CAMERA 123", price: 21, rating: 4 },
  { name: "CAMERA 123", price: 21, rating: 4 },
  { name: "CAMERA 123", price: 21, rating: 4 },
  { name: "CAMERA 123", price: 21, rating: 4 },
  { name: "CAMERA 123", price: 21, rating: 4 },
]

export default function NewArrivals() {
  return (
    <section className="py-12 bg-white border-t-2 border-black">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-mono font-bold mb-8 text-center">NEW ARRIVALS:</h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {newArrivals.map((product, index) => (
            <div key={index} className="text-center">
              <div className="border-2 border-black mb-3 aspect-square relative overflow-hidden bg-gray-50">
                <div className="absolute inset-2">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 transform rotate-12"></div>
                </div>
              </div>
              <h3 className="font-mono text-xs font-bold mb-1">{product.name}</h3>
              <p className="font-mono text-xs mb-1">${product.price}</p>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < product.rating ? "fill-black" : "fill-gray-200"}`} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 px-2" style={{ width: "calc(100% + 1rem)" }}>
            {newArrivals.map((product, index) => (
              <div key={index} className="flex-shrink-0 text-center" style={{ width: "calc(33.333% - 0.75rem)" }}>
                <div className="border-2 border-black mb-3 aspect-square relative overflow-hidden bg-gray-50">
                  <div className="absolute inset-2">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 transform rotate-12"></div>
                  </div>
                </div>
                <h3 className="font-mono text-xs font-bold mb-1">{product.name}</h3>
                <p className="font-mono text-xs mb-1">${product.price}</p>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < product.rating ? "fill-black" : "fill-gray-200"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
