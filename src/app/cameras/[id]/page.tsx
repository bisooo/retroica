"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/productService";
import { Product } from "@/types/product";
import { ProductPage } from "@/components/product/ProductPage";

export default function CameraDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(Number(id));
      setProduct(fetchedProduct || null);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-[#CCCCCC] font-mono flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <ProductPage product={product} />;
}
