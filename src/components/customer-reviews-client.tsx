"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import Image from "next/image"

interface ReviewCard {
  customerPhoto: string
  customerName: string
  reviewText: string
  rating: number
  date: string
  productPhoto: string
  productName: string
  productType: string
}

const DESKTOP_PAGE_SIZE = 6
const MOBILE_PAGE_SIZE = 5

export default function CustomerReviewsClient({
  reviews,
  totalCount,
}: {
  reviews: ReviewCard[]
  totalCount: number
}) {
  const [desktopVisible, setDesktopVisible] = useState(DESKTOP_PAGE_SIZE)
  const [mobileVisible, setMobileVisible] = useState(MOBILE_PAGE_SIZE)
  const [hasExpanded, setHasExpanded] = useState(false)

  const desktopReviews = reviews.slice(0, desktopVisible)
  const mobileReviews = reviews.slice(0, mobileVisible)
  const desktopHasMore = desktopVisible < reviews.length
  const mobileHasMore = mobileVisible < reviews.length

  const handleShowMore = () => {
    setDesktopVisible((v) => v + DESKTOP_PAGE_SIZE)
    setHasExpanded(true)
  }

  const handleCollapse = () => {
    setDesktopVisible(DESKTOP_PAGE_SIZE)
    setHasExpanded(false)
  }

  const ReviewCard = ({ review, index }: { review: ReviewCard; index: number }) => (
    <div
      key={index}
      className="border-2 border-black dark:border-white bg-white dark:bg-black flex flex-col h-full"
    >
      <div className="aspect-square border-b-2 border-black dark:border-white relative overflow-hidden">
        <Image
          src={review.customerPhoto}
          alt={review.customerName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 288px, (max-width: 1024px) 33vw, 16vw"
        />
      </div>

      <div className="p-4 border-b-2 border-black dark:border-white flex-1 flex flex-col">
        <h4 className="font-helvicta text-xs font-bold mb-2 text-black dark:text-white">{review.customerName}</h4>
        <p className="font-business text-xs mb-3 leading-relaxed flex-1 text-black dark:text-white">
          {review.reviewText}
        </p>
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

      <div className="p-4 h-20 flex items-center">
        <div className="flex items-center space-x-3 w-full">
          <div className="w-12 h-12 border border-black dark:border-white relative overflow-hidden bg-gray-50 dark:bg-gray-800 flex-shrink-0">
            <Image
              src={review.productPhoto}
              alt={review.productName}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="font-helvicta text-xs font-bold truncate text-black dark:text-white">
              {review.productName}
            </h5>
            <p className="font-business text-xs text-gray-600 dark:text-gray-400 truncate">{review.productType}</p>
          </div>
        </div>
      </div>
    </div>
  )

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
            {totalCount} {totalCount === 1 ? "REVIEW" : "REVIEWS"}
          </span>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {desktopReviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 px-6">
            {mobileReviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 border-2 border-black dark:border-white bg-white dark:bg-black flex flex-col w-72"
              >
                <div className="aspect-square border-b-2 border-black dark:border-white relative overflow-hidden">
                  <Image
                    src={review.customerPhoto}
                    alt={review.customerName}
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                </div>

                <div className="p-4 border-b-2 border-black dark:border-white flex-1 flex flex-col">
                  <h4 className="font-helvicta text-xs font-bold mb-2 text-black dark:text-white">{review.customerName}</h4>
                  <p className="font-business text-xs mb-3 leading-relaxed flex-1 text-black dark:text-white">
                    {review.reviewText}
                  </p>
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

                <div className="p-4 h-20 flex items-center">
                  <div className="flex items-center space-x-3 w-full">
                    <div className="w-12 h-12 border border-black dark:border-white relative overflow-hidden bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                      <Image
                        src={review.productPhoto}
                        alt={review.productName}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
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

        {/* Desktop buttons */}
        {(desktopHasMore || hasExpanded) && (
          <div className="hidden md:flex items-center justify-center gap-6 mt-6">
            {desktopHasMore && (
              <button
                onClick={handleShowMore}
                className="font-helvicta text-sm font-bold cursor-pointer hover:underline text-black dark:text-white bg-transparent border-none"
              >
                [SHOW MORE]
              </button>
            )}
            {hasExpanded && (
              <button
                onClick={handleCollapse}
                className="font-helvicta text-sm font-bold cursor-pointer hover:underline text-black dark:text-white bg-transparent border-none"
              >
                [COLLAPSE]
              </button>
            )}
          </div>
        )}

        {/* Mobile show more */}
        {mobileHasMore && (
          <div className="md:hidden text-center mt-6">
            <button
              onClick={() => setMobileVisible((v) => v + MOBILE_PAGE_SIZE)}
              className="font-helvicta text-sm font-bold cursor-pointer hover:underline text-black dark:text-white bg-transparent border-none"
            >
              [SHOW MORE]
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
