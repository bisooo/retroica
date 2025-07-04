import MinimalNavbar from "@/components/minimal-navbar"
import ProductImageGallery from "@/components/product-image-gallery"
import ProductInfo from "@/components/product-info"

// Mock product data
const mockProduct = {
  name: "CAMERA NAME",
  brand: "BRAND NAME",
  price: 21,
  rating: 4,
  reviewCount: 21,
  year: "YEAR",
  stockStatus: "STOCK STATUS",
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
}

export default function ProductPage() {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Product Images */}
        <div className="w-1/2 h-full flex flex-col p-6">
          <ProductImageGallery images={mockProduct.images} productName={mockProduct.name} />
        </div>

        {/* Right Side - Navbar + Product Info */}
        <div className="w-1/2 h-full border-l-2 border-black flex flex-col">
          <div className="flex-shrink-0">
            <MinimalNavbar />
          </div>
          <div className="flex-1 min-h-0 px-6 pb-6">
            <ProductInfo product={mockProduct} />
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
            <ProductImageGallery images={mockProduct.images} productName={mockProduct.name} />
          </div>

          {/* Product Info */}
          <div className="px-6 pb-6">
            <ProductInfo product={mockProduct} />
          </div>
        </div>
      </div>
    </>
  )
}
