import Image from "next/image"
import Link from "next/link"

interface PosterProductsProps {
  items: [string, string, string] // Changed from collections to items to match usage
  className?: string
}

const POSTER_IMAGES = {
  "olympus-mju": "/images/mju.jpg",
  "retro-kodak": "/images/kodak.jpg",
  "y2k-sony": "/images/y2k-2.jpg",
  "classic-ipods": "/images/ipod.jpg",
  "gameboys": "/images/gameboy.jpg",
  "point-and-shoot": "/images/film-can.avif",
  "cassette-players": "/images/cassette.jpg",
  "y2k-digital": "/images/y2k.jpg",
  "camcoder": "/images/camcoder.jpg",
  "slr": "/images/film-can.avif",
  "super-zoom": "/images/film-can.avif",
}

function toCollectionHandle(displayName: string): string {
  return displayName
    .toLowerCase()
    .replace(/\s+δ$/i, "") // Remove the delta symbol
    .replace(/\s+/g, "-") // Replace spaces with hyphens
}

export default function PosterProducts({ items, className = "" }: PosterProductsProps) {
  return (
    <section className={`py-12 bg-white dark:bg-black border-t-2 border-black dark:border-white ${className}`}>
      <div className="container mx-auto px-4">
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {items.map((displayName) => {
            const collectionHandle = toCollectionHandle(displayName) // Convert display name to handle
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
              const collectionHandle = toCollectionHandle(displayName) // Convert display name to handle
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
