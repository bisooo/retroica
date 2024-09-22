export interface Category {
    id: string;
    name: string;
  }
  
  export interface Brand {
    name: string;
  }
  
  export interface FiltersProps {
    categories: Category[];
    brands: Brand[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedBrands: string[];
    toggleBrand: (brand: string) => void;
    maxPrice: number;
    priceLimit: number;
    setPriceLimit: (limit: number) => void;
  }