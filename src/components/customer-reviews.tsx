import { Star } from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

interface Review {
  reviewer: string
  date_reviewed: string
  star_rating: number
  message: string | null
}

export default async function CustomerReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .limit(6)

  console.log("[v0] supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("[v0] reviews count:", data?.length)
  console.log("[v0] reviews first row keys:", data?.[0] ? Object.keys(data[0]) : "no rows")
  console.log("[v0] reviews error:", JSON.stringify(error))

  const reviews = ((data as Review[]) ?? [])
    .filter((r) => r.message !== null)
    .map((r) => ({
      customerPhoto: "/images/film-can.avif",
      customerName: r.reviewer.toUpperCase(),
      reviewText: r.message as string,
      rating: r.star_rating,
      date: r.date_reviewed,
      productPhoto: "/images/film-can.avif",
      productName: "CAMERA NAME",
      productType: "CAMERA TYPE",
    }))

  const reviewCount = reviews.length

  return (
    <section className="py-12 bg-white dark:bg-black border-t-2 border-black dark:border-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-black dark:fill-white" />
            ))}
          </div>
          <span className="ml-2 font-business text-sm text-black dark:text-white">
            {reviewCount} {reviewCount === 1 ? "REVIEW" : "REVIEWS"}
          </span>
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
                  src={review.customerPhoto}
                  alt={review.customerName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>

              {/* Review Content - Fixed Height */}
              <div className="p-4 border-b-2 border-black dark:border-white flex-1 flex flex-col">
                <h4 className="font-helvicta text-xs font-bold mb-2 text-black dark:text-white">{review.customerName}</h4>
                <p className="font-business text-xs mb-3 leading-relaxed flex-1 text-black dark:text-white">
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
                  <span className="font-business text-xs text-gray-600 dark:text-gray-400">{review.date}</span>
                </div>
              </div>

              {/* Product Section - Fixed Height */}
              <div className="p-4 h-20 flex items-center">
                <div className="flex items-center space-x-3 w-full">
                  {/* Product Photo */}
                  <div className="w-12 h-12 border border-black dark:border-white relative overflow-hidden bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                    <Image
                      src={review.productPhoto}
                      alt={review.productName}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-helvicta text-xs font-bold truncate text-black dark:text-white">
                      {review.productName}
                    </h5>
                    <p className="font-business text-xs text-gray-600 dark:text-gray-400 truncate">{review.productType}</p>
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
                    src={review.customerPhoto}
                    alt={review.customerName}
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                </div>

                {/* Review Content */}
                <div className="p-4 border-b-2 border-black dark:border-white flex-1 flex flex-col">
                  <h4 className="font-helvicta text-xs font-bold mb-2 text-black dark:text-white">{review.customerName}</h4>
                  <p className="font-business text-xs mb-3 leading-relaxed flex-1 text-black dark:text-white">
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
                    <span className="font-business text-xs text-gray-600 dark:text-gray-400">{review.date}</span>
                  </div>
                </div>

                {/* Product Section */}
                <div className="p-4 h-20 flex items-center">
                  <div className="flex items-center space-x-3 w-full">
                    {/* Product Photo */}
                    <div className="w-12 h-12 border border-black dark:border-white relative overflow-hidden bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                      <Image
                        src={review.productPhoto}
                        alt={review.productName}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-helvicta text-xs font-bold truncate text-black dark:text-white">
                        {review.productName}
                      </h5>
                      <p className="font-business text-xs text-gray-600 dark:text-gray-400 truncate">
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
          <span className="font-helvicta text-sm font-bold cursor-pointer hover:underline text-black dark:text-white">
            [SHOW MORE]
          </span>
        </div>
      </div>
    </section>
  )
}
