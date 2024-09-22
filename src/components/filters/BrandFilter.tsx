import { Button } from "@/components/ui/button";
import { Brand } from "@/types/filters";

interface BrandFilterProps {
  brands: Brand[];
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
}

export function BrandFilter({
  brands,
  selectedBrands,
  toggleBrand,
}: BrandFilterProps) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-xl font-bold mb-4 text-[#CCCCCC]">BRAND</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {brands.map((brand) => (
          <Button
            key={brand.name}
            onClick={() => toggleBrand(brand.name)}
            className={`
              px-4 py-2 rounded-lg font-bold
              ${
                selectedBrands.includes(brand.name)
                  ? "bg-[#00FF00] text-black"
                  : "bg-gray-700 text-[#CCCCCC]"
              }
              transform hover:scale-105 transition-transform duration-200
              shadow-[inset_0_-4px_0_rgba(0,0,0,0.3)]
              active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3)]
            `}
          >
            {brand.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
