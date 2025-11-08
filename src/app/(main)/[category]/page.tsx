import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"
import { ProductService } from "@/lib/services/product.service"
import { ProductMapper } from "@/lib/mappers/product.mapper"
import { allCategoryHandles } from "@/lib/data/categories"
import type { Metadata } from "next"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export const revalidate = 86400 // 1 day
export const dynamicParams = true

export async function generateStaticParams() {
  return allCategoryHandles.map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = params

  const categoryTitles: Record<string, string> = {
    "photo": "Vintage Cameras & Film Photography",
    "video": "Vintage Video Cameras & Camcorders",
    "music": "Vintage Audio & Music Players",
    "accessories": "Camera Accessories & Film",
    "point-n-shoot": "Point and Shoot Film Cameras",
    "medium-format": "Medium Format Film Cameras",
    "aps": "APS Film Cameras",
    "slr": "SLR Film Cameras",
    "pocket-digicam": "Pocket Digital Cameras",
    "sony-digicam": "Sony Digital Cameras",
    "superzoom-digicam": "Superzoom Digital Cameras",
    "dslr": "DSLR Cameras",
    "super8": "Super 8 Film Cameras",
    "film-movie": "Film Movie Cameras",
    "camcoder-tape": "Tape Camcorders",
    "camcoder-dvd": "DVD Camcorders",
    "camcoder-sd-hdd": "SD & HDD Camcorders",
    "cassette": "Cassette Players & Walkmans",
    "vinyl": "Vinyl Record Players",
    "boombox": "Vintage Boomboxes",
    "ipods": "iPods & MP3 Players",
    "cd-players": "CD Players",
    "speakers": "Vintage Speakers",
    "bags": "Camera Bags & Cases",
    "film": "Film Rolls",
    "flash": "Camera Flash Units",
    "tripods": "Camera Tripods",
    "filters": "Camera Filters",
    "cleaning": "Camera Cleaning Kits",
    "olympus-mju": "Olympus Mju Series",
    "retro-kodak": "Retro Kodak Cameras",
    "y2k-sony": "Y2K Sony Cameras",
    "classic-ipods": "Classic iPods",
    "gameboys": "Gameboys & Handheld Gaming",
    "cassette-players": "Cassette Players",
    "point-and-shoot": "Point and Shoot Cameras",
    "y2k-digital": "Y2K Digital Cameras",
    "camcoder": "Camcorders",
  }

  const title = categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title,
    description: `Shop authentic, tested, retro ${title.toLowerCase()} at RETRO-ICA.`,
    openGraph: {
      title: `${title} | RETRO-ICA`,
      description: `Shop authentic, tested, retro ${title.toLowerCase()} at RETRO-ICA.`,
      url: `https://retroica.com/${category}`,
      images: ["/images/film-can.avif"],
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params

  const medusaProducts = await ProductService.getAllProductsByHandle(category)
  const products = ProductMapper.toProductCards(medusaProducts)

  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:block">
        <ProductFilters />
      </div>
      <div className="flex-1 flex flex-col">
        <ProductGrid products={products} />
      </div>
    </main>
  )
}
