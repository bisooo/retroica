import { Slider } from "@/components/ui/slider";

interface PriceFilterProps {
  maxPrice: number;
  priceLimit: number;
  setPriceLimit: (limit: number) => void;
}

export function PriceFilter({
  maxPrice,
  priceLimit,
  setPriceLimit,
}: PriceFilterProps) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-xl font-bold mb-4 text-[#CCCCCC]">PRICE</h2>
      <div className="max-w-md mx-auto">
        <Slider
          max={maxPrice}
          step={10}
          value={[priceLimit]}
          onValueChange={(value) => setPriceLimit(value[0])}
          className="w-full [&_[role=slider]]:bg-[#00FF00] [&_[role=slider]]:border-[#00FF00] [&_.slider-track]:bg-[#CCCCCC]"
        />
        <div className="mt-2 text-sm text-[#CCCCCC]">
          SHOWING CAMERAS UNDER ${priceLimit}
        </div>
      </div>
    </div>
  );
}
