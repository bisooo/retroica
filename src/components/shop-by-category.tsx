import Link from "next/link"

const categories = [
  { name: "POINT & SHOOT Δ", href: "/cameras/point-shoot" },
  { name: "Y2K DIGITAL Δ", href: "/cameras/digital" },
  { name: "CAMCORDER Δ", href: "/cameras/camcorder" },
]

export default function ShopByCategory() {
  return (
    <section className="py-12 bg-white border-t-2 border-black">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-mono font-bold mb-8 text-center">SHOP BY CATEGORY:</h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link key={index} href={category.href} className="text-center group">
              <div className="border-2 border-black rounded-full aspect-square mb-4 relative overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="absolute inset-4">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-full transform rotate-12 group-hover:rotate-0 transition-transform"></div>
                </div>
              </div>
              <h3 className="font-mono text-sm font-bold group-hover:underline">{category.name}</h3>
            </Link>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 px-6">
            {categories.map((category, index) => (
              <Link key={index} href={category.href} className="flex-shrink-0 text-center group w-64">
                <div className="border-2 border-black rounded-full aspect-square mb-4 relative overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="absolute inset-4">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-full transform rotate-12 group-hover:rotate-0 transition-transform"></div>
                  </div>
                </div>
                <h3 className="font-mono text-sm font-bold group-hover:underline">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
