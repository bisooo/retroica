import MinimalNavbar from "@/components/minimal-navbar"
import ProductImageGallery from "@/components/product-image-gallery"
import ProductInfo from "@/components/product-info"
import { ProductService } from "@/lib/services/product.service"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const { handle } = params

  const product = await ProductService.getProductByHandle(handle)

  if (!product) {
    notFound()
  }

  const images = product.images?.map((img) => img.url) || [product.thumbnail || "/images/film-can.avif"]

  const conditionRating = product.metadata?.condition
    ? Number.parseInt((product.metadata.condition as string).split("/")[0])
    : 0

  const productData = {
    name: product.title,
    brand: (product.metadata?.brand as string) || "RETRO-ICA",
    price: product.variants?.[0]?.calculated_price?.calculated_amount ? product.variants[0].calculated_price.calculated_amount : 21000,
    currency: product.variants?.[0]?.calculated_price?.currency_code || "EUR",
    condition: conditionRating,
    year: (product.metadata?.year as string) || "YEAR",
    stockStatus: "IN STOCK",
    images: images,
    rawMetadata: product.metadata || {},
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Product Images */}
        <div className="w-1/2 h-full flex flex-col p-6">
          <ProductImageGallery images={productData.images} productName={productData.name} />
        </div>

        {/* Right Side - Navbar + Product Info */}
        <div className="w-1/2 h-full border-l-2 border-black flex flex-col">
          <div className="flex-shrink-0">
            <MinimalNavbar />
          </div>
          <div className="flex-1 min-h-0 px-6 pb-6">
            <ProductInfo product={productData} />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden h-screen flex flex-col">
        {/* Navbar at top */}
        <div className="flex-shrink-0">
          <MinimalNavbar />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Product Images */}
          <div className="px-6 py-4">
            <ProductImageGallery images={productData.images} productName={productData.name} />
          </div>

          {/* Product Info */}
          <div className="px-6 pb-6">
            <ProductInfo product={productData} />
          </div>
        </div>
      </div>
    </>
  )
}
