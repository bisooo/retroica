import Image from "next/image"
import Link from "next/link"
import { POSTER_IMAGES, toCollectionHandle } from "@/lib/data/poster-products"

interface PosterProductsProps {
  items: [string, string, string]
}

export default function PosterProducts({ items }: PosterProductsProps) {
  return (
    <section className={`py-12 bg-white dark:bg-black border-t-2 border-black dark:border-white`}>
      <div className="container mx-auto px-4">
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {items.map((displayName) => {
            const collectionHandle = toCollectionHandle(displayName)
            return (
              <Link key={collectionHandle} href={`/${collectionHandle}`} className="text-center group cursor-pointer">
                <div className="border-2 border-black dark:border-white mb-4 aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={POSTER_IMAGES[collectionHandle as keyof typeof POSTER_IMAGES] || "/images/film-can.avif"}
                    alt={displayName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-helvicta text-sm font-bold text-black dark:text-white group-hover:underline">
                  {displayName}
                </h3>
              </Link>
            )
          })}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 px-6">
            {items.map((displayName) => {
              const collectionHandle = toCollectionHandle(displayName)
              return (
                <Link
                  key={collectionHandle}
                  href={`/${collectionHandle}`}
                  className="flex-shrink-0 text-center w-72 group cursor-pointer"
                >
                  <div className="border-2 border-black dark:border-white mb-4 aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={POSTER_IMAGES[collectionHandle as keyof typeof POSTER_IMAGES] || "/images/film-can.avif"}
                      alt={displayName}
                      fill
                      className="object-cover"
                      sizes="288px"
                    />
                  </div>
                  <h3 className="font-helvicta text-sm font-bold text-black dark:text-white group-hover:underline">
                    {displayName}
                  </h3>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
