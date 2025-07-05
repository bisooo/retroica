import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-black">
      {/* Branding Section */}
      <div className="border-b-2 border-black py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-4">
              <h2 className="font-mono text-2xl font-bold mb-2">RETRO-ICA BRANDING</h2>
              <p className="font-mono text-sm">"MESSAGE"</p>
            </div>
            <div className="flex justify-center items-center space-x-4 mt-6">
              <div className="w-12 h-12 border-2 border-black rounded-full bg-gray-100"></div>
              <span className="font-mono text-sm">LOGO</span>
              <div className="font-mono text-xs">
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
              <h3 className="font-mono text-sm font-bold mb-4">SHOP</h3>
              <ul className="space-y-2 font-mono text-xs">
                <li>
                  <Link href="/cameras/point-shoot" className="hover:underline">
                    P&S FILM
                  </Link>
                </li>
                <li>
                  <Link href="/cameras/slr" className="hover:underline">
                    SLR FILM
                  </Link>
                </li>
                <li>
                  <Link href="/cameras/digital" className="hover:underline">
                    Y2K DIGITAL
                  </Link>
                </li>
                <li>
                  <Link href="/cameras/camcorder" className="hover:underline">
                    CAMCORDER
                  </Link>
                </li>
                <li>
                  <Link href="/cameras/super8" className="hover:underline">
                    SUPER8
                  </Link>
                </li>
                <li>
                  <Link href="/accessories" className="hover:underline">
                    ACCESSORIES
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-mono text-sm font-bold mb-4">RETRO-ICA</h3>
              <ul className="space-y-2 font-mono text-xs">
                <li>
                  <Link href="/about" className="hover:underline">
                    ABOUT US
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:underline">
                    SHIPPING/RETURNS
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    CONTACT US
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    PRIVACY POLICY
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="font-mono text-sm font-bold mb-4">"MESSAGE"</h3>
              <div className="flex space-x-2">
                <div className="w-8 h-8 border border-black bg-gray-100"></div>
                <div className="w-8 h-8 border border-black bg-gray-100"></div>
                <div className="w-8 h-8 border border-black bg-gray-100"></div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-mono text-sm font-bold mb-4">STAY IN CONTACT</h3>
              <div className="space-y-2">
                <Input placeholder="EMAIL ADDRESS" className="font-mono text-xs border-2 border-black" />
                <Button className="w-full font-mono text-xs bg-black text-white border-2 border-black hover:bg-gray-800">
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
