import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export function useImageLoader(products: Product[], textureSrc: string) {
  const [loadedProducts, setLoadedProducts] = useState<Set<number>>(new Set());

  useEffect(() => {
    setLoadedProducts(new Set());

    const loadImages = async () => {
      const imagePromises = products.map((product) =>
        Promise.all([
          new Promise((resolve) => {
            const img = new window.Image();
            img.onload = resolve;
            img.src = textureSrc;
          }),
          new Promise((resolve) => {
            const img = new window.Image();
            img.onload = resolve;
            img.src = product.image;
          }),
        ]).then(() =>
          setLoadedProducts((prev) => new Set(prev).add(product.id))
        )
      );

      await Promise.all(imagePromises);
    };

    loadImages();
  }, [products, textureSrc]);

  return loadedProducts;
}