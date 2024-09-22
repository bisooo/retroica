"use client";

import { ProductList } from "@/components/ProductList";
import { Filters } from "@/components/Filters";
import { useProducts } from "@/hooks/useProducts";
import { CAMERA_CATEGORIES, BRANDS } from "@/lib/constants";

export default function CamerasPage() {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedBrands,
    toggleBrand,
    priceLimit,
    setPriceLimit,
    maxPrice,
  } = useProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <Filters
        categories={CAMERA_CATEGORIES}
        brands={BRANDS}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBrands={selectedBrands}
        toggleBrand={toggleBrand}
        maxPrice={maxPrice}
        priceLimit={priceLimit}
        setPriceLimit={setPriceLimit}
      />
      <ProductList products={products} />
    </main>
  );
}
