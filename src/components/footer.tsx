import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t-2 border-black dark:border-white">
      {/* Branding Section */}
      <div className="border-b-2 border-black dark:border-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-4">
              <h2 className="font-helvicta text-2xl font-bold mb-2 text-black dark:text-white">RETRO-ICA</h2>
              <p className="font-business text-sm text-black dark:text-white">"WORK IN PROGRESS"</p>
            </div>
            <div className="flex justify-center items-center space-x-4 mt-6">
              <div className="w-12 h-12 border-2 border-black dark:border-white rounded-full bg-gray-100 dark:bg-gray-800"></div>
              <span className="font-helvicta text-sm text-black dark:text-white">LOGO</span>
              <div className="font-business text-xs text-black dark:text-white">
                <div>~~~~~~~~~~~</div>
                <div>~~~~~~~~~~~</div>
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
                  href="https://www.youtube.com/@retroica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-black dark:border-white bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-black dark:text-white" />
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
