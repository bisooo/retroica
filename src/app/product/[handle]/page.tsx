import MinimalNavbar from "@/components/minimal-navbar"
import ProductImageGallery from "@/components/product-image-gallery"
import ProductInfo from "@/components/product-info"
import { ProductService } from "@/lib/services/product.service"
import type { Metadata } from "next"

export const revalidate = 86400 // 1 day

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const allProducts = await ProductService.getAllProductHandles()
    return allProducts.map((handle) => ({
      handle,
    }))
  } catch (error) {
    console.error("Error generating static params for products:", error)
    // Return empty array to allow dynamic generation
    return []
  }
}

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const { handle } = params
  const product = await ProductService.getProductByHandle(handle)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  const price = product.variants?.[0]?.calculated_price?.calculated_amount || 0
  const currency = product.variants?.[0]?.calculated_price?.currency_code || "EUR"
  const brand = product.metadata?.brand
  const formattedPrice = (price).toFixed(2)
  const condition = product.metadata?.condition

  return {
    title: product.title,
    description: `${product.title} - authentic, tested, retro ${brand} at RETRO-ICA. Condition: ${condition}/10 }. Price: ${currency}${formattedPrice}`,
    openGraph: {
      title: `${product.title} | RETRO-ICA`,
      description: `${product.title} - authentic, tested, retro ${brand}. Condition: ${condition}/10`,
      url: `https://retroica.com/product/${handle}`,
      images: [
        {
          url: product.thumbnail || "/images/film-can.avif",
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: `${product.title} - authentic, tested, retro ${brand}. Condition: ${condition}/10`,
      images: [product.thumbnail || "/images/film-can.avif"],
    },
  }
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const { handle } = params

  const product = await ProductService.getProductByHandle(handle)

  if (!product) {
    return <div>PRODUCT NOT FOUND.</div>
  }

  const images = product.images?.map((img) => img.url) || [product.thumbnail || "/images/film-can.avif"]

  const conditionRating = product.metadata?.condition
    ? Number.parseFloat((product.metadata.condition as string).split("/")[0])
    : 0

  const productData = {
    name: product.title,
    brand: (product.metadata?.brand as string) || "RETRO-ICA",
    price: product.variants?.[0]?.calculated_price?.calculated_amount
      ? product.variants[0].calculated_price.calculated_amount
      : 21000,
    currency: product.variants?.[0]?.calculated_price?.currency_code || "EUR",
    condition: conditionRating,
    year: (product.metadata?.year as string) || "YEAR",
    stockStatus: "IN STOCK",
    images: images,
    rawMetadata: product.metadata || {},
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: images,
    description: `${product.title} - Authentic, tested, retro electronics. Condition: ${product.metadata?.condition || "Excellent"}.`,
    brand: {
      "@type": "Brand",
      name: (product.metadata?.brand as string) || "Various",
    },
    offers: {
      "@type": "Offer",
      url: `https://retroica.com/product/${handle}`,
      priceCurrency: productData.currency.toUpperCase(),
      price: (productData.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
    },
    aggregateRating: conditionRating
      ? {
          "@type": "AggregateRating",
          ratingValue: conditionRating.toString(),
          bestRating: "10",
          worstRating: "1",
          ratingCount: "1",
        }
      : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="h-dvh overflow-hidden overscroll-none">
        {/* Desktop Layout */}
        <div className="hidden lg:flex h-full">
          {/* Left Side - Product Images (Fixed, no scroll) */}
          <div className="w-1/2 h-full flex flex-col p-6 overflow-hidden">
            <ProductImageGallery images={productData.images} productName={productData.name} />
          </div>

          {/* Right Side - Navbar + Product Info */}
          <div className="w-1/2 h-full border-l-2 border-black flex flex-col">
            <div className="flex-shrink-0">
              <MinimalNavbar />
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-6">
              <ProductInfo product={productData} />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden h-full flex flex-col">
          {/* Navbar at top */}
          <div className="flex-shrink-0">
            <MinimalNavbar />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
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
      </div>
    </>
  )
}
