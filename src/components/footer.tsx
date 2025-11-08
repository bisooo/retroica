import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Youtube } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t-2 border-black dark:border-white">
      {/* Branding Section */}
      <div className="border-b-2 border-black dark:border-white relative overflow-hidden h-80 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-7xl h-full">
            <Image
              src="/images/footer.jpg"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-white overflow-hidden mb-4 flex items-center justify-center">
                <Image
                  src="/images/logo.avif"
                  alt="Retroica Logo"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="font-business text-xs text-white space-y-1">
                <div className="font-semibold">REVIVING MEMORIES - SUSTAINABLY 🌻</div>
                <div>SINCE 2020</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links and Newsletter */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Shop Links */}
            <div>
              <h3 className="font-helvicta text-sm font-bold mb-4 text-black dark:text-white">SHOP</h3>
              <ul className="space-y-2 font-business text-xs">
                <li>
                  <Link href="/photo" className="hover:underline text-black dark:text-white">
                    PHOTO
                  </Link>
                </li>
                <li>
                  <Link href="/video" className="hover:underline text-black dark:text-white">
                    VIDEO
                  </Link>
                </li>
                <li>
                  <Link href="/music" className="hover:underline text-black dark:text-white">
                    MUSIC
                  </Link>
                </li>
                <li>
                  <Link href="/accessories" className="hover:underline text-black dark:text-white">
                    ACCESSORIES
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-helvicta text-sm font-bold mb-4 text-black dark:text-white">RETRO-ICA</h3>
              <ul className="space-y-2 font-business text-xs">
                <li>
                  <Link href="/about" className="hover:underline text-black dark:text-white">
                    ABOUT US
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:underline text-black dark:text-white">
                    SHIPPING/RETURNS
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:underline text-black dark:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline text-black dark:text-white">
                    CONTACT US
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline text-black dark:text-white">
                    PRIVACY POLICY
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-helvicta text-sm font-bold mb-4 text-black dark:text-white">FOLLOW US</h3>
              <div className="flex space-x-3">
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

            {/* Newsletter */}
            <div>
              <h3 className="font-helvicta text-sm font-bold mb-4 text-black dark:text-white">STAY IN CONTACT</h3>
              <div className="space-y-2">
                <Input
                  placeholder="EMAIL ADDRESS"
                  className="font-business text-xs border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <Button className="w-full font-helvicta text-xs bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100">
                  SUBSCRIBE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
