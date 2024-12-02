"use client";

import { Product } from "@/types/product";
import { ProductHeader } from "./ProductHeader";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { ProductActions } from "./ProductActions";
import { ProductDetails } from "./ProductDetails";
import { ImageCarousel } from "./ImageCarousel";

interface ProductPageProps {
  product: Product;
}

export function ProductPage({ product }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-black text-[#CCCCCC] font-mono">
      <div className="container mx-auto px-4 py-8">
        <ProductHeader name={product.name} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <ProductImage/>

          <div className="space-y-8">
            <ProductInfo
              description={product.description}
              price={product.price}
            />
            <ProductActions />
            <ProductDetails details={product.details} specs={product.specs} />
          </div>
        </div>

        <ImageCarousel images={product.images} productName={product.name} />
      </div>
    </div>
  );
}
