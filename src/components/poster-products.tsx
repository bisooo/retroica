interface PosterProductsProps {
  items: [string, string, string] // Exactly 3 items
  className?: string
}

export default function PosterProducts({ items, className = "" }: PosterProductsProps) {
  return (
    <section className={`py-12 bg-white border-t-2 border-black ${className}`}>
      <div className="container mx-auto px-4">
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              <div className="border-2 border-black mb-4 aspect-[3/4] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-4 border border-gray-300 transform rotate-12"></div>
                  <div className="absolute inset-6 border border-gray-400 transform -rotate-6"></div>
                  <div className="absolute inset-8 border border-gray-500 transform rotate-3"></div>
                </div>
              </div>
              <h3 className="font-mono text-sm font-bold">{item}</h3>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 px-6">
            {items.map((item, index) => (
              <div key={index} className="flex-shrink-0 text-center w-72">
                <div className="border-2 border-black mb-4 aspect-[3/4] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="absolute inset-4 border border-gray-300 transform rotate-12"></div>
                    <div className="absolute inset-6 border border-gray-400 transform -rotate-6"></div>
                    <div className="absolute inset-8 border border-gray-500 transform rotate-3"></div>
                  </div>
                </div>
                <h3 className="font-mono text-sm font-bold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
