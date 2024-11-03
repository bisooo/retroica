export interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    image: string;
    description: string;
    mainImage: string;
    images: string[];
    details: {
        [key: string]: string;
    };
    specs: {
      [key: string]: string;
    };
  }

export interface ProductListProps {
    products: Product[];
}

export interface ProductCardProps {
    product: Product;
    currencySymbol: string;
    textureSrc: string;
    buttonTextureSrc: string;
}