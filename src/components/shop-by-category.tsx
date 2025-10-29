import Link from "next/link"
import Image from "next/image"

const categoryCollections = [
  {
    name: "POINT & SHOOT Δ",
    collection: "point-and-shoot",
    href: "/point-and-shoot",
    image: "/images/point-n-shoot.jpg",
  },
  {
    name: "Y2K DIGITAL Δ",
    collection: "y2k-digital",
    href: "/y2k-digital",
    image: "/images/y2k.jpeg",
  },
  {
    name: "CAMCORDER Δ",
    collection: "camcoder",
    href: "/camcoder",
    image: "/images/camcoder.jpg",
  },
]

export default function ShopByCategory() {
  return (
    <section className="py-12 bg-white dark:bg-black border-t-2 border-black dark:border-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-mono font-bold mb-8 text-center text-black dark:text-white">SHOP BY CATEGORY:</h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {categoryCollections.map((category) => (
            <Link key={category.collection} href={category.href} className="text-center group">
              <div className="border-2 border-black dark:border-white rounded-full aspect-square mb-4 relative overflow-hidden bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="font-mono text-sm font-bold group-hover:underline text-black dark:text-white">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 px-6">
            {categoryCollections.map((category) => (
              <Link key={category.collection} href={category.href} className="flex-shrink-0 text-center group w-64">
                <div className="border-2 border-black dark:border-white rounded-full aspect-square mb-4 relative overflow-hidden bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                </div>
                <h3 className="font-mono text-sm font-bold group-hover:underline text-black dark:text-white">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
