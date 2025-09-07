import Image from "next/image"

interface PosterProductsProps {
  items: [string, string, string] // Exactly 3 items
  className?: string
}

const getImageForItem = (item: string) => {
  if (item.includes("RETRO KODAK")) return "/images/kodak.jpg"
  if (item.includes("OLYMPUS MJU")) return "/images/mju.jpg"
  if (item.includes("Y2K SONY")) return "/images/y2k-2.jpg"
  if (item.includes("CLASSIC IPODS")) return "/images/ipod.jpg"
  if (item.includes("CASSETTE PLAYERS")) return "/images/cassette.jpg"
  if (item.includes("GAMEBOYS")) return "/images/gameboy.jpg"
  return "/images/film-can.avif" // Default fallback
}

export default function PosterProducts({ items, className = "" }: PosterProductsProps) {
  return (
    <section className={`py-12 bg-white dark:bg-black border-t-2 border-black dark:border-white ${className}`}>
      <div className="container mx-auto px-4">
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              <div className="border-2 border-black dark:border-white mb-4 aspect-[3/4] relative overflow-hidden">
                <Image
                  src={getImageForItem(item) || "/placeholder.svg"}
                  alt={item}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="font-mono text-sm font-bold text-black dark:text-white">{item}</h3>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 px-6">
            {items.map((item, index) => (
              <div key={index} className="flex-shrink-0 text-center w-72">
                <div className="border-2 border-black dark:border-white mb-4 aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={getImageForItem(item) || "/placeholder.svg"}
                    alt={item}
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                </div>
                <h3 className="font-mono text-sm font-bold text-black dark:text-white">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
