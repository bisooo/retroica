import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCardProps } from "@/types/product";

export function ProductCard({
  product,
  currencySymbol,
  isLoaded,
  textureSrc,
  buttonTextureSrc,
}: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.8,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.5 },
        layout: { duration: 0.3 },
      }}
      className="relative flex flex-col border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-[#CCCCCC]"
      style={{
        visibility: isLoaded ? "visible" : "hidden",
      }}
    >
      <div className="absolute inset-0 z-0 bg-[#CCCCCC]">
        <Image
          src={textureSrc}
          alt="Texture"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
      </div>
      <div className="relative z-10 p-4 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-[#CCCCCC]">{product.name}</h3>
          <p className="text-sm text-[#CCCCCC] uppercase">{product.brand}</p>
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
        <Button className="flex-1 bg-gray-300 text-black font-bold hover:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
          <span className="relative z-10">LEARN MORE</span>
          <Image
            src={buttonTextureSrc}
            alt="Button Texture"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 opacity-50"
          />
        </Button>
        <Button className="flex-1 bg-gray-300 text-black font-bold hover:bg-gray-900 hover:text-[#00FF00] transition-colors duration-300 relative overflow-hidden">
          <span className="relative z-10">BUY NOW</span>
          <Image
            src={buttonTextureSrc}
            alt="Button Texture"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 opacity-50"
          />
        </Button>
      </div>
    </motion.div>
  );
}
