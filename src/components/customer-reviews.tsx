import { Star } from "lucide-react"

const reviews = [
  {
    customerPhoto: "/placeholder.svg?height=100&width=100",
    customerName: "SARAH M.",
    reviewText: "Amazing quality cameras! Fast shipping and great customer service. Love the vintage aesthetic.",
    rating: 5,
    date: "2024-01-15",
    productPhoto: "/placeholder.svg?height=80&width=80",
    productName: "OLYMPUS MJU",
    productType: "35MM CAMERA",
  },
  {
    customerPhoto: "/placeholder.svg?height=100&width=100",
    customerName: "MIKE R.",
    reviewText: "Perfect condition and exactly as described. The camera works beautifully.",
    rating: 4,
    date: "2024-01-12",
    productPhoto: "/placeholder.svg?height=80&width=80",
    productName: "KODAK RETINA",
    productType: "VINTAGE FILM",
  },
  {
    customerPhoto: "/placeholder.svg?height=100&width=100",
    customerName: "EMMA K.",
    reviewText: "Best place to find authentic retro cameras. Highly recommended for collectors!",
    rating: 5,
    date: "2024-01-10",
    productPhoto: "/placeholder.svg?height=80&width=80",
    productName: "CONTAX T2",
    productType: "POINT & SHOOT",
  },
  {
    customerPhoto: "/placeholder.svg?height=100&width=100",
    customerName: "ALEX P.",
    reviewText: "Excellent condition cameras and fair prices. Will definitely buy again.",
    rating: 5,
    date: "2024-01-08",
    productPhoto: "/placeholder.svg?height=80&width=80",
    productName: "LEICA M3",
    productType: "RANGEFINDER",
  },
  {
    customerPhoto: "/placeholder.svg?height=100&width=100",
    customerName: "LISA T.",
    reviewText: "Great selection and knowledgeable staff. Very satisfied with my purchase.",
    rating: 4,
    date: "2024-01-05",
    productPhoto: "/placeholder.svg?height=80&width=80",
    productName: "NIKON FM",
    productType: "SLR CAMERA",
  },
  {
    customerPhoto: "/placeholder.svg?height=100&width=100",
    customerName: "JAMES K.",
    reviewText: "Incredible collection of vintage cameras. Found exactly what I was looking for!",
    rating: 5,
    date: "2024-01-03",
    productPhoto: "/placeholder.svg?height=80&width=80",
    productName: "CANON AE-1",
    productType: "SLR CAMERA",
  },
]

export default function CustomerReviews() {
  return (
    <section className="py-12 bg-white border-t-2 border-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-black" />
            ))}
          </div>
          <span className="ml-2 font-mono text-sm">4.7/5.0 REVIEWS</span>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-2 border-black bg-white flex flex-col h-full">
              {/* Customer Photo */}
              <div className="aspect-square border-b-2 border-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-4 border border-gray-300 rounded-full"></div>
                  <div className="absolute inset-6 border border-gray-400 rounded-full"></div>
                </div>
              </div>

              {/* Review Content - Fixed Height */}
              <div className="p-4 border-b-2 border-black flex-1 flex flex-col">
                <h4 className="font-mono text-xs font-bold mb-2">{review.customerName}</h4>
                <p className="font-mono text-xs mb-3 leading-relaxed flex-1">{review.reviewText}</p>

                {/* Stars and Date */}
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-black" : "fill-gray-200"}`} />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-gray-600">{review.date}</span>
                </div>
              </div>

              {/* Product Section - Fixed Height */}
              <div className="p-4 h-20 flex items-center">
                <div className="flex items-center space-x-3 w-full">
                  {/* Product Photo */}
                  <div className="w-12 h-12 border border-black relative overflow-hidden bg-gray-50 flex-shrink-0">
                    <div className="absolute inset-1 bg-gradient-to-br from-gray-200 to-gray-300 transform rotate-12"></div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-mono text-xs font-bold truncate">{review.productName}</h5>
                    <p className="font-mono text-xs text-gray-600 truncate">{review.productType}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 px-6">
            {reviews.map((review, index) => (
              <div key={index} className="flex-shrink-0 border-2 border-black bg-white flex flex-col w-72">
                {/* Customer Photo - Fixed Aspect Ratio */}
                <div className="aspect-square border-b-2 border-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="absolute inset-4 border border-gray-300 rounded-full"></div>
                    <div className="absolute inset-6 border border-gray-400 rounded-full"></div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-4 border-b-2 border-black flex-1 flex flex-col">
                  <h4 className="font-mono text-xs font-bold mb-2">{review.customerName}</h4>
                  <p className="font-mono text-xs mb-3 leading-relaxed flex-1">{review.reviewText}</p>

                  {/* Stars and Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-black" : "fill-gray-200"}`} />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-gray-600">{review.date}</span>
                  </div>
                </div>

                {/* Product Section */}
                <div className="p-4 h-20 flex items-center">
                  <div className="flex items-center space-x-3 w-full">
                    {/* Product Photo */}
                    <div className="w-12 h-12 border border-black relative overflow-hidden bg-gray-50 flex-shrink-0">
                      <div className="absolute inset-1 bg-gradient-to-br from-gray-200 to-gray-300 transform rotate-12"></div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-mono text-xs font-bold truncate">{review.productName}</h5>
                      <p className="font-mono text-xs text-gray-600 truncate">{review.productType}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="font-mono text-sm font-bold cursor-pointer hover:underline">[SHOW MORE]</span>
        </div>
      </div>
    </section>
  )
}
