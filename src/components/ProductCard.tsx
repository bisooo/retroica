import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCardProps } from "@/types/product";

export function ProductCard({
  product,
  currencySymbol,
  textureSrc,
  buttonTextureSrc,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 1,
      }}
    >
      <Link href={`/cameras/${product.id}`}>
        <motion.div
          whileHover={{
            scale: 1.02,
            transition: {
              type: "tween",
              stiffness: 400,
              damping: 10,
            },
          }}
          whileTap={{ scale: 0.99 }}
          className="relative flex flex-col border-4 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl border-[#CCCCCC] hover:border-[#00FF00] cursor-pointer"
        >
          <div className="absolute inset-0 z-0 bg-[#CCCCCC]">
            <Image
              src={textureSrc}
              alt="Texture"
              fill
              style={{
                objectFit: "cover",
              }}
              className="opacity-80"
            />
          </div>
          <div className="relative z-10 p-4 flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-[#CCCCCC]">
                {product.name}
              </h3>
              <p className="text-sm text-[#CCCCCC] uppercase">
                {product.brand}
              </p>
            </div>
            <p className="text-xl font-bold text-[#00FF00]">
              {currencySymbol}
              {product.price}
            </p>
          </div>
          <div className="relative z-10 flex-grow flex items-center justify-center p-4">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-full object-cover aspect-square rounded-md"
            />
          </div>
          <div className="relative z-10 p-4 flex space-x-2">
            <Button className="flex-1 bg-gray-300 text-black font-bold hover:bg-gray-900 relative overflow-hidden transition-colors duration-150">
              <span className="relative z-10">LEARN MORE</span>
              <Image
                src={buttonTextureSrc}
                alt="Button Texture"
                fill
                style={{
                  objectFit: "cover",
                }}
                className="absolute inset-0 opacity-50"
              />
            </Button>
            <Button
              className="flex-1 bg-gray-300 text-black font-bold hover:bg-gray-900 hover:text-[#00FF00] relative overflow-hidden transition-colors duration-150"
              onClick={(e) => {
                e.preventDefault();
                // Medusa "Buy Now" logic
              }}
            >
              <span className="relative z-10">BUY NOW</span>
              <Image
                src={buttonTextureSrc}
                alt="Button Texture"
                fill
                style={{
                  objectFit: "cover",
                }}
                className="absolute inset-0 opacity-50"
              />
            </Button>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
