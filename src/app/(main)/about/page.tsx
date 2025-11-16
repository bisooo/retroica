import Image from "next/image"
import { Instagram, Youtube } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - RETRO-ICA | Authentic Vintage Electronics",
  description:
    "Learn about RETRO-ICA, your trusted source for authentic, tested, retro electronics since 2020. Shipping worldwide to EU, UK, CA, US, and AU.",
}

export default function AboutPage() {
  const topImages = [
    { src: "/images/about-1.jpg", alt: "Retroica vintage photography moment" },
    { src: "/images/about-2.jpg", alt: "Film camera aesthetic" },
    { src: "/images/about-3.jpg", alt: "Street photography with vintage gear" },
  ]

  const bottomImages = [
    { src: "/images/about-4.jpg", alt: "Fisheye vintage camera shot" },
    { src: "/images/about-5.jpg", alt: "JVC camcorder retro style" },
    { src: "/images/about-6.jpg", alt: "Party photography with vintage camera" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-4 mb-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:justify-center pb-2">
          {topImages.map((image, i) => (
            <div
              key={`top-${i}`}
              className="relative aspect-video border-2 border-black dark:border-white flex-shrink-0 w-[85vw] md:w-[calc(33.333%-0.67rem)] snap-center"
            >
              <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            </div>
          ))}
        </div>

        <div className="w-100 h-48 text-center">
          <Image
            src="/images/logo.svg"
            alt="Retroica Logo"
            width={100}
            height={48}
            className="object-contain w-full h-full invert dark:invert-0"
          />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-6 my-2">
          <p className="font-helvicta text-lg font-bold text-black dark:text-white">
            REVIVING MEMORIES - SUSTAINABLY 🌻
          </p>

          <p className="font-business text-lg text-black dark:text-white">✈️ SHIPPING TO THE 🇪🇺 🇬🇧 🇨🇦 🇺🇸 🇦🇺</p>

          <p className="font-helvicta text-lg text-black dark:text-white">258 SALES SINCE 2020</p>

          {/* Social Icons */}
          <div>
            <div className="flex justify-center space-x-3">
              <a
                href="https://www.instagram.com/retroica.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-black dark:border-white bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-black dark:text-white" />
              </a>
              <a
                href="https://www.etsy.com/shop/Retroica"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-black dark:border-white bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center transition-colors"
                aria-label="Etsy"
              >
                <svg className="w-5 h-5 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 3c-1.5 0-3 .5-4.5 1.5C10.5 3.5 9 3 7.5 3 4.5 3 2 5.5 2 8.5c0 4 3.5 7.5 10 13 6.5-5.5 10-9 10-13C22 5.5 19.5 3 16.5 3z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@retroica"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-black dark:border-white bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-black dark:text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:justify-center pb-2">
          {bottomImages.map((image, i) => (
            <div
              key={`bottom-${i}`}
              className="relative aspect-video border-2 border-black dark:border-white flex-shrink-0 w-[85vw] md:w-[calc(33.333%-0.67rem)] snap-center"
            >
              <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
