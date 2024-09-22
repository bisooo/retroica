import { FiltersProps } from "@/types/filters";
import { CategoryFilter } from "./filters/CategoryFilter";
import { BrandFilter } from "./filters/BrandFilter";
import { PriceFilter } from "./filters/PriceFilter";

export function Filters({
  categories,
  brands,
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  toggleBrand,
  maxPrice,
  priceLimit,
  setPriceLimit,
}: FiltersProps) {
  return (
    <>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BrandFilter
        brands={brands}
        selectedBrands={selectedBrands}
        toggleBrand={toggleBrand}
      />
      <PriceFilter
        maxPrice={maxPrice}
        priceLimit={priceLimit}
        setPriceLimit={setPriceLimit}
      />
    </>
  );
}
