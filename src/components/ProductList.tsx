"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ProductListProps } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { useImageLoader } from "@/hooks/useImageLoader";

const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  CZK: "Kč",
};

const TEXTURE_IMAGE = "/film-textures/texture4.jpg";
const BUTTON_TEXTURE = "/button-texture.png";

export function ProductList({ products }: ProductListProps) {
  const [currency] = useState("USD");
  const loadedProducts = useImageLoader(products, TEXTURE_IMAGE);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currencySymbol={currencySymbols[currency]}
            isLoaded={loadedProducts.has(product.id)}
            textureSrc={TEXTURE_IMAGE}
            buttonTextureSrc={BUTTON_TEXTURE}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
