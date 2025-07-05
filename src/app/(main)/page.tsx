import PosterProducts from "@/components/poster-products"
import NewArrivals from "@/components/new-arrivals"
import ShopByCategory from "@/components/shop-by-category"
import CustomerReviews from "@/components/customer-reviews"

export default function HomePage() {
  const posterItems: [string, string, string] = ["OLYMPUS MJU Δ", "RETRO KODAK Δ", "Y2K SONY Δ"]
  const posterItems2: [string, string, string] = ["CLASSIC IPODS Δ", "GAMEBOYS Δ", "CASSETTE PLAYERS Δ"]

  return (
    <main>
      <PosterProducts items={posterItems} />
      <NewArrivals />
      <PosterProducts items={posterItems2} />
      <ShopByCategory />
      <CustomerReviews />
    </main>
  )
}
