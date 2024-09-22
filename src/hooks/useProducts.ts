import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getProducts, filterProducts } from '@/services/productService';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceLimit, setPriceLimit] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
      setPriceLimit(Math.max(...allProducts.map((c) => c.price)));
    };
    fetchProducts();
  }, []);

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
  };

  const filteredProducts = filterProducts(products, selectedCategory, selectedBrands, priceLimit);

  return {
    products: filteredProducts,
    selectedCategory,
    setSelectedCategory,
    selectedBrands,
    toggleBrand,
    priceLimit,
    setPriceLimit,
    maxPrice: Math.max(...products.map((c) => c.price)),
  };
}