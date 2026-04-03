import { supabase } from "@/lib/supabase"
import CustomerReviewsClient from "@/components/customer-reviews-client"

interface Review {
  reviewer: string
  date_reviewed: string
  star_rating: number
  message: string | null
}

export default async function CustomerReviews() {
  const { data: allData, count } = await supabase
    .from("reviews")
    .select("reviewer, date_reviewed, star_rating, message", { count: "exact" })
    .not("message", "is", null)
    .order("date_reviewed", { ascending: false })

  const reviews = ((allData as Review[]) ?? []).map((r) => ({
    customerPhoto: "/images/film-can.avif",
    customerName: r.reviewer.toUpperCase(),
    reviewText: r.message as string,
    rating: r.star_rating,
    date: r.date_reviewed,
    productPhoto: "/images/film-can.avif",
    productName: "CAMERA NAME",
    productType: "CAMERA TYPE",
  }))

  return <CustomerReviewsClient reviews={reviews} totalCount={count ?? reviews.length} />
}
