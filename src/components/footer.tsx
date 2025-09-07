import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t-2 border-black dark:border-white">
      {/* Branding Section */}
      <div className="border-b-2 border-black dark:border-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-4">
              <h2 className="font-mono text-2xl font-bold mb-2 text-black dark:text-white">RETRO-ICA BRANDING</h2>
              <p className="font-mono text-sm text-black dark:text-white">"MESSAGE"</p>
            </div>
            <div className="flex justify-center items-center space-x-4 mt-6">
              <div className="w-12 h-12 border-2 border-black dark:border-white rounded-full bg-gray-100 dark:bg-gray-800"></div>
              <span className="font-mono text-sm text-black dark:text-white">LOGO</span>
              <div className="font-mono text-xs text-black dark:text-white">
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
              <h3 className="font-mono text-sm font-bold mb-4 text-black dark:text-white">SHOP</h3>
              <ul className="space-y-2 font-mono text-xs">
                <li>
                  <Link href="/cameras/point-shoot" className="hover:underline text-black dark:text-white">
                    P&S FILM
                  </Link>
                </li>
                <li>
                  <Link href="/cameras/slr" className="hover:underline text-black dark:text-white">
                    SLR FILM
                  </Link>
                </li>
                <li>
                  <Link href="/cameras/digital" className="hover:underline text-black dark:text-white">
                    Y2K DIGITAL
                  </Link>
                </li>
                <li>
                  <Link href="/cameras/camcorder" className="hover:underline text-black dark:text-white">
                    CAMCORDER
                  </Link>
                </li>
                <li>
                  <Link href="/cameras/super8" className="hover:underline text-black dark:text-white">
                    SUPER8
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
              <h3 className="font-mono text-sm font-bold mb-4 text-black dark:text-white">RETRO-ICA</h3>
              <ul className="space-y-2 font-mono text-xs">
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

            {/* Social Icons */}
            <div>
              <h3 className="font-mono text-sm font-bold mb-4 text-black dark:text-white">"MESSAGE"</h3>
              <div className="flex space-x-2">
                <div className="w-8 h-8 border border-black dark:border-white bg-gray-100 dark:bg-gray-800"></div>
                <div className="w-8 h-8 border border-black dark:border-white bg-gray-100 dark:bg-gray-800"></div>
                <div className="w-8 h-8 border border-black dark:border-white bg-gray-100 dark:bg-gray-800"></div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-mono text-sm font-bold mb-4 text-black dark:text-white">STAY IN CONTACT</h3>
              <div className="space-y-2">
                <Input
                  placeholder="EMAIL ADDRESS"
                  className="font-mono text-xs border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <Button className="w-full font-mono text-xs bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100">
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
