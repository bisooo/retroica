import { Button } from "@/components/ui/button";
import { Category } from "@/types/filters";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-xl font-bold mb-4 text-[#CCCCCC]">TYPE</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 py-2 rounded-lg font-bold
              ${
                selectedCategory === category.id
                  ? "bg-[#00FF00] text-black"
                  : "bg-gray-700 text-[#CCCCCC]"
              }
              transform hover:scale-105 transition-transform duration-200
              shadow-[inset_0_-4px_0_rgba(0,0,0,0.3)]
              active:shadow-[inset_0_4px_0_rgba(0,0,0,0.3)]
            `}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
