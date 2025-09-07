import { Star } from "lucide-react"
import Image from "next/image"

const reviews = [
  {
    customerPhoto: "/images/film-can.avif",
    customerName: "SARAH M.",
    reviewText: "Amazing quality cameras! Fast shipping and great customer service. Love the vintage aesthetic.",
    rating: 5,
    date: "2024-01-15",
    productPhoto: "/images/film-can.avif",
    productName: "OLYMPUS MJU",
    productType: "35MM CAMERA",
  },
  {
    customerPhoto: "/images/film-can.avif",
    customerName: "MIKE R.",
    reviewText: "Perfect condition and exactly as described. The camera works beautifully.",
    rating: 4,
    date: "2024-01-12",
    productPhoto: "/images/film-can.avif",
    productName: "KODAK RETINA",
    productType: "VINTAGE FILM",
  },
  {
    customerPhoto: "/images/film-can.avif",
    customerName: "EMMA K.",
    reviewText: "Best place to find authentic retro cameras. Highly recommended for collectors!",
    rating: 5,
    date: "2024-01-10",
    productPhoto: "/images/film-can.avif",
    productName: "CONTAX T2",
    productType: "POINT & SHOOT",
  },
  {
    customerPhoto: "/images/film-can.avif",
    customerName: "ALEX P.",
    reviewText: "Excellent condition cameras and fair prices. Will definitely buy again.",
    rating: 5,
    date: "2024-01-08",
    productPhoto: "/images/film-can.avif",
    productName: "LEICA M3",
    productType: "RANGEFINDER",
  },
  {
    customerPhoto: "/images/film-can.avif",
    customerName: "LISA T.",
    reviewText: "Great selection and knowledgeable staff. Very satisfied with my purchase.",
    rating: 4,
    date: "2024-01-05",
    productPhoto: "/images/film-can.avif",
    productName: "NIKON FM",
    productType: "SLR CAMERA",
  },
  {
    customerPhoto: "/images/film-can.avif",
    customerName: "JAMES K.",
    reviewText: "Incredible collection of vintage cameras. Found exactly what I was looking for!",
    rating: 5,
    date: "2024-01-03",
    productPhoto: "/images/film-can.avif",
    productName: "CANON AE-1",
    productType: "SLR CAMERA",
  },
]

export default function CustomerReviews() {
  return (
    <section className="py-12 bg-white dark:bg-black border-t-2 border-black dark:border-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-black dark:fill-white" />
            ))}
          </div>
          <span className="ml-2 font-mono text-sm text-black dark:text-white">4.7/5.0 REVIEWS</span>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border-2 border-black dark:border-white bg-white dark:bg-black flex flex-col h-full"
            >
              {/* Customer Photo */}
              <div className="aspect-square border-b-2 border-black dark:border-white relative overflow-hidden">
                <Image
                  src={review.customerPhoto || "/placeholder.svg"}
                  alt={review.customerName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>

              {/* Review Content - Fixed Height */}
              <div className="p-4 border-b-2 border-black dark:border-white flex-1 flex flex-col">
                <h4 className="font-mono text-xs font-bold mb-2 text-black dark:text-white">{review.customerName}</h4>
                <p className="font-mono text-xs mb-3 leading-relaxed flex-1 text-black dark:text-white">
                  {review.reviewText}
                </p>

                {/* Stars and Date */}
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < review.rating ? "fill-black dark:fill-white" : "fill-gray-200 dark:fill-gray-600"}`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{review.date}</span>
                </div>
              </div>

              {/* Product Section - Fixed Height */}
              <div className="p-4 h-20 flex items-center">
                <div className="flex items-center space-x-3 w-full">
                  {/* Product Photo */}
                  <div className="w-12 h-12 border border-black dark:border-white relative overflow-hidden bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                    <Image
                      src={review.productPhoto || "/placeholder.svg"}
                      alt={review.productName}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-mono text-xs font-bold truncate text-black dark:text-white">
                      {review.productName}
                    </h5>
                    <p className="font-mono text-xs text-gray-600 dark:text-gray-400 truncate">{review.productType}</p>
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
              <div
                key={index}
                className="flex-shrink-0 border-2 border-black dark:border-white bg-white dark:bg-black flex flex-col w-72"
              >
                {/* Customer Photo - Fixed Aspect Ratio */}
                <div className="aspect-square border-b-2 border-black dark:border-white relative overflow-hidden">
                  <Image
                    src={review.customerPhoto || "/placeholder.svg"}
                    alt={review.customerName}
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                </div>

                {/* Review Content */}
                <div className="p-4 border-b-2 border-black dark:border-white flex-1 flex flex-col">
                  <h4 className="font-mono text-xs font-bold mb-2 text-black dark:text-white">{review.customerName}</h4>
                  <p className="font-mono text-xs mb-3 leading-relaxed flex-1 text-black dark:text-white">
                    {review.reviewText}
                  </p>

                  {/* Stars and Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? "fill-black dark:fill-white" : "fill-gray-200 dark:fill-gray-600"}`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{review.date}</span>
                  </div>
                </div>

                {/* Product Section */}
                <div className="p-4 h-20 flex items-center">
                  <div className="flex items-center space-x-3 w-full">
                    {/* Product Photo */}
                    <div className="w-12 h-12 border border-black dark:border-white relative overflow-hidden bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                      <Image
                        src={review.productPhoto || "/placeholder.svg"}
                        alt={review.productName}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-mono text-xs font-bold truncate text-black dark:text-white">
                        {review.productName}
                      </h5>
                      <p className="font-mono text-xs text-gray-600 dark:text-gray-400 truncate">
                        {review.productType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="font-mono text-sm font-bold cursor-pointer hover:underline text-black dark:text-white">
            [SHOW MORE]
          </span>
        </div>
      </div>
    </section>
  )
}
