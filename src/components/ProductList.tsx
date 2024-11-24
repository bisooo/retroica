"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductListProps } from "@/types/product";
import { ProductCard } from "./ProductCard";

const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  CZK: "Kč",
};

const TEXTURE_IMAGE = "/film-textures/texture4.jpg";
const BUTTON_TEXTURE = "/button-texture.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export function ProductList({ products }: ProductListProps) {
  const [currency] = useState("USD");

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        {products.map((product) => (
          <motion.div key={product.id} variants={itemVariants} layout>
            <ProductCard
              product={product}
              currencySymbol={currencySymbols[currency]}
              textureSrc={TEXTURE_IMAGE}
              buttonTextureSrc={BUTTON_TEXTURE}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
